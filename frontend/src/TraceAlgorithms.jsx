import './app.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function TraceAlgorithms() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const algorithmPlatforms = [
    {
      name: "VisuAlgo",
      description: "Visualize data structures and algorithms through animation",
      link: "https://visualgo.net/",
      category: "Visualization",
      features: ["Animated Algorithms", "Data Structures", "Step-by-Step", "Multiple Languages"],
      icon: "📊",
      level: "All Levels",
      languages: ["Python", "Java", "C++", "JavaScript"]
    },
    {
      name: "Algorithm Visualizer",
      description: "Interactive online algorithm visualization tool",
      link: "https://algorithm-visualizer.org/",
      category: "Visualization",
      features: ["Interactive", "Code Editing", "Custom Input", "Real-time"],
      icon: "👁️",
      level: "Intermediate",
      languages: ["JavaScript"]
    },
    {
      name: "USFCA Algorithm Visualization",
      description: "University of San Francisco's algorithm visualization resource",
      link: "https://www.cs.usfca.edu/~galles/visualization/Algorithms.html",
      category: "Education",
      features: ["Academic", "Comprehensive", "No Installation", "Free"],
      icon: "🎓",
      level: "All Levels",
      languages: ["Multiple"]
    },
    {
      name: "HackerEarth Algorithms",
      description: "Practice algorithms with visual explanations and challenges",
      link: "https://www.hackerearth.com/practice/algorithms/",
      category: "Practice",
      features: ["Challenges", "Tutorials", "Competitions", "Community"],
      icon: "⚔️",
      level: "Intermediate to Advanced",
      languages: ["Multiple"]
    },
    {
      name: "GeeksforGeeks Algorithms",
      description: "Comprehensive algorithm tutorials with visual examples",
      link: "https://www.geeksforgeeks.org/fundamentals-of-algorithms/",
      category: "Tutorials",
      features: ["Detailed Tutorials", "Code Examples", "Complexity Analysis", "Practice Problems"],
      icon: "📚",
      level: "All Levels",
      languages: ["C++", "Java", "Python", "C#"]
    },
    {
      name: "LeetCode Explore",
      description: "Learn algorithms with interactive cards and visual explanations",
      link: "https://leetcode.com/explore/",
      category: "Practice",
      features: ["Interactive Learning", "Challenges", "Interview Focus", "Community Solutions"],
      icon: "💼",
      level: "Intermediate to Advanced",
      languages: ["Multiple"]
    },
    {
      name: "Brilliant Algorithms Course",
      description: "Interactive algorithm course with visual learning",
      link: "https://brilliant.org/courses/computer-science-algorithms/",
      category: "Courses",
      features: ["Interactive Lessons", "Visual Learning", "Progress Tracking", "Math Foundation"],
      icon: "🌟",
      level: "Beginner to Intermediate",
      languages: ["Conceptual"]
    },
    {
      name: "Khan Academy Algorithms",
      description: "Free algorithm course with visual explanations",
      link: "https://www.khanacademy.org/computing/computer-science/algorithms",
      category: "Courses",
      features: ["Free", "Beginner Friendly", "Video Lessons", "Exercises"],
      icon: "🎥",
      level: "Beginner",
      languages: ["Pseudocode", "JavaScript"]
    },
    {
      name: "Sorting Algorithms Animations",
      description: "Specialized visualization for sorting algorithms",
      link: "https://www.toptal.com/developers/sorting-algorithms",
      category: "Visualization",
      features: ["Sorting Focus", "Performance Comparison", "Animations", "Educational"],
      icon: "📈",
      level: "All Levels",
      languages: ["Multiple"]
    },
    {
      name: "Path Finding Algorithms",
      description: "Visualize pathfinding algorithms like A*, Dijkstra, and more",
      link: "https://qiao.github.io/PathFinding.js/visual/",
      category: "Visualization",
      features: ["Pathfinding Focus", "Interactive", "Custom Mazes", "Multiple Algorithms"],
      icon: "🧭",
      level: "All Levels",
      languages: ["JavaScript"]
    }
  ];

  const categories = ['All', ...new Set(algorithmPlatforms.map(platform => platform.category))];
  
  const filteredPlatforms = selectedCategory === 'All' 
    ? algorithmPlatforms 
    : algorithmPlatforms.filter(platform => platform.category === selectedCategory);

  return (
    <div className="wrap">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">Algorythm</Link>
          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/learn" className="nav-link">Learn</Link>
            <Link to="/projects" className="nav-link">Projects</Link>
            <Link to="/community" className="nav-link">Community</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>📊 Algorithm Tracing Platforms</h1>
        <p>Visualize how algorithms work with animated step-by-step execution and interactive learning</p>
        <div style={{ 
          background: 'var(--card)', 
          padding: '15px', 
          borderRadius: '12px', 
          margin: '20px auto',
          maxWidth: '600px',
          border: '1px solid var(--brand)'
        }}>
          <strong>🎯 Perfect for:</strong> Understanding Algorithms • Data Structures • Complexity Analysis • Interview Preparation
        </div>
      </section>

      {/* Category Filter */}
      <section style={{ maxWidth: '1000px', margin: '40px auto', textAlign: 'center' }}>
        <h3>Filter by Category:</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', margin: '20px 0' }}>
          {categories.map(category => (
            <button 
              key={category}
              className={`btn ${selectedCategory === category ? 'primary' : 'outline'}`}
              style={{ fontSize: '0.9rem' }}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Results count */}
        <p style={{ color: 'var(--muted)', marginTop: '10px' }}>
          Showing {filteredPlatforms.length} of {algorithmPlatforms.length} platforms
          {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
        </p>
      </section>

      {/* Platforms Grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {filteredPlatforms.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
            <h3>No platforms found in this category</h3>
            <p style={{ color: 'var(--muted)' }}>Try selecting a different category or view all platforms.</p>
            <button 
              className="btn primary"
              onClick={() => setSelectedCategory('All')}
            >
              View All Platforms
            </button>
          </div>
        ) : (
          <div className="cards-grid">
            {filteredPlatforms.map((platform, index) => (
              <div key={index} className="card">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                  <span className="icon-emoji" style={{ fontSize: '2rem', marginRight: '15px' }}>
                    {platform.icon}
                  </span>
                  <div>
                    <h3 style={{ margin: 0 }}>{platform.name}</h3>
                    <span style={{ 
                      background: 'var(--bg)', 
                      padding: '4px 8px', 
                      borderRadius: '12px', 
                      fontSize: '0.7rem',
                      color: 'var(--muted)'
                    }}>
                      {platform.category}
                    </span>
                  </div>
                </div>
                
                <p style={{ color: 'var(--muted)', marginBottom: '15px', flexGrow: 1 }}>
                  {platform.description}
                </p>
                
                <div style={{ marginBottom: '15px' }}>
                  <h4 style={{ color: 'var(--muted)', margin: '0 0 8px 0', fontSize: '0.9rem' }}>Features:</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {platform.features.map((feature, i) => (
                      <span key={i} style={{
                        background: 'var(--bg)',
                        padding: '4px 8px',
                        borderRadius: '8px',
                        fontSize: '0.7rem',
                        color: 'var(--muted)'
                      }}>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '15px',
                  gap: '10px'
                }}>
                  <span style={{ 
                    background: 'var(--bg)', 
                    padding: '4px 8px', 
                    borderRadius: '8px', 
                    fontSize: '0.7rem',
                    color: 'var(--muted)'
                  }}>
                    📊 {platform.level}
                  </span>
                  
                  <span style={{ 
                    background: 'var(--bg)', 
                    padding: '4px 8px', 
                    borderRadius: '8px', 
                    fontSize: '0.7rem',
                    color: 'var(--muted)'
                  }}>
                    💻 {platform.languages.join(', ')}
                  </span>
                </div>

                <a 
                  href={platform.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn primary card-btn"
                  style={{ textDecoration: 'none' }}
                >
                  Visit Website
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Algorithm Categories Overview */}
      <section style={{ maxWidth: '1000px', margin: '60px auto', background: 'var(--card)', padding: '30px', borderRadius: '15px' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '30px' }}>📋 Common Algorithm Categories</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {[
            { name: "Sorting", examples: "Bubble Sort, Quick Sort, Merge Sort", icon: "📊" },
            { name: "Searching", examples: "Binary Search, Linear Search", icon: "🔍" },
            { name: "Graph Algorithms", examples: "Dijkstra, BFS, DFS", icon: "🕸️" },
            { name: "Dynamic Programming", examples: "Fibonacci, Knapsack", icon: "⚡" },
            { name: "Greedy Algorithms", examples: "Huffman Coding, Prim's", icon: "🎯" },
            { name: "Backtracking", examples: "N-Queens, Sudoku", icon: "↩️" }
          ].map((category, index) => (
            <div key={index} style={{ textAlign: 'center', padding: '15px', background: 'var(--bg)', borderRadius: '10px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{category.icon}</div>
              <h4 style={{ margin: '0 0 8px 0' }}>{category.name}</h4>
              <p style={{ color: 'var(--muted)', fontSize: '0.8rem', margin: 0 }}>{category.examples}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section style={{textAlign: 'center', margin: '60px 0', padding: '40px', background: 'var(--card)', borderRadius: '20px', border: '1px solid #22263b'}}>
        <h2>Ready to Master Algorithms?</h2>
        <p style={{color: 'var(--muted)', maxWidth: '500px', margin: '0 auto 30px'}}>
          Choose a platform and start visualizing algorithms to understand how they work step by step!
        </p>
        <Link to="/trace" className="btn primary" style={{padding: '15px 30px', fontSize: '1.1rem', textDecoration: 'none'}}>
          Back to Tracing Options
        </Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Learning Tips:</h4>
            <p style={{color: 'var(--muted)', margin: '10px 0 0'}}>
              Start with sorting algorithms • Use visualization tools • Practice implementation • 
              Analyze time complexity • Solve real problems
            </p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2025 CodeCraf. Master algorithms through visual learning.</p>
        </div>
      </footer>
    </div>
  );
}