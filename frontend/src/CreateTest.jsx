import './app.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function CreateTest() {
  const navigate = useNavigate();

  // State for storing number of questions per difficulty
  const [questions, setQuestions] = useState({
    easy: '',
    medium: '',
    hard: ''
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestions({ ...questions, [name]: value });
  };

  // Handle Proceed button click
  const handleProceed = () => {
    // Validate that at least one difficulty has questions
    const totalQuestions = parseInt(questions.easy || 0) + 
                          parseInt(questions.medium || 0) + 
                          parseInt(questions.hard || 0);
    
    if (totalQuestions === 0) {
      alert('Please enter at least one question for any difficulty level.');
      return;
    }

    console.log('Questions:', questions);

    // Navigate to test interface with the selected questions configuration
    navigate('/test-interface', { state: questions });
  };

  return (
    <div className="wrap" style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Create Coding Assessment</h1>
      <p>Configure your test by selecting the number of questions for each difficulty level:</p>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '30px', 
        marginTop: '40px', 
        flexWrap: 'wrap',
        maxWidth: '800px',
        margin: '40px auto'
      }}>
        {/* Easy Difficulty Card */}
        <div style={{
          background: 'var(--card)',
          padding: '25px',
          borderRadius: '12px',
          border: '2px solid #4CAF50',
          minWidth: '200px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🟢</div>
          <h3 style={{ color: '#4CAF50', marginBottom: '15px' }}>Easy</h3>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
            Basic concepts, simple algorithms
          </p>
          <input
            type="number"
            name="easy"
            value={questions.easy}
            onChange={handleChange}
            placeholder="0"
            className="input-field"
            min="0"
            max="20"
            style={{ 
              width: '80px', 
              textAlign: 'center',
              fontSize: '1.2rem',
              padding: '10px'
            }}
          />
        </div>

        {/* Medium Difficulty Card */}
        <div style={{
          background: 'var(--card)',
          padding: '25px',
          borderRadius: '12px',
          border: '2px solid #FF9800',
          minWidth: '200px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🟡</div>
          <h3 style={{ color: '#FF9800', marginBottom: '15px' }}>Medium</h3>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
            Intermediate problems, common patterns
          </p>
          <input
            type="number"
            name="medium"
            value={questions.medium}
            onChange={handleChange}
            placeholder="0"
            className="input-field"
            min="0"
            max="20"
            style={{ 
              width: '80px', 
              textAlign: 'center',
              fontSize: '1.2rem',
              padding: '10px'
            }}
          />
        </div>

        {/* Hard Difficulty Card */}
        <div style={{
          background: 'var(--card)',
          padding: '25px',
          borderRadius: '12px',
          border: '2px solid #f44336',
          minWidth: '200px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: "2rem", marginBottom: '10px' }}>🔴</div>
          <h3 style={{ color: '#f44336', marginBottom: '15px' }}>Hard</h3>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
            Complex algorithms, optimization challenges
          </p>
          <input
            type="number"
            name="hard"
            value={questions.hard}
            onChange={handleChange}
            placeholder="0"
            className="input-field"
            min="0"
            max="20"
            style={{ 
              width: '80px', 
              textAlign: 'center',
              fontSize: '1.2rem',
              padding: '10px'
            }}
          />
        </div>
      </div>

      {/* Summary */}
      <div style={{
        background: 'var(--card)',
        padding: '20px',
        borderRadius: '12px',
        margin: '30px auto',
        maxWidth: '400px',
        border: '1px solid var(--border)'
      }}>
        <h4>Test Summary</h4>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '15px' }}>
          <div>
            <span style={{ color: '#4CAF50' }}>Easy: {questions.easy || 0}</span>
          </div>
          <div>
            <span style={{ color: '#FF9800' }}>Medium: {questions.medium || 0}</span>
          </div>
          <div>
            <span style={{ color: '#f44336' }}>Hard: {questions.hard || 0}</span>
          </div>
        </div>
        <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid var(--border)' }}>
          <strong>Total Questions: {parseInt(questions.easy || 0) + parseInt(questions.medium || 0) + parseInt(questions.hard || 0)}</strong>
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <button className="btn primary" onClick={handleProceed} style={{ padding: '15px 30px', fontSize: '1.1rem' }}>
          🚀 Start Assessment
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <Link to="/" className="btn secondary">
          ← Back to Home
        </Link>
      </div>

      {/* Features Preview */}
      <div style={{ marginTop: '50px', padding: '30px', background: 'var(--card)', borderRadius: '12px' }}>
        <h3>What to Expect in the Assessment</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {[
            { icon: '👨‍💻', title: 'Code Refactoring', desc: 'Improve existing code for better quality' },
            { icon: '⚡', title: 'Real-time Feedback', desc: 'Get instant analysis of your solutions' },
            { icon: '📊', title: 'Difficulty Levels', desc: 'Questions matched to your skill level' },
            { icon: '🕒', title: 'Timed Assessment', desc: 'Complete within the allocated time' }
          ].map((feature, index) => (
            <div key={index} style={{ textAlign: 'center', padding: '15px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{feature.icon}</div>
              <h4>{feature.title}</h4>
              <p style={{ color: 'var(--muted)', margin: 0, fontSize: '0.9rem' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}