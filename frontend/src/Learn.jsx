import './app.css';
import { Link } from 'react-router-dom';

export default function Learn() {
  // Sample beginner courses data
  const beginnerCourses = [
    {
      id: 1,
      title: "HTML & CSS Fundamentals",
      description: "Learn to build and style your first website with HTML and CSS.",
      duration: "2 weeks",
      level: "Beginner",
      icon: "🌐",
      slug: "html-css-fundamentals" // ADD THIS
    },
    {
      id: 2,
      title: "JavaScript Basics",
      description: "Master the fundamentals of programming with JavaScript.",
      duration: "3 weeks", 
      level: "Beginner",
      icon: "⚡",
      slug: "javascript-basics" // ADD THIS
    },
    {
      id: 3,
      title: "Python for Everyone",
      description: "Start your programming journey with Python's simple syntax.",
      duration: "3 weeks",
      level: "Beginner",
      icon: "🐍",
      slug: "python-for-everyone" // ADD THIS
    },
    {
      id: 4,
      title: "Git & GitHub Essentials",
      description: "Learn version control and collaborate on coding projects.",
      duration: "1 week",
      level: "Beginner", 
      icon: "📦",
      slug: "git-github-essentials" // ADD THIS
    }
  ];

  const learningPaths = [
  {
    title: "Web Development",
    courses: ["HTML", "CSS", "JavaScript", "React"],
    icon: "💻",
    slug: "web-development" // ADD THIS
  },
  {
    title: "Data Science", 
    courses: ["Python", "Pandas", "NumPy", "Data Visualization"],
    icon: "📊",
    slug: "data-science" // ADD THIS (even if route doesn't exist yet)
  },
  {
    title: "Mobile Development",
    courses: ["React Native", "Flutter", "iOS", "Android"], 
    icon: "📱",
    slug: "mobile-development" // ADD THIS
  }
];

  return (
    <div className="wrap">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">CodeCraf</Link>
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
        <h1>Learn Coding from Scratch</h1>
        <p>Start your programming journey with our beginner-friendly courses. No prior experience needed!</p>
      </section>

      {/* Courses Grid */}
      <section>
        <h2 style={{textAlign: 'center', margin: '40px 0 30px', fontSize: '2rem'}}>Beginner Courses</h2>
        <div className="cards-grid">
          {beginnerCourses.map(course => (
            <div key={course.id} className="card">
              <div className="card-icon">
                <span className="icon-emoji">{course.icon}</span>
              </div>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div style={{display: 'flex', justifyContent: 'space-between', margin: '15px 0', color: 'var(--muted)', fontSize: '0.9rem'}}>
                <span>⏱️ {course.duration}</span>
                <span className={`badge ${course.level.toLowerCase()}`}>{course.level}</span>
              </div>
              {/* FIXED LINK - Use the slug directly */}
              <Link to={`/learn/${course.slug}`} className="btn primary card-btn">
                Start Learning
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Paths */}
      <section style={{margin: '60px 0'}}>
        <h2 style={{textAlign: 'center', margin: '40px 0 30px', fontSize: '2rem'}}>Choose Your Path</h2>
        <div className="cards-grid">
          {learningPaths.map((path, index) => (
            <div key={index} className="card">
              <div className="card-icon">
                <span className="icon-emoji">{path.icon}</span>
              </div>
              <h3>{path.title}</h3>
              <div style={{margin: '15px 0'}}>
                <h4 style={{margin: '0 0 10px', color: 'var(--muted)', fontSize: '1rem'}}>You'll learn:</h4>
                <ul style={{color: 'var(--muted)', paddingLeft: '20px', margin: 0}}>
                  {path.courses.map((course, i) => (
                    <li key={i}>{course}</li>
                  ))}
                </ul>
              </div>
              <Link to={`/learn/${path.slug}`} className="btn primary card-btn">
  Explore Path
</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section style={{textAlign: 'center', margin: '60px 0', padding: '40px', background: 'var(--card)', borderRadius: '20px', border: '1px solid #22263b'}}>
        <h2>Ready to Start Your Journey?</h2>
        <p style={{color: 'var(--muted)', maxWidth: '500px', margin: '0 auto 30px'}}>
          Join thousands of students who started with zero experience and are now building amazing projects!
        </p>
        <button className="btn primary" style={{padding: '15px 30px', fontSize: '1.1rem'}}>
          Get Started Today
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Resources</h4>
            <ul className="footer-links">
              <li><a href="/community">Community</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/tutorials">Tutorials</a></li>
              <li><a href="/docs">Documentation</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <ul className="footer-links">
              <li><a href="/help">Help Center</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 CodeCraf. Start your coding journey today!</p>
        </div>
      </footer>
    </div>
  );
}