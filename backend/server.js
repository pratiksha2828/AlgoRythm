import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import puppeteer from "puppeteer";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// safe fetch polyfill
let fetchFn = global.fetch;
if (!fetchFn) {
  import("node-fetch")
    .then((mod) => {
      fetchFn = mod.default || mod;
      console.log("node-fetch loaded as fallback for fetch()");
    })
    .catch((err) => {
      console.warn("node-fetch not available:", err?.message || err);
    });
}

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/github/callback",
    },
    function(accessToken, refreshToken, profile, done) {
      return done(null, { accessToken, profile }); // Ensure accessToken is passed here
    }
  )
);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// MongoDB
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn("MONGODB_URI not set — using in-memory storage");
      return;
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};
connectDB();

// Analysis schema
const analysisSchema = new mongoose.Schema({
  repoUrl: String,
  repoName: String,
  analysisType: String, // 'basic' or 'deep'
  analysisResult: Object,
  analyzedAt: { type: Date, default: Date.now }
});

const Analysis = mongoose.model('Analysis', analysisSchema);

// Streak schema
const streakSchema = new mongoose.Schema({
  name: String,
  learningStreak: { type: Number, default: 0 },
  tracingStreak: { type: Number, default: 0 },
  testStreak: { type: Number, default: 0 },
  projectsStreak: { type: Number, default: 0 },
});
const StreakUser = mongoose.model("StreakUser", streakSchema);

// Routes
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    message: "Server running with real GitHub API analysis" 
  });
});

// GitHub URL validation helper
const parseGitHubUrl = (url) => {
  if (!url || typeof url !== "string") throw new Error("Invalid URL");
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)(?:\/|$)/i);
  if (!match) throw new Error("Invalid GitHub URL");
  return { owner: match[1], repo: match[2].replace(/\.git$/, "") };
};

