const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const axios = require("axios");
const cors = require("cors");

const app = express();

// Allow frontend calls
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Sessions
app.use(
  session({
    secret: "super-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// --- GitHub OAuth Setup ---
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// --- Routes ---
app.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("http://localhost:5173/dashboard"); // Redirect to frontend dashboard
  }
);

app.get("/auth/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

// --- Proxy to Ollama ---
app.post("/api/chat", express.json(), async (req, res) => {
  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "llama2", // change model if needed
      prompt: req.body.prompt,
    });
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ollama request failed" });
  }
});

app.listen(3000, () => console.log("✅ Backend running on http://localhost:3000"));
