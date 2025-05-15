import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { handleWebhook } from "./webhook.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/webhook", async (req, res) => {
  try {
    await handleWebhook(req.body);
    res.sendStatus(200);
  } catch (err) {
    console.error("❌ Error in webhook processing:", err);
    res.sendStatus(500);
  }
});

app.get("/", (req, res) => {
  res.send("✅ Server is alive!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