// Real GitHub API analysis
const analyzeGitHubRepo = async (repoUrl) => {
  try {
    const { owner, repo } = parseGitHubUrl(repoUrl);
    const repoName = `${owner}/${repo}`;
    
    console.log(`🔍 Analyzing repository: ${repoName}`);
    
    // Fetch repository data from GitHub API
    const repoResponse = await fetchFn(`https://api.github.com/repos/${owner}/${repo}`);
    if (!repoResponse.ok) {
      throw new Error(`GitHub API error: ${repoResponse.status} ${repoResponse.statusText}`);
    }
    
    const repoData = await repoResponse.json();
    
    // Fetch languages
    const langResponse = await fetchFn(`https://api.github.com/repos/${owner}/${repo}/languages`);
    const languages = langResponse.ok ? await langResponse.json() : {};
    
    // Fetch contributors count
    const contributorsResponse = await fetchFn(`https://api.github.com/repos/${owner}/${repo}/contributors?per_page=1`);
    const contributorCount = contributorsResponse.headers.get('link') 
      ? parseInt(contributorsResponse.headers.get('link').match(/page=(\d+)>; rel="last"/)?.[1] || '1')
      : 1;
    
    // Fetch recent commits
    const commitsResponse = await fetchFn(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=5`);
    const recentCommits = commitsResponse.ok ? await commitsResponse.json() : [];
    
    // Fetch issues count
    const issuesResponse = await fetchFn(`https://api.github.com/repos/${owner}/${repo}/issues?state=open&per_page=1`);
    const openIssuesCount = issuesResponse.headers.get('link') 
      ? parseInt(issuesResponse.headers.get('link').match(/page=(\d+)>; rel="last"/)?.[1] || '0')
      : 0;
    
    // Analyze the data
    const primaryLanguage = Object.keys(languages).reduce((a, b) => languages[a] > languages[b] ? a : b, 'Unknown');
    const totalCodeSize = Object.values(languages).reduce((sum, size) => sum + size, 0);
    
    const lastUpdated = new Date(repoData.updated_at);
    const daysSinceUpdate = Math.floor((new Date() - lastUpdated) / (1000 * 60 * 60 * 24));
    
    // Determine repository health
    let healthStatus = "Excellent";
    if (daysSinceUpdate > 365) healthStatus = "Inactive";
    else if (daysSinceUpdate > 180) healthStatus = "Stale";
    else if (daysSinceUpdate > 90) healthStatus = "Moderate";
    
    // Calculate activity level based on recent commits
    const activityLevel = recentCommits.length >= 3 ? "High" : recentCommits.length >= 1 ? "Moderate" : "Low";
    
    // Analyze README quality
    let readmeQuality = "Good";
    if (!repoData.has_wiki && !repoData.description) readmeQuality = "Basic";
    if (repoData.size < 1000) readmeQuality = "Minimal";
    
    return {
      repoName,
      analysisDate: new Date().toLocaleDateString(),
      basicAnalysis: {
        description: repoData.description || "No description provided",
        primaryLanguage,
        languages: Object.keys(languages).slice(0, 5), // Top 5 languages
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        watchers: repoData.watchers_count,
        size: `${(repoData.size / 1024).toFixed(1)} MB`,
        openIssues: openIssuesCount,
        contributors: contributorCount,
        createdAt: new Date(repoData.created_at).toLocaleDateString(),
        lastUpdated: lastUpdated.toLocaleDateString(),
        daysSinceUpdate,
        license: repoData.license?.name || "No license",
        isFork: repoData.fork,
        hasWiki: repoData.has_wiki,
        hasIssues: repoData.has_issues,
        hasProjects: repoData.has_projects,
        healthStatus,
        activityLevel,
        readmeQuality
      },
      technicalInsights: {
        totalLanguages: Object.keys(languages).length,
        languageDistribution: languages,
        recentActivity: recentCommits.length,
        defaultBranch: repoData.default_branch,
        archiveUrl: repoData.archive_url,
        cloneUrl: repoData.clone_url
      }
    };
    
  } catch (error) {
    console.error("GitHub API analysis error:", error);
    throw new Error(`Failed to analyze repository: ${error.message}`);
  }
};

// BASIC ANALYSIS ENDPOINT - Real GitHub API
app.post("/api/analyze/basic", async (req, res) => {
  try {
    const { repoUrl } = req.body;
    
    if (!repoUrl) {
      return res.status(400).json({ 
        status: "error", 
        error: "Repository URL required" 
      });
    }

    // Validate GitHub URL
    try {
      parseGitHubUrl(repoUrl);
    } catch (error) {
      return res.status(400).json({ 
        status: "error", 
        error: "Invalid GitHub repository URL" 
      });
    }

    console.log(`🔍 Starting basic analysis for: ${repoUrl}`);
    
    const analysisResult = await analyzeGitHubRepo(repoUrl);
    
    // Save analysis to database
    try {
      const analysis = new Analysis({
        repoUrl,
        repoName: analysisResult.repoName,
        analysisType: 'basic',
        analysisResult
      });
      await analysis.save();
      console.log("💾 Basic analysis saved to database");
    } catch (dbError) {
      console.error("❌ Failed to save analysis to database:", dbError);
    }

    res.json({
      status: "success",
      message: "Basic analysis completed successfully",
      data: analysisResult
    });

  } catch (error) {
    console.error("❌ Basic analysis error:", error);
    res.status(500).json({ 
      status: "error", 
      error: error.message 
    });
  }
});

// DEEPWIKI SUBMIT - No API keys required
app.post("/api/deepwiki/submit", async (req, res) => {
  try {
    console.log("📤 Received DeepWiki submission:", req.body);
    const { repoUrl, email } = req.body || {};
    
    if (!repoUrl || !email) {
      return res.status(400).json({ 
        status: "error", 
        error: "Repository URL and email required" 
      });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(email).toLowerCase())) {
      return res.status(400).json({ 
        status: "error", 
        error: "Invalid email format" 
      });
    }

    // Validate GitHub URL
    try {
      parseGitHubUrl(repoUrl);
    } catch (error) {
      return res.status(400).json({ 
        status: "error", 
        error: "Invalid GitHub repository URL" 
      });
    }

    let deepwikiPosted = false;
    let deepwikiResponse = null;
    let submissionError = null;

    try {
      // Option 1: If a direct endpoint is configured, use it
      if (process.env.DEEPWIKI_API_URL) {
        if (!fetchFn) {
          submissionError = "Server fetch capability not available";
          console.warn("⚠ Fetch function not available");
        } else {
          const targetUrl = process.env.DEEPWIKI_API_URL;
          console.log("🚀 Sending to DeepWiki endpoint:", targetUrl);
          const payload = {
            email: String(email).toLowerCase(),
            repoUrl,
            source: "algorythm",
            timestamp: new Date().toISOString(),
          };
          const response = await fetchFn(targetUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          console.log("📨 DeepWiki Response Status:", response.status);
          deepwikiResponse = { status: response.status, statusText: response.statusText };
          const responseBody = await response.text();
          deepwikiResponse.body = responseBody;
          if (response.ok) {
            deepwikiPosted = true;
            console.log("✅ Successfully submitted to DeepWiki endpoint");
          } else {
            submissionError = `DeepWiki endpoint returned ${response.status}: ${response.statusText}`;
            console.warn("❌ DeepWiki endpoint error:", submissionError);
          }
        }
      } else {
        // Option 2: Use real browser automation against deepwiki.com
        console.log("🌐 Launching headless browser for DeepWiki flow...");
        const browser = await puppeteer.launch({
          headless: "new",
          args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
            "--window-size=1280,800"
          ]
        });
        try {
          const page = await browser.newPage();
          await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
          await page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
          );
          page.setDefaultNavigationTimeout(60000);
          page.setDefaultTimeout(60000);
          await page.goto("https://deepwiki.com", { waitUntil: "domcontentloaded", timeout: 60000 });

          // First attempt: navigate directly to /owner/repo
          try {
            const { owner, repo } = parseGitHubUrl(repoUrl);
            const directUrl = `https://deepwiki.com/${owner}/${repo}`;
            console.log("🔎 Trying direct DeepWiki URL:", directUrl);
            await page.goto(directUrl, { waitUntil: "domcontentloaded", timeout: 60000 });
          } catch (_) {
            // ignore, will use search fallback
          }

          // Search for the repository if direct navigation fails
          console.log("🔍 Searching for repository on DeepWiki...");
          await page.type('input[name="q"]', repoUrl, { delay: 100 });
          await page.click('button[type="submit"]');
          await page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 60000 });

          // Check if the repository page is displayed
          const repoPageVisible = await page.evaluate(() => {
            return document.querySelector('h1.repo-title') !== null;
          });

          if (repoPageVisible) {
            console.log("✅ Repository page detected on DeepWiki");
            deepwikiPosted = true;
            req.deepwiki_url = page.url(); // Capture the final URL
          } else {
            console.warn("⚠ Repository page not found, submission may be delayed");
          }

        } catch (error) {
          submissionError = `DeepWiki request failed: ${error.message}`;
          console.error("❌ DeepWiki request failed:", error);
        } finally {
          await browser.close().catch(() => {});
        }
      }
    } catch (error) {
      submissionError = `DeepWiki request failed: ${error.message}`;
      console.error("❌ DeepWiki request failed:", error);
    }

    // Save to database if connected
    if (mongoose?.connection?.readyState === 1) {
      try {
        const analysis = new Analysis({
          repoUrl,
          repoName: parseGitHubUrl(repoUrl).owner + '/' + parseGitHubUrl(repoUrl).repo,
          analysisType: 'deep',
          analysisResult: {
            deepwikiPosted,
            deepwikiResponse,
            error: submissionError,
            email: String(email).toLowerCase(),
            deepwiki_url: req.deepwiki_url || null
          }
        });
        await analysis.save();
        console.log("💾 Deep analysis submission saved to database");
      } catch (dbError) {
        console.error("❌ Failed to save submission to database:", dbError);
      }
    }

    const responseMessage = deepwikiPosted 
      ? (req.deepwiki_url 
          ? "Deeper analysis page generated on DeepWiki. A link is provided in the response."
          : "Repository successfully submitted to DeepWiki for deeper analysis. You will receive the results via their service if configured.")
      : `Submission recorded. ${submissionError || "DeepWiki analysis may be delayed."}`;

    res.json({
      status: deepwikiPosted ? "success" : "partial_success",
      message: responseMessage,
      data: { 
        email: String(email).toLowerCase(), 
        repoUrl, 
        deepwiki_posted: deepwikiPosted,
        deepwiki_url: req.deepwiki_url || null,
        submitted_at: new Date().toISOString() 
      }
    });

  } catch (error) {
    console.error("💥 Unexpected error in /api/deepwiki/submit:", error);
    res.status(500).json({ 
      status: "error", 
      error: "Internal server error processing submission"
    });
  }
});

