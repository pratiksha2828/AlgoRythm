import express from 'express';
import bodyParser from 'body-parser';
import { spawn } from 'child_process';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  const eventType = req.headers['x-github-event'];
  const event = req.body;

  console.log("📩 Raw GitHub Event:", JSON.stringify(event, null, 2));

  if (eventType === 'push') {
    const commits = event.commits || [];
    const commitMessage = commits[0]?.message || 'No commit message';
    const githubUsername = event.sender?.login || event.pusher?.name || 'Unknown user';

    const prompt = `It looks like a GitHub push event just happened!\n\nHere are the details:\n\n* **Event:** Push\n* **Number of commits:** ${commits.length}\n* **Commit message:** "${commitMessage}" (by user ${githubUsername})\n\nIn other words, someone named ${githubUsername} made a commit.`;

    console.log("🦙 Sending prompt to Ollama:", prompt);

    const ollama = spawn('ollama', ['run', 'llama3'], { stdio: ['pipe', 'pipe', 'inherit'] });

    ollama.stdin.write(prompt);
    ollama.stdin.end();

    let response = '';
    ollama.stdout.on('data', (data) => {
      response += data.toString();
    });

    ollama.stdout.on('end', () => {
      console.log("🦙 Ollama Response:", response.trim());
    });

    res.status(200).send('Webhook received and processed!');
  } else {
    res.status(200).send('Event type not handled.');
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
