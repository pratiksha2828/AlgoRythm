import './app.css';
import { useState, useEffect } from 'react';
import { getQuestionsForAssessment } from './AssessmentData';

export default function TechnicalAssessment({ onComplete, userSelections, onClose }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [assessmentKey, setAssessmentKey] = useState(0); // NEW: force remount on retry

  // Load questions whenever userSelections or assessmentKey changes
  useEffect(() => {
    const assessmentQuestions = getQuestionsForAssessment(userSelections, 10);
    setQuestions(assessmentQuestions);
  }, [userSelections, assessmentKey]);

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResults) {
      handleFinish();
    }
  }, [timeLeft, showResults]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (optionIndex) => {
    setSelectedOption(optionIndex);

    if (optionIndex === questions[currentQuestion]?.correct) {
      setScore((prev) => prev + 1);
    } else {
      setIncorrect((prev) => prev + 1);
    }

    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    setShowResults(true);
    if (onComplete) {
      onComplete(score, questions.length);
    }
  };

  const restartAssessment = () => {
    // Force a complete reset by changing the key
    setAssessmentKey((prev) => prev + 1);
    setCurrentQuestion(0);
    setScore(0);
    setIncorrect(0);
    setShowResults(false);
    setTimeLeft(600);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  if (questions.length === 0) {
    return (
      <div className="wrap">
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2>Loading Assessment...</h2>
          <p>Preparing your personalized technical assessment</p>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  if (!currentQ || !Array.isArray(currentQ.options) || currentQ.options.length === 0) {
    console.error('Invalid question encountered:', currentQ);
    return (
      <div className="wrap">
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2>Error Loading Questions</h2>
          <button className="btn primary" onClick={restartAssessment}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const percentage = (score / questions.length) * 100;
    let feedback = '';
    let emoji = '🎯';

    if (percentage >= 80) {
      feedback = 'Excellent! You have strong knowledge in this area!';
      emoji = '🎉';
    } else if (percentage >= 60) {
      feedback = 'Good job! You have a solid foundation.';
      emoji = '👍';
    } else if (percentage >= 40) {
      feedback = "Keep learning! You're on the right track.";
      emoji = '📚';
    } else {
      feedback = "Don't worry! This is a great starting point for your learning journey.";
      emoji = '🚀';
    }

    return (
      <div className="wrap">
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>{emoji}</div>
          <h1>Assessment Complete!</h1>
          <div className="panel" style={{ maxWidth: '500px', margin: '20px auto' }}>
            <h2>Your Score: {score}/{questions.length}</h2>
            <p style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: percentage >= 60 ? 'var(--ok)' : 'var(--warn)'
            }}>
              {percentage.toFixed(1)}%
            </p>
            <p>{feedback}</p>
          </div>

          <div style={{ margin: '30px 0' }}>
            <h3>Next Steps:</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px',
              marginTop: '20px'
            }}>
              <button className="btn primary" onClick={restartAssessment}>
                Retry Assessment
              </button>
              <button className="btn" onClick={onClose}>
                Back to Filters
              </button>
              <button className="btn ghost" onClick={() => onComplete(score, questions.length)}>
                Generate Roadmap
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div key={assessmentKey} className="wrap">
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <h1>Quick Technical Assessment</h1>
        <div style={{
          background: 'var(--card)',
          padding: '10px 15px',
          borderRadius: '20px',
          border: '1px solid var(--brand)'
        }}>
          ⏰ Time: {formatTime(timeLeft)}
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{
        background: 'var(--bg)',
        height: '8px',
        borderRadius: '4px',
        marginBottom: '30px',
        overflow: 'hidden'
      }}>
        <div style={{
          background: 'linear-gradient(90deg, var(--brand), var(--ok))',
          height: '100%',
          width: `${progress}%`,
          transition: 'width 0.3s ease'
        }}></div>
      </div>

      {/* Question */}
      <div className="panel">
        <div style={{ marginBottom: '20px' }}>
          <span style={{
            background: 'var(--brand)',
            color: 'var(--brand-ink)',
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>

        <h2 style={{ marginBottom: '30px' }}>{currentQ.question}</h2>

        {/* Options */}
        <div style={{ display: 'grid', gap: '12px' }}>
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              className={`btn ${selectedOption === index
                ? (index === currentQ.correct ? 'primary' : 'danger')
                : 'ghost'
              }`}
              style={{
                textAlign: 'left',
                justifyContent: 'flex-start',
                padding: '15px 20px',
                opacity: selectedOption !== null && index !== currentQ.correct ? 0.6 : 1
              }}
              onClick={() => selectedOption === null && handleAnswer(index)}
              disabled={selectedOption !== null}
            >
              {String.fromCharCode(65 + index)}. {option}
            </button>
          ))}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div style={{
            marginTop: '25px',
            padding: '20px',
            background: 'var(--bg)',
            borderRadius: '12px',
            border: '1px solid var(--brand)'
          }}>
            <h4 style={{
              color: selectedOption === currentQ.correct ? 'var(--ok)' : 'var(--danger)',
              marginBottom: '10px'
            }}>
              {selectedOption === currentQ.correct ? '✓ Correct!' : '✗ Incorrect'}
            </h4>
            <p style={{ margin: 0, color: 'var(--muted)' }}>{currentQ.explanation}</p>
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
          <button className="btn ghost" onClick={onClose}>
            ← Back to Filters
          </button>

          <button
            className="btn primary"
            onClick={handleNext}
            disabled={selectedOption === null}
          >
            {currentQuestion + 1 === questions.length ? 'Finish Assessment' : 'Next Question →'}
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '15px',
        marginTop: '30px'
      }}>
        <div className="panel" style={{ textAlign: 'center', padding: '15px' }}>
          <h3 style={{ margin: '0', color: 'var(--brand)' }}>{score}</h3>
          <p style={{ margin: '5px 0 0', color: 'var(--muted)' }}>Correct</p>
        </div>
        <div className="panel" style={{ textAlign: 'center', padding: '15px' }}>
          <h3 style={{ margin: '0', color: 'var(--muted)' }}>{incorrect}</h3>
          <p style={{ margin: '5px 0 0', color: 'var(--muted)' }}>Incorrect</p>
        </div>
        <div className="panel" style={{ textAlign: 'center', padding: '15px' }}>
          <h3 style={{ margin: '0', color: 'var(--ok)' }}>
            {Math.round((score / Math.max(currentQuestion + 1, 1)) * 100)}%
          </h3>
          <p style={{ margin: '5px 0 0', color: 'var(--muted)' }}>Accuracy</p>
        </div>
      </div>
    </div>
  );
}