// Get analysis history
app.get("/api/analysis/history", async (req, res) => {
  try {
    const { repoUrl } = req.query;
    if (!repoUrl) {
      return res.status(400).json({ error: "Repository URL parameter required" });
    }

    const analyses = await Analysis.find({ 
      repoUrl 
    }).sort({ analyzedAt: -1 }).limit(10);

    res.json({ 
      status: "success", 
      analyses 
    });
  } catch (error) {
    console.error("Error fetching analysis history:", error);
    res.status(500).json({ error: "Failed to fetch analysis history" });
  }
});

// GitHub OAuth routes (unchanged)
app.get("/auth/github", (req, res, next) => {
  req.session.oauth_type = "login";
  passport.authenticate("github", { scope: ["user:email"] })(req, res, next);
});

app.get("/auth/github/repo", (req, res, next) => {
  req.session.oauth_type = "repo";
  passport.authenticate("github", { scope: ["user:email", "repo"] })(req, res, next);
});

app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "http://localhost:5173/login?error=auth_failed",
  }),
  (req, res) => {
    // Extract token and username from the user object
    const token = req.user.accessToken; // Ensure this is set correctly in your GitHub strategy
    const username = req.user.profile.username; // Ensure this is set correctly in your GitHub strategy
    res.redirect(`http://localhost:5173/login-callback?login_token=${token}&login_username=${username}`);
  }
);

