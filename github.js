const { Octokit } = require("@octokit/rest");
const { refactorCodeWithGemini } = require("./utils/gemini");

async function handleWebhook(req, res) {
    try {
        const { repository, head_commit } = req.body;
        const [owner, repo] = [repository.owner.name, repository.name];
        const filePath = head_commit.modified?.[0];

        if (!filePath) return res.status(200).send("No modified files.");

        const octokit = new Octokit({ auth: process.env.GITHUB_BOT_TOKEN }); // fallback

        const file = await octokit.repos.getContent({
            owner,
            repo,
            path: filePath,
            ref: "main"
        });

        const rawCode = Buffer.from(file.data.content, "base64").toString("utf8");

        const { refactoredCode, explanation } = await refactorCodeWithGemini(rawCode);

        const branchName = `auto-refactor-${Date.now()}`;
        const { data: mainRef } = await octokit.git.getRef({ owner, repo, ref: "heads/main" });

        await octokit.git.createRef({
            owner,
            repo,
            ref: `refs/heads/${branchName}`,
            sha: mainRef.object.sha
        });

        await octokit.repos.createOrUpdateFileContents({
            owner,
            repo,
            path: filePath,
            message: "Auto-refactored file",
            content: Buffer.from(refactoredCode).toString("base64"),
            branch: branchName,
            sha: file.data.sha
        });

        await octokit.pulls.create({
            owner,
            repo,
            title: `Refactored ${filePath}`,
            head: branchName,
            base: "main",
            body: `### AI Refactor Summary\n${explanation}`
        });

        res.status(200).send("Pull request created.");
    } catch (err) {
        console.error("Webhook error:", err);
        res.status(500).send("Internal Error.");
    }
}

module.exports = { handleWebhook };
