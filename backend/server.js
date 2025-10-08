import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

// Allow frontend to call backend in dev mode
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5000"], // dev + prod
    credentials: true,
  })
);

// Express session
app.use(
  session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Passport GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/github/callback", // backend port
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, { profile, accessToken });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// ---- ROUTES ----

// Health check
app.get("/api/health", (req, res) => {
  res.send("✅ Backend + Frontend running with GitHub OAuth");
});

// Trigger GitHub Login
app.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));

// GitHub callback
app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "http://localhost:5000/login" }),
  (req, res) => {
    res.redirect("http://localhost:5173/");
 // frontend served by backend
  }
);

// Get logged-in user
app.get("/api/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: "Not logged in" });
  }
});

// Logout
app.get("/auth/logout", (req, res) => {
  req.logout(() => {
    res.redirect("http://localhost:5000/"); // redirect to root
  });
});

// ---- Serve frontend build ----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---- ROUTES ----

// Health check
app.get("/api/health", (req, res) => {
  res.send("✅ Backend + Frontend running with GitHub OAuth");
});

// (other /api routes like /api/user, /auth/github, etc.)

// ---- Serve frontend build ----
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// ---- START SERVER ----
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 App running on http://localhost:${PORT}`));
