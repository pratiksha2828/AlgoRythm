import fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';
import { Octokit } from "@octokit/rest";
import OpenAI from "openai";


dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const owner = 'pratiksha2828';
const repo = 'AlgoRythm';
const POLL_INTERVAL = 10_000;

let lastSha = '';
const processedPRs = new Set<number>();

async function poll() {
  const eventPath = path.join('.github', 'events', 'latest-event.json');

  if (!fs.existsSync(eventPath)) {
    console.log("⚠️ Event file not found:", eventPath);
    return;
  }

  const data = fs.readFileSync(eventPath, 'utf-8');
  let event;
  try {
    event = JSON.parse(data);
  } catch (err) {
    console.error("❌ Invalid JSON in event file.");
    return;
  }

  console.log("📨 Raw event data:", JSON.stringify(event, null, 2));

  const prNumber = event?.pull_request?.number;
  const prSha = event?.pull_request?.head?.sha;

  if (!prNumber || !prSha) {
    console.log("ℹ️ Event does not contain valid pull_request data.");
    return;
  }

  if (processedPRs.has(prNumber)) {
    console.log(`🔁 Already processed PR #${prNumber}, skipping.`);
    return;
  }

  if (prSha === lastSha) {
    console.log("⏳ No new event.");
    return;
  }

  lastSha = prSha;
  processedPRs.add(prNumber);

  console.log(`📦 Processing PR #${prNumber} with SHA ${prSha}`);

  const filesRes = await octokit.rest.pulls.listFiles({ owner, repo, pull_number: prNumber });

  const files = filesRes.data.filter(file =>
    file.filename.endsWith('.ts') || file.filename.endsWith('.js')
  );

  if (files.length === 0) {
    console.log("📁 No TypeScript or JavaScript files found.");
    return;
  }

  for (const file of files) {
    const contentRes = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: file.filename,
      ref: prSha,
    });

    const fileData = contentRes.data as any;
    const content = Buffer.from(fileData.content, 'base64').toString('utf-8');

    const refactored = await refactorCode(content);

    if (!refactored) {
      console.warn("⚠️ Refactored content is empty or invalid.");
      continue;
    }

    await createBranchAndCommit(file.filename, refactored, prNumber);
  }
}

async function refactorCode(code: string): Promise<string | null> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert programmer. Refactor the given code to improve readability and performance. Return only the full refactored code.',
        },
        {
          role: 'user',
          content: code,
        },
      ],
      temperature: 0.3,
    });

    return response.choices[0]?.message?.content ?? null;
  } catch (error) {
    console.error("❌ Error during refactoring:", error);
    return null;
  }
}

async function createBranchAndCommit(fileName: string, content: string, prNumber: number) {
  const branchName = `refactor-pr-${prNumber}-${Date.now()}`;
  const baseBranch = 'main';

  const { data: refData } = await octokit.rest.git.getRef({
    owner,
    repo,
    ref: `heads/${baseBranch}`,
  });

  const baseSha = refData.object.sha;

  await octokit.rest.git.createRef({
    owner,
    repo,
    ref: `refs/heads/${branchName}`,
    sha: baseSha,
  });

  const blob = await octokit.rest.git.createBlob({
    owner,
    repo,
    content,
    encoding: 'utf-8',
  });

  const { data: baseCommit } = await octokit.rest.git.getCommit({
    owner,
    repo,
    commit_sha: baseSha,
  });

  const tree = await octokit.rest.git.createTree({
    owner,
    repo,
    base_tree: baseCommit.tree.sha,
    tree: [
      {
        path: fileName,
        mode: '100644',
        type: 'blob',
        sha: blob.data.sha,
      },
    ],
  });

  const commit = await octokit.rest.git.createCommit({
    owner,
    repo,
    message: `Refactor file: ${fileName}`,
    tree: tree.data.sha,
    parents: [baseSha],
  });

  await octokit.rest.git.updateRef({
    owner,
    repo,
    ref: `heads/${branchName}`,
    sha: commit.data.sha,
  });

  await octokit.rest.pulls.create({
    owner,
    repo,
    head: branchName,
    base: baseBranch,
    title: `Refactored ${fileName}`,
    body: `This PR includes automatic refactoring of ${fileName}.`,
  });

  console.log(`✅ Refactor PR created for ${fileName}`);
}

setInterval(poll, POLL_INTERVAL);
