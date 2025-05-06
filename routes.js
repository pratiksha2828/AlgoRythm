const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config({ path: __dirname + "/.env" });

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

let access_token = null;

// 🔧 Test route
router.get("/auth/test", (req, res) => {
  res.send("✅ Test route works!");
});

// 🔐 GitHub OAuth start
router.get("/auth/github", (req, res) => {
  const redirect_uri = "http://localhost:3000/auth/github/callback";
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}&scope=repo`);
});

// 🔁 GitHub OAuth callback
router.get("/auth/github/callback", async (req, res) => {
  const code = req.query.code;
  try {
    const tokenRes = await axios.post(`https://github.com/login/oauth/access_token`, {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
    }, {
      headers: { accept: 'application/json' }
    });

    access_token = tokenRes.data.access_token;
    console.log("✅ GitHub Access Token:", access_token);
    res.redirect("/auth/repos");
  } catch (err) {
    console.error("❌ OAuth error:", err.message);
    res.send("❌ Error during GitHub OAuth");
  }
});

// 📁 List user repositories
router.get("/auth/repos", async (req, res) => {
  if (!access_token) return res.send("❌ Missing GitHub token");

  try {
    const reposRes = await axios.get("https://api.github.com/user/repos", {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const repoList = reposRes.data.map(repo => ({
      name: repo.name,
      full_name: repo.full_name
    }));

    let html = "<h2>Select a repo to add webhook:</h2><ul>";
    for (let repo of repoList) {
      html += `<li><a href="/auth/add-webhook/${encodeURIComponent(repo.full_name)}">${repo.full_name}</a></li>`;
    }
    html += "</ul>";
    res.send(html);
  } catch (err) {
    console.error("❌ Failed to fetch repos:", err.response?.data || err.message);
    res.send("❌ Failed to fetch repositories");
  }
});

// 🔗 Add webhook to a selected repository
router.get("/auth/add-webhook/:repo", async (req, res) => {
  const repo = decodeURIComponent(req.params.repo);

  if (!access_token) return res.send("❌ Missing GitHub token");

  try {
    const webhookURL = "http://localhost:3000/webhook"; // 🔁 Update this for production

    const response = await axios.post(
      `https://api.github.com/repos/${repo}/hooks`,
      {
        name: "web",
        active: true,
        events: ["push"],
        config: {
          url: webhookURL,
          content_type: "json"
        }
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/vnd.github+json"
        }
      }
    );

    console.log("✅ Webhook added:", response.data);

    res.send(`
      <h2>✅ Webhook successfully added to <code>${repo}</code></h2>
      <a href="/auth/repos">🔙 Back to Repositories</a>
    `);
  } catch (error) {
    console.error("❌ Webhook error:", error.response?.data || error.message);
    res.send(`
      <h2>❌ Failed to add webhook to <code>${repo}</code></h2>
      <p>${error.response?.data?.message || error.message}</p>
      <a href="/auth/repos">🔙 Try Again</a>
    `);
  }
});

// 📦 Webhook endpoint
router.post("/webhook", (req, res) => {
  console.log("📦 Webhook received from GitHub:");
  console.log(JSON.stringify(req.body, null, 2)); // pretty print payload
  res.status(200).send("✅ Webhook received");
});

module.exports = router;
