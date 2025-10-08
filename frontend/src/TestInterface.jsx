// TestInterface.jsx
import './app.css';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function TestInterface() {
  const location = useLocation();
  const questionsConfig = location.state || { easy: 0, medium: 0, hard: 0 };
  
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentDifficulty, setCurrentDifficulty] = useState('');
  const [code, setCode] = useState('');
  const [refactoredCode, setRefactoredCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('javascript');
  const [refactoringTips, setRefactoringTips] = useState([]);
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds

  // Initialize questions based on difficulty configuration
  useEffect(() => {
    const total = parseInt(questionsConfig.easy || 0) + 
                 parseInt(questionsConfig.medium || 0) + 
                 parseInt(questionsConfig.hard || 0);
    setTotalQuestions(total);
    
    // Set initial difficulty based on available questions
    if (questionsConfig.easy > 0) {
      setCurrentDifficulty('easy');
    } else if (questionsConfig.medium > 0) {
      setCurrentDifficulty('medium');
    } else if (questionsConfig.hard > 0) {
      setCurrentDifficulty('hard');
    }

    // Load sample question based on difficulty
    loadQuestion(1, 'easy');
  }, [questionsConfig]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const loadQuestion = (questionNum, difficulty) => {
    // Sample questions for each difficulty level
    const sampleQuestions = {
      easy: `// Fix this function to properly calculate the sum of an array
function calculateSum(arr) {
  let sum = 0;
  for (let i = 0; i <= arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

// Example usage:
// console.log(calculateSum([1, 2, 3, 4, 5])); // Should return 15`,

      medium: `// Refactor this function to handle async operations properly
function fetchUserData(userId) {
  return fetch('/api/users/' + userId)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

// Add proper error handling and modern async/await syntax`,

      hard: `// Optimize this React component for performance and best practices
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true
    };
  }
  
  componentDidMount() {
    this.fetchUsers();
  }
  
  fetchUsers() {
    fetch('/api/users')
      .then(res => res.json())
      .then(users => {
        this.setState({ users, loading: false });
      });
  }
  
  render() {
    return (
      <div>
        {this.state.loading ? (
          <div>Loading...</div>
        ) : (
          this.state.users.map(user => (
            <div key={user.id}>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          ))
        )}
      </div>
    );
  }
}`
    };

    setCode(sampleQuestions[difficulty] || '');
    setRefactoredCode('');
    setRefactoringTips([]);
  };

  const refactorCode = async () => {
    if (!code.trim()) return;
    
    setIsLoading(true);
    setRefactoredCode('');
    setRefactoringTips([]);

    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'codellama:7b',
          prompt: `Refactor this ${language} code to make it more efficient, readable, and maintainable. Provide only the refactored code without explanations:\n\n${code}`,
          stream: false,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setRefactoredCode(data.response);
        
        const tipsResponse = await fetch('http://localhost:11434/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'codellama:7b',
            prompt: `List 3-5 specific improvements made in this refactoring of ${language} code. Be concise and focus on best practices:\n\nOriginal:\n${code}\n\nRefactored:\n${data.response}`,
            stream: false,
          }),
        });

        if (tipsResponse.ok) {
          const tipsData = await tipsResponse.json();
          setRefactoringTips(tipsData.response.split('\n').filter(tip => tip.trim()));
        }
      } else {
        throw new Error('Failed to refactor code');
      }
    } catch (error) {
      console.error('Error:', error);
      setRefactoredCode('Error: Could not refactor code. Please make sure Ollama is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const languages = [
    'javascript', 'python', 'java', 'c++', 'c#', 'typescript', 'php', 'ruby',
    'go', 'rust', 'swift', 'kotlin', 'html', 'css', 'sql'
  ];

  return (
    <div className="wrap">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">Algorythm</Link>
          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/create-test" className="nav-link">Create Test</Link>
          </nav>
        </div>
      </header>

      {/* Test Header */}
      <section className="hero" style={{ padding: '30px 0' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <div>
            <h1>🧪 Coding Assessment</h1>
            <p>Question {currentQuestion} of {totalQuestions} • Difficulty: <span style={{ 
              color: currentDifficulty === 'easy' ? '#4CAF50' : 
                     currentDifficulty === 'medium' ? '#FF9800' : '#f44336',
              fontWeight: 'bold'
            }}>{currentDifficulty}</span></p>
          </div>
          <div style={{ 
            background: 'var(--card)', 
            padding: '15px 20px', 
            borderRadius: '8px',
            border: '2px solid var(--brand)'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              ⏱️ {formatTime(timeLeft)}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Time Remaining</div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '20px auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        
        {/* Question Section */}
        <div>
          <div style={{ background: 'var(--card)', padding: '25px', borderRadius: '12px', marginBottom: '20px' }}>
            <h3>📝 Code Refactoring Challenge</h3>
            <p style={{ color: 'var(--muted)', marginBottom: '20px' }}>
              Refactor the following code to improve its quality, readability, and maintainability.
            </p>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Programming Language:
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }}
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang.toUpperCase()}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Original Code to Refactor:
              </label>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows="12"
                style={{ 
                  width: '100%', 
                  padding: '15px', 
                  borderRadius: '8px', 
                  border: '1px solid var(--border)',
                  fontFamily: 'monospace',
                  fontSize: '14px'
                }}
              />
            </div>

            <button
              onClick={refactorCode}
              disabled={isLoading || !code.trim()}
              className="btn primary"
              style={{ width: '100%', padding: '15px' }}
            >
              {isLoading ? '🔄 Analyzing Code...' : '♻️ Submit Refactored Solution'}
            </button>
          </div>

          {/* Navigation */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            background: 'var(--card)', 
            padding: '20px', 
            borderRadius: '12px' 
          }}>
            <button 
              className="btn secondary"
              disabled={currentQuestion === 1}
            >
              ← Previous Question
            </button>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>Progress</div>
              <div style={{ fontWeight: 'bold' }}>
                {currentQuestion} / {totalQuestions}
              </div>
            </div>
            
            <button 
              className="btn primary"
              disabled={currentQuestion === totalQuestions}
            >
              Next Question →
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div>
          <div style={{ background: 'var(--card)', padding: '25px', borderRadius: '12px', marginBottom: '20px' }}>
            <h3>✅ Refactoring Results</h3>

            {isLoading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '15px' }}>⚡</div>
                <p>AI is analyzing your solution...</p>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                  Checking code quality, performance, and best practices
                </p>
              </div>
            ) : refactoredCode ? (
              <>
                <pre style={{
                  background: 'var(--bg)',
                  padding: '20px',
                  borderRadius: '8px',
                  overflow: 'auto',
                  maxHeight: '300px',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  lineHeight: '1.4',
                  border: '1px solid var(--border)'
                }}>
                  {refactoredCode}
                </pre>
                
                {refactoringTips.length > 0 && (
                  <div style={{ marginTop: '20px' }}>
                    <h4>📋 Improvements Made:</h4>
                    <ul style={{ color: 'var(--muted)', paddingLeft: '20px' }}>
                      {refactoringTips.map((tip, index) => (
                        <li key={index} style={{ marginBottom: '8px' }}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div style={{ 
                background: 'var(--bg)', 
                padding: '40px', 
                borderRadius: '8px', 
                textAlign: 'center',
                border: '2px dashed var(--border)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📝</div>
                <p>Your refactoring results will appear here</p>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                  Submit your solution to get AI-powered feedback and improvements
                </p>
              </div>
            )}
          </div>

          {/* Assessment Criteria */}
          <div style={{ background: 'var(--card)', padding: '25px', borderRadius: '12px' }}>
            <h3>🎯 Assessment Criteria</h3>
            <ul style={{ color: 'var(--muted)', paddingLeft: '20px' }}>
              <li><strong>Code Quality:</strong> Readability, maintainability, and structure</li>
              <li><strong>Performance:</strong> Efficiency and optimization</li>
              <li><strong>Best Practices:</strong> Following language conventions</li>
              <li><strong>Error Handling:</strong> Proper validation and edge cases</li>
              <li><strong>Simplicity:</strong> Clear and concise solutions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}