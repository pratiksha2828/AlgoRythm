// TestInterface.jsx
import './app.css';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function TestInterface() {
  const location = useLocation();
  const questionsConfig = location.state || {};
  const passedTestId = questionsConfig?.testId;
  
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentDifficulty, setCurrentDifficulty] = useState('');
  const [userCode, setUserCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('javascript');
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
  const [testQuestions, setTestQuestions] = useState([]);
  const [currentQuestionData, setCurrentQuestionData] = useState(null);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [testCompleted, setTestCompleted] = useState(false);
  // eslint-disable-next-line no-empty-pattern
  const [] = useState(0);

  // Initialize questions by loading from localStorage using testId
  useEffect(() => {
    if (!passedTestId) return;
    try {
      const saved = localStorage.getItem(`test:${passedTestId}`);
      if (!saved) return;
      const parsed = JSON.parse(saved);
      const qs = Array.isArray(parsed?.questions) ? parsed.questions : [];
      setTestQuestions(qs);
      setTotalQuestions(qs.length);
      if (qs.length > 0) {
        setCurrentQuestionData(qs[0]);
        setCurrentDifficulty(qs[0]?.difficulty || '');
      }
    } catch (e) {
      console.error('Failed to load questions for test:', e);
    }
  }, [passedTestId]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !testCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setTestCompleted(true);
    }
  }, [timeLeft, testCompleted]);

  // Check if Ollama is running
  const checkOllamaStatus = async () => {
    try {
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout')), 3000);
      });
      
      const fetchPromise = fetch('http://localhost:11434/api/tags', {
        method: 'GET'
      });
      
      const response = await Promise.race([fetchPromise, timeoutPromise]);
      return response.ok;
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return false;
    }
  };

  // Submit code for evaluation
  const submitCode = async () => {
    if (!userCode.trim()) {
      alert('Please write some code before submitting.');
      return;
    }

    setIsLoading(true);
    setSubmissionResult(null);

    try {
      const isOllamaRunning = await checkOllamaStatus();
      
      if (!isOllamaRunning) {
        // Fallback evaluation when Ollama is not available
        setSubmissionResult({
          refactoringPotential: '50%',
          refactoringPercentage: 50,
          feedback: 'Ollama is not running. Code evaluation requires Ollama to be running locally. Please start Ollama and try again.',
          testResults: 'Evaluation unavailable',
          rawEvaluation: 'Ollama service not available'
        });
        return;
      }

      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mistral:latest',
          prompt: `Evaluate this ${language} code for the following problem:

Problem: ${currentQuestionData.problem}
Function Signature: ${currentQuestionData.functionSignature}
Test Cases: ${JSON.stringify(currentQuestionData.testCases)}

User's Code:
${userCode}

Please provide:
1. Refactoring Potential: What percentage (0-100%) of the code can be refactored for better readability, efficiency, or best practices?
2. Feedback: Brief explanation of what can be improved and how.
3. Test Results: How many test cases pass? (if any)

Format your response as:
Refactoring Potential: [0-100]%
Feedback: [explanation]
Test Results: [X/Y test cases passed]`,
          stream: false,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const evaluation = data.response;
        
        // Parse the evaluation result
        const lines = evaluation.split('\n').filter(line => line.trim());
        const refactoringPotential = lines.find(line => line.startsWith('Refactoring Potential:'))?.replace('Refactoring Potential:', '').trim() || '0%';
        const feedback = lines.find(line => line.startsWith('Feedback:'))?.replace('Feedback:', '').trim() || 'No feedback available';
        const testResults = lines.find(line => line.startsWith('Test Results:'))?.replace('Test Results:', '').trim() || 'Unknown';

        // Extract percentage from refactoring potential
        const percentageMatch = refactoringPotential.match(/(\d+)%/);
        const refactoringPercentage = percentageMatch ? parseInt(percentageMatch[1]) : 0;
        
        setSubmissionResult({
          refactoringPotential,
          refactoringPercentage,
          feedback,
          testResults,
          rawEvaluation: evaluation
        });
      } else {
        throw new Error('Failed to evaluate code');
      }
    } catch (error) {
      console.error('Error evaluating code:', error);
      setSubmissionResult({
        refactoringPotential: 'Error',
        refactoringPercentage: 0,
        feedback: 'Could not evaluate code. Please make sure Ollama is running.',
        testResults: 'Error',
        rawEvaluation: 'Evaluation failed'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Navigate to next question
  const nextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      const nextQ = currentQuestion + 1;
      setCurrentQuestion(nextQ);
      setCurrentQuestionData(testQuestions[nextQ - 1]);
      setCurrentDifficulty(testQuestions[nextQ - 1].difficulty);
      setUserCode('');
      setSubmissionResult(null);
    } else {
      setTestCompleted(true);
    }
  };

  // Navigate to previous question
  const prevQuestion = () => {
    if (currentQuestion > 1) {
      const prevQ = currentQuestion - 1;
      setCurrentQuestion(prevQ);
      setCurrentQuestionData(testQuestions[prevQ - 1]);
      setCurrentDifficulty(testQuestions[prevQ - 1].difficulty);
      setUserCode('');
      setSubmissionResult(null);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'hard': return '#f44336';
      default: return '#666';
    }
  };

  const languages = [
    'javascript', 'python', 'java', 'c++', 'c#', 'typescript', 'php', 'ruby',
    'go', 'rust', 'swift', 'kotlin'
  ];

  // If no questions are available, show an informative message
  if (!testQuestions.length) {
    return (
      <div className="wrap" style={{ textAlign: 'center', padding: '50px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📝</div>
        <h2>No Questions Found</h2>
        <p style={{ color: 'var(--muted)' }}>This Test ID has no saved questions. The creator must generate and save questions first.</p>
        <div style={{ marginTop: '20px' }}>
          <Link to="/create-test" className="btn primary">Go to Create Test</Link>
        </div>
      </div>
    );
  }

  // Show test completed screen
  if (testCompleted) {
    return (
      <div className="wrap" style={{ textAlign: 'center', padding: '50px' }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎉</div>
        <h1>Test Completed!</h1>
        <div style={{
          background: 'var(--card)',
          padding: '30px',
          borderRadius: '12px',
          margin: '30px auto',
          maxWidth: '500px',
          border: '2px solid var(--brand)'
        }}>
          <h2>Test Summary</h2>
          <p style={{ color: 'var(--muted)' }}>
            You completed {totalQuestions} questions in {formatTime(3600 - timeLeft)}
          </p>
          <div style={{ 
            marginTop: '20px', 
            padding: '15px', 
            background: 'var(--bg)', 
            borderRadius: '8px' 
          }}>
            <p><strong>Questions Completed:</strong> {totalQuestions}</p>
            <p><strong>Time Taken:</strong> {formatTime(3600 - timeLeft)}</p>
          </div>
        </div>
        <div style={{ marginTop: '30px' }}>
          <Link to="/create-test" className="btn primary">
            Take Another Test
          </Link>
          <Link to="/" className="btn secondary" style={{ marginLeft: '10px' }}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

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
            <h1>🧪 Coding Test</h1>
            <p>Question {currentQuestion} of {totalQuestions} • Difficulty: <span style={{ 
              color: getDifficultyColor(currentDifficulty),
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
            <h3>📝 Problem Statement</h3>
            <p style={{ color: 'var(--muted)', marginBottom: '20px' }}>
              {currentQuestionData?.problem}
            </p>

            {currentQuestionData?.functionSignature && (
              <div style={{ marginBottom: '20px' }}>
                <h4>Function Signature:</h4>
                <pre style={{
                  background: 'var(--bg)',
                  padding: '15px',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  border: '1px solid var(--border)'
                }}>
                  {currentQuestionData.functionSignature}
                </pre>
              </div>
            )}

            {currentQuestionData?.exampleInput && (
              <div style={{ marginBottom: '20px' }}>
                <h4>Example:</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <strong>Input:</strong>
                    <pre style={{
                      background: 'var(--bg)',
                      padding: '10px',
                      borderRadius: '4px',
                      fontFamily: 'monospace',
                      fontSize: '12px',
                      marginTop: '5px'
                    }}>
                      {currentQuestionData.exampleInput}
                    </pre>
                  </div>
                  <div>
                    <strong>Expected Output:</strong>
                    <pre style={{
                      background: 'var(--bg)',
                      padding: '10px',
                      borderRadius: '4px',
                      fontFamily: 'monospace',
                      fontSize: '12px',
                      marginTop: '5px'
                    }}>
                      {currentQuestionData.expectedOutput}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {currentQuestionData?.constraints && (
              <div style={{ marginBottom: '20px' }}>
                <h4>Constraints:</h4>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                  {currentQuestionData.constraints}
                </p>
              </div>
            )}

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
                Your Solution:
              </label>
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                rows="15"
                placeholder="Write your code here..."
                style={{ 
                  width: '100%', 
                  padding: '15px', 
                  borderRadius: '8px', 
                  border: '1px solid var(--border)',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  resize: 'vertical'
                }}
              />
            </div>

            <button
              onClick={submitCode}
              disabled={isLoading || !userCode.trim()}
              className="btn primary"
              style={{ width: '100%', padding: '15px' }}
            >
              {isLoading ? '🔄 Evaluating...' : '✅ Submit Solution'}
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
              onClick={prevQuestion}
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
              onClick={nextQuestion}
              disabled={currentQuestion === totalQuestions}
            >
              {currentQuestion === totalQuestions ? 'Finish Test' : 'Next Question →'}
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div>
          <div style={{ background: 'var(--card)', padding: '25px', borderRadius: '12px', marginBottom: '20px' }}>
            <h3>📊 Submission Results</h3>

            {isLoading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '15px' }}>⚡</div>
                <p>AI is evaluating your solution...</p>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                  Analyzing code quality and refactoring potential
                </p>
              </div>
            ) : submissionResult ? (
              <>
                {/* Refactoring Potential Display */}
                <div style={{ 
                  background: 'var(--bg)', 
                  padding: '20px', 
                  borderRadius: '8px', 
                  marginBottom: '20px',
                  border: `2px solid ${submissionResult.refactoringPercentage <= 30 ? '#4CAF50' : submissionResult.refactoringPercentage <= 70 ? '#FF9800' : '#f44336'}`,
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '5px' }}>
                    Refactoring Potential
                  </div>
                  <div style={{ 
                    fontSize: '2.5rem', 
                    fontWeight: 'bold',
                    color: submissionResult.refactoringPercentage <= 30 ? '#4CAF50' : submissionResult.refactoringPercentage <= 70 ? '#FF9800' : '#f44336'
                  }}>
                    {submissionResult.refactoringPotential}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
                    {submissionResult.refactoringPercentage <= 30 ? '✅ Well optimized' : 
                     submissionResult.refactoringPercentage <= 70 ? '⚠️ Can be improved' : '🔧 Needs refactoring'}
                  </div>
                </div>

                {/* Test Results */}
                <div style={{ marginBottom: '20px' }}>
                  <h4>Test Results:</h4>
                  <p style={{ color: 'var(--muted)' }}>{submissionResult.testResults}</p>
                </div>

                {/* Feedback */}
                <div style={{ marginBottom: '20px' }}>
                  <h4>Feedback:</h4>
                  <div style={{
                    background: 'var(--bg)',
                    padding: '15px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    fontStyle: 'italic'
                  }}>
                    {submissionResult.feedback}
                  </div>
                </div>

                {/* Raw Evaluation (for debugging) */}
                <details style={{ marginTop: '20px' }}>
                  <summary style={{ cursor: 'pointer', color: 'var(--muted)' }}>
                    View Detailed Evaluation
                  </summary>
                  <pre style={{
                    background: 'var(--bg)',
                    padding: '15px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    marginTop: '10px',
                    overflow: 'auto',
                    maxHeight: '200px',
                    border: '1px solid var(--border)'
                  }}>
                    {submissionResult.rawEvaluation}
                  </pre>
                </details>
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
                <p>Submit your solution to see results</p>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                  Get AI-powered feedback on code quality and refactoring potential
                </p>
              </div>
            )}
          </div>

          {/* Test Instructions */}
          <div style={{ background: 'var(--card)', padding: '25px', borderRadius: '12px' }}>
            <h3>📋 Test Instructions</h3>
            <ul style={{ color: 'var(--muted)', paddingLeft: '20px' }}>
              <li>Write clean, efficient code that solves the problem</li>
              <li>Follow the provided function signature exactly</li>
              <li>Consider edge cases and constraints</li>
              <li>Use meaningful variable names</li>
              <li>Add comments for complex logic</li>
              <li>Test your solution with the provided examples</li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}