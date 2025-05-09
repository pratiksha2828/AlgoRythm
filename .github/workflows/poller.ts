// poller.ts
import { Octokit } from '@octokit/rest';
import { config } from 'dotenv';
import fs from 'fs';

config();

import fetch from 'node-fetch'; // run `npm install node-fetch` if not installed

async function testApiKey() {
    const apiKey = process.env.OPENAI_API_KEY;
    const res = await fetch('https://api.openai.com/v1/models', {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    });

    if (res.ok) {
        console.log("✅ API Key is valid and working.");
    } else {
        console.log("❌ API Key failed:", res.statusText);
    }
}

testApiKey();



const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const owner = 'pratiksha2828';      // change this
const repo = 'AlgoRythm';             // change this
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
        if (err instanceof Error) {
            if (err instanceof Error) {
                console.error("Polling error:", err.message);
              } else {
                console.error("Polling error:", err);
              }
              
        } else {
            console.error("Polling error:", err);
        }
    }    
    
}

// Poll every 10 seconds
setInterval(poll, 10000);
