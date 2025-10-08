import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App'
import RoadmapFilter from './RoadmapFilter'
import RoadmapResult from './RoadmapResult'
import Learn from './Learn'
import LearnFilter from './Learnfilter' // ADD THIS IMPORT
import HTMLCourse from './HTMLCourse'
import JSCourse from './JSCourse'
import PythonCourse from './PythonCourse'
import GitCourse from './GitCourse'
import WebDevelopmentPath from './WebDevelopmentPath' 
import DataSciencePath from './DataSciencePath';
import MobileDevelopmentPath from './MobileDevelopmentPath';
import TraceFilter from './TraceFilter';
import TraceCoding from './TraceCoding';
import TraceAlgorithms from './TraceAlgorithms';
import ProjectsFilter from './ProjectsFilter';
import BuildProjects from './BuildProjects';
import RefactorCode from './RefactorCode';
import CreateTest from './CreateTest';
import CreateTestFinal from './CreateTestFinal'
import TestInterface from './TestInterface'


import './index.css'
import './app.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/roadmap-filter" element={<RoadmapFilter />} />
        <Route path="/roadmap-result" element={<RoadmapResult />} />
        <Route path="/learn-filter" element={<LearnFilter />} /> {/* ADD THIS ROUTE */}
        <Route path="/learn" element={<Learn />} />
        <Route path="/trace" element={<TraceFilter />} />
        <Route path="/trace/coding" element={<TraceCoding />} />
        <Route path="/trace/algorithms" element={<TraceAlgorithms />} />
        <Route path="/projects" element={<ProjectsFilter />} />
        <Route path="/projects/build-projects" element={<BuildProjects />} />
        <Route path="/refactor" element={<RefactorCode />} />
        <Route path="/create-test" element={<CreateTest />} />
        <Route path="/create-test-final" element={<CreateTestFinal/>}/>
        <Route path="/test-interface" element={<TestInterface/>}/>


        
        {/* Individual Course Pages */}
        <Route path="/learn/html-css-fundamentals" element={<HTMLCourse />} />
        <Route path="/learn/javascript-basics" element={<JSCourse />} />
        <Route path="/learn/python-for-everyone" element={<PythonCourse />} />
        <Route path="/learn/git-github-essentials" element={<GitCourse />} />
        
        {/* Additional learning paths */}
        <Route path="/learn/web-development" element={<WebDevelopmentPath />} />
        <Route path="/learn/data-science" element={<DataSciencePath />} />
        <Route path="/learn/mobile-development" element={<MobileDevelopmentPath />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)