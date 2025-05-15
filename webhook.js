import express from 'express';
import simpleGit from 'simple-git';
import { exec } from 'child_process';
import { generateCommitMessage } from './ai.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.post('/webhook', async (req, res) => {
  const event = req.body;

  console.log("📩 Raw GitHub Event:", JSON.stringify(event, null, 2));

  const repoName = event.repository?.name;
  const owner = event.repository?.owner?.login;
  const cloneUrl = event.repository?.clone_url;
  const commitId = event.head_commit?.id;

  if (!repoName || !owner || !cloneUrl || !commitId) {
    return res.status(400).send('Missing required data in webhook payload.');
  }

  const repoDir = path.join(__dirname, 'repos', `${owner}_${repoName}`);
  const repoGit = simpleGit(repoDir);
  let messageToAI = `GitHub Repository: ${owner}/${repoName}`;

  try {
    if (fs.existsSync(repoDir)) {
      console.log("📁 Repo already exists. Pulling latest changes...");
      await repoGit.pull('origin', 'main');
    } else {
      console.log("📦 Cloning repo...");
      await simpleGit().clone(cloneUrl, repoDir);
    }

    if (commitId && /^[a-f0-9]{7,40}$/i.test(commitId)) {
      try {
        // Check if commit actually exists in the local repo
        const revList = await repoGit.raw(['rev-list', '--all']);
        const knownCommits = revList.split("\n").filter(Boolean);
        const isValidCommit = knownCommits.includes(commitId);

        if (isValidCommit) {
          const diff = await repoGit.diff(['--name-only', `${commitId}~1`, commitId]);
          console.log("🔍 Changed files:\n" + diff);
          messageToAI += `\n\nModified files:\n${diff}`;
        } else {
          console.warn("⚠️ Commit ID not found in repo. Skipping diff.");
        }
      } catch (err) {
        console.warn("⚠️ Git diff failed:", err.message);
      }
    } else {
      console.warn("⚠️ Invalid or missing commit ID. Skipping Git diff.");
    }

    // ✅ Send to AI for processing (e.g., refactor or suggest changes)
    const aiMessage = await generateCommitMessage(messageToAI);

    console.log("🤖 AI Response:\n", aiMessage);

    res.status(200).send('Webhook processed successfully!');
  } catch (error) {
    console.error("❌ Error in webhook processing:", error);
    res.status(500).send('Error processing webhook.');
  }
});

export default router;
