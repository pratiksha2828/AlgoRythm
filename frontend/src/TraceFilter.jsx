import './app.css';
import { Link, useNavigate } from 'react-router-dom';

export default function TraceFilter() {
  const navigate = useNavigate();
  
  const tracingOptions = [
    {
      id: 'coding',
      name: 'Learn coding through games',
      description: 'Step through code execution and understand how programs work line by line',
      icon: '💻',
      features: ['Variable Tracking', 'Step-by-Step Execution', 'Debugging Practice', 'Code Visualization']
    },
    {
      id: 'algorithms',
      name: 'Algorithm Tracing', 
      description: 'Visualize how algorithms work with animated step-by-step execution',
      icon: '📊',
      features: ['Algorithm Animation', 'Data Structure Visualization', 'Complexity Analysis', 'Interactive Learning']
    }
  ];

  const handleOptionSelect = (optionId) => {
    // Navigate to the appropriate tracing page based on selection
    navigate(`/trace/${optionId}`);
  };

  return (
    <div className="wrap">
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
        <h1>🔍 Trace & Learn</h1>
        <p>Choose what you want to trace and understand through visual step-by-step execution</p>
      </section>

      {/* Options Grid */}
      <div className="cards-grid" style={{maxWidth: '900px', margin: '0 auto'}}>
        {tracingOptions.map(option => (
          <div 
            key={option.id} 
            className="card"
            style={{cursor: 'pointer'}}
            onClick={() => handleOptionSelect(option.id)}
          >
            <div className="card-icon">
              <span className="icon-emoji" style={{fontSize: '3rem'}}>{option.icon}</span>
            </div>
            <h3>{option.name}</h3>
            <p>{option.description}</p>
            
            <div style={{margin: '20px 0'}}>
              <h4 style={{margin: '0 0 12px', color: 'var(--muted)', fontSize: '1rem'}}>
                What you'll learn:
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
            
            <button className="btn primary card-btn">
              Start Tracing {option.name}
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Not sure which to choose?</h4>
            <p style={{color: 'var(--muted)', margin: '10px 0 0'}}>
              <strong>Learn Coding through games</strong> is great for understanding specific code execution.<br/>
              <strong>Algorithm Tracing</strong> is perfect for learning how algorithms work.
            </p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2025 CodeCraf. Master coding through visual learning.</p>
        </div>
      </footer>
    </div>
  );
}