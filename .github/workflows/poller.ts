// poller.ts
import { Octokit } from '@octokit/rest';
import { config } from 'dotenv';
import fs from 'fs';

config();

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const owner = 'your-github-username';      // change this
const repo = 'your-repo-name';             // change this
const filePath = '.github/events/latest-event.json';

let lastSha = '';

async function poll() {
    try {
        const res = await octokit.repos.getContent({
            owner,
            repo,
            path: filePath,
        });

        const content = res.data as any;
        const sha = content.sha;

        if (sha !== lastSha) {
            lastSha = sha;

            const decoded = Buffer.from(content.content, 'base64').toString('utf-8');
            const event = JSON.parse(decoded);

            console.log("🔔 New event received:");
            console.log(JSON.stringify(event, null, 2));

            // 🔁 Call your refactor logic here
        } else {
            console.log("No new event.");
        }
    } catch (err) {
        console.error("Polling error:", err.message);
    }
}

// Poll every 10 seconds
setInterval(poll, 10000);
