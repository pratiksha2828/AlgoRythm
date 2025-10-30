import { generateRoadmapPDF } from './PdfGenerator';
import './app.css';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function RoadmapResult() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const selections = {
    level: searchParams.get('level'),
    field: searchParams.get('field'),
    role: searchParams.get('role'),
    language: searchParams.get('language')
  };

  // Hyper-specific roadmap generator
  const generateDetailedRoadmap = () => {
    const { level, field, role, language } = selections;
    
    const detailedRoadmaps = {
      web: {
        beginner: {
          frontend: {
            javascript: {
              title: "Frontend JavaScript Developer Roadmap",
              totalDuration: "6-8 months",
              weeklyHours: "15-20 hours",
              phases: [
                {
                  phase: "Month 1-2: Foundation & Basics",
                  duration: "8 weeks",
                  weeks: [
                    {
                      week: "Week 1-2: HTML & CSS Mastery",
                      topics: [
                        "HTML5 Semantic Elements & Accessibility",
                        "CSS Flexbox & Grid Layouts",
                        "Responsive Design with Media Queries",
                        "CSS Variables and Custom Properties",
                        "Build: Personal Portfolio Page"
                      ],
                      resources: ["MDN Web Docs", "CSS-Tricks", "FreeCodeCamp HTML/CSS"],
                      projects: ["Responsive Restaurant Website", "CSS Art Gallery"]
                    },
                    {
                      week: "Week 3-4: JavaScript Fundamentals",
                      topics: [
                        "Variables, Data Types, and Operators",
                        "Functions, Scope, and Closures",
                        "DOM Manipulation and Events",
                        "ES6+ Features: Arrow functions, Destructuring",
                        "Build: Interactive Quiz App"
                      ],
                      resources: ["JavaScript.info", "Eloquent JavaScript", "MDN JavaScript"],
                      projects: ["Todo List App", "Calculator", "Weather App UI"]
                    },
                    {
                      week: "Week 5-6: Advanced JavaScript",
                      topics: [
                        "Asynchronous JavaScript (Promises, Async/Await)",
                        "Array Methods: map, filter, reduce",
                        "Error Handling and Debugging",
                        "Local Storage and Session Storage",
                        "Build: Notes App with Local Storage"
                      ],
                      resources: ["You Don't Know JS", "JavaScript30", "Frontend Masters"],
                      projects: ["Budget Tracker", "Bookmark Manager"]
                    },
                    {
                      week: "Week 7-8: Git & Development Tools",
                      topics: [
                        "Git Fundamentals: add, commit, push, branch",
                        "GitHub Workflow and Collaboration",
                        "Chrome DevTools Mastery",
                        "Basic Command Line Usage",
                        "Build: Collaborative Project on GitHub"
                      ],
                      resources: ["Git Handbook", "Atlassian Git Tutorial", "DevTools Documentation"],
                      projects: ["Team Portfolio Website", "Open Source Contribution"]
                    }
                  ]
                },
                {
                  phase: "Month 3-4: React Ecosystem",
                  duration: "8 weeks",
                  weeks: [
                    {
                      week: "Week 9-10: React Fundamentals",
                      topics: [
                        "React Components and JSX Syntax",
                        "Props and State Management",
                        "Event Handling and Conditional Rendering",
                        "Lists and Keys",
                        "Build: E-commerce Product Listing"
                      ],
                      resources: ["React Official Docs", "Scrimba React Course", "Epic React"],
                      projects: ["Movie Database App", "Recipe Finder"]
                    },
                    {
                      week: "Week 11-12: Advanced React",
                      topics: [
                        "Hooks: useState, useEffect, useContext",
                        "Custom Hooks and Composition",
                        "React Router for Navigation",
                        "Context API for State Management",
                        "Build: Blog Platform with Routing"
                      ],
                      resources: ["React Patterns", "Testing JavaScript", "Frontend Masters React"],
                      projects: ["Social Media Dashboard", "Project Management Tool"]
                    },
                    {
                      week: "Week 13-14: Modern React Tools",
                      topics: [
                        "Vite Build Tool Setup",
                        "Component Libraries: Material-UI or Chakra UI",
                        "Form Handling with React Hook Form",
                        "API Integration with Axios",
                        "Build: CRM System with CRUD Operations"
                      ],
                      resources: ["Vite Docs", "Material-UI Docs", "React Hook Form Docs"],
                      projects: ["Customer Management System", "API Dashboard"]
                    },
                    {
                      week: "Week 15-16: Testing & Deployment",
                      topics: [
                        "Jest and React Testing Library",
                        "Component Testing Strategies",
                        "Vercel/Netlify Deployment",
                        "Performance Optimization",
                        "Build: Full-stack Application Deployment"
                      ],
                      resources: ["Testing Library Docs", "Jest Documentation", "Vercel Guide"],
                      projects: ["Deployed Portfolio", "Production-ready App"]
                    }
                  ]
                },
                {
                  phase: "Month 5-6: Advanced Topics & Job Ready",
                  duration: "8 weeks",
                  weeks: [
                    {
                      week: "Week 17-18: State Management",
                      topics: [
                        "Redux Toolkit for Complex State",
                        "RTK Query for Data Fetching",
                        "Zustand for Lightweight State",
                        "State Management Patterns",
                        "Build: E-commerce Cart System"
                      ],
                      resources: ["Redux Toolkit Docs", "Zustand GitHub", "State Management Patterns"],
                      projects: ["Shopping Cart", "Real-time Dashboard"]
                    },
                    {
                      week: "Week 19-20: TypeScript Integration",
                      topics: [
                        "TypeScript Basics and Types",
                        "React with TypeScript",
                        "Type Safety and Interfaces",
                        "Gradual Migration Strategies",
                        "Build: Type-safe React Application"
                      ],
                      resources: ["TypeScript Handbook", "React TypeScript Cheatsheet", "Total TypeScript"],
                      projects: ["Type-safe Todo App", "API Client Library"]
                    },
                    {
                      week: "Week 21-22: Advanced Patterns",
                      topics: [
                        "Component Design Patterns",
                        "Performance Optimization Techniques",
                        "Code Splitting and Lazy Loading",
                        "Progressive Web App Features",
                        "Build: High-performance Application"
                      ],
                      resources: ["Patterns.dev", "Web.dev", "Google PWA Guide"],
                      projects: ["Offline-capable App", "Performance-optimized Site"]
                    },
                    {
                      week: "Week 23-24: Portfolio & Job Prep",
                      topics: [
                        "Portfolio Website Polish",
                        "Resume Building for Frontend Roles",
                        "Technical Interview Preparation",
                        "Networking and LinkedIn Optimization",
                        "Build: Comprehensive Portfolio"
                      ],
                      resources: ["Frontend Interview Handbook", "LeetCode", "Tech Interview Handbook"],
                      projects: ["Final Portfolio", "Interview Project"]
                    }
                  ]
                }
              ]
            }
          },
          backend: {
        python: {
          title: "Backend Python Developer Roadmap",
          totalDuration: "7-9 months",
          weeklyHours: "15-20 hours",
          phases: [
            {
              phase: "Month 1-2: Python & Development Fundamentals",
              duration: "8 weeks",
              weeks: [
                {
                  week: "Week 1-2: Core Python Syntax",
                  topics: [
                    "Variables, Data Types, and Operators",
                    "Control Flow: Conditionals and Loops",
                    "Functions, Arguments, and Return Values",
                    "Basic Data Structures: Lists, Tuples, Dictionaries, Sets",
                    "Build: Command-Line Calculator"
                  ],
                  resources: ["Python Crash Course", "W3Schools Python", "Real Python"],
                  projects: ["Number Guessing Game", "Text-Based Adventure Game"]
                },
                {
                  week: "Week 3-4: Object-Oriented Programming & Modules",
                  topics: [
                    "Classes, Objects, and Constructors (__init__)",
                    "Inheritance, Encapsulation, and Polymorphism",
                    "Importing and Creating Modules",
                    "Working with External Packages using pip",
                    "Build: A Basic Bank Account System"
                  ],
                  resources: ["Python OOP Tutorial", "Official Python Tutorial"],
                  projects: ["Library Management System", "Student Gradebook"]
                },
                {
                  week: "Week 5-6: Working with Data & APIs",
                  topics: [
                    "File Handling: Reading/Writing Text & CSV Files",
                    "Working with JSON Data (json module)",
                    "Making HTTP Requests (requests library)",
                    "Consuming Public REST APIs",
                    "Build: A CLI Tool to Fetch Crypto Prices"
                  ],
                  resources: ["Requests Library Docs", "Public APIs List"],
                  projects: ["Weather Data Fetcher", "News Headline Aggregator"]
                },
                {
                  week: "Week 7-8: Introduction to Relational Databases",
                  topics: [
                    "SQL Fundamentals: SELECT, INSERT, UPDATE, DELETE",
                    "Database Design: Tables, Primary Keys, Relationships",
                    "Using SQLite with Python (sqlite3 module)",
                    "Basic CRUD (Create, Read, Update, Delete) Operations",
                    "Build: A Personal Movie Collection Database"
                  ],
                  resources: ["SQLZoo", "SQLite Tutorial"],
                  projects: ["Book Tracking Database", "Task Manager with Persistence"]
                }
              ]
            },
            {
              phase: "Month 3-4: Web Frameworks & API Development",
              duration: "8 weeks",
              weeks: [
                {
                  week: "Week 9-10: Choosing a Framework & Fundamentals",
                  topics: [
                    "Introduction to Flask vs. Django",
                    "Setting up a Virtual Environment",
                    "Routing: Mapping URLs to Python Functions",
                    "Rendering HTML Templates with Jinja2 (Flask)",
                    "Build: A Simple Personal Blog"
                  ],
                  resources: ["Flask Documentation", "Django Documentation"],
                  projects: ["Portfolio Website", "Company Landing Page"]
                },
                {
                  week: "Week 11-12: Handling User Input & Forms",
                  topics: [
                    "HTTP Methods: GET vs. POST",
                    "Processing Form Data",
                    "Data Validation and Sanitization",
                    "Sending Data to Templates",
                    "Build: A User Registration & Login System"
                  ],
                  resources: ["Flask-WTF Documentation", "Django Forms"],
                  projects: ["Contact Form with Validation", "Polling Application"]
                },
                {
                  week: "Week 13-14: Database Integration with ORM",
                  topics: [
                    "Object-Relational Mapping (ORM) Concepts",
                    "Flask-SQLAlchemy or Django ORM",
                    "Defining Models (Database Tables as Python Classes)",
                    "Querying Databases using the ORM",
                    "Build: A Blog with User Posts and Comments"
                  ],
                  resources: ["SQLAlchemy Documentation", "Django ORM Guide"],
                  projects: ["Product Catalog", "Book Review Platform"]
                },
                {
                  week: "Week 15-16: Building RESTful APIs",
                  topics: [
                    "REST API Principles and Best Practices",
                    "Serialization (Converting data to/from JSON)",
                    "API Endpoint Design",
                    "Testing APIs with Postman or Thunder Client",
                    "Build: A REST API for a Todo Application"
                  ],
                  resources: ["Flask-RESTful", "Django REST Framework"],
                  projects: ["Weather Data API", "Stock Quote API"]
                }
              ]
            },
            {
              phase: "Month 5-6: Authentication, Deployment & Beyond",
              duration: "8 weeks",
              weeks: [
                {
                  week: "Week 17-18: User Authentication & Authorization",
                  topics: [
                    "Hashing Passwords (Werkzeug, bcrypt)",
                    "Sessions and Cookies",
                    "JSON Web Tokens (JWT) for Stateless Authentication",
                    "Role-Based Access Control (RBAC)",
                    "Build: Secure a Todo API with JWT"
                  ],
                  resources: ["PyJWT", "Flask-Login"],
                  projects: ["API with Admin & User Roles", "Secure User Dashboard"]
                },
                {
                  week: "Week 19-20: Deployment & Production Ready Code",
                  topics: [
                    "Platforms: Heroku, Railway, PythonAnywhere, DigitalOcean",
                    "Setting up Environment Variables for Configuration",
                    "Using Gunicorn as a Production WSGI Server",
                    "Conning to a Production Database (PostgreSQL)",
                    "Build: Deploy Your Blog to a Live Server"
                  ],
                  resources: ["Deploying Python Apps Guide", "Heroku Python Docs"],
                  projects: ["Deployed Portfolio API", "Live Todo Application"]
                },
                {
                  week: "Week 21-22: Testing Your Application",
                  topics: [
                    "Importance of Testing: Unit vs Integration Tests",
                    "Writing Tests with pytest or unittest",
                    "Test-Driven Development (TDD) Basics",
                    "Mocking External Dependencies",
                    "Build: Write a Test Suite for Your API"
                  ],
                  resources: ["pytest Documentation", "Test-Driven Development with Python"],
                  projects: ["Fully Tested Blog Engine", "Test Suite for Weather API"]
                },
                {
                  week: "Week 23-24: Next Steps & Final Project",
                  topics: [
                    "Exploring Advanced Topics: Caching, Background Tasks (Celery)",
                    "Containerization with Docker",
                    "CI/CD Pipelines (GitHub Actions)",
                    "Preparing for Backend Developer Interviews",
                    "Build: A Capstone Project (e.g., E-commerce Backend)"
                  ],
                  resources: ["Docker for Python Developers", "CI/CD Tutorials"],
                  projects: ["Full-Featured E-commerce API", "Social Media Backend"]
                }
              ]
            }
          ]
        }
      },
      fullstack: {
        javascript: {
          title: "Fullstack JavaScript Developer Roadmap",
          totalDuration: "8-10 months",
          weeklyHours: "20-25 hours",
          phases: [
            {
              phase: "Month 1-3: Frontend Foundation & React",
              duration: "12 weeks",
              weeks: [
                {
                  week: "Week 1-2: HTML, CSS & JavaScript Fundamentals",
                  topics: [
                    "HTML5 Semantic Structure & Accessibility",
                    "CSS Flexbox, Grid & Responsive Design",
                    "Modern JavaScript (ES6+): Variables, Functions, DOM",
                    "Async JavaScript: Promises, Async/Await",
                    "Build: Responsive Portfolio Website"
                  ],
                  resources: ["MDN Web Docs", "FreeCodeCamp", "JavaScript.info"],
                  projects: ["Interactive Quiz App", "Weather App UI", "Todo List"]
                },
                {
                  week: "Week 3-4: Advanced JavaScript & Tooling",
                  topics: [
                    "Array Methods: map, filter, reduce",
                    "Object-Oriented JavaScript",
                    "Modules and Package Management (npm/yarn)",
                    "Git Version Control & GitHub",
                    "Build: Advanced JavaScript Application"
                  ],
                  resources: ["You Don't Know JS", "JavaScript30", "Git Handbook"],
                  projects: ["Budget Tracker", "Bookmark Manager", "API Consumer"]
                },
                {
                  week: "Week 5-6: React Fundamentals",
                  topics: [
                    "React Components & JSX Syntax",
                    "Props, State & Event Handling",
                    "Conditional Rendering & Lists",
                    "React Hooks: useState, useEffect",
                    "Build: React E-commerce Product Catalog"
                  ],
                  resources: ["React Official Docs", "Scrimba React", "Epic React"],
                  projects: ["Movie Database App", "Recipe Finder", "Task Manager"]
                },
                {
                  week: "Week 7-8: Advanced React & State Management",
                  topics: [
                    "React Router for Navigation",
                    "Context API for Global State",
                    "Custom Hooks & Component Composition",
                    "Form Handling with React Hook Form",
                    "Build: Blog Platform with User Authentication"
                  ],
                  resources: ["React Patterns", "Testing Library", "Frontend Masters"],
                  projects: ["Social Media Dashboard", "CRM System", "Booking App"]
                },
                {
                  week: "Week 9-10: Modern React Ecosystem",
                  topics: [
                    "Vite Build Tool & Hot Module Replacement",
                    "Component Libraries: Material-UI/Chakra UI",
                    "API Integration with Axios/Fetch",
                    "TypeScript with React",
                    "Build: Type-Safe React Application"
                  ],
                  resources: ["Vite Docs", "Material-UI Docs", "React TypeScript"],
                  projects: ["Customer Management System", "Stock Dashboard", "Real-time Chat UI"]
                },
                {
                  week: "Week 11-12: Testing & Frontend Deployment",
                  topics: [
                    "Jest & React Testing Library",
                    "Component Testing Strategies",
                    "End-to-End Testing with Cypress",
                    "Vercel/Netlify Deployment",
                    "Build: Fully Tested & Deployed Frontend App"
                  ],
                  resources: ["Testing Library Docs", "Jest Docs", "Vercel Guide"],
                  projects: ["Deployed Portfolio", "Production React App", "E-commerce Store Frontend"]
                }
              ]
            },
            {
              phase: "Month 4-6: Backend Development with Node.js",
              duration: "12 weeks",
              weeks: [
                {
                  week: "Week 13-14: Node.js Fundamentals",
                  topics: [
                    "Node.js Runtime & Event Loop",
                    "CommonJS Modules & npm Ecosystem",
                    "File System Operations",
                    "Building CLI Tools",
                    "Build: File System Organizer CLI"
                  ],
                  resources: ["Node.js Docs", "Node.js Design Patterns", "FreeCodeCamp Node"],
                  projects: ["CLI Calculator", "Text-based Game", "File Processor"]
                },
                {
                  week: "Week 15-16: Express.js & REST APIs",
                  topics: [
                    "Express.js Framework Setup",
                    "Middleware Concepts & Implementation",
                    "RESTful API Design Principles",
                    "HTTP Methods & Status Codes",
                    "Build: REST API for Todo Application"
                  ],
                  resources: ["Express.js Guide", "REST API Tutorial", "MDN HTTP"],
                  projects: ["Book Library API", "User Management API", "Product Catalog API"]
                },
                {
                  week: "Week 17-18: Databases & MongoDB",
                  topics: [
                    "NoSQL Databases vs SQL",
                    "MongoDB Atlas Cloud Database",
                    "Mongoose ODM for Data Modeling",
                    "CRUD Operations with Mongoose",
                    "Build: MongoDB-backed Blog API"
                  ],
                  resources: ["MongoDB University", "Mongoose Docs", "NoSQL Patterns"],
                  projects: ["User Authentication System", "E-commerce Backend", "Content Management API"]
                },
                {
                  week: "Week 19-20: Authentication & Security",
                  topics: [
                    "JWT (JSON Web Tokens) Authentication",
                    "Password Hashing with bcrypt",
                    "Middleware for Route Protection",
                    "CORS & Security Best Practices",
                    "Build: Secure Authentication System"
                  ],
                  resources: ["JWT Handbook", "bcrypt Docs", "OWASP Security Guide"],
                  projects: ["Secure User Registration", "Role-based Access Control", "API with JWT Auth"]
                },
                {
                  week: "Week 21-22: SQL Databases & Advanced Topics",
                  topics: [
                    "PostgreSQL with Node.js",
                    "SQL vs NoSQL Decision Making",
                    "Database Relationships & Joins",
                    "Transaction Management",
                    "Build: PostgreSQL-backed Application"
                  ],
                  resources: ["PostgreSQL Docs", "SQL vs NoSQL Guide", "Database Design"],
                  projects: ["E-commerce with PostgreSQL", "Financial Tracking System", "Social Media Backend"]
                },
                {
                  week: "Week 23-24: Backend Deployment & DevOps",
                  topics: [
                    "Environment Variables & Configuration",
                    "Docker Containerization",
                    "Cloud Deployment: Railway/Render/Heroku",
                    "CI/CD Pipelines with GitHub Actions",
                    "Build: Deployed Full-stack Application"
                  ],
                  resources: ["Docker Docs", "Railway Docs", "GitHub Actions"],
                  projects: ["Dockerized API", "CI/CD Pipeline", "Production Deployment"]
                }
              ]
            },
            {
              phase: "Month 7-8: Fullstack Integration & Advanced Topics",
              duration: "8 weeks",
              weeks: [
                {
                  week: "Week 25-26: Frontend-Backend Integration",
                  topics: [
                    "Connecting React Frontend to Node.js Backend",
                    "CORS Configuration & Proxy Setup",
                    "State Management for API Data",
                    "Error Handling & Loading States",
                    "Build: Fullstack Todo Application"
                  ],
                  resources: ["Fullstack Tutorials", "CORS Guide", "React Query"],
                  projects: ["Connected Blog Platform", "Fullstack E-commerce", "Social Media App"]
                },
                {
                  week: "Week 27-28: Real-time Applications",
                  topics: [
                    "WebSockets with Socket.io",
                    "Real-time Chat Applications",
                    "Live Updates & Notifications",
                    "Room-based Communication",
                    "Build: Real-time Chat Application"
                  ],
                  resources: ["Socket.io Docs", "WebSockets Guide", "Real-time Patterns"],
                  projects: ["Live Chat App", "Collaborative Whiteboard", "Real-time Dashboard"]
                },
                {
                  week: "Week 29-30: Performance Optimization",
                  topics: [
                    "Frontend Performance: Code Splitting, Lazy Loading",
                    "Backend Performance: Caching, Database Indexing",
                    "CDN & Asset Optimization",
                    "Lighthouse & Performance Metrics",
                    "Build: High-performance Fullstack App"
                  ],
                  resources: ["Web.dev Performance", "Lighthouse", "Caching Strategies"],
                  projects: ["Optimized E-commerce", "Fast-loading Blog", "Performance-focused App"]
                },
                {
                  week: "Week 31-32: Testing & Final Project",
                  topics: [
                    "End-to-End Testing Strategy",
                    "Integration Testing",
                    "Load Testing & Stress Testing",
                    "Project Architecture & Best Practices",
                    "Build: Comprehensive Fullstack Project"
                  ],
                  resources: ["Testing Strategies", "Architecture Patterns", "Best Practices"],
                  projects: ["Capstone Project", "Portfolio Showcase", "Production-ready Application"]
                }
              ]
            }
          ]
        }
      }
    },
    intermediate: {
      backend: {
        java: {
          title: "Intermediate Java Backend Developer Roadmap",
          totalDuration: "6-8 months",
          weeklyHours: "20-25 hours",
          phases: [
            {
              phase: "Month 1-2: Advanced Spring Framework",
              duration: "8 weeks",
              weeks: [
                {
                  week: "Week 1-2: Spring Boot Deep Dive",
                  topics: [
                    "Spring Boot Auto-configuration",
                    "Custom Starters & Auto-configuration",
                    "Externalized Configuration",
                    "Profiles and Environment-specific Config",
                    "Build: Custom Spring Boot Starter"
                  ],
                  resources: ["Spring Boot Documentation", "Baeldung Spring Boot", "Custom Starters Guide"],
                  projects: ["Configuration Management System", "Multi-environment Application", "Custom Starter Library"]
                },
                {
                  week: "Week 3-4: Advanced Spring Data JPA",
                  topics: [
                    "JPA Entity Lifecycle",
                    "Advanced Query Methods",
                    "Entity Graph for Performance",
                    "Auditing and Versioning",
                    "Build: High-performance Data Access Layer"
                  ],
                  resources: ["Spring Data JPA Advanced", "Hibernate Performance", "JPA Best Practices"],
                  projects: ["Optimized Database Layer", "Audit Trail System", "Complex Query Repository"]
                },
                {
                  week: "Week 5-6: Spring Security Advanced",
                  topics: [
                    "OAuth2 and OpenID Connect",
                    "JWT Token Implementation",
                    "Method-level Security",
                    "Custom Authentication Providers",
                    "Build: Enterprise Security System"
                  ],
                  resources: ["Spring Security OAuth2", "JWT with Spring", "Advanced Security Patterns"],
                  projects: ["OAuth2 Implementation", "Custom Auth Provider", "Multi-tenant Security"]
                },
                {
                  week: "Week 7-8: Testing in Spring Ecosystem",
                  topics: [
                    "Integration Testing",
                    "Test Containers for Database Testing",
                    "MockMVC for Web Layer Testing",
                    "Testing Security Layers",
                    "Build: Comprehensive Test Suite"
                  ],
                  resources: ["Spring Testing Guide", "Test Containers", "MockMVC Documentation"],
                  projects: ["Integration Test Coverage", "Database Test Suite", "Security Layer Tests"]
                }
              ]
            },
            {
              phase: "Month 3-4: Microservices & Cloud Native",
              duration: "8 weeks",
              weeks: [
                {
                  week: "Week 9-10: Spring Cloud & Microservices",
                  topics: [
                    "Service Discovery with Eureka",
                    "API Gateway with Spring Cloud Gateway",
                    "Configuration Server",
                    "Circuit Breaker with Resilience4j",
                    "Build: Microservices Ecosystem"
                  ],
                  resources: ["Spring Cloud Documentation", "Microservices Patterns", "Resilience4j Guide"],
                  projects: ["Service Discovery Setup", "API Gateway Implementation", "Fault-tolerant Services"]
                },
                {
                  week: "Week 11-12: Distributed Systems",
                  topics: [
                    "Distributed Tracing with Sleuth/Zipkin",
                    "Distributed Caching",
                    "Event-driven Architecture",
                    "Saga Pattern for Distributed Transactions",
                    "Build: Distributed Application"
                  ],
                  resources: ["Distributed Tracing", "Event-driven Patterns", "Saga Pattern"],
                  projects: ["Tracing Implementation", "Event-driven Microservices", "Distributed Transaction System"]
                },
                {
                  week: "Week 13-14: Message Brokers & Streaming",
                  topics: [
                    "Kafka with Spring",
                    "RabbitMQ Integration",
                    "Event Sourcing",
                    "Stream Processing",
                    "Build: Message-driven Architecture"
                  ],
                  resources: ["Spring Kafka", "RabbitMQ with Spring", "Event Sourcing Patterns"],
                  projects: ["Kafka Producer/Consumer", "Message Queue System", "Event-sourced Application"]
                },
                {
                  week: "Week 15-16: Cloud Deployment & DevOps",
                  topics: [
                    "Docker & Docker Compose",
                    "Kubernetes Deployment",
                    "Helm Charts",
                    "Cloud Native Buildpacks",
                    "Build: Cloud-deployed Application"
                  ],
                  resources: ["Docker for Java", "Kubernetes Spring", "Helm Documentation"],
                  projects: ["Containerized Microservices", "K8s Deployment", "Helm Chart Creation"]
                }
              ]
            },
            {
              phase: "Month 5-6: Performance & Production Ready",
              duration: "8 weeks",
              weeks: [
                {
                  week: "Week 17-18: Performance Optimization",
                  topics: [
                    "JVM Tuning and Garbage Collection",
                    "Database Performance Optimization",
                    "Caching Strategies with Redis",
                    "Load Testing and Profiling",
                    "Build: High-performance Backend"
                  ],
                  resources: ["JVM Performance", "Database Optimization", "Redis with Spring"],
                  projects: ["JVM Tuned Application", "Cached API Responses", "Performance Benchmarking"]
                },
                {
                  week: "Week 19-20: Monitoring & Observability",
                  topics: [
                    "Metrics with Micrometer",
                    "Logging with ELK Stack",
                    "Health Checks and Readiness Probes",
                    "Alerting and Dashboarding",
                    "Build: Monitored Production System"
                  ],
                  resources: ["Micrometer Documentation", "ELK Stack Guide", "Observability Patterns"],
                  projects: ["Application Metrics", "Centralized Logging", "Health Monitoring System"]
                },
                {
                  week: "Week 21-22: API Design & Documentation",
                  topics: [
                    "RESTful API Best Practices",
                    "GraphQL with Spring",
                    "gRPC for High-performance APIs",
                    "OpenAPI/Swagger Documentation",
                    "Build: Well-designed API Ecosystem"
                  ],
                  resources: ["REST API Design", "Spring GraphQL", "gRPC with Java"],
                  projects: ["RESTful API Design", "GraphQL Service", "gRPC Implementation"]
                },
                {
                  week: "Week 23-24: Security & Compliance",
                  topics: [
                    "Advanced Security Practices",
                    "PCI DSS Compliance",
                    "GDPR Data Protection",
                    "Security Headers and CSP",
                    "Build: Secure Compliant Application"
                  ],
                  resources: ["Java Security", "Compliance Guidelines", "OWASP Top 10"],
                  projects: ["Security-hardened Application", "Compliance Implementation", "Security Audit"]
                }
              ]
            },
            {
              phase: "Month 7-8: Advanced Topics & Architecture",
              duration: "8 weeks",
              weeks: [
                {
                  week: "Week 25-26: Design Patterns & Architecture",
                  topics: [
                    "Domain-Driven Design",
                    "Hexagonal Architecture",
                    "Clean Architecture",
                    "Patterns for Microservices",
                    "Build: Well-architected Application"
                  ],
                  resources: ["DDD with Java", "Clean Architecture", "Microservices Patterns"],
                  projects: ["DDD Implementation", "Hexagonal Architecture", "Clean Codebase"]
                },
                {
                  week: "Week 27-28: Advanced Database Topics",
                  topics: [
                    "Database Sharding",
                    "Read Replicas and Write Scaling",
                    "NoSQL Integration",
                    "Database Migration Strategies",
                    "Build: Scalable Database Architecture"
                  ],
                  resources: ["Database Scaling", "NoSQL with Java", "Migration Strategies"],
                  projects: ["Sharded Database", "NoSQL Integration", "Zero-downtime Migrations"]
                },
                {
                  week: "Week 29-30: CI/CD & Automation",
                  topics: [
                    "GitHub Actions/GitLab CI",
                    "Infrastructure as Code with Terraform",
                    "Automated Testing Pipeline",
                    "Blue-Green Deployments",
                    "Build: Automated Delivery Pipeline"
                  ],
                  resources: ["CI/CD with Java", "Terraform for Java", "Deployment Strategies"],
                  projects: ["CI/CD Pipeline", "Infrastructure Automation", "Automated Deployment"]
                },
                {
                  week: "Week 31-32: Capstone Project & Career",
                  topics: [
                    "Enterprise-grade Project",
                    "System Design Interview Preparation",
                    "Resume and Portfolio Building",
                    "Open Source Contributions",
                    "Build: Comprehensive Portfolio Project"
                  ],
                  resources: ["System Design Interview", "Java Portfolio Guide", "Open Source Java"],
                  projects: ["Enterprise Application", "Portfolio Showcase", "Open Source Contribution"]
                }
              ]
            }
          ]
        }
      }
    }
  },
  data: {
    beginner: {
      'data-scientist': {
        python: {
          title: "Data Scientist Roadmap (Python)",
          totalDuration: "8-10 months",
          weeklyHours: "15-20 hours",
          phases: [
            {
              phase: "Month 1-3: Python & Data Analysis Foundation",
              duration: "12 weeks",
              weeks: [
                {
                  week: "Week 1-2: Python Programming Essentials",
                  topics: [
                    "Python Basics: Variables, Data Types, Operators",
                    "Control Structures: If-else, Loops, Functions",
                    "Data Structures: Lists, Dictionaries, Tuples, Sets",
                    "File Handling: Reading/Writing CSV and Text Files",
                    "Build: Data Cleaning Script for a Messy Dataset"
                  ],
                  resources: ["Python Crash Course", "DataCamp Python Courses", "Real Python"],
                  projects: ["Sales Data Cleaner", "Weather Data Parser"]
                },
                {
                  week: "Week 3-4: Scientific Computing with NumPy",
                  topics: [
                    "NumPy Arrays: Creation, Indexing, Slicing",
                    "Array Operations: Mathematical, Statistical",
                    "Broadcasting and Vectorization",
                    "Random Number Generation",
                    "Build: Statistical Analysis on Array Data"
                  ],
                  resources: ["NumPy Official Documentation", "Python for Data Analysis Book"],
                  projects: ["Matrix Operations Calculator", "Random Data Generator"]
                },
                {
                  week: "Week 5-6: Data Manipulation with Pandas",
                  topics: [
                    "Pandas Series and DataFrames",
                    "Data Loading: CSV, Excel, JSON Files",
                    "Data Cleaning: Handling Missing Values, Duplicates",
                    "Data Filtering and Selection",
                    "Build: Exploratory Analysis on Titanic Dataset"
                  ],
                  resources: ["Pandas Documentation", "Kaggle Pandas Course", "Towards Data Science"],
                  projects: ["Customer Data Analysis", "Stock Market Data Explorer"]
                },
                {
                  week: "Week 7-8: Data Visualization Fundamentals",
                  topics: [
                    "Matplotlib: Line Plots, Bar Charts, Histograms",
                    "Seaborn: Statistical Data Visualization",
                    "Plot Customization: Labels, Titles, Legends",
                    "Subplots and Figure Layouts",
                    "Build: Comprehensive Data Visualization Dashboard"
                  ],
                  resources: ["Matplotlib Tutorials", "Seaborn Gallery", "Python Graph Gallery"],
                  projects: ["Sales Trends Visualization", "Population Demographics Dashboard"]
                },
                {
                  week: "Week 9-10: Database & SQL for Data Science",
                  topics: [
                    "SQL Basics: SELECT, WHERE, ORDER BY",
                    "Aggregation Functions: COUNT, SUM, AVG, GROUP BY",
                    "Joins: INNER, LEFT, RIGHT, FULL",
                    "SQL with Python: sqlite3, SQLAlchemy",
                    "Build: SQL Queries for Business Analysis"
                  ],
                  resources: ["SQLZoo", "Mode Analytics SQL Tutorial", "W3Schools SQL"],
                  projects: ["E-commerce Data Analysis", "Employee Database Queries"]
                },
                {
                  week: "Week 11-12: Statistics for Data Science",
                  topics: [
                    "Descriptive Statistics: Mean, Median, Mode, Variance",
                    "Probability Distributions: Normal, Binomial, Poisson",
                    "Inferential Statistics: Hypothesis Testing, p-values",
                    "Correlation and Covariance",
                    "Build: Statistical Report on Dataset"
                  ],
                  resources: ["Statistics for Data Science Book", "Khan Academy Statistics", "StatQuest"],
                  projects: ["A/B Testing Analysis", "Statistical Inference Project"]
                }
              ]
            },
            {
              phase: "Month 4-6: Machine Learning Fundamentals",
              duration: "12 weeks",
              weeks: [
                {
                  week: "Week 13-14: Introduction to Machine Learning",
                  topics: [
                    "ML Concepts: Supervised vs Unsupervised Learning",
                    "Train-Test Split and Cross-Validation",
                    "Model Evaluation Metrics: Accuracy, Precision, Recall",
                    "Scikit-learn Library Overview",
                    "Build: First ML Model - Iris Flower Classification"
                  ],
                  resources: ["Scikit-learn Documentation", "Introduction to Statistical Learning", "Google ML Crash Course"],
                  projects: ["Iris Species Classifier", "Wine Quality Predictor"]
                },
                {
                  week: "Week 15-16: Regression Models",
                  topics: [
                    "Linear Regression: Simple and Multiple",
                    "Polynomial Regression",
                    "Regularization: Ridge and Lasso Regression",
                    "Evaluation Metrics: MSE, RMSE, R-squared",
                    "Build: House Price Prediction Model"
                  ],
                  resources: ["Linear Regression Tutorials", "Towards Data Science Articles"],
                  projects: ["Stock Price Prediction", "Car Value Estimation"]
                },
                {
                  week: "Week 17-18: Classification Models",
                  topics: [
                    "Logistic Regression",
                    "K-Nearest Neighbors (KNN)",
                    "Decision Trees and Random Forests",
                    "Support Vector Machines (SVM)",
                    "Build: Customer Churn Prediction Model"
                  ],
                  resources: ["Classification Algorithms Guide", "Machine Learning Mastery"],
                  projects: ["Spam Email Classifier", "Loan Approval Predictor"]
                },
                {
                  week: "Week 19-20: Clustering & Dimensionality Reduction",
                  topics: [
                    "K-Means Clustering",
                    "Hierarchical Clustering",
                    "Principal Component Analysis (PCA)",
                    "t-SNE for Visualization",
                    "Build: Customer Segmentation Analysis"
                  ],
                  resources: ["Clustering Tutorials", "PCA Explained", "Distill.pub Articles"],
                  projects: ["Market Basket Analysis", "Image Color Compression"]
                },
                {
                  week: "Week 21-22: Advanced ML Topics",
                  topics: [
                    "Hyperparameter Tuning: Grid Search, Random Search",
                    "Ensemble Methods: Bagging, Boosting (XGBoost)",
                    "Time Series Analysis",
                    "Natural Language Processing Basics",
                    "Build: Comprehensive ML Pipeline"
                  ],
                  resources: ["XGBoost Documentation", "Time Series Analysis Guide", "NLP with Python"],
                  projects: ["Sales Forecasting", "Sentiment Analysis on Reviews"]
                },
                {
                  week: "Week 23-24: Capstone Project & Deployment",
                  topics: [
                    "End-to-End Data Science Project",
                    "Model Deployment with Flask/FastAPI",
                    "Creating Data Science Portfolio",
                    "Storytelling with Data",
                    "Build: Complete Data Science Project from Scratch"
                  ],
                  resources: ["Data Science Portfolio Guide", "FastAPI Documentation", "Towards Data Science"],
                  projects: ["Complete Predictive Analytics Project", "Deployed ML Model API"]
                }
              ]
            }
          ]
        }
      }
    }
  },
  mobile: {
    beginner: {
      'mobile-developer': {
        javascript: {
          title: "React Native Mobile Developer Roadmap",
          totalDuration: "6-8 months",
          weeklyHours: "15-20 hours",
          phases: [
            {
              phase: "Month 1-2: React Native Fundamentals",
              duration: "8 weeks",
              weeks: [
                {
                  week: "Week 1-2: React & JavaScript Refresher",
                  topics: [
                    "React Components, Props, and State",
                    "ES6+ Features: Arrow functions, Destructuring",
                    "Async/Await and Promises",
                    "Array Methods and Data Manipulation",
                    "Build: Basic React Web App"
                  ],
                  resources: ["React Official Docs", "JavaScript.info", "MDN JavaScript"],
                  projects: ["Todo List App", "Weather App", "Calculator"]
                },
                {
                  week: "Week 3-4: React Native Setup & Basics",
                  topics: [
                    "Setting up React Native Environment",
                    "Expo vs React Native CLI",
                    "Core Components: View, Text, Image",
                    "Styling with StyleSheet API",
                    "Build: First Mobile App - Personal Profile"
                  ],
                  resources: ["React Native Docs", "Expo Documentation", "React Native Tutorial"],
                  projects: ["Personal Portfolio App", "Simple Calculator", "Image Gallery"]
                },
                {
                  week: "Week 5-6: Navigation & User Input",
                  topics: [
                    "React Navigation Stack & Tabs",
                    "Handling User Input with TextInput",
                    "Touchable Components & Buttons",
                    "Forms and Form Validation",
                    "Build: Multi-screen App with Navigation"
                  ],
                  resources: ["React Navigation Docs", "React Native Elements", "Formik for React Native"],
                  projects: ["Recipe App with Navigation", "User Registration Form", "Multi-tab Application"]
                },
                {
                  week: "Week 7-8: API Integration & Async Storage",
                  topics: [
                    "Fetching Data from REST APIs",
                    "Axios for HTTP Requests",
                    "AsyncStorage for Local Data",
                    "Loading States and Error Handling",
                    "Build: Weather App with API Integration"
                  ],
                  resources: ["React Native Fetch", "Axios Documentation", "AsyncStorage Guide"],
                  projects: ["Weather Forecast App", "News Reader App", "Currency Converter"]
                }
              ]
            },
            {
              phase: "Month 3-4: Advanced React Native Features",
              duration: "8 weeks",
              weeks: [
                {
                  week: "Week 9-10: State Management & Context",
                  topics: [
                    "React Context API for State Management",
                    "Redux Toolkit for Complex State",
                    "Zustand for Lightweight State",
                    "State Persistence",
                    "Build: Shopping Cart Application"
                  ],
                  resources: ["React Context Docs", "Redux Toolkit", "Zustand GitHub"],
                  projects: ["E-commerce Cart", "Task Manager with Persistence", "User Preferences App"]
                },
                {
                  week: "Week 11-12: Native Device Features",
                  topics: [
                    "Camera API and Image Picker",
                    "Geolocation and Maps Integration",
                    "Push Notifications",
                    "Device Sensors Access",
                    "Build: Photo Sharing App with Location"
                  ],
                  resources: ["React Native Camera", "React Native Maps", "Notifications Guide"],
                  projects: ["Photo Gallery with GPS", "Location-based Reminders", "Social Media App"]
                },
                {
                  week: "Week 13-14: UI/UX & Animations",
                  topics: [
                    "Advanced Styling Techniques",
                    "React Native Reanimated",
                    "Gesture Handling",
                    "Accessibility Best Practices",
                    "Build: Smooth Animated App"
                  ],
                  resources: ["React Native Reanimated", "Gesture Handler", "React Native Paper"],
                  projects: ["Animated Weather App", "Gesture-based Game", "Accessible Todo App"]
                },
                {
                  week: "Week 15-16: Testing & Debugging",
                  topics: [
                    "Jest Testing Framework",
                    "React Native Testing Library",
                    "Debugging Techniques",
                    "Performance Optimization",
                    "Build: Fully Tested Production App"
                  ],
                  resources: ["Jest Documentation", "Testing Library", "React Native Debugger"],
                  projects: ["Test-covered Application", "Performance-optimized App", "Debugging Practice App"]
                }
              ]
            },
            {
              phase: "Month 5-6: Production Ready & Deployment",
              duration: "8 weeks",
              weeks: [
                {
                  week: "Week 17-18: Backend Integration",
                  topics: [
                    "Firebase Integration",
                    "Authentication Systems",
                    "Real-time Databases",
                    "Cloud Functions",
                    "Build: Full-stack Mobile App"
                  ],
                  resources: ["Firebase Documentation", "React Native Firebase", "Backend Integration Guide"],
                  projects: ["Chat Application", "Social Media with Auth", "Real-time Collaboration App"]
                },
                {
                  week: "Week 19-20: App Store Preparation",
                  topics: [
                    "App Store Guidelines",
                    "Creating App Icons and Assets",
                    "App Signing and Certificates",
                    "Screenshots and Marketing Materials",
                    "Build: App Store Ready Application"
                  ],
                  resources: ["Apple App Store Guide", "Google Play Console", "App Icon Generator"],
                  projects: ["App Store Listing", "App Marketing Materials", "App Store Optimization"]
                },
                {
                  week: "Week 21-22: Build & Deployment",
                  topics: [
                    "Building for iOS and Android",
                    "Over-the-Air Updates",
                    "App Distribution",
                    "Crash Reporting & Analytics",
                    "Build: Deployed Production App"
                  ],
                  resources: ["React Native Build Guide", "Expo Application Services", "Crashlytics"],
                  projects: ["Production Build for Both Platforms", "OTA Update Implementation", "Analytics Dashboard"]
                },
                {
                  week: "Week 23-24: Final Project & Portfolio",
                  topics: [
                    "Complete Capstone Project",
                    "Creating Developer Portfolio",
                    "Resume Building",
                    "Interview Preparation",
                    "Build: Comprehensive Portfolio App"
                  ],
                  resources: ["React Native Portfolio Examples", "Mobile Developer Resume", "Interview Questions"],
                  projects: ["Capstone Project", "Portfolio Application", "Showcase App for Job Applications"]
                }
              ]
            }
          ]
        }
      }
    }
  },
  ai: {
    beginner: {
      'data-scientist': {
        python: {
          title: "AI/ML Data Scientist Roadmap",
          totalDuration: "8-10 months",
          weeklyHours: "15-20 hours",
          phases: [
            {
              phase: "Month 1-3: Python & Data Foundations",
              duration: "12 weeks",
              weeks: [
                {
                  week: "Week 1-2: Python Programming Essentials",
                  topics: [
                    "Python Basics: Variables, Data Types, Control Flow",
                    "Functions, Modules, and Packages",
                    "File Handling and Error Handling",
                    "Object-Oriented Programming Basics",
                    "Build: Data Processing Script"
                  ],
                  resources: ["Python Crash Course", "W3Schools Python", "Real Python"],
                  projects: ["Number Guessing Game", "File Organizer", "Basic Calculator"]
                },
                {
                  week: "Week 3-4: Data Manipulation with Pandas",
                  topics: [
                    "Pandas DataFrames and Series",
                    "Data Loading from CSV, Excel, JSON",
                    "Data Cleaning and Preprocessing",
                    "Data Filtering and Selection",
                    "Build: Data Analysis on Sales Dataset"
                  ],
                  resources: ["Pandas Documentation", "Kaggle Pandas Course", "Towards Data Science"],
                  projects: ["Sales Data Analyzer", "Customer Data Cleaner", "Stock Data Processor"]
                },
                {
                  week: "Week 5-6: Data Visualization",
                  topics: [
                    "Matplotlib: Line Plots, Bar Charts, Histograms",
                    "Seaborn for Statistical Visualization",
                    "Plot Customization and Styling",
                    "Interactive Plotting with Plotly",
                    "Build: Data Visualization Dashboard"
                  ],
                  resources: ["Matplotlib Tutorials", "Seaborn Gallery", "Plotly Documentation"],
                  projects: ["Sales Trends Dashboard", "Population Demographics Visualizer", "Weather Data Plotter"]
                },
                {
                  week: "Week 7-8: Statistics for Data Science",
                  topics: [
                    "Descriptive Statistics: Mean, Median, Mode",
                    "Probability Distributions",
                    "Hypothesis Testing",
                    "Correlation and Regression Analysis",
                    "Build: Statistical Analysis Report"
                  ],
                  resources: ["Statistics for Data Science", "Khan Academy Statistics", "StatQuest"],
                  projects: ["A/B Testing Analysis", "Correlation Study", "Statistical Inference Project"]
                },
                {
                  week: "Week 9-10: SQL for Data Science",
                  topics: [
                    "SQL Basics: SELECT, WHERE, ORDER BY",
                    "Aggregation Functions: COUNT, SUM, AVG",
                    "JOIN Operations",
                    "Subqueries and Common Table Expressions",
                    "Build: SQL Queries for Business Insights"
                  ],
                  resources: ["SQLZoo", "Mode Analytics SQL", "W3Schools SQL"],
                  projects: ["E-commerce Data Analysis", "Employee Database Queries", "Sales Reporting System"]
                },
                {
                  week: "Week 11-12: Introduction to Machine Learning",
                  topics: [
                    "ML Concepts: Supervised vs Unsupervised Learning",
                    "Train-Test Split and Cross-Validation",
                    "Model Evaluation Metrics",
                    "Scikit-learn Introduction",
                    "Build: First ML Model - Iris Classification"
                  ],
                  resources: ["Scikit-learn Documentation", "Introduction to ML", "Google ML Crash Course"],
                  projects: ["Iris Flower Classifier", "House Price Predictor", "Customer Segmentation"]
                }
              ]
            },
            {
              phase: "Month 4-6: Core Machine Learning",
              duration: "12 weeks",
              weeks: [
                {
                  week: "Week 13-14: Regression Models",
                  topics: [
                    "Linear Regression",
                    "Polynomial Regression",
                    "Regularization: Ridge and Lasso",
                    "Model Evaluation for Regression",
                    "Build: House Price Prediction Model"
                  ],
                  resources: ["Linear Regression Guide", "Towards Data Science", "Regression Tutorials"],
                  projects: ["Real Estate Price Predictor", "Stock Price Forecast", "Demand Prediction Model"]
                },
                {
                  week: "Week 15-16: Classification Models",
                  topics: [
                    "Logistic Regression",
                    "Decision Trees and Random Forests",
                    "K-Nearest Neighbors",
                    "Support Vector Machines",
                    "Build: Customer Churn Prediction"
                  ],
                  resources: ["Classification Algorithms", "Machine Learning Mastery", "Scikit-learn Classification"],
                  projects: ["Spam Email Classifier", "Loan Approval Predictor", "Disease Diagnosis System"]
                },
                {
                  week: "Week 17-18: Clustering & Dimensionality Reduction",
                  topics: [
                    "K-Means Clustering",
                    "Hierarchical Clustering",
                    "Principal Component Analysis (PCA)",
                    "t-SNE for Visualization",
                    "Build: Customer Segmentation System"
                  ],
                  resources: ["Clustering Tutorials", "PCA Explained", "Unsupervised Learning Guide"],
                  projects: ["Market Segmentation", "Image Compression", "Anomaly Detection"]
                },
                {
                  week: "Week 19-20: Model Optimization",
                  topics: [
                    "Hyperparameter Tuning",
                    "Grid Search and Random Search",
                    "Feature Engineering",
                    "Model Selection Techniques",
                    "Build: Optimized ML Pipeline"
                  ],
                  resources: ["Hyperparameter Tuning Guide", "Feature Engineering Book", "Model Selection"],
                  projects: ["Optimized Prediction Model", "Feature Importance Analysis", "AutoML Implementation"]
                },
                {
                  week: "Week 21-22: Introduction to Deep Learning",
                  topics: [
                    "Neural Networks Basics",
                    "TensorFlow/PyTorch Introduction",
                    "Building Simple Neural Networks",
                    "Training and Evaluation",
                    "Build: MNIST Digit Classifier"
                  ],
                  resources: ["TensorFlow Tutorials", "PyTorch Guide", "Neural Networks Basics"],
                  projects: ["Handwriting Recognition", "Image Classifier", "Basic Neural Network"]
                },
                {
                  week: "Week 23-24: Capstone Project",
                  topics: [
                    "End-to-End Data Science Project",
                    "Data Collection and Cleaning",
                    "Model Building and Evaluation",
                    "Presentation and Storytelling",
                    "Build: Comprehensive Data Science Project"
                  ],
                  resources: ["Data Science Portfolio Guide", "Project Ideas", "Storytelling with Data"],
                  projects: ["Complete Predictive Analytics Project", "Data Science Portfolio Piece", "Business Impact Analysis"]
                }
              ]
            },
            {
              phase: "Month 7-8: Production & Deployment",
              duration: "8 weeks",
              weeks: [
                {
                  week: "Week 25-26: Model Deployment",
                  topics: [
                    "Flask/FastAPI for Model Serving",
                    "Docker Containerization",
                    "Cloud Deployment: Heroku, AWS, GCP",
                    "API Development",
                    "Build: Deployed ML Model API"
                  ],
                  resources: ["Flask Documentation", "Docker Tutorial", "Cloud Deployment Guide"],
                  projects: ["Deployed Prediction API", "Containerized ML Model", "Cloud-based ML Service"]
                },
                {
                  week: "Week 27-28: MLOps Basics",
                  topics: [
                    "Version Control for Models",
                    "MLflow for Experiment Tracking",
                    "Basic CI/CD for ML",
                    "Model Monitoring",
                    "Build: ML Experiment Tracking System"
                  ],
                  resources: ["MLflow Documentation", "MLOps Basics", "Version Control for ML"],
                  projects: ["Experiment Tracking Setup", "Model Versioning System", "Basic ML Pipeline"]
                },
                {
                  week: "Week 29-30: Advanced Topics Introduction",
                  topics: [
                    "Natural Language Processing Basics",
                    "Computer Vision Introduction",
                    "Time Series Analysis",
                    "Recommendation Systems",
                    "Build: Text Classification Model"
                  ],
                  resources: ["NLP with Python", "OpenCV Tutorial", "Time Series Analysis"],
                  projects: ["Sentiment Analysis", "Image Classification", "Sales Forecasting"]
                },
                {
                  week: "Week 31-32: Portfolio & Career Preparation",
                  topics: [
                    "Building Data Science Portfolio",
                    "Resume Preparation",
                    "Technical Interview Practice",
                    "Networking and Job Search",
                    "Build: Professional Portfolio"
                  ],
                  resources: ["Data Science Portfolio Guide", "Interview Questions", "Resume Tips"],
                  projects: ["GitHub Portfolio", "Technical Blog Posts", "Interview Preparation Projects"]
                }
              ]
            }
          ]
        }
      }
    }
  },
  devops: {
    intermediate: {
      'devops-engineer': {
        go: {
          title: "DevOps Engineer Roadmap",
          totalDuration: "8-12 months", 
          weeklyHours: "20-25 hours",
          phases: [
            {
              phase: "Month 1-3: Linux & Cloud Foundations",
              duration: "12 weeks",
              weeks: [
                {
                  week: "Week 1-2: Linux System Administration",
                  topics: [
                    "Linux Command Line Mastery",
                    "File System Management & Permissions",
                    "Process Management & Monitoring",
                    "Shell Scripting (Bash)",
                    "Build: Automated System Administration Scripts"
                  ],
                  resources: ["Linux Command Line", "Bash Scripting Guide", "Linux Administration Handbook"],
                  projects: ["System Monitoring Script", "Automated Backup System", "User Management Tool"]
                },
                {
                  week: "Week 3-4: Networking Fundamentals",
                  topics: [
                    "TCP/IP Protocol Suite",
                    "DNS, DHCP, and HTTP/HTTPS",
                    "Network Security & Firewalls",
                    "Troubleshooting Network Issues",
                    "Build: Network Configuration Automation"
                  ],
                  resources: ["Computer Networking", "Networking for DevOps", "Cloudflare Learning"],
                  projects: ["Network Scanner", "DNS Configuration Manager", "Security Group Automator"]
                },
                {
                  week: "Week 5-6: Cloud Computing Basics",
                  topics: [
                    "AWS/GCP/Azure Fundamentals",
                    "EC2/Compute Engine Instances",
                    "S3/Cloud Storage",
                    "IAM & Security Policies",
                    "Build: Cloud Infrastructure Setup"
                  ],
                  resources: ["AWS Documentation", "Google Cloud Guide", "Azure Fundamentals"],
                  projects: ["Cloud VM Deployment", "S3 Bucket Manager", "IAM Policy Generator"]
                },
                {
                  week: "Week 7-8: Infrastructure as Code (Terraform)",
                  topics: [
                    "Terraform Syntax & Providers",
                    "Resource Management & State Files",
                    "Modules and Reusability",
                    "Terraform Cloud/Enterprise",
                    "Build: Infrastructure Automation Pipeline"
                  ],
                  resources: ["Terraform Documentation", "Terraform Learn", "Infrastructure as Code Patterns"],
                  projects: ["Multi-tier Application Infrastructure", "Auto-scaling Environment", "Cloud Network Setup"]
                },
                {
                  week: "Week 9-10: Configuration Management (Ansible)",
                  topics: [
                    "Ansible Playbooks & Roles",
                    "Inventory Management",
                    "Configuration Drift Prevention",
                    "Ansible Tower/AWX",
                    "Build: Automated Server Configuration"
                  ],
                  resources: ["Ansible Documentation", "Ansible Best Practices", "Configuration Management Guide"],
                  projects: ["Web Server Automation", "Database Cluster Setup", "Application Deployment Playbook"]
                },
                {
                  week: "Week 11-12: Containerization Fundamentals",
                  topics: [
                    "Docker Architecture & Images",
                    "Dockerfile Best Practices",
                    "Container Networking & Storage",
                    "Docker Compose",
                    "Build: Containerized Application"
                  ],
                  resources: ["Docker Documentation", "Docker Deep Dive", "Container Patterns"],
                  projects: ["Multi-container Application", "Dockerized Web Server", "Microservices Environment"]
                }
              ]
            },
            {
              phase: "Month 4-6: Kubernetes & CI/CD",
              duration: "12 weeks",
              weeks: [
                {
                  week: "Week 13-14: Kubernetes Fundamentals",
                  topics: [
                    "Kubernetes Architecture",
                    "Pods, Deployments & Services",
                    "ConfigMaps & Secrets",
                    "Basic kubectl Commands",
                    "Build: Local Kubernetes Cluster"
                  ],
                  resources: ["Kubernetes Documentation", "Kubernetes the Hard Way", "kubectl Cheat Sheet"],
                  projects: ["Local Minikube Cluster", "Simple Web App Deployment", "Config Management Setup"]
                },
                {
                  week: "Week 15-16: Advanced Kubernetes",
                  topics: [
                    "StatefulSets & Persistent Storage",
                    "Ingress Controllers",
                    "Helm Charts",
                    "Resource Limits & Requests",
                    "Build: Production-ready K8s Setup"
                  ],
                  resources: ["Kubernetes Patterns", "Helm Documentation", "K8s Best Practices"],
                  projects: ["Stateful Application Deployment", "Helm Chart Creation", "Resource Optimization"]
                },
                {
                  week: "Week 17-18: CI/CD Pipelines",
                  topics: [
                    "Jenkins Pipeline as Code",
                    "GitHub Actions/GitLab CI",
                    "Pipeline Testing & Security",
                    "Artifact Management",
                    "Build: Automated Deployment Pipeline"
                  ],
                  resources: ["Jenkins Handbook", "GitHub Actions Guide", "CI/CD Patterns"],
                  projects: ["Java Application Pipeline", "Docker Build Pipeline", "Multi-environment Deployment"]
                },
                {
                  week: "Week 19-20: Monitoring & Observability",
                  topics: [
                    "Prometheus & Grafana",
                    "ELK Stack for Logging",
                    "Application Performance Monitoring",
                    "Alerting & Dashboards",
                    "Build: Monitoring Stack"
                  ],
                  resources: ["Prometheus Documentation", "Grafana Tutorials", "Observability Engineering"],
                  projects: ["Kubernetes Monitoring", "Application Metrics Dashboard", "Alerting System"]
                },
                {
                  week: "Week 21-22: Security & Compliance",
                  topics: [
                    "Container Security",
                    "Network Policies",
                    "Secrets Management",
                    "Compliance as Code",
                    "Build: Secure Infrastructure"
                  ],
                  resources: ["DevSecOps Guide", "Kubernetes Security", "Security Best Practices"],
                  projects: ["Security Hardened Cluster", "Compliance Automation", "Secrets Rotation System"]
                },
                {
                  week: "Week 23-24: GitOps & Advanced Patterns",
                  topics: [
                    "ArgoCD/Flux for GitOps",
                    "Canary & Blue-Green Deployments",
                    "Disaster Recovery",
                    "Multi-cluster Management",
                    "Build: GitOps Workflow"
                  ],
                  resources: ["ArgoCD Documentation", "GitOps Principles", "Advanced Deployment Patterns"],
                  projects: ["GitOps Deployment Pipeline", "Canary Release Setup", "DR Strategy Implementation"]
                }
              ]
            },
            {
              phase: "Month 7-9: Advanced Topics & Specialization",
              duration: "12 weeks",
              weeks: [
                {
                  week: "Week 25-26: Cloud Native Development",
                  topics: [
                    "Service Mesh (Istio/Linkerd)",
                    "Serverless Architecture",
                    "Cloud Native Storage",
                    "Event-driven Architecture",
                    "Build: Cloud Native Application"
                  ],
                  resources: ["Istio Documentation", "Serverless Framework", "Cloud Native Patterns"],
                  projects: ["Service Mesh Implementation", "Serverless Functions", "Event-driven System"]
                },
                {
                  week: "Week 27-28: Performance Optimization",
                  topics: [
                    "Infrastructure Cost Optimization",
                    "Application Performance Tuning",
                    "Database Optimization",
                    "Caching Strategies",
                    "Build: High-performance Infrastructure"
                  ],
                  resources: ["Cloud Cost Optimization", "Performance Engineering", "Caching Patterns"],
                  projects: ["Cost-optimized Architecture", "Performance Benchmarking", "Caching Layer Implementation"]
                },
                {
                  week: "Week 29-30: Disaster Recovery & Backup",
                  topics: [
                    "Backup Strategies",
                    "Disaster Recovery Planning",
                    "High Availability Setup",
                    "Data Replication",
                    "Build: DR-ready Infrastructure"
                  ],
                  resources: ["DR Best Practices", "Backup Strategies", "High Availability Guide"],
                  projects: ["Automated Backup System", "DR Plan Documentation", "Multi-region Setup"]
                },
                {
                  week: "Week 31-32: DevOps Culture & Tools",
                  topics: [
                    "DevOps Methodology",
                    "Team Collaboration Tools",
                    "Documentation as Code",
                    "Incident Management",
                    "Build: DevOps Toolchain"
                  ],
                  resources: ["DevOps Handbook", "Site Reliability Engineering", "Incident Response Guide"],
                  projects: ["Complete Toolchain Setup", "Documentation Portal", "Incident Management Process"]
                },
                {
                  week: "Week 33-34: Certification Preparation",
                  topics: [
                    "AWS/GCP/Azure Certifications",
                    "Kubernetes Certification (CKA/CKAD)",
                    "Terraform Certification",
                    "Exam Strategies & Practice",
                    "Build: Certification Study Plan"
                  ],
                  resources: ["Official Certification Guides", "Practice Exams", "Study Communities"],
                  projects: ["Certification Roadmap", "Practice Test Results", "Study Notes Repository"]
                },
                {
                  week: "Week 35-36: Capstone Project",
                  topics: [
                    "End-to-end DevOps Implementation",
                    "Real-world Scenario Project",
                    "Portfolio Development",
                    "Interview Preparation",
                    "Build: Production-grade DevOps Setup"
                  ],
                  resources: ["DevOps Project Ideas", "Portfolio Guide", "Interview Questions"],
                  projects: ["Complete CI/CD Pipeline", "Infrastructure Automation", "Monitoring & Alerting System"]
                }
              ]
            }
          ]
        }
      }
    }
  }
};

    // Default detailed roadmap if specific combination not found
    const defaultDetailedRoadmap = {
      title: "Comprehensive Learning Roadmap",
      totalDuration: "6-9 months",
      weeklyHours: "15-25 hours",
      phases: [
        {
          phase: "Foundation Phase",
          duration: "8-12 weeks",
          weeks: [
            {
              week: "Weeks 1-4: Core Fundamentals",
              topics: ["Programming Basics", "Language Syntax", "Development Environment Setup"],
              resources: ["Official Documentation", "Beginner Courses", "Practice Platforms"],
              projects: ["Basic Applications", "Simple Games", "Utility Tools"]
            }
          ]
        }
      ]
    };

    return detailedRoadmaps[field]?.[level]?.[role]?.[language] || defaultDetailedRoadmap;
  };

  const roadmap = generateDetailedRoadmap();

  const getLabel = (category, value) => {
    const options = {
      level: { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' },
      field: { web: 'Web Development', mobile: 'Mobile Development', data: 'Data Science', ai: 'AI/ML', devops: 'DevOps', game: 'Game Development' },
      role: { frontend: 'Frontend Developer', backend: 'Backend Developer', fullstack: 'Fullstack Developer', 'data-scientist': 'Data Scientist', 'devops-engineer': 'DevOps Engineer', 'mobile-developer': 'Mobile Developer' },
      language: { javascript: 'JavaScript', python: 'Python', java: 'Java', csharp: 'C#', php: 'PHP', ruby: 'Ruby', go: 'Go', rust: 'Rust' }
    };
    
    return options[category]?.[value] || value;
  };

  const downloadRoadmap = async () => {
    setIsDownloading(true);
    
    try {
      await generateRoadmapPDF(roadmap, selections, getLabel);
    } catch (error) {
      console.error('Download error:', error);
      alert('Error generating roadmap. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="wrap">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">AlgoRythm</Link>
          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/roadmap-filter" className="nav-link">Learn</Link>
            <Link to="/projects" className="nav-link">Projects</Link>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎯</div>
          <h1>{roadmap.title}</h1>
          <p>Your hyper-specific learning path to become a {getLabel('role', selections.role)}</p>
          <div style={{ 
            background: 'var(--card)', 
            padding: '15px', 
            borderRadius: '12px', 
            margin: '20px auto',
            maxWidth: '400px',
            border: '1px solid var(--brand)'
          }}>
            <strong>📅 Timeline:</strong> {roadmap.totalDuration} • <strong>⏰ Weekly:</strong> {roadmap.weeklyHours}
          </div>
        </div>
      </section>

      {/* Detailed Roadmap Display */}
      <div style={{ maxWidth: '1000px', margin: '40px auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Comprehensive Learning Plan</h2>
        
        {roadmap.phases.map((phase, phaseIndex) => (
          <div key={phaseIndex} style={{ marginBottom: '50px' }}>
            <div style={{ 
              background: 'linear-gradient(135deg, var(--brand), var(--ok))',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '25px',
              textAlign: 'center'
            }}>
              <h2 style={{ margin: 0, color: 'var(--brand-ink)' }}>{phase.phase}</h2>
              <p style={{ margin: '5px 0 0 0', color: 'var(--brand-ink)', opacity: 0.9 }}>
                Duration: {phase.duration}
              </p>
            </div>

            <div style={{ display: 'grid', gap: '25px' }}>
              {phase.weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="card">
                  <h3 style={{ color: 'var(--brand)', margin: '0 0 15px 0' }}>{week.week}</h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                    {/* Topics */}
                    <div>
                      <h4 style={{ color: 'var(--muted)', margin: '0 0 10px 0' }}>📚 Topics to Master</h4>
                      <div style={{ display: 'grid', gap: '8px' }}>
                        {week.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} style={{
                            background: 'var(--bg)',
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid #22263b',
                            fontSize: '0.9rem'
                          }}>
                            • {topic}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Resources */}
                    <div>
                      <h4 style={{ color: 'var(--muted)', margin: '0 0 10px 0' }}>🔗 Recommended Resources</h4>
                      <div style={{ display: 'grid', gap: '8px' }}>
                        {week.resources.map((resource, resourceIndex) => (
                          <div key={resourceIndex} style={{
                            background: 'var(--bg)',
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid #22263b',
                            fontSize: '0.9rem',
                            color: 'var(--brand)'
                          }}>
                            • {resource}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Projects */}
                    <div>
                      <h4 style={{ color: 'var(--muted)', margin: '0 0 10px 0' }}>🛠️ Practice Projects</h4>
                      <div style={{ display: 'grid', gap: '8px' }}>
                        {week.projects.map((project, projectIndex) => (
                          <div key={projectIndex} style={{
                            background: 'var(--bg)',
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid #22263b',
                            fontSize: '0.9rem',
                            color: 'var(--ok)'
                          }}>
                            • {project}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Download Button */}
      <div style={{ textAlign: 'center', margin: '50px 0' }}>
        <button 
          className="btn primary" 
          style={{ 
            padding: '16px 40px', 
            fontSize: '1.2rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            opacity: isDownloading ? 0.7 : 1
          }}
          onClick={downloadRoadmap}
          disabled={isDownloading}
        >
          {isDownloading ? '⏳ Generating Beautiful PDF...' : '📊 Download PDF Roadmap'}
        </button>
        
        <p style={{ color: 'var(--muted)', marginTop: '15px' }}>
          Professional PDF with weekly breakdowns, resources, and projects
        </p>
      </div>

      {/* Next Steps */}
      <div style={{ textAlign: 'center', margin: '60px 0', padding: '40px', background: 'var(--card)', borderRadius: '20px' }}>
        <h2>Ready to Start Your Journey?</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '30px' }}>
          Begin with Week 1 and track your progress regularly
        </p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/learn" className="btn primary">Start Learning Now</Link>
          <Link to="/projects" className="btn">Practice Projects</Link>
          <Link to="/roadmap-filter" className="btn ghost">Adjust Roadmap</Link>
        </div>
      </div>
    </div>
  );
}