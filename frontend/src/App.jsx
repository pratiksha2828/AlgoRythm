// App.js
import './app.css';
import { Link } from 'react-router-dom';

export default function App() {
  const learningPaths = [
    {
      title: "Learn Coding from Scratch",
      description: "Start your coding journey with our beginner-friendly courses and resources. Perfect for absolute beginners.",
      buttonText: "Get Started",
      icon: "book",
      link: "/roadmap-filter"
    },
    {
      title: "Learn Through Real Time Projects",
      description: "Engage in hands-on learning with real-world coding projects. Build portfolio pieces while learning.",
      buttonText: "Join a Project",
      icon: "code",
      link: "/projects"
    },
    {
      title: "Trace & Learn Algorithms",
      description: "Understand code execution step-by-step through visual tracing. Master algorithms and data structures.",
      buttonText: "Start Tracing",
      icon: "search",
      link: "/trace"
    },
    {
      title: "Refactor Your Code",
      description: "Improve your code quality with advanced refactoring techniques. Learn best practices from experts.",
      buttonText: "Enhance Now",
      icon: "refresh",
      link: "/refactor"
    },
    {
      title: "Create Your Test",
      description: "Design custom coding challenges and assessments. Test your skills with personalized quizzes and problems.",
      buttonText: "Create Test",
      icon: "edit",
      link: "/create-test"
    },
    {
      title: "Claim Your Streaks",
      description: "Track your daily coding progress and maintain your learning streak. Earn rewards for consistent practice.",
      buttonText: "Claim Streaks",
      icon: "flame",
      link: "/streaks"
    }
  ];

  const footerSections = [
    {
      title: "Resources",
      links: ["Contact", "Blog", "Events", "Email Us"]
    },
    {
      title: "Learning Paths", 
      links: ["Beginner", "Intermediate", "Advanced"]
    },
    {
      title: "Support",
      links: ["Help Center", "Tutorials", "FAQ", "Feedback"]
    }
  ];

  return (
    <div className="wrap">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">AlgoRythm</Link>
          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/learn-filter" className="nav-link">Learn</Link>
            <Link to="/projects" className="nav-link">Projects</Link>
            {/* ✅ Added News section here */}
            <Link to="/news" className="nav-link">News</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>Explore Your Coding Journey</h1>
        <p>Choose your path and start learning today with our curated learning experiences</p>
      </section>

      {/* Symmetric 6-Block Cards Grid */}
      <div className="cards-grid-symmetric">
        {learningPaths.map((path, index) => (
          <div 
            key={index} 
            className="card card-symmetric" 
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            
            <h3>{path.title}</h3>
            <p>{path.description}</p>
            <Link to={path.link} className="btn primary card-btn">
              {path.buttonText}
            </Link>
          </div>
        ))}
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
          <p>© 2025 AlgoRythm. All rights reserved. Built with passion for developers.</p>
        </div>
      </footer>
    </div>
  );
}