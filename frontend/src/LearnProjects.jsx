import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

export default function LearnProjects() {
  const [repoUrl, setRepoUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  // If redirected from OAuth with repo token, store it and navigate to list page
  useEffect(() => {
    const token = searchParams.get('repo_token')
    const username = searchParams.get('repo_username')
    if (token && username) {
      localStorage.setItem('github_repo_token', token)
      localStorage.setItem('github_repo_username', username)
      localStorage.setItem('github_repo_time', Date.now().toString())
      navigate('/learn/projects/repos')
    }
  }, [searchParams, navigate])


  const handleAnalyze = async () => {
    setError('')
    setResult(null)
    const trimmed = repoUrl.trim()
    if (!trimmed) {
      setError('Please enter a GitHub repository URL')
      return
    }
    try {
      setLoading(true)
      const res = await fetch('http://localhost:5000/api/deepwiki/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl: trimmed })
      })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || 'Request failed')
      }
      const data = await res.json()
      setResult(data.summary || data)
    } catch (e) {
      setError(e.message || 'Failed to analyze repository')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="wrap">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">Algorythm</Link>
          <nav className="nav">
            <Link to="/projects" className="nav-link">Back</Link>
          </nav>
        </div>
      </header>

      <section className="hero">
        <h1>Learn Through Live Projects</h1>
        <p>Paste a GitHub repository URL to analyze with DeepWiki-open.</p>
      </section>

      <div className="panel">
        <label htmlFor="repoUrl" style={{ display: 'block', marginBottom: 8 }}>GitHub Repository URL</label>
        <input
          id="repoUrl"
          type="url"
          placeholder="https://github.com/owner/repo"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 14px',
            borderRadius: 10,
            border: '1px solid #2c3150',
            background: '#0d1020',
            color: 'var(--ink)'
          }}
        />
        <div className="actions" style={{ marginTop: 12 }}>
          <button className="btn primary" onClick={handleAnalyze} disabled={loading}>
            {loading ? 'Analyzing…' : 'Next'}
          </button>
        </div>
        {error && (
          <div style={{ marginTop: 12, color: 'var(--warn)' }}>{error}</div>
        )}
      </div>

      {result && (
        <div className="panel">
          <h3 style={{ marginTop: 0 }}>{result.title || 'Analysis Summary'}</h3>
          <p style={{ color: 'var(--muted)' }}>{result.repoUrl}</p>
          {Array.isArray(result.findings) && (
            <ul>
              {result.findings.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          )}

          {Array.isArray(result.modules) && result.modules.length > 0 && (
            <div className="block">
              <h4>Modules</h4>
              <ul>
                {result.modules.map((m, i) => (
                  <li key={i}><strong>{m.name}</strong> — {m.description}</li>
                ))}
              </ul>
            </div>
          )}

          {Array.isArray(result.files) && result.files.length > 0 && (
            <div className="block">
              <h4>Files (depth-limited)</h4>
              <div style={{ maxHeight: 320, overflow: 'auto', border: '1px solid #22263b', borderRadius: 8, padding: 12 }}>
                <ul style={{ margin: 0 }}>
                  {result.files.map((f, i) => (
                    <li key={i} style={{ marginBottom: 6 }}>
                      <code>{f.path}</code>
                      {f.detailedExplanation && (
                        <div style={{ color: 'var(--muted)', marginTop: 4, fontSize: '0.9rem' }}>
                          {f.detailedExplanation}
                        </div>
                      )}
                      {!f.detailedExplanation && f.summary && (
                        <div style={{ color: 'var(--muted)', marginTop: 4 }}>{f.summary}</div>
                      )}
                      {!f.detailedExplanation && !f.summary && f.explanation && (
                        <div style={{ color: 'var(--muted)', marginTop: 4 }}>{f.explanation}</div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {Array.isArray(result.relationships) && result.relationships.length > 0 && (
            <div className="block">
              <h4>Relationships (imports)</h4>
              <div style={{ maxHeight: 240, overflow: 'auto', border: '1px dashed #2c3150', borderRadius: 8, padding: 12 }}>
                <ul style={{ margin: 0 }}>
                  {result.relationships.slice(0, 300).map((e, i) => (
                    <li key={i}>
                      <code>{e.from}</code> → <code>{e.to}</code>
                      {e.resolvedTo && (
                        <span style={{ color: 'var(--muted)' }}> (resolved: <code>{e.resolvedTo}</code>)</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {result.comprehensiveAnalysis && (
            <>
              <div className="block">
                <h4>🏗️ Architecture Analysis</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginTop: '12px' }}>
                  <div style={{ background: 'var(--bg)', padding: '12px', borderRadius: '8px' }}>
                    <strong>Type:</strong> {result.comprehensiveAnalysis.architecture.type}
                  </div>
                  <div style={{ background: 'var(--bg)', padding: '12px', borderRadius: '8px' }}>
                    <strong>Frameworks:</strong> {result.comprehensiveAnalysis.architecture.frameworks.join(', ')}
                  </div>
                  <div style={{ background: 'var(--bg)', padding: '12px', borderRadius: '8px' }}>
                    <strong>Database:</strong> {result.comprehensiveAnalysis.architecture.database}
                  </div>
                  <div style={{ background: 'var(--bg)', padding: '12px', borderRadius: '8px' }}>
                    <strong>APIs:</strong> {result.comprehensiveAnalysis.architecture.api.join(', ')}
                  </div>
                </div>
                <div style={{ marginTop: '12px' }}>
                  <strong>Design Patterns:</strong> {result.comprehensiveAnalysis.architecture.patterns.join(', ')}
                </div>
              </div>

              <div className="block">
                <h4>📊 Code Quality Analysis</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginTop: '12px' }}>
                  <div style={{ background: 'var(--bg)', padding: '12px', borderRadius: '8px' }}>
                    <strong>Complexity:</strong> {result.comprehensiveAnalysis.codeQuality.complexity.level}
                    <br />
                    <small>{result.comprehensiveAnalysis.codeQuality.complexity.averageLinesPerFile} lines/file</small>
                  </div>
                  <div style={{ background: 'var(--bg)', padding: '12px', borderRadius: '8px' }}>
                    <strong>Maintainability:</strong> {result.comprehensiveAnalysis.codeQuality.maintainability.level}
                    <br />
                    <small>Score: {result.comprehensiveAnalysis.codeQuality.maintainability.score}</small>
                  </div>
                  <div style={{ background: 'var(--bg)', padding: '12px', borderRadius: '8px' }}>
                    <strong>Test Coverage:</strong> {result.comprehensiveAnalysis.codeQuality.testCoverage.level}
                    <br />
                    <small>{result.comprehensiveAnalysis.codeQuality.testCoverage.percentage}%</small>
                  </div>
                  <div style={{ background: 'var(--bg)', padding: '12px', borderRadius: '8px' }}>
                    <strong>Security:</strong> {result.comprehensiveAnalysis.codeQuality.security.level}
                    <br />
                    <small>Score: {result.comprehensiveAnalysis.codeQuality.security.score}</small>
                  </div>
                </div>
              </div>

              {result.comprehensiveAnalysis.insights && result.comprehensiveAnalysis.insights.length > 0 && (
                <div className="block">
                  <h4>💡 Key Insights</h4>
                  <ul>
                    {result.comprehensiveAnalysis.insights.map((insight, i) => (
                      <li key={i}>{insight}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.comprehensiveAnalysis.recommendations && result.comprehensiveAnalysis.recommendations.length > 0 && (
                <div className="block">
                  <h4>🎯 Recommendations</h4>
                  <ul>
                    {result.comprehensiveAnalysis.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {result.deepwiki && (
            <div className="block">
              <h4>DeepWiki External Insights</h4>
              <pre className="prompt" style={{ whiteSpace: 'pre-wrap' }}>
{JSON.stringify(result.deepwiki, null, 2)}
              </pre>
            </div>
          )}

          {Array.isArray(result.nextSteps) && result.nextSteps.length > 0 && (
            <div className="block">
              <h4>Next Steps</h4>
              <ul>
                {result.nextSteps.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}


