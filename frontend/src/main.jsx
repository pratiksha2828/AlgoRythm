import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Main app
import App from './App'

// Roadmap Pages
import RoadmapFilter from './RoadmapFilter'
import RoadmapResult from './RoadmapResult'

// Learning Pages
import Learn from './Learn'
import LearnFilter from './LearnFilter'
import HTMLCourse from './HTMLCourse'
import JSCourse from './JSCourse'
import PythonCourse from './PythonCourse'
import GitCourse from './GitCourse'
import WebDevelopmentPath from './WebDevelopmentPath'
import DataSciencePath from './DataSciencePath'
import MobileDevelopmentPath from './MobileDevelopmentPath'

// Tracing Pages
import TraceFilter from './TraceFilter'
import TraceCoding from './TraceCoding'
import TraceAlgorithms from './TraceAlgorithms'

// Projects & Refactor Pages
import ProjectsFilter from './ProjectsFilter'
import BuildProjects from './BuildProjects'
import LearnProjects from './LearnProjects'
import ProjectsChoice from './ProjectsChoice'
import RefactorCode from './RefactorCode'

// Tests
import CreateTest from './CreateTest'
import CreateTestFinal from './CreateTestFinal'
import TestInterface from './TestInterface'

// GitHub Login & Repos (DeepWiki integration)
import LoginCallback from './LoginCallback'
import RepositoriesList from './RepositoriesList'

// Other Pages
import Streaks from './streaks'
import News from './News'

// Global styles
import './index.css'
import './app.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Home */}
        <Route path="/" element={<App />} />

        {/* Auth & GitHub */}
        <Route path="/login-callback" element={<LoginCallback />} />
        <Route path="/learn/projects/repos" element={<RepositoriesList />} />

        {/* Roadmaps */}
        <Route path="/roadmap-filter" element={<RoadmapFilter />} />
        <Route path="/roadmap-result" element={<RoadmapResult />} />

        {/* Learning */}
        <Route path="/learn-filter" element={<LearnFilter />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/learn/html-css-fundamentals" element={<HTMLCourse />} />
        <Route path="/learn/javascript-basics" element={<JSCourse />} />
        <Route path="/learn/python-for-everyone" element={<PythonCourse />} />
        <Route path="/learn/git-github-essentials" element={<GitCourse />} />
        <Route path="/learn/web-development" element={<WebDevelopmentPath />} />
        <Route path="/learn/data-science" element={<DataSciencePath />} />
        <Route path="/learn/mobile-development" element={<MobileDevelopmentPath />} />

        {/* Tracing */}
        <Route path="/trace" element={<TraceFilter />} />
        <Route path="/trace/coding" element={<TraceCoding />} />
        <Route path="/trace/algorithms" element={<TraceAlgorithms />} />

        {/* Projects */}
        <Route path="/projects" element={<ProjectsFilter />} />
        <Route path="/projects/build-projects" element={<BuildProjects />} />
        <Route path="/projects/learn-projects" element={<LearnProjects />} />
        <Route path="/projects-choice" element={<ProjectsChoice />} />

        {/* Refactor */}
        <Route path="/refactor" element={<RefactorCode />} />

        {/* Test Creation */}
        <Route path="/create-test" element={<CreateTest />} />
        <Route path="/create-test-final" element={<CreateTestFinal />} />
        <Route path="/test-interface" element={<TestInterface />} />

        {/* Streaks & News */}
        <Route path="/streaks" element={<Streaks />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </Router>
  </React.StrictMode>
)
