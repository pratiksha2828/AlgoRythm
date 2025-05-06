const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

router.post("/", async (req, res) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: "Hello, Gemini!" }],
          },
        ],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("Gemini Response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("❌ Gemini API Error:", error.message);
    res.status(500).send("Error calling Gemini API.");
  }
});

module.exports = router;
