// poller.ts
import { Octokit } from '@octokit/rest';
import { config } from 'dotenv';
import fetch from 'node-fetch';
import path from 'path';
import { execSync } from 'child_process';

config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const octokit = new Octokit({ auth: GITHUB_TOKEN });

const owner = 'pratiksha2828';
const repo = 'AlgoRythm';
const filePath = '.github/events/latest-event.json';
let lastSha = '';

async function testApiKey() {
  const res = await fetch('https://api.openai.com/v1/models', {
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    }
  });
  if (res.ok) {
    console.log("✅ API Key is valid and working.");
  } else {
    console.log("❌ API Key failed:", res.statusText);
  }
}

async function refactorCodeWithOpenAI(code: string): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert programmer. Refactor the following code to improve readability, maintainability, and performance, without changing the logic. Return only the updated code."
        },
        {
          role: "user",
          content: code
        }
      ]
    })
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || code;
}

async function createBranchAndCommit(fileName: string, content: string, baseSha: string, prNumber: number) {
  const branchName = `refactor/pr-${prNumber}`;
  const newFileName = `refactored-${path.basename(fileName)}`;

  const { data: base } = await octokit.git.getRef({ owner, repo, ref: `heads/main` });
  const baseCommitSha = base.object.sha;

  try {
    await octokit.git.createRef({
      owner,
      repo,
      ref: `refs/heads/${branchName}`,
      sha: baseCommitSha,
    });
  } catch (err: any) {
    if (err.status === 422) {
      console.log(`⚠️ Branch ${branchName} already exists. Proceeding...`);
    } else throw err;
  }

  const blob = await octokit.git.createBlob({
    owner,
    repo,
    content,
    encoding: 'utf-8',
  });

  const tree = await octokit.git.createTree({
    owner,
    repo,
    base_tree: baseCommitSha,
    tree: [
      {
        path: newFileName,
        mode: '100644',
        type: 'blob',
        sha: blob.data.sha,
      },
    ],
  });

  const commit = await octokit.git.createCommit({
    owner,
    repo,
    message: `refactor: add ${newFileName}`,
    tree: tree.data.sha,
    parents: [baseCommitSha],
  });

  await octokit.git.updateRef({
    owner,
    repo,
    ref: `heads/${branchName}`,
    sha: commit.data.sha,
    force: true,
  });

  console.log(`✅ Committed ${newFileName} to branch ${branchName}`);

  try {
    await octokit.pulls.create({
      owner,
      repo,
      title: `Refactor: Add ${newFileName}`,
      head: branchName,
      base: 'main',
      body: `This PR adds the refactored version of ${fileName}.`,
    });
    console.log(`🔀 Pull request created for ${newFileName}`);
  } catch (err: any) {
    if (err.status === 422) {
      console.log(`⚠️ Pull request already exists for ${branchName}`);
    } else {
      throw err;
    }
  }
}

async function poll() {
  try {
    const res = await octokit.repos.getContent({ owner, repo, path: filePath });
    const content = res.data as any;
    const sha = content.sha;

    if (sha !== lastSha) {
      lastSha = sha;
      const decoded = Buffer.from(content.content, 'base64').toString('utf-8');
      const event = JSON.parse(decoded);

      console.log("🔔 New event received:");
      console.log(JSON.stringify(event, null, 2));

      if (event.action === 'opened' && event.pull_request) {
        const prNumber = event.pull_request.number;
        const filesRes = await octokit.pulls.listFiles({ owner, repo, pull_number: prNumber });

        for (const file of filesRes.data) {
          if (file.filename.endsWith('.ts') || file.filename.endsWith('.js')) {
            const fileContentRes = await fetch(file.raw_url);
            const originalCode = await fileContentRes.text();

            console.log(`📄 Refactoring ${file.filename}...`);
            const refactored = await refactorCodeWithOpenAI(originalCode);
            await createBranchAndCommit(file.filename, refactored, sha, prNumber);
          }
        }
      }
    } else {
      console.log("No new event.");
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error("Polling error:", err.message);
    } else {
      console.error("Polling error:", err);
    }
  }
}

testApiKey();
setInterval(poll, 10000);