// Streak endpoints (unchanged)
app.get("/api/streaks/:name", async (req, res) => {
  try {
    const user = await StreakUser.findOne({ name: req.params.name });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/streaks/:name", async (req, res) => {
  try {
    const { streakType } = req.body;
    const user = await StreakUser.findOneAndUpdate(
      { name: req.params.name }, 
      { $inc: { [streakType]: 1 } }, 
      { new: true, upsert: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.startsWith("/auth/") || req.path.startsWith("/deepwiki-demo")) {
    return res.status(404).send("Not found");
  }
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// Remove these endpoints from server.js:
// - POST /api/deepwiki/submit
// - Any mock DeepWiki endpoints

// Keep only the basic analysis endpoint
app.post("/api/analyze/basic", async (req, res) => {
    try {
        const { repoUrl } = req.body;
        
        if (!repoUrl) {
            return res.status(400).json({ 
                status: "error", 
                error: "Repository URL required" 
            });
        }

        // Validate GitHub URL
        try {
            parseGitHubUrl(repoUrl);
        } catch (error) {
            return res.status(400).json({ 
                status: "error", 
                error: "Invalid GitHub repository URL" 
            });
        }

        console.log(`🔍 Starting basic analysis for: ${repoUrl}`);
        
        const analysisResult = await analyzeGitHubRepo(repoUrl);
        
        // Save analysis to database
        try {
            const analysis = new Analysis({
                repoUrl,
                repoName: analysisResult.repoName,
                analysisType: 'basic',
                analysisResult
            });
            await analysis.save();
            console.log("💾 Basic analysis saved to database");
        } catch (dbError) {
            console.error("❌ Failed to save analysis to database:", dbError);
        }

        res.json({
            status: "success",
            message: "Basic analysis completed successfully",
            data: analysisResult
        });

    } catch (error) {
        console.error("❌ Basic analysis error:", error);
        res.status(500).json({ 
            status: "error", 
            error: error.message 
        });
    }
});
  

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 AlgoRythm backend running on http://localhost:${PORT}`);
  console.log(`🔍 Real GitHub analysis enabled`);
});