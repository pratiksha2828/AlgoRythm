import './app.css';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function CreateTestFinal() {
  const location = useLocation();
  const { easy, medium, hard } = location.state || { easy: 0, medium: 0, hard: 0 };
  const [questions, setQuestions] = useState({ easy: [], medium: [], hard: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Example API endpoints
        const easyRes = await fetch(`/api/questions?difficulty=easy&limit=${easy}`);
        const mediumRes = await fetch(`/api/questions?difficulty=medium&limit=${medium}`);
        const hardRes = await fetch(`/api/questions?difficulty=hard&limit=${hard}`);

        const easyQs = await easyRes.json();
        const mediumQs = await mediumRes.json();
        const hardQs = await hardRes.json();

        setQuestions({
          easy: easyQs,
          medium: mediumQs,
          hard: hardQs
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [easy, medium, hard]);

  const handleSubmit = () => {
    console.log('Selected Questions:', questions);
    alert('Test created successfully! Check console for details.');
    // You can send this to your backend for saving
  };

  if (loading) return <p style={{ textAlign: 'center', padding: '50px' }}>Loading questions...</p>;

  return (
    <div className="wrap" style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Create Your Test</h1>

      {['easy', 'medium', 'hard'].map((level) => (
        <div key={level} style={{ marginTop: '30px' }}>
          <h3 style={{ textTransform: 'capitalize' }}>{level} Questions ({questions[level].length})</h3>
          {questions[level].map((q, i) => (
            <div key={i} style={{ margin: '10px 0', padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }}>
              <p>{q.question}</p>
            </div>
          ))}
        </div>
      ))}

      <div style={{ marginTop: '30px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <button className="btn primary" onClick={handleSubmit}>
          Submit Test
        </button>
        <Link to="/" className="btn secondary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
