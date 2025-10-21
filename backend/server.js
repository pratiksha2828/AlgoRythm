import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from 'mongoose';

dotenv.config();

const app = express();

// Allow frontend to call backend in dev mode
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5000"],
    credentials: true,
  })
);

// JSON body parsing for API routes
app.use(express.json());

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

// Single GitHub Strategy with ONE callback URL
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/github/callback", // ONLY ONE CALLBACK URL
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
  res.send("Backend + Frontend running with GitHub OAuth");
});
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB error", err);
    process.exit(1);
  }
};

// -------------------- STREAK SCHEMA --------------------
const streakSchema = new mongoose.Schema({
  name: String,
  learningStreak: { type: Number, default: 0 },
  tracingStreak: { type: Number, default: 0 },
  testStreak: { type: Number, default: 0 },
  projectsStreak: { type: Number, default: 0 },
});
const StreakUser = mongoose.model("StreakUser", streakSchema);

// Analyze a GitHub repository via DeepWiki-open (placeholder integration)
// Expects JSON: { repoUrl: string }
app.post("/api/deepwiki/analyze", async (req, res) => {
  try {
    const { repoUrl } = req.body || {};
    if (!repoUrl || typeof repoUrl !== "string") {
      return res.status(400).json({ error: "repoUrl is required" });
    }

    // Parse owner/repo from GitHub URL
    // Supports URLs like: https://github.com/owner/repo or https://github.com/owner/repo.git
    const match = repoUrl.match(/github\.com\/(.+?)\/(.+?)(?:\.git|$|\/)\/?/i);
    if (!match) {
      return res.status(400).json({ error: "Invalid GitHub repository URL" });
    }
    const owner = match[1];
    const repo = match[2];

    // Pull optional token for higher API limits if user logged in before
    const token = req.user?.accessToken;

    // Fetch repo metadata
    const base = `https://api.github.com/repos/${owner}/${repo}`;
    const headers = token ? { Authorization: `token ${token}`, Accept: "application/vnd.github.v3+json" } : { Accept: "application/vnd.github.v3+json" };

    const repoResp = await fetch(base, { headers });
    if (!repoResp.ok) {
      const msg = await repoResp.text();
      return res.status(repoResp.status).json({ error: `Failed to fetch repo: ${msg}` });
    }
    const repoInfo = await repoResp.json();

    // Utilities for content traversal
    const decodeB64 = (b64) => Buffer.from(b64, 'base64').toString('utf8');
    const isTextual = (name) => /\.(js|jsx|ts|tsx|json|md|py|rb|java|go|rs|php|c|cc|cpp|h|cs|yml|yaml|toml|ini|env|sh|txt|html|css|scss|mdx)$/i.test(name) || name.toLowerCase() === 'dockerfile';
    const detectLang = (name) => {
      const lower = name.toLowerCase();
      if (/(\.js|\.jsx)$/.test(lower)) return 'JavaScript';
      if (/(\.ts|\.tsx)$/.test(lower)) return 'TypeScript';
      if (lower.endsWith('.py')) return 'Python';
      if (lower.endsWith('.md')) return 'Markdown';
      if (lower.endsWith('.json')) return 'JSON';
      if (lower.endsWith('.rb')) return 'Ruby';
      if (/(\.java)$/.test(lower)) return 'Java';
      if (/(\.go)$/.test(lower)) return 'Go';
      if (/(\.rs)$/.test(lower)) return 'Rust';
      if (/(\.php)$/.test(lower)) return 'PHP';
      if (/(\.c|\.cc|\.cpp|\.h)$/.test(lower)) return 'C/C++';
      if (/(\.cs)$/.test(lower)) return 'C#';
      if (/(\.yml|\.yaml)$/.test(lower)) return 'YAML';
      if (/(\.html)$/.test(lower)) return 'HTML';
      if (/(\.css|\.scss)$/.test(lower)) return 'CSS';
      if (lower === 'dockerfile') return 'Dockerfile';
      return 'Text/Other';
    };
    const quickExplain = (name, type) => {
      const lower = name.toLowerCase();
      if (type === 'dir') {
        if (lower === 'src') return 'Main source code directory containing application modules.';
        if (lower === 'test' || lower === 'tests') return 'Automated tests validating project behavior.';
        if (lower.includes('doc')) return 'Documentation and guides for the project.';
        return 'Directory grouping related code or assets.';
      }
      if (lower.startsWith('readme')) return 'Project overview, usage, and setup instructions.';
      if (lower === 'package.json') return 'Node project manifest with scripts and dependencies.';
      if (lower === 'requirements.txt') return 'Python dependencies list.';
      if (lower === 'pyproject.toml') return 'Python project configuration and build system.';
      if (lower === '.gitignore') return 'Files and paths ignored by Git.';
      if (lower.endsWith('.md')) return 'Markdown documentation or notes.';
      if (lower.endsWith('dockerfile') || lower === 'dockerfile') return 'Docker build instructions for containerizing the app.';
      if (/(\.yml|\.yaml)$/.test(lower)) return 'YAML configuration, CI/CD or service definitions.';
      return 'Source or config file used by the project.';
    };

    const analyzeFileContent = (path, name, content, size) => {
      const lower = name.toLowerCase();
      const lines = content.split(/\r?\n/);
      const nonEmptyLines = lines.filter(l => l.trim().length > 0);
      
      // Analyze README files
      if (lower.startsWith('readme')) {
        const headings = lines.filter(l => /^#+\s+/.test(l)).map(h => h.replace(/^#+\s+/, ''));
        const hasInstall = /install|setup|getting started/i.test(content);
        const hasUsage = /usage|how to use|example/i.test(content);
        const hasApi = /api|endpoint|route/i.test(content);
        const hasConfig = /config|configuration|env/i.test(content);
        
        let explanation = `📖 README file containing project documentation. `;
        if (headings.length > 0) explanation += `Main sections: ${headings.slice(0, 3).join(', ')}. `;
        if (hasInstall) explanation += `Includes installation instructions. `;
        if (hasUsage) explanation += `Contains usage examples. `;
        if (hasApi) explanation += `Documents API endpoints. `;
        if (hasConfig) explanation += `Explains configuration options. `;
        return explanation.trim();
      }
      
      // Analyze Python files
      if (lower.endsWith('.py')) {
        const imports = lines.filter(l => l.trim().startsWith('import ') || l.trim().startsWith('from '));
        const functions = lines.filter(l => /^def\s+\w+/.test(l));
        const classes = lines.filter(l => /^class\s+\w+/.test(l));
        const hasFlask = /flask|Flask/.test(content);
        const hasDjango = /django|Django/.test(content);
        const hasFastAPI = /fastapi|FastAPI/.test(content);
        const hasPandas = /pandas|pd\./.test(content);
        const hasNumpy = /numpy|np\./.test(content);
        const hasRequests = /requests/.test(content);
        
        let explanation = `🐍 Python file (${lines.length} lines). `;
        if (hasFlask) explanation += `Flask web application. `;
        else if (hasDjango) explanation += `Django web framework. `;
        else if (hasFastAPI) explanation += `FastAPI web framework. `;
        else if (hasPandas) explanation += `Data analysis with Pandas. `;
        else if (hasNumpy) explanation += `Numerical computing with NumPy. `;
        else if (hasRequests) explanation += `HTTP requests handling. `;
        
        if (functions.length > 0) explanation += `${functions.length} function(s) defined. `;
        if (classes.length > 0) explanation += `${classes.length} class(es) defined. `;
        if (imports.length > 0) explanation += `Imports: ${imports.slice(0, 3).map(i => i.trim().split(' ')[1] || i.trim().split(' ')[0]).join(', ')}. `;
        return explanation.trim();
      }
      
      // Analyze HTML files
      if (lower.endsWith('.html')) {
        const hasTitle = /<title>/.test(content);
        const hasHead = /<head>/.test(content);
        const hasBody = /<body>/.test(content);
        const hasScript = /<script/.test(content);
        const hasStyle = /<style/.test(content);
        const hasForm = /<form/.test(content);
        const hasInput = /<input/.test(content);
        const hasDiv = /<div/.test(content);
        const hasNav = /<nav/.test(content);
        const hasHeader = /<header/.test(content);
        const hasFooter = /<footer/.test(content);
        
        let explanation = `🌐 HTML file (${lines.length} lines). `;
        if (hasTitle) explanation += `Has page title. `;
        if (hasForm) explanation += `Contains form(s). `;
        if (hasScript) explanation += `Includes JavaScript. `;
        if (hasStyle) explanation += `Has embedded CSS. `;
        if (hasNav) explanation += `Has navigation. `;
        if (hasHeader) explanation += `Has header section. `;
        if (hasFooter) explanation += `Has footer section. `;
        if (hasInput) explanation += `Contains input fields. `;
        return explanation.trim();
      }
      
      // Analyze JavaScript files
      if (lower.endsWith('.js') || lower.endsWith('.jsx')) {
        const functions = lines.filter(l => /function\s+\w+/.test(l) || /const\s+\w+\s*=\s*\(/.test(l) || /let\s+\w+\s*=\s*\(/.test(l));
        const classes = lines.filter(l => /class\s+\w+/.test(l));
        const imports = lines.filter(l => /^import\s+/.test(l));
        const exports = lines.filter(l => /export\s+/.test(l));
        const hasReact = /react|React/.test(content);
        const hasVue = /vue|Vue/.test(content);
        const hasAngular = /angular|Angular/.test(content);
        const hasNode = /require\(|module\.exports/.test(content);
        const hasJQuery = /\$\(/.test(content);
        
        let explanation = `⚡ JavaScript file (${lines.length} lines). `;
        if (hasReact) explanation += `React component/library. `;
        else if (hasVue) explanation += `Vue.js application. `;
        else if (hasAngular) explanation += `Angular application. `;
        else if (hasNode) explanation += `Node.js backend code. `;
        else if (hasJQuery) explanation += `jQuery-based code. `;
        
        if (functions.length > 0) explanation += `${functions.length} function(s) defined. `;
        if (classes.length > 0) explanation += `${classes.length} class(es) defined. `;
        if (imports.length > 0) explanation += `Imports: ${imports.slice(0, 3).map(i => i.split(' ')[1] || i.split(' ')[0]).join(', ')}. `;
        if (exports.length > 0) explanation += `Exports ${exports.length} item(s). `;
        return explanation.trim();
      }
      
      // Analyze CSS files
      if (lower.endsWith('.css') || lower.endsWith('.scss')) {
        const selectors = lines.filter(l => /^[.#]?\w+/.test(l.trim()) && l.includes('{'));
        const mediaQueries = lines.filter(l => /@media/.test(l));
        const keyframes = lines.filter(l => /@keyframes/.test(l));
        const imports = lines.filter(l => /@import/.test(l));
        
        let explanation = `🎨 CSS file (${lines.length} lines). `;
        if (selectors.length > 0) explanation += `${selectors.length} CSS rule(s). `;
        if (mediaQueries.length > 0) explanation += `Responsive design with ${mediaQueries.length} media query(ies). `;
        if (keyframes.length > 0) explanation += `Contains ${keyframes.length} animation(s). `;
        if (imports.length > 0) explanation += `Imports ${imports.length} other stylesheet(s). `;
        return explanation.trim();
      }
      
      // Analyze JSON files
      if (lower.endsWith('.json')) {
        try {
          const parsed = JSON.parse(content);
          let explanation = `📄 JSON file. `;
          if (parsed.name) explanation += `Project: ${parsed.name}. `;
          if (parsed.version) explanation += `Version: ${parsed.version}. `;
          if (parsed.scripts) explanation += `Contains ${Object.keys(parsed.scripts).length} script(s). `;
          if (parsed.dependencies) explanation += `Has ${Object.keys(parsed.dependencies).length} dependency(ies). `;
          if (parsed.devDependencies) explanation += `Has ${Object.keys(parsed.devDependencies).length} dev dependency(ies). `;
          return explanation.trim();
        } catch {
          return `📄 JSON file (${lines.length} lines).`;
        }
      }
      
      // Analyze YAML files
      if (lower.endsWith('.yml') || lower.endsWith('.yaml')) {
        const hasDocker = /docker|image|container/i.test(content);
        const hasK8s = /kubernetes|k8s|apiVersion/i.test(content);
        const hasCI = /github|actions|workflow|pipeline/i.test(content);
        const hasConfig = /config|setting|environment/i.test(content);
        
        let explanation = `⚙️ YAML file (${lines.length} lines). `;
        if (hasDocker) explanation += `Docker configuration. `;
        else if (hasK8s) explanation += `Kubernetes configuration. `;
        else if (hasCI) explanation += `CI/CD pipeline configuration. `;
        else if (hasConfig) explanation += `Application configuration. `;
        return explanation.trim();
      }
      
      // Default for other files
      return `📁 ${detectLang(name)} file (${lines.length} lines, ${size} bytes).`;
    };
    const extractImports = (content) => {
      const imports = [];
      const re1 = /import\s+[^'"\n]+from\s+['\"]([^'\"]+)['\"]/g; // ES modules
      const re2 = /require\(\s*['\"]([^'\"]+)['\"]\s*\)/g; // CommonJS
      let m;
      while ((m = re1.exec(content))) imports.push(m[1]);
      while ((m = re2.exec(content))) imports.push(m[1]);
      return imports.filter(s => s.startsWith('.') || /^[a-z0-9@_-]+/i.test(s));
    };

    // Comprehensive analysis functions
    const detectArchitectureType = (files) => {
      const hasReact = files.some(f => f.language === 'JavaScript' && f.summary?.includes('React'));
      const hasVue = files.some(f => f.language === 'JavaScript' && f.summary?.includes('Vue'));
      const hasAngular = files.some(f => f.language === 'JavaScript' && f.summary?.includes('Angular'));
      const hasExpress = files.some(f => f.summary?.includes('Express'));
      const hasFlask = files.some(f => f.summary?.includes('Flask'));
      const hasDjango = files.some(f => f.summary?.includes('Django'));
      const hasFastAPI = files.some(f => f.summary?.includes('FastAPI'));
      const hasSpring = files.some(f => f.summary?.includes('Spring'));
      const hasMVC = files.some(f => f.path.includes('controller') || f.path.includes('model') || f.path.includes('view'));
      const hasMicroservices = files.some(f => f.path.includes('service') || f.path.includes('api'));
      
      if (hasReact || hasVue || hasAngular) return 'Single Page Application (SPA)';
      if (hasExpress || hasFlask || hasDjango || hasFastAPI) return 'Web Application';
      if (hasSpring) return 'Enterprise Java Application';
      if (hasMVC) return 'MVC Architecture';
      if (hasMicroservices) return 'Microservices Architecture';
      return 'Traditional Web Application';
    };

    const detectDesignPatterns = (files) => {
      const patterns = [];
      const hasSingleton = files.some(f => f.summary?.includes('singleton') || f.summary?.includes('getInstance'));
      const hasObserver = files.some(f => f.summary?.includes('observer') || f.summary?.includes('subscribe'));
      const hasFactory = files.some(f => f.summary?.includes('factory') || f.summary?.includes('create'));
      const hasRepository = files.some(f => f.path.includes('repository') || f.summary?.includes('repository'));
      const hasService = files.some(f => f.path.includes('service') || f.summary?.includes('service'));
      const hasController = files.some(f => f.path.includes('controller') || f.summary?.includes('controller'));
      
      if (hasSingleton) patterns.push('Singleton');
      if (hasObserver) patterns.push('Observer');
      if (hasFactory) patterns.push('Factory');
      if (hasRepository) patterns.push('Repository');
      if (hasService) patterns.push('Service Layer');
      if (hasController) patterns.push('MVC Controller');
      
      return patterns.length > 0 ? patterns : ['No clear patterns detected'];
    };

    const detectFrameworks = (files) => {
      const frameworks = [];
      const hasReact = files.some(f => f.summary?.includes('React'));
      const hasVue = files.some(f => f.summary?.includes('Vue'));
      const hasAngular = files.some(f => f.summary?.includes('Angular'));
      const hasExpress = files.some(f => f.summary?.includes('Express'));
      const hasFlask = files.some(f => f.summary?.includes('Flask'));
      const hasDjango = files.some(f => f.summary?.includes('Django'));
      const hasFastAPI = files.some(f => f.summary?.includes('FastAPI'));
      const hasSpring = files.some(f => f.summary?.includes('Spring'));
      const hasBootstrap = files.some(f => f.summary?.includes('Bootstrap'));
      const hasTailwind = files.some(f => f.summary?.includes('Tailwind'));
      
      if (hasReact) frameworks.push('React');
      if (hasVue) frameworks.push('Vue.js');
      if (hasAngular) frameworks.push('Angular');
      if (hasExpress) frameworks.push('Express.js');
      if (hasFlask) frameworks.push('Flask');
      if (hasDjango) frameworks.push('Django');
      if (hasFastAPI) frameworks.push('FastAPI');
      if (hasSpring) frameworks.push('Spring Boot');
      if (hasBootstrap) frameworks.push('Bootstrap');
      if (hasTailwind) frameworks.push('Tailwind CSS');
      
      return frameworks.length > 0 ? frameworks : ['No major frameworks detected'];
    };

    const detectDatabase = (files) => {
      const hasMongo = files.some(f => f.summary?.includes('MongoDB') || f.summary?.includes('mongoose'));
      const hasMySQL = files.some(f => f.summary?.includes('MySQL') || f.summary?.includes('mysql'));
      const hasPostgres = files.some(f => f.summary?.includes('PostgreSQL') || f.summary?.includes('postgres'));
      const hasSQLite = files.some(f => f.summary?.includes('SQLite') || f.summary?.includes('sqlite'));
      const hasRedis = files.some(f => f.summary?.includes('Redis'));
      
      if (hasMongo) return 'MongoDB';
      if (hasMySQL) return 'MySQL';
      if (hasPostgres) return 'PostgreSQL';
      if (hasSQLite) return 'SQLite';
      if (hasRedis) return 'Redis';
      return 'No database detected';
    };

    const detectAPI = (files) => {
      const hasREST = files.some(f => f.summary?.includes('REST') || f.summary?.includes('API'));
      const hasGraphQL = files.some(f => f.summary?.includes('GraphQL'));
      const hasWebSocket = files.some(f => f.summary?.includes('WebSocket') || f.summary?.includes('socket'));
      const hasRPC = files.some(f => f.summary?.includes('RPC') || f.summary?.includes('gRPC'));
      
      const apis = [];
      if (hasREST) apis.push('REST API');
      if (hasGraphQL) apis.push('GraphQL');
      if (hasWebSocket) apis.push('WebSocket');
      if (hasRPC) apis.push('RPC/gRPC');
      
      return apis.length > 0 ? apis : ['No API patterns detected'];
    };

    const analyzeComplexity = (files) => {
      const codeFiles = files.filter(f => f.type === 'file' && f.language && f.language !== 'Markdown');
      const totalLines = codeFiles.reduce((sum, f) => sum + (f.summary?.split('\n').length || 0), 0);
      const avgLines = totalLines / codeFiles.length || 0;
      
      let complexity = 'Low';
      if (avgLines > 200) complexity = 'High';
      else if (avgLines > 100) complexity = 'Medium';
      
      return {
        level: complexity,
        averageLinesPerFile: Math.round(avgLines),
        totalFiles: codeFiles.length,
        totalLines
      };
    };

    const analyzeMaintainability = (files) => {
      const hasTests = files.some(f => f.path.includes('test') || f.path.includes('spec'));
      const hasDocs = files.some(f => f.name.toLowerCase().includes('readme') || f.name.toLowerCase().includes('doc'));
      const hasLinting = files.some(f => f.name.includes('.eslintrc') || f.name.includes('.prettierrc'));
      const hasCI = files.some(f => f.name.includes('github') || f.name.includes('workflow'));
      
      const score = [hasTests, hasDocs, hasLinting, hasCI].filter(Boolean).length;
      let level = 'Poor';
      if (score >= 3) level = 'Good';
      else if (score >= 2) level = 'Fair';
      
      return {
        level,
        score: `${score}/4`,
        hasTests, hasDocs, hasLinting, hasCI
      };
    };

    const analyzeTestCoverage = (files) => {
      const testFiles = files.filter(f => f.path.includes('test') || f.path.includes('spec') || f.name.includes('test'));
      const codeFiles = files.filter(f => f.type === 'file' && f.language && f.language !== 'Markdown');
      const coverage = testFiles.length / codeFiles.length || 0;
      
      let level = 'None';
      if (coverage > 0.5) level = 'High';
      else if (coverage > 0.2) level = 'Medium';
      else if (coverage > 0) level = 'Low';
      
      return {
        level,
        percentage: Math.round(coverage * 100),
        testFiles: testFiles.length,
        codeFiles: codeFiles.length
      };
    };

    const analyzeSecurity = (files) => {
      const hasHTTPS = files.some(f => f.summary?.includes('https') || f.summary?.includes('ssl'));
      const hasAuth = files.some(f => f.summary?.includes('auth') || f.summary?.includes('jwt') || f.summary?.includes('oauth'));
      const hasCORS = files.some(f => f.summary?.includes('cors'));
      const hasValidation = files.some(f => f.summary?.includes('validate') || f.summary?.includes('sanitize'));
      
      const score = [hasHTTPS, hasAuth, hasCORS, hasValidation].filter(Boolean).length;
      let level = 'Poor';
      if (score >= 3) level = 'Good';
      else if (score >= 2) level = 'Fair';
      
      return {
        level,
        score: `${score}/4`,
        hasHTTPS, hasAuth, hasCORS, hasValidation
      };
    };

    const generateInsights = (files, repoInfo) => {
      const insights = [];
      
      // Project size insights
      const totalFiles = files.filter(f => f.type === 'file').length;
      if (totalFiles < 10) insights.push('Small project - good for learning and quick prototyping');
      else if (totalFiles < 50) insights.push('Medium-sized project - well-structured for development');
      else insights.push('Large project - complex architecture with multiple components');
      
      // Language insights
      const languages = [...new Set(files.filter(f => f.language).map(f => f.language))];
      if (languages.length === 1) insights.push(`Single-language project using ${languages[0]} - focused and maintainable`);
      else insights.push(`Multi-language project using ${languages.join(', ')} - diverse technology stack`);
      
      // Framework insights
      const hasReact = files.some(f => f.summary?.includes('React'));
      const hasFlask = files.some(f => f.summary?.includes('Flask'));
      if (hasReact && hasFlask) insights.push('Full-stack application with React frontend and Flask backend');
      
      // Database insights
      const hasDB = files.some(f => f.summary?.includes('database') || f.summary?.includes('db'));
      if (hasDB) insights.push('Database integration detected - likely a data-driven application');
      
      return insights;
    };

    const generateRecommendations = (files, repoInfo) => {
      const recommendations = [];
      
      // Test coverage recommendations
      const testFiles = files.filter(f => f.path.includes('test') || f.path.includes('spec'));
      if (testFiles.length === 0) {
        recommendations.push('Add unit tests to improve code reliability and maintainability');
      }
      
      // Documentation recommendations
      const hasReadme = files.some(f => f.name.toLowerCase().includes('readme'));
      if (!hasReadme) {
        recommendations.push('Add a comprehensive README.md with setup and usage instructions');
      }
      
      // Security recommendations
      const hasAuth = files.some(f => f.summary?.includes('auth') || f.summary?.includes('jwt'));
      if (!hasAuth && files.some(f => f.summary?.includes('API'))) {
        recommendations.push('Consider adding authentication and authorization for API endpoints');
      }
      
      // Code quality recommendations
      const hasLinting = files.some(f => f.name.includes('.eslintrc') || f.name.includes('.prettierrc'));
      if (!hasLinting) {
        recommendations.push('Add code linting and formatting tools (ESLint, Prettier) for consistent code style');
      }
      
      return recommendations;
    };

    const limits = { maxDepth: 3, maxFiles: 500, maxBytesPerFile: 80000 };
    let fileCount = 0;
    const filesDetailed = [];
    const edges = [];
    const pathIndex = new Set();

    const listPath = async (path = '') => {
      const url = path ? `${base}/contents/${encodeURIComponent(path)}` : `${base}/contents`;
      const r = await fetch(url, { headers });
      if (!r.ok) return [];
      return await r.json();
    };

    const summarizeContent = (path, name, raw) => {
      const lang = detectLang(name);
      const lines = raw.split(/\r?\n/);
      const firstNonEmpty = lines.find(l => l.trim().length > 0) || '';
      let gist = firstNonEmpty.slice(0, 200);
      if (/readme/i.test(name)) {
        // Prefer first heading
        const heading = lines.find(l => /^#\s+/.test(l));
        if (heading) gist = heading.replace(/^#\s+/, '').slice(0, 200);
      }
      
      // Get detailed explanation
      const detailedExplanation = analyzeFileContent(path, name, raw, raw.length);
      
      return {
        language: lang,
        summary: gist || 'Text file',
        imports: extractImports(raw),
        detailedExplanation: detailedExplanation
      };
    };

    const walk = async (dir = '', depth = 0) => {
      if (depth > limits.maxDepth) return;
      const items = await listPath(dir);
      if (!Array.isArray(items)) return;
      for (const item of items) {
        if (fileCount >= limits.maxFiles) break;
        const node = {
          path: item.path,
          name: item.name,
          type: item.type,
          size: item.size,
          explanation: quickExplain(item.name, item.type)
        };
        if (item.type === 'dir') {
          filesDetailed.push(node);
          await walk(item.path, depth + 1);
        } else if (item.type === 'file') {
          fileCount++;
          pathIndex.add(item.path);
          if (isTextual(item.name) && item.size <= limits.maxBytesPerFile && item.download_url) {
            try {
              const rr = await fetch(item.download_url, { headers });
              if (rr.ok) {
                const raw = await rr.text();
                const info = summarizeContent(item.path, item.name, raw);
                filesDetailed.push({ 
                  ...node, 
                  language: info.language, 
                  summary: info.summary,
                  detailedExplanation: info.detailedExplanation
                });
                // Build edges for relationships (relative imports only)
                for (const imp of info.imports) {
                  edges.push({ from: item.path, to: imp });
                }
              } else {
                filesDetailed.push(node);
              }
            } catch {
              filesDetailed.push(node);
            }
          } else {
            filesDetailed.push(node);
          }
        }
      }
    };

    await walk('', 0);

    // Comprehensive analysis - no external service needed
    const comprehensiveAnalysis = {
      architecture: {
        type: detectArchitectureType(filesDetailed),
        patterns: detectDesignPatterns(filesDetailed),
        frameworks: detectFrameworks(filesDetailed),
        database: detectDatabase(filesDetailed),
        api: detectAPI(filesDetailed)
      },
      codeQuality: {
        complexity: analyzeComplexity(filesDetailed),
        maintainability: analyzeMaintainability(filesDetailed),
        testCoverage: analyzeTestCoverage(filesDetailed),
        security: analyzeSecurity(filesDetailed)
      },
      insights: generateInsights(filesDetailed, repoInfo),
      recommendations: generateRecommendations(filesDetailed, repoInfo)
    };

    // Optional DeepWiki-open hook (if you want to add external service later)
    let deepwiki = null;
    if (process.env.DEEPWIKI_URL) {
      try {
        const sampleFiles = filesDetailed
          .filter(f => f.type === 'file' && typeof f.summary === 'string')
          .slice(0, 30)
          .map(f => ({ path: f.path, summary: f.summary, language: f.language }));

        const payload = {
          owner, repo, repoUrl,
          repoInfo: {
            description: repoInfo.description,
            language: repoInfo.language,
            stars: repoInfo.stargazers_count,
            forks: repoInfo.forks_count
          },
          modules, relationships: edges.slice(0, 500), files: sampleFiles
        };

        const hook = await fetch(process.env.DEEPWIKI_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (hook.ok) {
          deepwiki = await hook.json();
        }
      } catch (e) {
        // ignore errors; optional enhancement
      }
    }

    // High-level modules (top-level directories)
    const modules = filesDetailed
      .filter(f => f.type === 'dir' && !f.path.includes('/'))
      .map(d => ({ name: d.name, description: d.explanation }));

    // Resolve relative import edges to best-guess repository paths
    const resolvedEdges = edges.map(e => {
      if (!e.to.startsWith('.')) return { ...e, resolvedTo: null };
      // naive resolution: current file dir + relative import without extension
      const fromDir = e.from.split('/').slice(0, -1).join('/');
      const base = e.to.replace(/^\.\//, '');
      const candidates = [
        `${fromDir}/${base}.js`, `${fromDir}/${base}.ts`, `${fromDir}/${base}.jsx`, `${fromDir}/${base}.tsx`,
        `${fromDir}/${base}/index.js`, `${fromDir}/${base}/index.ts`, `${fromDir}/${base}/index.jsx`, `${fromDir}/${base}/index.tsx`,
        `${fromDir}/${base}.json`, `${fromDir}/${base}.mjs`, `${fromDir}/${base}.cjs`
      ];
      const hit = candidates.find(p => pathIndex.has(p)) || null;
      return { ...e, resolvedTo: hit };
    });

    const summary = {
      title: `Comprehensive Analysis: ${repoInfo.full_name}`,
      repoUrl,
      findings: [
        repoInfo.description ? `Description: ${repoInfo.description}` : "No description provided",
        `Primary language: ${repoInfo.language || 'unknown'}`,
        `Stars: ${repoInfo.stargazers_count} • Forks: ${repoInfo.forks_count}`,
        `Files analyzed: ${filesDetailed.length} (depth ≤ ${limits.maxDepth})`,
        `Architecture: ${comprehensiveAnalysis.architecture.type}`,
        `Frameworks: ${comprehensiveAnalysis.architecture.frameworks.join(', ')}`,
        `Database: ${comprehensiveAnalysis.architecture.database}`
      ],
      modules,
      files: filesDetailed,
      relationships: resolvedEdges,
      comprehensiveAnalysis,
      deepwiki,
      nextSteps: [
        "✅ Comprehensive analysis completed with architecture detection",
        "✅ Increased recursion depth and file size limits",
        "✅ Mapped import edges to actual repository paths",
        "✅ Generated insights and recommendations"
      ],
    };

    return res.json({ status: "ok", summary });
  } catch (err) {
    console.error("/api/deepwiki/analyze error", err);
    return res.status(500).json({ error: "Failed to analyze repository" });
  }
});

// ========== LOGIN OAuth Routes ==========
app.get("/auth/github", (req, res, next) => {
  // Store that this is a login request
  req.session.oauth_type = 'login';
  passport.authenticate("github", { scope: ["user:email"] })(req, res, next);
});

// ========== REPOSITORY OAuth Routes ==========
app.get('/auth/github/repo', (req, res, next) => {
  // Store that this is a repo request
  req.session.oauth_type = 'repo';
  passport.authenticate("github", { scope: ["user:email", "repo"] })(req, res, next);
});

// SINGLE CALLBACK HANDLER FOR BOTH TYPES
app.get(
  "/auth/github/callback",
  passport.authenticate("github", { 
    failureRedirect: "http://localhost:5173/login?error=auth_failed" 
  }),
  (req, res) => {
    const token = req.user.accessToken;
    const username = req.user.profile.username;
    const oauthType = req.session.oauth_type || 'login';

    // Clear the session type
    req.session.oauth_type = null;

    // Redirect based on OAuth type
    if (oauthType === 'repo') {
      res.redirect(`http://localhost:5173/projects/learn-projects?repo_token=${token}&repo_username=${username}`);
    } else {
      // Default to login
      res.redirect(`http://localhost:5173/login-callback?login_token=${token}&login_username=${username}`);
    }
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
    res.redirect("http://localhost:5000/");
  });
});

// ---- Serve frontend build ----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// ---- START SERVER ----
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`AlgoRythm running on http://localhost:${PORT}`));