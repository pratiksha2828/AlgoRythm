// setup.js

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { exec } = require("child_process");
const inquirer = require("inquirer");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prompt = (question) =>
  new Promise((resolve) => rl.question(question, resolve));

async function main() {
  console.log("\n🔧 GitHub Auto-Setup Starting...");

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "repoUrl",
      message: "Paste your GitHub repo URL (e.g., https://github.com/username/repo.git):",
    },
    {
      type: "input",
      name: "email",
      message: "Enter your GitHub email:",
    },
    {
      type: "input",
      name: "username",
      message: "Enter your GitHub username:",
    },
  ]);

  console.log("\n🔐 Setting up Git config...");
  exec(`git config user.email "${answers.email}"`);
  exec(`git config user.name "${answers.username}"`);

  console.log("\n📁 Initializing Git repository if not already initialized...");
  exec("git init");

  console.log("\n🔗 Adding remote origin...");
  exec(`git remote remove origin`, () => {
    exec(`git remote add origin ${answers.repoUrl}`, () => {
      console.log("✔️  Remote added.");

      console.log("\n📦 Creating .github/workflows folder if not present...");
      fs.mkdirSync(".github/workflows", { recursive: true });

      const workflowContent = `name: Webhook Writer\n\n"on": [push]\n\njobs:\n  webhook:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - name: Run webhook\n        run: echo 'Triggering webhook writer...'
      `;

      fs.writeFileSync(
        path.join(".github", "workflows", "webhook-writer.yml"),
        workflowContent
      );

      console.log("\n✅ Workflow created.");
      console.log("📤 Pushing to GitHub...");
      exec("git add . && git commit -m \"Add GitHub Action\" && git push -u origin main", (err, stdout, stderr) => {
        if (err) console.error("❌ Push failed:", stderr);
        else console.log("🚀 Successfully pushed and set up.");
        rl.close();
      });
    });
  });
}

main();
