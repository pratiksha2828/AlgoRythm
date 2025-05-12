const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

router.post("/", async (req, res) => {
  const event = req.body;
  console.log("📩 Raw GitHub Event:", JSON.stringify(event, null, 2));

  let messageToAI = "";

  if (event.pull_request) {
    const pr = event.pull_request;
    messageToAI = `A pull request was ${event.action}.\nTitle: ${pr.title}\nAuthor: ${pr.user.login}\nDescription: ${pr.body || "No description provided."}`;
  } else if (event.commits) {
    const commits = event.commits.map(c => `- ${c.message} by ${c.author.name}`).join("\n");
    messageToAI = `A push event occurred with ${event.commits.length} commit(s):\n${commits}`;
  } else {
    messageToAI = "Received an event, but it wasn't a pull request or push.";
  }

  try {
    // Try Ollama first
    const ollamaResponse = await axios.post("http://localhost:11434/api/generate", {
      model: "llama3",
      prompt: messageToAI,
      stream: false
    });

    const reply = ollamaResponse.data.response;
    console.log("🦙 Ollama Response:", reply);
    return res.json({ response: reply });
  } catch (ollamaError) {
    console.warn("⚠️ Ollama failed, trying OpenAI...", ollamaError.message);

    try {
      const openaiResponse = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: messageToAI }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      const reply = openaiResponse.data.choices[0].message.content;
      console.log("🤖 OpenAI Response:", reply);
      res.json({ response: reply });
    } catch (openaiError) {
      console.error("❌ Both AI services failed:", openaiError.message);
      res.status(500).send("Both AI services failed.");
    }
  }
});

module.exports = router;
