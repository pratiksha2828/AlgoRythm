// setup.js
import readline from 'readline';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (question) => new Promise(resolve => rl.question(question, resolve));

(async () => {
  console.log("🔐 GitHub Webhook Workflow Setup");

  const token = await ask("Enter your GitHub Personal Access Token (with repo access): ");

  const headers = {
    'Authorization': `token ${token}`,
    'Accept': 'application/vnd.github.v3+json'
  };

  const userRes = await fetch('https://api.github.com/user', { headers });
  const userData = await userRes.json();

  if (!userData.login) {
    console.error("❌ Invalid token. Aborting.");
    process.exit(1);
  }

  const username = userData.login;
  console.log(`✅ Authenticated as ${username}`);

  const reposRes = await fetch(`https://api.github.com/user/repos?per_page=100`, { headers });
  const repos = await reposRes.json();

  console.log("📦 Your Repositories:");
  repos.forEach((repo, idx) => console.log(`${idx + 1}. ${repo.full_name}`));

  const input = await ask("Enter the numbers of repos to add webhook workflow to (comma separated): ");
  const selectedIndexes = input.split(',').map(i => parseInt(i.trim()) - 1);

  const workflowContent = fs.readFileSync(path.join(__dirname, '.github/workflows/webhook-writer.yml'), 'utf8');

  for (const index of selectedIndexes) {
    const repo = repos[index];
    console.log(`🚀 Adding workflow to ${repo.full_name}...`);

    const branch = repo.default_branch;
    const pathOnRepo = '.github/workflows/webhook-writer.yml';

    // Get SHA of existing file if it exists
    const existingRes = await fetch(`https://api.github.com/repos/${repo.full_name}/contents/${pathOnRepo}?ref=${branch}`, { headers });
    let sha = null;
    if (existingRes.status === 200) {
      const existing = await existingRes.json();
      sha = existing.sha;
    }

    const res = await fetch(`https://api.github.com/repos/${repo.full_name}/contents/${pathOnRepo}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: "🔁 Add GitHub Webhook Workflow",
        content: Buffer.from(workflowContent).toString('base64'),
        branch,
        sha
      })
    });

    if (res.status === 201 || res.status === 200) {
      console.log(`✅ Workflow added to ${repo.full_name}`);
    } else {
      const err = await res.json();
      console.error(`❌ Failed for ${repo.full_name}: ${err.message}`);
    }
  }

  rl.close();
})();
