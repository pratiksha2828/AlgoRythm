import './app.css';
import { Link, useNavigate } from 'react-router-dom';

export default function ProjectsFilter() {
  const navigate = useNavigate();
  
  const projectOptions = [
    {
      id: 'learn-projects',
      name: 'Learn an Existing Project',
      description: 'Study and understand completed projects to learn patterns, architecture, and best practices',
      icon: '📖',
      features: ['Code Analysis', 'Architecture Patterns', 'Best Practices', 'Reverse Engineering'],
      benefits: 'Quickly understand how real applications are built'
    },
    {
      id: 'build-projects', 
      name: 'Learn by Building a Project',
      description: 'Build projects from scratch with guided tutorials and step-by-step instructions',
      icon: '🛠️',
      features: ['Hands-on Coding', 'Step-by-Step Guides', 'Real-time Feedback', 'Portfolio Building'],
      benefits: 'Gain practical experience by creating real applications'
    }
  ];

  const handleOptionSelect = (optionId) => {
    // Navigate to the appropriate projects page based on selection
    navigate(`/projects/${optionId}`);
  };

  return (
    <div className="wrap">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">AlgoRythm</Link>
          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/learn" className="nav-link">Learn</Link>
            <Link to="/projects" className="nav-link">Projects</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>🛠️ Project-Based Learning</h1>
        <p>Choose how you want to learn through real-world projects and build practical experience</p>
      </section>

      {/* Options Grid */}
      <div className="cards-grid" style={{maxWidth: '900px', margin: '0 auto'}}>
        {projectOptions.map(option => (
          <div 
            key={option.id} 
            className="card"
            style={{cursor: 'pointer', textAlign: 'center'}}
            onClick={() => handleOptionSelect(option.id)}
          >
            <div className="card-icon">
              <span className="icon-emoji" style={{fontSize: '3rem'}}>{option.icon}</span>
            </div>
            <h3>{option.name}</h3>
            <p>{option.description}</p>
            
            <div style={{margin: '20px 0'}}>
              <h4 style={{margin: '0 0 12px', color: 'var(--muted)', fontSize: '1rem'}}>
                What you'll get:
              </h4>
              <div style={{display: 'grid', gap: '8px'}}>
                {option.features.map(feature => (
                  <span key={feature} style={{
                    background: 'var(--bg)',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    fontSize: '0.9rem',
                    color: 'var(--muted)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{color: 'var(--brand)'}}>✓</span>
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, var(--brand), var(--brand-dark))',
              padding: '12px',
              borderRadius: '12px',
              margin: '15px 0',
              color: 'white'
            }}>
              <strong>🎯 {option.benefits}</strong>
            </div>
            
            <button className="btn primary card-btn">
              Choose This Path
            </button>
          </div>
        ))}
      </div>

      {/* Comparison Section */}
      <section style={{maxWidth: '1000px', margin: '60px auto', background: 'var(--card)', padding: '30px', borderRadius: '15px'}}>
        <h3 style={{textAlign: 'center', marginBottom: '30px'}}>Which one is right for you?</h3>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px'}}>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '2rem', marginBottom: '15px'}}>📖</div>
            <h4>Learn Existing Projects</h4>
            <p style={{color: 'var(--muted)'}}>
              <strong>Ideal for:</strong> Beginners who want to understand how real applications work, 
              developers looking to learn specific patterns, or those who prefer studying before building.
            </p>
            <ul style={{textAlign: 'left', color: 'var(--muted)', paddingLeft: '20px'}}>
              <li>See finished products first</li>
              <li>Understand architecture decisions</li>
              <li>Learn from others' code</li>
              <li>Less pressure to create</li>
            </ul>
          </div>
          
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '2rem', marginBottom: '15px'}}>🛠️</div>
            <h4>Build Projects</h4>
            <p style={{color: 'var(--muted)'}}>
              <strong>Ideal for:</strong> Hands-on learners, those who learn by doing, 
              developers who want to build their portfolio, or anyone who enjoys creating.
            </p>
            <ul style={{textAlign: 'left', color: 'var(--muted)', paddingLeft: '20px'}}>
              <li>Active learning experience</li>
              <li>Build muscle memory</li>
              <li>Create portfolio pieces</li>
              <li>Solve problems in real-time</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Not sure which to choose?</h4>
            <p style={{color: 'var(--muted)', margin: '10px 0 0'}}>
              <strong>Start with Existing Projects</strong> if you're new to programming<br/>
              <strong>Choose Building Projects</strong> if you have some experience and want to practice<br/>
              Many developers use both approaches throughout their learning journey!
            </p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2025 AlgoRythm. Learn by doing, understand by studying.</p>
        </div>
      </footer>
    </div>
  );
}