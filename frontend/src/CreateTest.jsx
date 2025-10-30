import './app.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { leetcode150Pool } from './leetcode150pool';

export default function CreateTest() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('main'); // 'main', 'create', 'join'
  const [testId, setTestId] = useState('');
  const [joinTestId, setJoinTestId] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [validTestIds, setValidTestIds] = useState(new Set());
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Load valid test IDs from localStorage on component mount
  useEffect(() => {
    const savedTestIds = localStorage.getItem('validTestIds');
    if (savedTestIds) {
      try {
        const parsedIds = JSON.parse(savedTestIds);
        setValidTestIds(new Set(parsedIds));
      } catch (error) {
        console.error('Error loading saved test IDs:', error);
      }
    }
  }, []);
  
  // Save valid test IDs to localStorage whenever it changes
  useEffect(() => {
    if (validTestIds.size > 0) {
      localStorage.setItem('validTestIds', JSON.stringify([...validTestIds]));
    }
  }, [validTestIds]);
  
  // State for creating test
  const [questions, setQuestions] = useState({
    easy: '',
    medium: '',
    hard: ''
  });

  // Generate unique test ID
  const generateTestId = () => {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substr(2, 5);
    return `${timestamp}-${randomStr}`.toUpperCase();
  };

  // Get random questions from LeetCode pool
  const getRandomQuestions = (difficulty, count) => {
    const pool = leetcode150Pool[difficulty] || [];
    if (count >= pool.length) {
      return [...pool]; // Return all if count >= pool size
    }
    
    // Fisher-Yates shuffle and take first 'count' elements
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
  };

  // Generate questions from LeetCode pool
  const generateQuestionsFromPool = (counts) => {
    const created = [];
    
    for (const [difficulty, countRaw] of Object.entries(counts)) {
      const count = Math.max(0, parseInt(countRaw || 0));
      if (count > 0) {
        const questions = getRandomQuestions(difficulty, count);
        created.push(...questions);
      }
    }
    
    return created;
  };

  // Validate test ID format
  const isValidTestIdFormat = (id) => {
    const testIdPattern = /^[A-Z0-9]+-[A-Z0-9]{5}$/;
    return testIdPattern.test(id);
  };

  // Check if test ID exists in valid test IDs
  const isTestIdValid = (id) => {
    return validTestIds.has(id.toUpperCase());
  };

  // Handle input change for question counts
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestions({ ...questions, [name]: value });
  };

  // Handle Create Test
  const handleCreateTest = async () => {
    if (isGenerating) return;
    const totalQuestions = parseInt(questions.easy || 0) + 
                          parseInt(questions.medium || 0) + 
                          parseInt(questions.hard || 0);
    
    if (totalQuestions === 0) {
      alert('Please enter at least one question for any difficulty level.');
      return;
    }

    const newTestId = generateTestId();
    setTestId(newTestId);
    
    // Add the new test ID to valid test IDs
    setValidTestIds(prev => new Set([...prev, newTestId]));

    try {
      setIsGenerating(true);
      const created = generateQuestionsFromPool({
        easy: questions.easy,
        medium: questions.medium,
        hard: questions.hard
      });
      setGeneratedQuestions(created);
      // Persist for joiners
      localStorage.setItem(`test:${newTestId}`, JSON.stringify({ 
        id: newTestId, 
        createdAt: Date.now(), 
        questions: created 
      }));
      setCurrentView('testCreated');
    } catch (e) {
      console.error('Failed generating questions', e);
      alert('Failed to generate questions. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle Join Test
  const handleJoinTest = () => {
    const trimmedId = joinTestId.trim().toUpperCase();
    
    if (!trimmedId) {
      alert('Please enter a Test ID.');
      return;
    }
    
    if (!isValidTestIdFormat(trimmedId)) {
      alert('Invalid Test ID format. Please enter a valid Test ID (e.g., 1A2B3C4D-EFGHI).');
      return;
    }
    
    if (!isTestIdValid(trimmedId)) {
      alert('Test ID not found. Please make sure you have the correct Test ID from the test creator.');
      return;
    }
    
    const saved = localStorage.getItem(`test:${trimmedId}`);
    if (!saved) {
      alert('This Test ID has no generated questions yet. Ask the creator to generate the test first.');
      return;
    }
    
    navigate('/test-interface', { state: { testId: trimmedId, mode: 'join' } });
  };

  // Copy test ID to clipboard
  const copyTestId = () => {
    navigator.clipboard.writeText(testId);
    alert('Test ID copied to clipboard!');
  };

  // Reset to main view
  const resetView = () => {
    setCurrentView('main');
    setTestId('');
    setJoinTestId('');
    setQuestions({ easy: '', medium: '', hard: '' });
    setGeneratedQuestions([]);
    setShowPreview(false);
  };

  // Get available question counts for each difficulty
  const getAvailableCounts = () => {
    return {
      easy: leetcode150Pool.easy?.length || 0,
      medium: leetcode150Pool.medium?.length || 0,
      hard: leetcode150Pool.hard?.length || 0
    };
  };

  const availableCounts = getAvailableCounts();

  // Main view with Test button
  if (currentView === 'main') {
    return (
      <div className="wrap" style={{ textAlign: 'center', padding: '50px' }}>
        <h1>Test Center</h1>
        <p>Create your own coding assessment or join an existing test</p>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '30px', 
          marginTop: '50px',
          flexWrap: 'wrap'
        }}>
          <button 
            className="btn primary" 
            onClick={() => setCurrentView('create')}
            style={{ 
              padding: '20px 40px', 
              fontSize: '1.2rem',
              minWidth: '200px'
            }}
          >
            📝 Create Test
          </button>
          
          <button 
            className="btn secondary" 
            onClick={() => setCurrentView('join')}
            style={{ 
              padding: '20px 40px', 
              fontSize: '1.2rem',
              minWidth: '200px'
            }}
          >
            🔗 Join Test
          </button>
        </div>

        <div style={{ marginTop: '40px' }}>
          <Link to="/" className="btn secondary">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Create Test view
  if (currentView === 'create') {
    return (
      <div className="wrap" style={{ textAlign: 'center', padding: '50px' }}>
        <h1>Create New Test</h1>
        <p>Configure your test by selecting the number of questions for each difficulty level:</p>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
          Questions are randomly selected from a pool of {availableCounts.easy + availableCounts.medium + availableCounts.hard} LeetCode-style problems
        </p>

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
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '10px' }}>
              Basic concepts, simple algorithms
            </p>
            <p style={{ color: '#4CAF50', fontSize: '0.8rem', marginBottom: '15px' }}>
              Available: {availableCounts.easy} questions
            </p>
            <input
              type="number"
              name="easy"
              value={questions.easy}
              onChange={handleChange}
              placeholder="0"
              className="input-field"
              min="0"
              max={availableCounts.easy}
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
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '10px' }}>
              Intermediate problems, common patterns
            </p>
            <p style={{ color: '#FF9800', fontSize: '0.8rem', marginBottom: '15px' }}>
              Available: {availableCounts.medium} questions
            </p>
            <input
              type="number"
              name="medium"
              value={questions.medium}
              onChange={handleChange}
              placeholder="0"
              className="input-field"
              min="0"
              max={availableCounts.medium}
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
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '10px' }}>
              Complex algorithms, optimization challenges
            </p>
            <p style={{ color: '#f44336', fontSize: '0.8rem', marginBottom: '15px' }}>
              Available: {availableCounts.hard} questions
            </p>
            <input
              type="number"
              name="hard"
              value={questions.hard}
              onChange={handleChange}
              placeholder="0"
              className="input-field"
              min="0"
              max={availableCounts.hard}
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
          <button 
            className="btn primary" 
            onClick={handleCreateTest} 
            disabled={isGenerating}
            style={{ padding: '15px 30px', fontSize: '1.1rem', minWidth: '220px' }}
          >
            {isGenerating ? '🔄 Generating…' : '🚀 Generate Test'}
          </button>
        </div>

        <div style={{ marginTop: '20px' }}>
          <button className="btn secondary" onClick={resetView}>
            ← Back to Test Center
          </button>
        </div>
      </div>
    );
  }

  // Join Test view
  if (currentView === 'join') {
    return (
      <div className="wrap" style={{ textAlign: 'center', padding: '50px' }}>
        <h1>Join Existing Test</h1>
        <p>Enter the Test ID provided by the test creator to join their assessment</p>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '10px' }}>
          Only valid Test IDs from created tests can be used to join.
        </p>

        <div style={{
          background: 'var(--card)',
          padding: '30px',
          borderRadius: '12px',
          margin: '40px auto',
          maxWidth: '500px',
          border: '1px solid var(--border)'
        }}>
          <h3 style={{ marginBottom: '20px' }}>Enter Test ID</h3>
          <input
            type="text"
            value={joinTestId}
            onChange={(e) => setJoinTestId(e.target.value.toUpperCase())}
            placeholder="Enter Test ID here (e.g., 1A2B3C4D-EFGHI)"
            className="input-field"
            style={{ 
              width: '100%', 
              padding: '15px',
              fontSize: '1.1rem',
              textAlign: 'center',
              marginBottom: '20px',
              textTransform: 'uppercase'
            }}
          />
          <button 
            className="btn primary" 
            onClick={handleJoinTest}
            style={{ padding: '15px 30px', fontSize: '1.1rem' }}
          >
            🔗 Join Test
          </button>
        </div>

        <div style={{ marginTop: '20px' }}>
          <button className="btn secondary" onClick={resetView}>
            ← Back to Test Center
          </button>
        </div>
      </div>
    );
  }

  // Test Created Success view
  if (currentView === 'testCreated') {
    return (
      <div className="wrap" style={{ textAlign: 'center', padding: '50px' }}>
        <h1>✅ Test Created Successfully!</h1>
        <p>Your test has been generated and is ready for participants to join.</p>

        <div style={{
          background: 'var(--card)',
          padding: '30px',
          borderRadius: '12px',
          margin: '40px auto',
          maxWidth: '600px',
          border: '2px solid #4CAF50'
        }}>
          <h3 style={{ color: '#4CAF50', marginBottom: '20px' }}>Your Test ID</h3>
          <div style={{
            background: '#f5f5f5',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '1px solid #ddd'
          }}>
            <code style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold',
              color: '#333',
              letterSpacing: '2px'
            }}>
              {testId}
            </code>
          </div>
          <button 
            className="btn secondary" 
            onClick={copyTestId}
            style={{ marginBottom: '20px' }}
          >
            📋 Copy Test ID
          </button>
          
          <div style={{ marginTop: '20px', padding: '15px', background: '#e8f5e8', borderRadius: '8px' }}>
            <p style={{ margin: 0, color: '#2e7d32' }}>
              <strong>Share this Test ID with participants so they can join your test!</strong>
            </p>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <button 
            className="btn primary" 
            onClick={() => {
              if (!generatedQuestions || generatedQuestions.length === 0) {
                alert('Please generate the test first.');
                return;
              }
              navigate('/test-interface', { state: { testId, mode: 'create' } });
            }}
            style={{ padding: '15px 30px', fontSize: '1.1rem', marginRight: '10px' }}
          >
            🚀 Start Test Now
          </button>
          <button 
            className="btn secondary" 
            onClick={() => setShowPreview(true)}
            style={{ padding: '15px 30px', fontSize: '1.1rem', marginRight: '10px' }}
          >
            👀 Preview
          </button>
          <button className="btn secondary" onClick={resetView}>
            ← Back to Test Center
          </button>
        </div>

        {showPreview && (
          <div 
            role="dialog" 
            aria-modal="true"
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              zIndex: 1000
            }}
          >
            <div style={{
              background: 'var(--card)',
              width: 'min(1000px, 95vw)',
              maxHeight: '85vh',
              overflow: 'auto',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid var(--border)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h2 style={{ margin: 0 }}>Preview & Edit Questions</h2>
                <button className="btn secondary" onClick={() => setShowPreview(false)}>✖ Close</button>
              </div>
              <p style={{ color: 'var(--muted)' }}>Review the generated questions. You can edit any question before starting the test.</p>

              {generatedQuestions.length === 0 ? (
                <div style={{ padding: '20px', background: 'var(--bg)', borderRadius: '8px', textAlign: 'center', border: '1px dashed var(--border)' }}>
                  No questions generated.
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', marginTop: '16px' }}>
                  {generatedQuestions.map((q, idx) => (
                    <div key={q.id} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <strong>Q{idx + 1} • {q.difficulty.toUpperCase()}</strong>
                        <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{q.id}</span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                        <div>
                          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Problem</label>
                          <textarea
                            value={q.problem || ''}
                            onChange={(e) => {
                              const updated = [...generatedQuestions];
                              updated[idx] = { ...q, problem: e.target.value };
                              setGeneratedQuestions(updated);
                            }}
                            rows="6"
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', fontFamily: 'monospace', fontSize: '14px' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Function Signature</label>
                          <input
                            type="text"
                            value={q.functionSignature || ''}
                            onChange={(e) => {
                              const updated = [...generatedQuestions];
                              updated[idx] = { ...q, functionSignature: e.target.value };
                              setGeneratedQuestions(updated);
                            }}
                            className="input-field"
                            style={{ width: '100%' }}
                          />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                          <div>
                            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Example Input</label>
                            <input
                              type="text"
                              value={q.exampleInput || ''}
                              onChange={(e) => {
                                const updated = [...generatedQuestions];
                                updated[idx] = { ...q, exampleInput: e.target.value };
                                setGeneratedQuestions(updated);
                              }}
                              className="input-field"
                              style={{ width: '100%' }}
                            />
                          </div>
                          <div>
                            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Expected Output</label>
                            <input
                              type="text"
                              value={q.expectedOutput || ''}
                              onChange={(e) => {
                                const updated = [...generatedQuestions];
                                updated[idx] = { ...q, expectedOutput: e.target.value };
                                setGeneratedQuestions(updated);
                              }}
                              className="input-field"
                              style={{ width: '100%' }}
                            />
                          </div>
                        </div>
                        <div>
                          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Constraints</label>
                          <textarea
                            value={q.constraints || ''}
                            onChange={(e) => {
                              const updated = [...generatedQuestions];
                              updated[idx] = { ...q, constraints: e.target.value };
                              setGeneratedQuestions(updated);
                            }}
                            rows="3"
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', fontFamily: 'monospace', fontSize: '14px' }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '16px' }}>
                <button 
                  className="btn secondary" 
                  onClick={() => {
                    try {
                      if (testId) {
                        localStorage.setItem(`test:${testId}`, JSON.stringify({ id: testId, createdAt: Date.now(), questions: generatedQuestions }));
                        alert('Saved changes to questions.');
                      }
                    } catch (e) {
                      console.error('Failed saving questions', e);
                      alert('Failed to save changes.');
                    }
                  }}
                >💾 Save Changes</button>
                <button className="btn secondary" onClick={() => setShowPreview(false)}>Done</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}