import './app.css';
import { Link, useNavigate } from 'react-router-dom';

export default function LearnFilter() {
  const navigate = useNavigate();
  
  const programmingFields = [
    {
      id: 'web-dev',
      name: 'Web Development',
      description: 'Build websites and web applications',
      icon: '💻',
      topics: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js']
    },
    {
      id: 'data-science',
      name: 'Data Science',
      description: 'Analyze data and build machine learning models',
      icon: '📊',
      topics: ['Python', 'Pandas', 'NumPy', 'Machine Learning', 'Data Visualization']
    },
    {
      id: 'mobile-dev',
      name: 'Mobile Development',
      description: 'Create apps for iOS and Android',
      icon: '📱',
      topics: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Mobile UI/UX']
    },
    {
      id: 'game-dev',
      name: 'Game Development',
      description: 'Design and develop video games',
      icon: '🎮',
      topics: ['Unity', 'C#', 'Game Design', '3D Modeling', 'Game Physics']
    },
    {
      id: 'ai-ml',
      name: 'AI & Machine Learning',
      description: 'Build intelligent systems and algorithms',
      icon: '🤖',
      topics: ['Python', 'TensorFlow', 'Neural Networks', 'NLP', 'Computer Vision']
    },
    {
      id: 'devops',
      name: 'DevOps & Cloud',
      description: 'Manage infrastructure and deployment',
      icon: '☁️',
      topics: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Linux']
    }
  ];

  const handleFieldSelect = (fieldId) => {
    // For now, navigate to learn page with the selected field
    navigate(`/learn?field=${fieldId}`);
  };

  return (
    <div className="wrap">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">CodeCraf</Link>
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
        <h1>What Do You Want to Learn?</h1>
        <p>Select your area of interest to get personalized learning recommendations</p>
      </section>

      {/* Fields Grid */}
      <div className="cards-grid" style={{maxWidth: '1000px', margin: '0 auto'}}>
        {programmingFields.map(field => (
          <div 
            key={field.id} 
            className="card"
            style={{cursor: 'pointer'}}
            onClick={() => handleFieldSelect(field.id)}
          >
            <div className="card-icon">
              <span className="icon-emoji">{field.icon}</span>
            </div>
            <h3>{field.name}</h3>
            <p>{field.description}</p>
            
            <div style={{margin: '15px 0'}}>
              <h4 style={{margin: '0 0 10px', color: 'var(--muted)', fontSize: '1rem'}}>
                Popular topics:
              </h4>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
                {field.topics.slice(0, 3).map(topic => (
                  <span key={topic} style={{
                    background: 'var(--bg)',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    color: 'var(--muted)'
                  }}>
                    {topic}
                  </span>
                ))}
                {field.topics.length > 3 && (
                  <span style={{
                    background: 'var(--bg)',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    color: 'var(--brand)'
                  }}>
                    +{field.topics.length - 3} more
                  </span>
                )}
              </div>
            </div>
            
            <button className="btn primary card-btn">
              Select This Field
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Not sure where to start?</h4>
            <p style={{color: 'var(--muted)', margin: '10px 0 0'}}>
              <Link to="/learn" style={{color: 'var(--brand)'}}>
                Browse all courses →
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}