import React, { useState } from 'react';
import './GithubAnalysis.css'; // <-- Corrected import

const LearnProjects = () => {
    const [repoUrl, setRepoUrl] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [analysisResult, setAnalysisResult] = useState('');
    const [deepwikiUrl, setDeepwikiUrl] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const validateInputs = () => {
        if (!repoUrl) {
            setErrorMsg('Please enter a GitHub repository URL');
            return false;
        }
        setErrorMsg('');
        return true;
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleBasicAnalysis = async () => {
        if (!validateInputs()) return;
        setLoading('basic');
        setErrorMsg('');
        try {
            const response = await fetch('http://localhost:5000/api/deepwiki/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ repoUrl })
            });
            const result = await response.json();
            if (result.status === 'success' || result.status === 'ok') {
                setAnalysisResult(result);
                setShowResult(true);
            } else {
                setErrorMsg(result.error || 'Analysis failed.');
            }
        } catch {
            setErrorMsg('Failed to analyze repository. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeepAnalysis = async () => {
        if (!validateInputs()) return;
        if (!isValidEmail(email)) {
            setErrorMsg('Please enter a valid email address');
            return;
        }
        setLoading('deep');
        setErrorMsg('');
        try {
            const response = await fetch('http://localhost:5000/api/deepwiki/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ repoUrl, email })
            });
            const result = await response.json();
            if (result.status === 'success' || result.status === 'partial_success') {
                setShowSuccess(true);
                setDeepwikiUrl(result.data?.deepwiki_url || '');
            } else {
                setErrorMsg(result.error || 'Submission failed.');
            }
        } catch {
            setErrorMsg('Failed to submit for deep analysis. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Event handlers for input changes
    const handleRepoUrlChange = (event) => {
        setRepoUrl(event.target.value);
        setErrorMsg('');
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setErrorMsg('');
    };

    return (
        <div className="github-analysis-container">
            <div className="container">
                <h1>GitHub Repository Analysis</h1>
                <p className="subtitle">Analyze any GitHub repository with basic insights or request a deeper analysis</p>
                
                <div className="step">
                    <div className="step-title">
                        <div className="step-number">1</div>
                        <span>Repository & Contact Information</span>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="repoUrl">GitHub Repository URL</label>
                        <input 
                            type="text" 
                            id="repoUrl" 
                            placeholder="https://github.com/username/repository"
                            value={repoUrl}
                            onChange={handleRepoUrlChange}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">Your Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="your.email@example.com"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    
                    <div className="button-group">
                        <button 
                            id="analyzeBtn" 
                            onClick={handleBasicAnalysis}
                            disabled={loading}
                        >
                            {loading === 'basic' ? 'Analyzing...' : 'Basic Analysis'}
                        </button>
                        <button 
                            id="deepAnalysisBtn" 
                            onClick={handleDeepAnalysis}
                            disabled={loading}
                        >
                            {loading === 'deep' ? 'Submitting...' : 'Get DeepWiki AI'}
                        </button>
                    </div>
                    {errorMsg && (
                        <div className="result" style={{ color: '#f87171' }}>
                            {errorMsg}
                        </div>
                    )}
                </div>
                
                {showResult && analysisResult && (
                    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-bold text-lg mb-4">Analysis Results</h3>
                        <pre className="whitespace-pre-wrap">
                            {JSON.stringify(analysisResult, null, 2)}
                        </pre>
                    </div>
                )}
                
                {showSuccess && (
                    <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h3 className="font-bold text-lg text-green-800 mb-2">🎉 Success!</h3>
                        <p className="text-green-700">
                            Your repository has been submitted for deep analysis. 
                            You will receive an email when your personalized AI is ready.
                        </p>
                        {deepwikiUrl && (
                            <a 
                                href={deepwikiUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-block text-blue-600 hover:underline"
                            >
                                View Your DeepWiki AI
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LearnProjects;