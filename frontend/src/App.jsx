// App.js
import './app.css';
import { Link } from 'react-router-dom';

export default function App() {
  const learningPaths = [
    {
      title: "Learn Coding from Scratch",
      description: "Start your coding journey with our beginner-friendly courses and resources. Perfect for absolute beginners.",
      buttonText: "Get Started",
      icon: "📚",
      link: "/roadmap-filter"
    },
    {
      title: "Learn Through Real Time Projects",
      description: "Engage in hands-on learning with real-world coding projects. Build portfolio pieces while learning.",
      buttonText: "Join a Project",
      icon: "🛠️",
      link: "/projects"
    },
    {
      title: "Trace & Learn Algorithms",
      description: "Understand code execution step-by-step through visual tracing. Master algorithms and data structures.",
      buttonText: "Start Tracing",
      icon: "🔍",
      link: "/trace"
    },
    {
      title: "Refactor Your Code",
      description: "Improve your code quality with advanced refactoring techniques. Learn best practices from experts.",
      buttonText: "Enhance Now",
      icon: "♻️",
      link: "/refactor"
    }
  ];

  const footerSections = [
    {
      title: "Resources",
      links: ["Community", "Contact", "Blog", "Events", "Email Us"]
    },
    {
      title: "Learning Paths", 
      links: ["Beginner", "Intermediate", "Advanced", "Career Paths", "Certifications"]
    },
    {
      title: "Support",
      links: ["Help Center", "Tutorials", "Documentation", "FAQ", "Feedback"]
    }
  ];

  return (
    <div className="wrap">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">Algorythm</Link>
          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/learn-filter" className="nav-link">Learn</Link>
            <Link to="/projects" className="nav-link">Projects</Link>
            <Link to="/community" className="nav-link">Community</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>Explore Your Coding Journey</h1>
        <p>Choose your path and start learning today with our curated learning experiences</p>
      </section>

      {/* Cards Grid */}
      <div className="cards-grid">
        {learningPaths.map((path, index) => (
          <div key={index} className="card">
            <div className="card-icon">
              <span className="icon-emoji">{path.icon}</span>
            </div>
            <h3>{path.title}</h3>
            <p>{path.description}</p>
            <Link to={path.link} className="btn primary card-btn">
              {path.buttonText}
            </Link>
          </div>
        ))}
      </div>

      {/* Create Test Button after cards */}
      <div style={{ textAlign: "center", marginTop: "30px", marginBottom: "30px" }}>
        <Link to="/create-test" className="btn primary">
          Create Test
        </Link>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          {footerSections.map((section, index) => (
            <div key={index} className="footer-section">
              <h4>{section.title}</h4>
              <ul className="footer-links">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={`/${link.toLowerCase().replace(' ', '-')}`}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="footer-bottom">
          <p>© 2025 Algorythm. All rights reserved. Built with passion for developers.</p>
        </div>
      </footer>
    </div>
  );
}
