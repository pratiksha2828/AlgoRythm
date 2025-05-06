const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());

// Import route handlers
const authRoutes = require("./routes");
const webhookRoutes = require("./webhook");

// Route usage
app.use("/auth", authRoutes);
app.use("/webhook", webhookRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("🎉 Server is running! Use /auth/github to start GitHub authentication.");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
