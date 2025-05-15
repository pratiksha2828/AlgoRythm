import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import simpleGit from "simple-git";
import { generateRefactor } from "./ollama.js";
import { Octokit } from "@octokit/rest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function handleWebhook(payload) {
  console.log("📩 Raw GitHub Event:", JSON.stringify(payload, null, 2));

  const repoName = payload.repository.name;
  const owner = payload.repository.owner.name || payload.repository.owner.login;
  const branch = payload.ref.split("/").pop();
  const commit = payload.head_commit;
  const commitHash = commit.id;
  const cloneUrl = payload.repository.clone_url.replace("https://", `https://${process.env.GITHUB_TOKEN}@`);
  const repoPath = path.join(__dirname, repoName);
  const git = simpleGit();

  try {
    await git.clone(cloneUrl);
    await git.cwd(repoPath);
    await git.checkout(branch);

    let changedFiles = [];

    try {
      const diffOutput = await git.diff(["--name-only", `${commitHash}~1`, commitHash]);
      changedFiles = diffOutput.split("\n").filter(Boolean);
    } catch (err) {
      console.warn("⚠️ Diff failed, possibly first commit or missing parent commit. Scanning all files instead.");
      const walkFiles = (dir) => {
        let results = [];
        const list = fs.readdirSync(dir, { withFileTypes: true });
        for (const file of list) {
          const filePath = path.join(dir, file.name);
          if (file.isDirectory() && ![".git", "node_modules"].includes(file.name)) {
            results = results.concat(walkFiles(filePath));
          } else if (file.isFile()) {
            results.push(filePath);
          }
        }
        return results;
      };
      changedFiles = walkFiles(repoPath).map(filePath => path.relative(repoPath, filePath));
    }

    let refactorNeeded = false;
    const refactoredFiles = [];

    for (const file of changedFiles) {
      const ext = path.extname(file);
      if ([".js", ".ts", ".py", ".java", ".json", ".jsx", ".tsx"].includes(ext)) {
        const filePath = path.join(repoPath, file);
        if (!fs.existsSync(filePath)) continue;

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
        body: `This pull request contains automated refactoring of committed code triggered by commit ${commitHash}. Please review.`,
      });
    }

  } finally {
    if (fs.existsSync(repoPath)) {
      fs.rmSync(repoPath, { recursive: true, force: true });
    }
  }
}
