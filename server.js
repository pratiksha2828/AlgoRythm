import express from "express";
import dotenv from "dotenv";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";
import simpleGit from "simple-git";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { generateRefactor } from "./ollama.js";
import { Octokit } from "@octokit/rest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
app.use(bodyParser.json());

app.post("/webhook", async (req, res) => {
  const payload = req.body;
  const repoName = payload.repository.name;
  const owner = payload.repository.owner.name || payload.repository.owner.login;
  const branch = payload.ref.split("/").pop();
  const commit = payload.head_commit;
  const cloneUrl = payload.repository.clone_url.replace("https://", `https://${process.env.GITHUB_TOKEN}@`);

  console.log("🚀 Server running on http://localhost:" + PORT);
  console.log("📩 Raw GitHub Event:", JSON.stringify(payload, null, 2));

  const repoPath = path.join(__dirname, repoName);
  const git = simpleGit();

  try {
    await git.clone(cloneUrl);
    await git.cwd(repoPath);
    await git.checkout(branch);

    const commitHash = commit.id;
    const changedFiles = (await git.diff(["--name-only", `${commitHash}~1`, commitHash])).split("\n").filter(Boolean);

    let refactorNeeded = false;
    const refactoredFiles = [];

    for (const file of changedFiles) {
      const ext = path.extname(file);
      if ([".js", ".ts", ".py", ".java", ".json", ".jsx", ".tsx"].includes(ext)) {
        const filePath = path.join(repoPath, file);
        const code = fs.readFileSync(filePath, "utf-8");
        const result = await generateRefactor(code);

        if (!result.toLowerCase().includes("code is optimal")) {
          fs.writeFileSync(filePath, result);
          refactorNeeded = true;
          refactoredFiles.push(file);
        }
      }
    }

    if (refactorNeeded) {
      const refactorBranch = `refactor/auto-${commitHash.slice(0, 7)}`;
      await git.checkoutLocalBranch(refactorBranch);
      await git.add(refactoredFiles);
      await git.commit("chore: automated code refactor via Ollama");
      await git.push("origin", refactorBranch);

      await octokit.pulls.create({
        owner,
        repo: repoName,
        title: "🔁 Automated Code Refactor",
        head: refactorBranch,
        base: branch,
        body: `This pull request contains automated refactoring of committed code triggered by commit ${commitHash}. Please review.`
      });
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("❌ Error in webhook processing:", err);
    res.sendStatus(500);
  } finally {
    fs.rmSync(repoPath, { recursive: true, force: true });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
