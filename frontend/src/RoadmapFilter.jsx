import './app.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import TechnicalAssessment from './TechnicalAssessment';

export default function RoadmapFilter() {
  const navigate = useNavigate();
  const [selections, setSelections] = useState({
    level: '',
    field: '',
    role: '',
    language: ''
  });
  const [showAssessment, setShowAssessment] = useState(false);

  const options = {
    level: [
      { id: 'beginner', label: 'Beginner (0-1 year)'},
      { id: 'intermediate', label: 'Intermediate (1-3 years)' },
      { id: 'advanced', label: 'Advanced (3+ years)' }
    ],
    field: [
      { id: 'web', label: 'Web Development' },
      { id: 'mobile', label: 'Mobile Development' },
      { id: 'data', label: 'Data Science' },
      { id: 'ai', label: 'AI/ML' },
      { id: 'devops', label: 'DevOps' },
      { id: 'game', label: 'Game Development'}
    ],
    role: [
      { id: 'frontend', label: 'Frontend Developer' },
      { id: 'backend', label: 'Backend Developer'},
      { id: 'fullstack', label: 'Fullstack Developer' },
      { id: 'data-scientist', label: 'Data Scientist' },
      { id: 'devops-engineer', label: 'DevOps Engineer' },
      { id: 'mobile-developer', label: 'Mobile Developer' }
    ],
    language: [
      { id: 'javascript', label: 'JavaScript' },
      { id: 'python', label: 'Python' },
      { id: 'java', label: 'Java' },
      { id: 'csharp', label: 'C#' },
      { id: 'php', label: 'PHP'},
      { id: 'ruby', label: 'Ruby' },
      { id: 'go', label: 'Go' },
      { id: 'rust', label: 'Rust' }
    ]
  };

  const handleSelection = (category, value) => {
    setSelections(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const generateRoadmap = () => {
    const allSelected = Object.values(selections).every(value => value !== '');
    
    if (!allSelected) {
      alert('Please make selections in all categories before generating your roadmap.');
      return;
    }

    const queryParams = new URLSearchParams(selections).toString();
    navigate(`/roadmap-result?${queryParams}`);
  };

  const startAssessment = () => {
    // Check if ALL selections are made (user is done choosing)
    const allSelected = Object.values(selections).every(value => value !== '');
    
    if (!allSelected) {
      alert('Please complete all selections before taking the assessment.');
      return;
    }

    setShowAssessment(true);
  };

  const handleAssessmentComplete = (score, total) => {
    setShowAssessment(false);
    console.log(`Assessment completed! Score: ${score}/${total}`);
  };

  const handleAssessmentClose = () => {
    setShowAssessment(false);
  };

  const isGenerateDisabled = !Object.values(selections).every(value => value !== '');
  const allSelected = Object.values(selections).every(value => value !== '');

  // If assessment is shown, display the TechnicalAssessment component
  if (showAssessment) {
    return (
      <TechnicalAssessment 
        onComplete={handleAssessmentComplete}
        onClose={handleAssessmentClose}
        userSelections={selections}
      />
    );
  }

  return (
    <div className="wrap">
      
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">AlgoRythm</Link>
          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/roadmap-filter" className="nav-link">Learn</Link>
            <Link to="/projects" className="nav-link">Projects</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>Create Your Learning Roadmap</h1>
        <p>Customize your learning path based on your goals and preferences</p>
      </section>

      {/* Filter Sections */}
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {Object.entries(options).map(([category, items]) => (
          <div key={category} className="panel" style={{ margin: '30px 0' }}>
            <h2 style={{ margin: '0 0 20px 0', textTransform: 'capitalize' }}>
              {category}:
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
              {items.map(item => (
                <div
                  key={item.id}
                  className={`opt ${selections[category] === item.id ? 'selected' : ''}`}
                  style={{ 
                    cursor: 'pointer',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                  onClick={() => handleSelection(category, item.id)}
                >
                  <span style={{ fontSize: '1.5rem' }}>{item.emoji}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Generate Button and Assessment Button */}
        <div style={{ textAlign: 'center', margin: '40px 0' }}>
          <button 
            className="btn primary" 
            style={{ 
              padding: '16px 40px', 
              fontSize: '1.2rem',
              opacity: isGenerateDisabled ? 0.6 : 1,
              cursor: isGenerateDisabled ? 'not-allowed' : 'pointer',
              marginBottom: allSelected ? '15px' : '0'
            }}
            onClick={generateRoadmap}
            disabled={isGenerateDisabled}
          >
            🚀 Generate Roadmap
          </button>
          
          {/* Quick Assessment Button - ONLY SHOWS WHEN ALL FILTERS ARE SELECTED */}
          {allSelected && (
            <div>
              <button 
                className="btn"
                onClick={startAssessment}
                style={{ 
                  padding: '14px 30px', 
                  fontSize: '1.1rem',
                  background: 'var(--ok)',
                  border: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: '10px'
                }}
              >
                🎯 Take a Quick Fun Assessment First
              </button>
              <p style={{ color: 'var(--muted)', marginTop: '8px', fontSize: '0.9rem' }}>
                Test your knowledge before generating your roadmap
              </p>
            </div>
          )}
          
          {isGenerateDisabled && (
            <p style={{ color: 'var(--muted)', marginTop: '12px' }}>
              Please select options from all categories
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Need help choosing?</h4>
            <p style={{ color: 'var(--muted)', margin: '10px 0 0' }}>
              <Link to="/learn" style={{ color: 'var(--brand)' }}>
                Browse all learning paths →
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}