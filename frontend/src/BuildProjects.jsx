import './app.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function BuildProjects() {
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProject, setActiveProject] = useState(null);
  const [projectProgress, setProjectProgress] = useState({});
  const [currentStep, setCurrentStep] = useState(0);

  const projectCategories = [
    'All', 'Web Development', 'Mobile Apps', 'Games', 'Data Science', 'APIs', 'Automation'
  ];

  const difficultyLevels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const projects = [
    {
      id: 1,
      title: "Personal Portfolio Website",
      description: "Build your own portfolio website to showcase your projects and skills",
      level: "Beginner",
      category: "Web Development",
      duration: "2-3 days",
      technologies: ["HTML", "CSS", "JavaScript"],
      features: ["Responsive Design", "Project Gallery", "Contact Form", "About Section"],
      resources: [
        { name: "Design Inspiration", link: "https://dribbble.com/tags/portfolio" },
        { name: "CSS Framework Guide", link: "https://getbootstrap.com/docs/" },
        { name: "Deployment Tutorial", link: "https://pages.github.com/" }
      ],
      tutorialLink: "https://www.youtube.com/watch?v=5bMdjkfvONE",
      starterCode: `<!DOCTYPE html>\n<html>\n<head>\n<title>Portfolio</title>\n<link rel="stylesheet" href="styles.css"/>\n</head>\n<body>\n<h1>Welcome to My Portfolio</h1>\n<script src="script.js"></script>\n</body>\n</html>` ,
      icon: "🌐",
      steps: [
        "Set up project structure with HTML, CSS, and JavaScript files",
        "Create responsive navigation bar and hero section",
        "Build project gallery with grid layout",
        "Add contact form with validation",
        "Style for mobile responsiveness",
        "Deploy to GitHub Pages or Netlify"
      ]
    },
    {
      id: 2,
      title: "Todo List App",
      description: "Create a task management application with CRUD operations",
      level: "Beginner",
      category: "Web Development",
      duration: "3-4 days",
      technologies: ["HTML", "CSS", "JavaScript", "Local Storage"],
      features: ["Add/Delete Tasks", "Mark Complete", "Filter Tasks", "Persistent Storage"],
      resources: [
        { name: "Local Storage Guide", link: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" },
        { name: "UI Design Examples", link: "https://uimovement.com/tag/todo/" }
      ],
      tutorialLink: "https://www.youtube.com/watch?v=Ttf3CEsEwMQ",
      starterCode: `<!DOCTYPE html>\n<html>\n<head>\n<title>Todo App</title>\n<link rel="stylesheet" href="styles.css"/>\n</head>\n<body>\n<input type="text" placeholder="Add task"/>\n<ul id="taskList"></ul>\n<script src="script.js"></script>\n</body>\n</html>`,
      icon: "✅",
      steps: [
        "Create basic HTML structure with input and task list",
        "Add CSS styling for tasks and buttons",
        "Implement JavaScript to add/remove tasks",
        "Add local storage persistence",
        "Create filter functionality (all/active/completed)",
        "Add task editing capability"
      ]
    },
    {
    // ... keep other projects same but add tutorialLink and starterCode as empty string or placeholders
    id: 3, title: "Weather Dashboard", 
    description: "Fetch real-time weather data and display it in a responsive UI", level: "Intermediate", 
    category: "APIs", 
    duration: "4-5 days",
     technologies: ["HTML", "CSS", "JavaScript", "OpenWeather API"], 
     features: ["Search by City", "Temperature, Humidity, Wind", "5-Day Forecast", "Dark Mode"],
      resources: [ { name: "OpenWeather API", link: "https://openweathermap.org/api" }, { name: "Fetch API Guide",
         link: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API" } ], icon: "☀️", 
         steps: [ "Set up API key and fetch weather data", "Design search input and weather display card", "Display temperature, humidity, and other data", "Add forecast feature", "Implement dark/light mode" ] }, 
    { 
      id: 4, 
      title: "Blog CMS", 
      description: "Develop a content management system for blogs", 
      level: "Intermediate", 
      category: "Web Development",
       duration: "1-2 weeks", 
       technologies: ["React", "Node.js", "Express", "MongoDB"],
        features: ["User Authentication", "Create/Edit/Delete Posts", "Comments", "Responsive Design"], 
        resources: [ { name: "MERN Stack Guide", link: "https://www.mongodb.com/mern-stack" }, { name: "React Router", link: "https://reactrouter.com/" } ], icon: "📝", 
        steps: [ "Set up server with Express and MongoDB", "Implement user authentication", "Build UI for blog posts", "Add CRUD functionality", "Deploy to Heroku or Render" ] }, 
        { id: 5, 
          title: "Chat Application", 
          description: "Build a real-time chat app using WebSockets", 
          level: "Advanced", 
          category: "Web Development", 
          duration: "2-3 weeks", 
          technologies: ["React", "Node.js", "Socket.IO", "MongoDB"], 
          features: ["Real-time Messaging", "User Authentication", "Group Chats", "Message History"], 
          resources: [ { name: "Socket.IO Docs", link: "https://socket.io/docs/v4/" }, { name: "Authentication Tutorial", link: "https://jwt.io/introduction/" } ], icon: "💬", 
          steps: [ "Set up backend with Socket.IO", "Design chat UI with React", "Implement authentication", "Enable private and group chats", "Persist messages in database" ] }, 
          { id: 6, 
            title: "Expense Tracker Mobile App", 
            description: "Track expenses on the go with charts and insights", 
            level: "Intermediate", 
            category: "Mobile Apps", 
            duration: "1-2 weeks", 
            technologies: ["React Native", "Expo", "SQLite"], 
            features: ["Add/Delete Expenses", "Monthly Reports", "Charts", "Export Data"], 
            resources: [ { name: "React Native Docs", link: "https://reactnative.dev/" }, { name: "SQLite in React Native", link: "https://docs.expo.dev/versions/latest/sdk/sqlite/" } ], 
            icon: "📊", steps: [ "Set up React Native project", "Design input and list views", "Store data in SQLite", "Generate monthly reports and charts", "Implement data export" ] }, 
            { id: 7, 
              title: "AI Image Generator", 
              description: "Use AI to generate images from text prompts", 
              level: "Advanced", 
              category: "Data Science", 
              duration: "3-4 weeks", 
              technologies: ["Python", "Flask", "Hugging Face API", "React"], features: ["Prompt Input", "Image Generation", "Gallery", "Download Images"], 
              resources: [ { name: "Hugging Face", link: "https://huggingface.co/" }, { name: "Flask Docs", link: "https://flask.palletsprojects.com/" } ], icon: "🤖", 
              steps: [ "Set up Flask backend and integrate API", "Create React front end", "Handle image generation requests", "Display generated images in gallery", "Enable download and sharing" ] },
              {
      id: 8,
      title: "Memory Card Game",
      description: "Develop a fun browser-based memory card matching game",
      level: "Beginner",
      category: "Games",
      duration: "3-5 days",
      technologies: ["HTML", "CSS", "JavaScript"],
      features: ["Card Flipping", "Match Checking", "Score Counter", "Restart Option"],
      resources: [
        { name: "Game Loop Basics", link: "https://developer.mozilla.org/en-US/docs/Games/Anatomy" },
        { name: "CSS Grid Guide", link: "https://css-tricks.com/snippets/css/complete-guide-grid/" }
      ],
      tutorialLink: "",
      starterCode: "",
      icon: "🎮",
      steps: [
        "Set up grid layout with cards",
        "Implement card flipping and hidden values",
        "Add logic to check for matches",
        "Track score and number of moves",
        "Add restart functionality",
        "Polish with CSS animations"
      ]
    },
    {
      id: 9,
      title: "Task Automation Script",
      description: "Write a script to automate repetitive daily tasks",
      level: "Intermediate",
      category: "Automation",
      duration: "2-4 days",
      technologies: ["Python", "Selenium", "BeautifulSoup"],
      features: ["Automated Web Actions", "Data Extraction", "Scheduled Runs"],
      resources: [
        { name: "Selenium Docs", link: "https://www.selenium.dev/documentation/" },
        { name: "BeautifulSoup Guide", link: "https://www.crummy.com/software/BeautifulSoup/bs4/doc/" }
      ],
      tutorialLink: "",
      starterCode: "",
      icon: "⚙️",
      steps: [
        "Install Selenium and BeautifulSoup",
        "Write script for a simple web automation (like login)",
        "Extract specific data from a webpage",
        "Schedule script to run automatically",
        "Handle errors and exceptions"
      ]
    }
    
    // keep rest as is, add tutorialLink and starterCode placeholders if needed
  ];

  const filteredProjects = projects.filter(project => {
    const levelMatch = selectedLevel === 'All' || project.level === selectedLevel;
    const categoryMatch = selectedCategory === 'All' || project.category === selectedCategory;
    return levelMatch && categoryMatch;
  });

  const startBuilding = (project) => {
    setActiveProject(project);
    setCurrentStep(0);
    if (!projectProgress[project.id]) {
      setProjectProgress(prev => ({
        ...prev,
        [project.id]: { currentStep: 0, completedSteps: [] }
      }));
    }
  };

  const completeStep = (stepIndex) => {
    if (activeProject) {
      setProjectProgress(prev => ({
        ...prev,
        [activeProject.id]: {
          ...prev[activeProject.id],
          completedSteps: [...(prev[activeProject.id]?.completedSteps || []), stepIndex]
        }
      }));
    }
  };

  const copyStarterCode = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      alert('Starter code copied to clipboard!');
    });
  };

  const ProjectBuilder = () => (
    <div style={{
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        background: 'var(--card)',
        padding: '30px',
        borderRadius: '15px',
        maxWidth: '800px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Building: {activeProject.title}</h2>
          <button 
            onClick={() => setActiveProject(null)}
            style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
          >
            ×
          </button>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <div style={{ background: 'var(--bg)', height: '8px', borderRadius: '4px', marginBottom: '10px' }}>
            <div style={{
              background: 'var(--brand)',
              height: '100%',
              borderRadius: '4px',
              width: `${((currentStep + 1) / activeProject.steps.length) * 100}%`,
              transition: 'width 0.3s ease'
            }}></div>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
            Step {currentStep + 1} of {activeProject.steps.length}
          </p>
        </div>

        <div style={{ background: 'var(--bg)', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
          <h3>Step {currentStep + 1}: {activeProject.steps[currentStep]}</h3>
          {currentStep === 0 && (
            <div>
              <p>Create these files in your project folder:</p>
              <ul>
                <li><code>index.html</code></li>
                <li><code>styles.css</code></li>
                <li><code>script.js</code></li>
              </ul>
            </div>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h4>Helpful Resources:</h4>
          <div style={{ display: 'grid', gap: '10px' }}>
            {activeProject.resources.map((resource, i) => (
              <a key={i} href={resource.link} target="_blank" rel="noopener noreferrer" style={{
                display: 'block',
                padding: '10px',
                background: 'var(--bg)',
                borderRadius: '8px',
                color: 'var(--brand)',
                textDecoration: 'none'
              }}>
                📚 {resource.name}
              </a>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
          <button 
            className="btn outline"
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
          >
            Previous Step
          </button>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              className="btn"
              onClick={() => completeStep(currentStep)}
              style={{ background: projectProgress[activeProject.id]?.completedSteps?.includes(currentStep) ? 'var(--success)' : 'var(--bg)' }}
            >
              {projectProgress[activeProject.id]?.completedSteps?.includes(currentStep) ? '✓ Completed' : 'Mark Complete'}
            </button>
            <button 
              className="btn primary"
              onClick={() => {
                if (currentStep < activeProject.steps.length - 1) {
                  setCurrentStep(prev => prev + 1);
                } else {
                  alert('🎉 Congratulations! You completed the project!');
                  setActiveProject(null);
                }
              }}
            >
              {currentStep < activeProject.steps.length - 1 ? 'Next Step' : 'Finish Project'}
            </button>
          </div>
        </div>

        <div style={{ marginTop: '20px', padding: '15px', background: 'var(--bg)', borderRadius: '8px' }}>
          <h4>Quick Actions:</h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button className="btn outline" style={{ fontSize: '0.8rem' }}>
              💻 Open Code Editor
            </button>
            <button className="btn outline" style={{ fontSize: '0.8rem' }}
              onClick={() => copyStarterCode(activeProject.starterCode)}>
              📋 Copy Starter Code
            </button>
            <button className="btn outline" style={{ fontSize: '0.8rem' }}
              onClick={() => window.open(activeProject.tutorialLink, '_blank')}>
              🎥 Video Tutorial
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="wrap">
      {activeProject && <ProjectBuilder />}
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">Algorythm</Link>
          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/learn" className="nav-link">Learn</Link>
            <Link to="/projects" className="nav-link">Projects</Link>
            <Link to="/community" className="nav-link">Community</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>🛠️ Learn by Building Projects</h1>
        <p>Hands-on learning through real project development. Build your portfolio while gaining practical experience!</p>
        <div style={{ 
          background: 'var(--card)', 
          padding: '15px', 
          borderRadius: '12px', 
          margin: '20px auto',
          maxWidth: '600px',
          border: '1px solid var(--brand)'
        }}>
          <strong>🎯 Perfect for:</strong> Practical Learning • Portfolio Building • Skill Application • Real-world Experience
        </div>
      </section>

      {/* Filters */}
      <section style={{ maxWidth: '1000px', margin: '40px auto', textAlign: 'center' }}>
        <h3>Filter Projects:</h3>
        
        <div style={{ margin: '20px 0' }}>
          <h4>By Difficulty:</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', margin: '10px 0' }}>
            {difficultyLevels.map(level => (
              <button 
                key={level}
                className={`btn ${selectedLevel === level ? 'primary' : 'outline'}`}
                onClick={() => setSelectedLevel(level)}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div style={{ margin: '20px 0' }}>
          <h4>By Category:</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', margin: '10px 0' }}>
            {projectCategories.map(category => (
              <button 
                key={category}
                className={`btn ${selectedCategory === category ? 'primary' : 'outline'}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <p style={{ color: 'var(--muted)' }}>
          Showing {filteredProjects.length} of {projects.length} projects
        </p>
      </section>

      {/* Projects Grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {filteredProjects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
            <h3>No projects found with these filters</h3>
            <p style={{ color: 'var(--muted)' }}>Try adjusting your filters or view all projects.</p>
            <button 
              className="btn primary"
              onClick={() => {
                setSelectedLevel('All');
                setSelectedCategory('All');
              }}
            >
              View All Projects
            </button>
          </div>
        ) : (
          <div className="cards-grid">
            {filteredProjects.map(project => (
              <div key={project.id} className="card">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                  <span className="icon-emoji" style={{ fontSize: '2rem', marginRight: '15px' }}>
                    {project.icon}
                  </span>
                  <div>
                    <h3 style={{ margin: 0 }}>{project.title}</h3>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '5px' }}>
                      <span style={{ 
                        background: 'var(--bg)', 
                        padding: '4px 8px', 
                        borderRadius: '12px', 
                        fontSize: '0.7rem',
                        color: 'var(--muted)'
                      }}>
                        {project.level}
                      </span>
                      <span style={{ 
                        background: 'var(--bg)', 
                        padding: '4px 8px', 
                        borderRadius: '12px', 
                        fontSize: '0.7rem',
                        color: 'var(--muted)'
                      }}>
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p style={{ color: 'var(--muted)', marginBottom: '15px', flexGrow: 1 }}>
                  {project.description}
                </p>
                
                <div style={{ marginBottom: '15px' }}>
                  <h4 style={{ color: 'var(--muted)', margin: '0 0 8px 0', fontSize: '0.9rem' }}>Technologies:</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {project.technologies.map((tech, i) => (
                      <span key={i} style={{
                        background: 'var(--brand-light)',
                        padding: '4px 8px',
                        borderRadius: '8px',
                        fontSize: '0.7rem',
                        color: 'var(--brand)'
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <h4 style={{ color: 'var(--muted)', margin: '0 0 8px 0', fontSize: '0.9rem' }}>Features:</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {project.features.map((feature, i) => (
                      <span key={i} style={{
                        background: 'var(--bg)',
                        padding: '4px 8px',
                        borderRadius: '8px',
                        fontSize: '0.7rem',
                        color: 'var(--muted)'
                      }}>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '15px',
                  color: 'var(--muted)',
                  fontSize: '0.9rem'
                }}>
                  <span>⏱️ {project.duration}</span>
                  <span>📝 {project.steps?.length || 5} steps</span>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <h4 style={{ color: 'var(--muted)', margin: '0 0 8px 0', fontSize: '0.9rem' }}>Resources:</h4>
                  <div style={{ display: 'grid', gap: '5px' }}>
                    {project.resources.map((resource, i) => (
                      <a key={i} href={resource.link} target="_blank" rel="noopener noreferrer" style={{ 
                        color: 'var(--brand)', 
                        fontSize: '0.8rem', 
                        textDecoration: 'none' 
                      }}>
                        • {resource.name}
                      </a>
                    ))}
                  </div>
                </div>

                <button 
                  className="btn primary card-btn"
                  onClick={() => startBuilding(project)}
                >
                  Start Building
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Call to Action */}
      <section style={{textAlign: 'center', margin: '60px 0', padding: '40px', background: 'var(--card)', borderRadius: '20px', border: '1px solid #22263b'}}>
        <h2>Ready to Build Something Amazing?</h2>
        <p style={{color: 'var(--muted)', maxWidth: '500px', margin: '0 auto 30px'}}>
          Choose a project that matches your skill level and start building your portfolio today!
        </p>
        <Link to="/projects" className="btn outline" style={{padding: '15px 30px', fontSize: '1.1rem', textDecoration: 'none', marginRight: '15px'}}>
          Back to Projects
        </Link>
        <button className="btn primary" style={{padding: '15px 30px', fontSize: '1.1rem'}}>
          Get Personalized Recommendations
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Project Building Tips:</h4>
            <p style={{color: 'var(--muted)', margin: '10px 0 0'}}>
              Start small • Focus on one feature at a time • Don't be afraid to break things • 
              Document your progress • Share your work with others
            </p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2025 CodeCraf. Build, learn, and grow through hands-on projects.</p>
        </div>
      </footer>
    </div>
   
  );
}
