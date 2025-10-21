import './app.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

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

  // ====== Question Generation Helpers (AI + Fallback) ======
  const normalizeProblemText = (text) => (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const getProblemKey = (q) => `${normalizeProblemText(q?.problem)}::${normalizeProblemText(q?.functionSignature)}`;

  // Topic taxonomies to force variety per difficulty
  const TOPICS = {
    easy: [
      'strings-basic', 'arrays-basic', 'math-arithmetic', 'hashing-basics', 'two-pointers-basic',
      'loops-conditions', 'stack-queue-basics', 'sets-and-maps-basics'
    ],
    medium: [
      'sliding-window', 'binary-search', 'prefix-sums', 'greedy', 'dfs-bfs', 'sorting-variants',
      'linked-lists', 'stacks-queues'
    ],
    hard: [
      'dynamic-programming', 'graph-shortest-path', 'graph-topological', 'segment-tree', 'interval-scheduling',
      'bitmask-dp', 'union-find', 'advanced-greedy'
    ]
  };

  const getSampleQuestionsPool = () => ([
    // Easy
    {
      difficulty: 'easy',
      problem: 'Return the number of vowels in a given lowercase string.',
      exampleInput: '"algorithm"',
      expectedOutput: '3',
      functionSignature: 'function countVowels(s) { }',
      constraints: '1 <= s.length <= 10^5; s contains only lowercase letters',
      testCases: [
        { input: '"algorithm"', expected: '3', description: 'basic' },
        { input: '"bcdfg"', expected: '0', description: 'no vowels' },
        { input: '"aeiou"', expected: '5', description: 'all vowels' }
      ]
    },
    {
      difficulty: 'easy',
      problem: 'Given an array of integers, return the sum of all even numbers.',
      exampleInput: '[1,2,3,4,5,6]',
      expectedOutput: '12',
      functionSignature: 'function sumEvenNumbers(arr) { }',
      constraints: '1 <= arr.length <= 10^5; -10^9 <= arr[i] <= 10^9',
      testCases: [
        { input: '[1,2,3,4,5,6]', expected: '12', description: 'mix' },
        { input: '[1,3,5]', expected: '0', description: 'no evens' },
        { input: '[2,4,6]', expected: '12', description: 'all evens' }
      ]
    },
    {
      difficulty: 'easy',
      problem: 'Reverse a given string without using built-in reverse methods.',
      exampleInput: '"hello"',
      expectedOutput: '"olleh"',
      functionSignature: 'function reverseString(s) { }',
      constraints: '1 <= s.length <= 10^5',
      testCases: [
        { input: '"hello"', expected: '"olleh"', description: 'basic' },
        { input: '"a"', expected: '"a"', description: 'single char' }
      ]
    },
    // Medium
    {
      difficulty: 'medium',
      problem: 'Find the length of the longest substring without repeating characters.',
      exampleInput: '"abcabcbb"',
      expectedOutput: '3',
      functionSignature: 'function lengthOfLongestSubstring(s) { }',
      constraints: '1 <= s.length <= 10^5',
      testCases: [
        { input: '"abcabcbb"', expected: '3', description: 'classic' },
        { input: '"bbbbb"', expected: '1', description: 'all same' }
      ]
    },
    {
      difficulty: 'medium',
      problem: 'Given two strings, return their longest common subsequence.',
      exampleInput: '"ABCDGH" and "AEDFHR"',
      expectedOutput: '"ADH"',
      functionSignature: 'function longestCommonSubsequence(str1, str2) { }',
      constraints: '1 <= len <= 1000',
      testCases: [
        { input: '"ABCDGH" and "AEDFHR"', expected: '"ADH"', description: 'example' },
        { input: '"AGGTAB" and "GXTXAYB"', expected: '"GTAB"', description: 'another' }
      ]
    },
    {
      difficulty: 'medium',
      problem: 'Given an integer array, find the maximum sum of a contiguous subarray (Kadane\'s algorithm).',
      exampleInput: '[-2,1,-3,4,-1,2,1,-5,4]',
      expectedOutput: '6',
      functionSignature: 'function maxSubArray(nums) { }',
      constraints: '1 <= nums.length <= 10^5; -10^4 <= nums[i] <= 10^4',
      testCases: [
        { input: '[-2,1,-3,4,-1,2,1,-5,4]', expected: '6', description: 'classic' }
      ]
    },
    {
      difficulty: 'medium',
      problem: 'Return the indices of the two numbers that add up to a target (hash map).',
      exampleInput: 'nums=[2,7,11,15], target=9',
      expectedOutput: '[0,1]',
      functionSignature: 'function twoSum(nums, target) { }',
      constraints: 'Each input would have exactly one solution',
      testCases: [
        { input: 'nums=[3,2,4], target=6', expected: '[1,2]', description: 'basic' }
      ]
    },
    // Hard (expanded pool)
    {
      difficulty: 'hard',
      problem: 'Implement an LRU cache with get and put in O(1) time.',
      exampleInput: 'LRUCache(2); put(1,1); put(2,2); get(1); put(3,3); get(2);',
      expectedOutput: '1 then -1',
      functionSignature: 'class LRUCache { constructor(capacity) {}; get(key) {}; put(key, value) {}; }',
      constraints: '1 <= capacity <= 10^4; operations <= 10^5',
      testCases: [
        { input: 'capacity=2; ops=put(1,1),put(2,2),get(1),put(3,3),get(2)', expected: '1,-1', description: 'evict' }
      ]
    },
    {
      difficulty: 'hard',
      problem: 'Given a directed graph, detect if it contains a cycle using DFS and return any cycle path.',
      exampleInput: 'n=4, edges=[[0,1],[1,2],[2,0],[2,3]]',
      expectedOutput: 'true with a cycle path like 0->1->2->0',
      functionSignature: 'function hasDirectedCycle(n, edges) { }',
      constraints: '1 <= n <= 10^5; 0 <= edges.length <= 2*10^5',
      testCases: [
        { input: 'n=4, edges=[[0,1],[1,2],[2,0],[2,3]]', expected: 'true', description: 'cycle exists' },
        { input: 'n=3, edges=[[0,1],[1,2]]', expected: 'false', description: 'no cycle' }
      ]
    },
    {
      difficulty: 'hard',
      problem: 'Find shortest paths from a source to all nodes in a weighted graph using Dijkstra (non-negative weights).',
      exampleInput: 'n=5, edges={(0,1,2),(0,2,5),(1,2,1),(1,3,3),(2,3,2)} source=0',
      expectedOutput: '[0,2,3,5,INF]',
      functionSignature: 'function dijkstra(n, edges, source) { }',
      constraints: '1 <= n <= 10^5; edges <= 2*10^5; weights >= 0',
      testCases: [
        { input: 'n=4, edges={(0,1,1),(1,2,2),(0,2,4)} source=0', expected: '[0,1,3,INF]', description: 'basic' }
      ]
    },
    {
      difficulty: 'hard',
      problem: 'Given a set of intervals, remove the minimum number to make the rest non-overlapping.',
      exampleInput: 'intervals=[[1,3],[2,4],[3,5]]',
      expectedOutput: '1',
      functionSignature: 'function eraseOverlapIntervals(intervals) { }',
      constraints: '1 <= intervals.length <= 10^5',
      testCases: [
        { input: '[[1,2],[2,3],[3,4],[1,3]]', expected: '1', description: 'greedy' }
      ]
    },
    {
      difficulty: 'hard',
      problem: 'Implement a Trie supporting insert, search, and startsWith for lowercase words.',
      exampleInput: 'insert("apple"), search("apple"), search("app"), startsWith("app")',
      expectedOutput: 'true, false, true',
      functionSignature: 'class Trie { insert(word) {}; search(word) {}; startsWith(prefix) {}; }',
      constraints: 'Total operations up to 10^5',
      testCases: [
        { input: 'insert("apple"), search("apple")', expected: 'true', description: 'basic' }
      ]
    }
  ]);

  const checkOllamaStatus = async () => {
    try {
      const resp = await Promise.race([
        fetch('http://localhost:11434/api/tags', { method: 'GET' }),
        new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 3000))
      ]);
      return resp.ok;
    } catch (e) {
      console.error("Error checking Ollama status:", e);
      return false;
    }
  };

  const generateQuestion = async (difficulty, idx, exclude = [], attempt = 0, topic = '') => {
    const difficultyPrompts = {
      easy: 'Create a simple coding problem suitable for beginners. Include a clear problem statement, example input/output, and a function signature to implement.',
      medium: 'Create an intermediate coding problem that tests common algorithms or data structures. Include a clear problem statement, example input/output, and a function signature to implement.',
      hard: 'Create a complex coding problem that tests advanced algorithms, optimization, or system design. Include a clear problem statement, example input/output, and a function signature to implement.'
    };

    const exclusionsText = exclude.length > 0
      ? `\nAvoid repeating or paraphrasing any of these problems:\n- ${exclude.slice(-10).join('\n- ')}`
      : '';

    const resp = await Promise.race([
      fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'codellama:7b',
          prompt: `${difficultyPrompts[difficulty]}${exclusionsText}\n\nTopic: ${topic || 'any distinct topic for this difficulty'}\nThe problem MUST be about the specified topic and not reuse recent problems.\nUse different input domains and constraints than excluded ones.\n\nFormat the response strictly as:\nProblem: [problem statement]\nExample Input: [input]\nExpected Output: [output]\nFunction Signature: [function signature]\nConstraints: [constraints]\nUniqueness token: ${difficulty}-${idx}-attempt${attempt}-${Date.now()}`,
          stream: false
        })
      }),
      new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 10000))
    ]);

    if (!resp.ok) throw new Error('ollama http error');
    const data = await resp.json();
    const generatedText = data.response || '';
    const lines = generatedText.split('\n').filter(l => l.trim());
    const problem = lines.find(l => l.startsWith('Problem:'))?.replace('Problem:', '').trim() || '';
    const exampleInput = lines.find(l => l.startsWith('Example Input:'))?.replace('Example Input:', '').trim() || '';
    const expectedOutput = lines.find(l => l.startsWith('Expected Output:'))?.replace('Expected Output:', '').trim() || '';
    const functionSignature = lines.find(l => l.startsWith('Function Signature:'))?.replace('Function Signature:', '').trim() || '';
    const constraints = lines.find(l => l.startsWith('Constraints:'))?.replace('Constraints:', '').trim() || '';

    return {
      id: `${difficulty}-${idx}`,
      difficulty,
      problem,
      exampleInput,
      expectedOutput,
      functionSignature,
      constraints,
      testCases: [ { input: exampleInput, expected: expectedOutput, description: 'example' } ]
    };
  };

  const generateQuestionsForConfig = async (counts) => {
    const isOllama = await checkOllamaStatus();
    const created = [];
    const seen = new Set(); // keys of problem+signature
    const seenTexts = []; // raw normalized problem texts to help LLM exclusions
    const pool = getSampleQuestionsPool();
    // load recent global problems to avoid across sessions
    let recentGlobal = [];
    try { recentGlobal = JSON.parse(localStorage.getItem('recentProblems') || '[]'); } catch {
      //Ignore
    }
    if (!Array.isArray(recentGlobal)) recentGlobal = [];
    const recentSet = new Set(recentGlobal);

    const takeSample = (difficulty, ordinal) => {
      const candidates = pool.filter(q => q.difficulty === difficulty);
      for (let i = 0; i < candidates.length; i++) {
        const q = candidates[(ordinal - 1 + i) % candidates.length];
        const key = getProblemKey(q);
        const norm = normalizeProblemText(q.problem);
        if (!seen.has(key) && !recentSet.has(key)) {
          seen.add(key);
          seenTexts.push(norm);
          return { ...q, id: `${difficulty}-${ordinal}` };
        }
      }
      const q = candidates[(ordinal - 1) % candidates.length];
      return { ...q, id: `${difficulty}-${ordinal}` };
    };

    for (const [difficulty, countRaw] of Object.entries(counts)) {
      const count = Math.max(0, parseInt(countRaw || 0));
      const topics = TOPICS[difficulty] || [];
      const usedTopics = new Set();
      for (let i = 0; i < count; i++) {
        const ordinal = i + 1;
        if (isOllama) {
          let q = null;
          let attempt = 0;
          let gotUnique = false;
          while (attempt < 5) {
            try {
              // choose a topic distinct within this generation
              let topic = topics.length ? topics[(i + attempt) % topics.length] : '';
              while (topic && usedTopics.has(topic) && attempt < 5) {
                attempt++;
                topic = topics.length ? topics[(i + attempt) % topics.length] : '';
              }
              q = await generateQuestion(difficulty, ordinal, [...seenTexts, ...recentGlobal.map(k => k.split('::')[0])], attempt, topic);
              const key = getProblemKey(q);
              const norm = normalizeProblemText(q.problem);
              if (normalizeProblemText(q.problem) && !seen.has(key) && !recentSet.has(key)) {
                seen.add(key);
                seenTexts.push(norm);
                if (topic) usedTopics.add(topic);
                gotUnique = true;
                break;
              }
            } catch (e) {
              console.error('Error generating question from Ollama,Please try again:', e);
            }
            attempt++;
          }
          if (!q || !gotUnique) q = takeSample(difficulty, ordinal);
          created.push(q);
        } else {
          created.push(takeSample(difficulty, ordinal));
        }
      }
    }
    // persist recent problems (cap to 100)
    const merged = [...recentGlobal, ...created.map(getProblemKey).filter(Boolean)];
    const dedup = Array.from(new Set(merged)).slice(-200);
    try { localStorage.setItem('recentProblems', JSON.stringify(dedup)); } catch {
      //Ignore
    }
    return created;
  };

  // Validate test ID format
  const isValidTestIdFormat = (id) => {
    // Test ID format: TIMESTAMP-RANDOM (e.g., "1A2B3C4D-EFGHI")
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

    // Generate questions now (AI + fallback), store by testId, and show in preview
    try {
      setIsGenerating(true);
      const created = await generateQuestionsForConfig({
        easy: questions.easy,
        medium: questions.medium,
        hard: questions.hard
      });
      setGeneratedQuestions(created);
      // Persist for joiners
      localStorage.setItem(`test:${newTestId}`, JSON.stringify({ id: newTestId, createdAt: Date.now(), questions: created }));
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
    
    // Check if the test ID has the correct format
    if (!isValidTestIdFormat(trimmedId)) {
      alert('Invalid Test ID format. Please enter a valid Test ID (e.g., 1A2B3C4D-EFGHI).');
      return;
    }
    
    // Check if the test ID exists in our valid test IDs
    if (!isTestIdValid(trimmedId)) {
      alert('Test ID not found. Please make sure you have the correct Test ID from the test creator.');
      return;
    }
    
    // Ensure questions exist for this testId
    const saved = localStorage.getItem(`test:${trimmedId}`);
    if (!saved) {
      alert('This Test ID has no generated questions yet. Ask the creator to generate the test first.');
      return;
    }
    // Navigate to test interface with testId only
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