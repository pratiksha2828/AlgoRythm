import './app.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function RefactorCode() {
  const [code, setCode] = useState('');
  const [refactoredCode, setRefactoredCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [refactoringTips, setRefactoringTips] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const refactorCode = async () => {
    if (!code.trim()) return;
    
    setIsLoading(true);
    setRefactoredCode('');
    setRefactoringTips([]);

    try {
      // Call Ollama API for code refactoring
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'codellama:7b', // or any code model you have
          prompt: `Refactor this ${language} code to make it more efficient, readable, and maintainable. Provide only the refactored code without explanations:\n\n${code}`,
          stream: false,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setRefactoredCode(data.response);
        
        // Get refactoring tips
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

  const downloadRefactoredCode = () => {
    const element = document.createElement('a');
    const file = new Blob([refactoredCode], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `refactored-${fileName || 'code'}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
        <h1>♻️ Code Refactoring Assistant</h1>
        <p>Upload your code file and get AI-powered refactoring suggestions to improve code quality, readability, and performance</p>
        <div style={{ 
          background: 'var(--card)', 
          padding: '15px', 
          borderRadius: '12px', 
          margin: '20px auto',
          maxWidth: '600px',
          border: '1px solid var(--brand)'
        }}>
          <strong>✨ Benefits:</strong> Cleaner Code • Better Performance • Improved Readability • Best Practices
        </div>
      </section>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '40px auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        
        {/* Input Section */}
        <div>
          <div style={{ background: 'var(--card)', padding: '25px', borderRadius: '12px', marginBottom: '20px' }}>
            <h3>Upload Your Code</h3>
            
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
                Upload File:
              </label>
              <input
                type="file"
                onChange={handleFileUpload}
                accept=".js,.py,.java,.cpp,.cs,.ts,.php,.rb,.go,.rs,.swift,.kt,.html,.css,.sql,.txt"
                style={{ width: '100%', padding: '10px', border: '2px dashed var(--border)', borderRadius: '8px' }}
              />
              {fileName && (
                <p style={{ color: 'var(--muted)', marginTop: '8px' }}>
                  📄 Selected: {fileName}
                </p>
              )}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Or Paste Code:
              </label>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your code here..."
                rows="10"
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
              {isLoading ? '🔄 Refactoring...' : '♻️ Refactor Code'}
            </button>
          </div>

          {/* Tips Section */}
          {refactoringTips.length > 0 && (
            <div style={{ background: 'var(--card)', padding: '25px', borderRadius: '12px' }}>
              <h3>📋 Refactoring Improvements</h3>
              <ul style={{ color: 'var(--muted)', paddingLeft: '20px' }}>
                {refactoringTips.map((tip, index) => (
                  <li key={index} style={{ marginBottom: '8px' }}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Output Section */}
        <div>
          <div style={{ background: 'var(--card)', padding: '25px', borderRadius: '12px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3>Refactored Code</h3>
              {refactoredCode && (
                <button onClick={downloadRefactoredCode} className="btn outline" style={{ fontSize: '0.8rem' }}>
                  ⬇️ Download
                </button>
              )}
            </div>

            {isLoading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '15px' }}>⚡</div>
                <p>AI is refactoring your code...</p>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                  Analyzing patterns, optimizing logic, and applying best practices
                </p>
              </div>
            ) : refactoredCode ? (
              <pre style={{
                background: 'var(--bg)',
                padding: '20px',
                borderRadius: '8px',
                overflow: 'auto',
                maxHeight: '400px',
                fontFamily: 'monospace',
                fontSize: '14px',
                lineHeight: '1.4',
                border: '1px solid var(--border)'
              }}>
                {refactoredCode}
              </pre>
            ) : (
              <div style={{ 
                background: 'var(--bg)', 
                padding: '40px', 
                borderRadius: '8px', 
                textAlign: 'center',
                border: '2px dashed var(--border)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📝</div>
                <p>Your refactored code will appear here</p>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                  Upload a file or paste code to get AI-powered refactoring suggestions
                </p>
              </div>
            )}
          </div>

          {/* Best Practices */}
          <div style={{ background: 'var(--card)', padding: '25px', borderRadius: '12px' }}>
            <h3>🎯 Code Refactoring Best Practices</h3>
            <ul style={{ color: 'var(--muted)', paddingLeft: '20px' }}>
              <li>Keep functions small and focused on single responsibility</li>
              <li>Use meaningful variable and function names</li>
              <li>Remove duplicate code through abstraction</li>
              <li>Simplify complex conditional logic</li>
              <li>Improve error handling and validation</li>
              <li>Optimize algorithms and data structures</li>
              <li>Add proper comments and documentation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section style={{ maxWidth: '1000px', margin: '60px auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>What Our Refactoring Tool Does</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {[
            { icon: '🚀', title: 'Performance Optimization', desc: 'Improve code efficiency and speed' },
            { icon: '📖', title: 'Readability Enhancement', desc: 'Make code easier to understand and maintain' },
            { icon: '🔧', title: 'Bug Prevention', desc: 'Identify and fix potential issues' },
            { icon: '🏗️', title: 'Architecture Improvement', desc: 'Better structure and organization' },
            { icon: '📊', title: 'Best Practices', desc: 'Apply industry standards and patterns' },
            { icon: '⚡', title: 'Quick Analysis', desc: 'Instant feedback and suggestions' }
          ].map((feature, index) => (
            <div key={index} style={{ textAlign: 'center', padding: '20px', background: 'var(--card)', borderRadius: '12px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '15px' }}>{feature.icon}</div>
              <h4>{feature.title}</h4>
              <p style={{ color: 'var(--muted)', margin: 0 }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Need help with specific refactoring?</h4>
            <p style={{ color: 'var(--muted)', margin: '10px 0 0' }}>
              Try these common improvements:
              <br/>
              • Extract methods from large functions
              <br/>
              • Replace magic numbers with constants
              <br/>
              • Use proper design patterns
            </p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2025 AlgoRythm. Transform your code with AI-powered refactoring.</p>
        </div>
      </footer>
    </div>
  );
}