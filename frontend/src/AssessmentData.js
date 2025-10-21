// AssessmentData.js - 1000+ questions across all filter categories
export const assessmentQuestions = {
  // JavaScript Questions 
javascript: {
  beginner: [
    {
      id: 401,
      question: "Which symbol is used for comments in JavaScript?",
      options: ["//", "<!-- -->", "/* */", "#"],
      correct: 0,
      explanation: "// is used for single-line comments in JavaScript."
    },
    {
      id: 402,
      question: "How do you create a function in JavaScript?",
      options: [
        "function myFunction()",
        "function:myFunction()", 
        "function = myFunction()",
        "create myFunction()"
      ],
      correct: 0,
      explanation: "Functions are created using the function keyword followed by the function name."
    },
    {
      id: 403,
      question: "Which keyword is used to declare a variable in JavaScript?",
      options: ["var", "let", "const", "All of the above"],
      correct: 3,
      explanation: "JavaScript variables can be declared using var, let, or const."
    },
    {
      id: 404,
      question: "Which method is used to display data in the console?",
      options: ["console.log()", "print()", "echo()", "log.console()"],
      correct: 0,
      explanation: "console.log() prints output to the browser console."
    },
    {
      id: 405,
      question: "Which data type is NOT primitive in JavaScript?",
      options: ["Number", "String", "Object", "Boolean"],
      correct: 2,
      explanation: "Object is a non-primitive data type, while Number, String, and Boolean are primitive."
    },
    {
      id: 406,
      question: "What is the result of typeof null?",
      options: ["null", "undefined", "object", "string"],
      correct: 2,
      explanation: "Due to a historical bug, typeof null returns 'object'."
    },
    {
      id: 407,
      question: "Which operator is used for strict equality?",
      options: ["==", "===", "=", "!=="],
      correct: 1,
      explanation: "=== checks both value and type for equality."
    },
    {
      id: 408,
      question: "What will '2' + 2 evaluate to?",
      options: ["4", "22", "NaN", "Error"],
      correct: 1,
      explanation: "When adding string and number, JavaScript performs string concatenation → '22'."
    },
    {
      id: 409,
      question: "Which function is used to parse a string into an integer?",
      options: ["parseInt()", "parseFloat()", "Number()", "toInteger()"],
      correct: 0,
      explanation: "parseInt() converts a string into an integer."
    },
    {
      id: 410,
      question: "Which method is used to join elements of an array into a string?",
      options: ["join()", "concat()", "push()", "toString()"],
      correct: 0,
      explanation: "join() joins all elements of an array into a single string."
    }
  ],
  intermediate: [
    {
      id: 601,
      question: "What is closure in JavaScript?",
      options: [
        "A function with access to its outer function's scope",
        "A way to close browser tabs",
        "A method to end functions",
        "A type of loop"
      ],
      correct: 0,
      explanation: "Closure gives function access to its outer function's scope even after execution."
    },
    {
      id: 602,
      question: "Which keyword is used to handle errors in JavaScript?",
      options: ["try...catch", "if...else", "switch", "throw...return"],
      correct: 0,
      explanation: "try...catch is used for handling exceptions."
    },
    {
      id: 603,
      question: "What does the 'this' keyword refer to inside a function (non-strict mode)?",
      options: ["The global object", "The function itself", "The parent scope", "undefined"],
      correct: 0,
      explanation: "In non-strict mode, 'this' refers to the global object (window in browsers)."
    },
    {
      id: 604,
      question: "Which array method creates a new array with elements that pass a test?",
      options: ["map()", "filter()", "forEach()", "reduce()"],
      correct: 1,
      explanation: "filter() returns a new array with elements that satisfy the condition."
    },
    {
      id: 605,
      question: "What is the purpose of 'use strict'?",
      options: [
        "Enforces stricter parsing and error handling",
        "Makes code run faster",
        "Adds new features",
        "Automatically optimizes code"
      ],
      correct: 0,
      explanation: "'use strict' helps catch common coding mistakes and unsafe actions."
    },
    {
      id: 606,
      question: "Which operator is used to spread elements of an array?",
      options: ["...", "*", "&", "+"],
      correct: 0,
      explanation: "The spread operator (...) expands elements of an array or object."
    },
    {
      id: 607,
      question: "Which JavaScript feature allows asynchronous programming?",
      options: ["Promises", "Callbacks", "Async/Await", "All of the above"],
      correct: 3,
      explanation: "JavaScript supports async programming via callbacks, promises, and async/await."
    },
    {
      id: 608,
      question: "What is the difference between var, let, and const?",
      options: [
        "var is function-scoped, let/const are block-scoped",
        "let can be reassigned, const cannot",
        "var can be redeclared, let/const cannot",
        "All of the above"
      ],
      correct: 3,
      explanation: "All statements are correct about var, let, and const."
    },
    {
      id: 609,
      question: "Which method is used to serialize an object into JSON?",
      options: ["JSON.stringify()", "JSON.parse()", "toJSON()", "objectToString()"],
      correct: 0,
      explanation: "JSON.stringify() converts a JavaScript object to a JSON string."
    },
    {
      id: 610,
      question: "Which built-in method is used to combine two arrays?",
      options: ["push()", "concat()", "splice()", "merge()"],
      correct: 1,
      explanation: "concat() combines two arrays into a new one."
    }
  ],
  advanced: [
    {
      id: 801,
      question: "What is the event loop in JavaScript?",
      options: [
        "The mechanism that handles asynchronous operations",
        "A type of for loop",
        "A browser rendering feature",
        "A debugging tool"
      ],
      correct: 0,
      explanation: "The event loop handles async operations by monitoring call stack and callback queue."
    },
    {
      id: 802,
      question: "What is hoisting in JavaScript?",
      options: [
        "The behavior of moving declarations to the top",
        "Optimizing loops",
        "Asynchronous execution",
        "Memory allocation"
      ],
      correct: 0,
      explanation: "Hoisting moves variable and function declarations to the top of their scope."
    },
    {
      id: 803,
      question: "Which design pattern is commonly used with Promises?",
      options: ["Observer", "Factory", "Chain of Responsibility", "Decorator"],
      correct: 2,
      explanation: "Promises use chain of responsibility through .then() chaining."
    },
    {
      id: 804,
      question: "What is the difference between deep copy and shallow copy in JavaScript?",
      options: [
        "Shallow copy copies references, deep copy copies values",
        "Both copy only values",
        "Both copy only references",
        "No difference"
      ],
      correct: 0,
      explanation: "Shallow copies reference nested objects, while deep copy fully duplicates values."
    },
    {
      id: 805,
      question: "What is a generator function in JavaScript?",
      options: [
        "A function that can pause and resume execution",
        "A function that generates random numbers",
        "A factory design pattern",
        "A recursive function"
      ],
      correct: 0,
      explanation: "Generators (function*) can yield multiple values and be resumed later."
    },
    {
      id: 806,
      question: "What is the purpose of WeakMap in JavaScript?",
      options: [
        "Holds key-value pairs with weakly referenced keys",
        "Stores session data permanently",
        "Used for JSON storage",
        "Provides encryption"
      ],
      correct: 0,
      explanation: "WeakMap allows garbage collection of keys when no longer used."
    },
    {
      id: 807,
      question: "What is the Temporal Dead Zone (TDZ)?",
      options: [
        "The time between variable declaration and initialization",
        "An async execution delay",
        "Memory leak in closures",
        "The browser rendering phase"
      ],
      correct: 0,
      explanation: "TDZ occurs when accessing a let/const variable before it's initialized."
    },
    {
      id: 808,
      question: "What is the difference between '==' and '==='?",
      options: [
        "== checks only value, === checks value and type",
        "Both are same",
        "== checks type only",
        "=== checks only value"
      ],
      correct: 0,
      explanation: "=== is strict equality (type + value), while == allows type coercion."
    },
    {
      id: 809,
      question: "Which object method is used to freeze an object?",
      options: ["Object.seal()", "Object.freeze()", "Object.lock()", "Object.preventExtensions()"],
      correct: 1,
      explanation: "Object.freeze() prevents modification of existing properties."
    },
    {
      id: 810,
      question: "What is a Proxy in JavaScript?",
      options: [
        "An object that wraps another object and intercepts operations",
        "A network service",
        "A memory optimization tool",
        "A debugging tool"
      ],
      correct: 0,
      explanation: "Proxies allow custom behavior for fundamental operations (get, set, etc.)."
    }
  ]
},
  // Python Questions 
python: {
  beginner: [
    {
      id: 1501,
      question: "How do you print 'Hello World' in Python?",
      options: ["print('Hello World')", "console.log('Hello World')", "echo 'Hello World'", "printf('Hello World')"],
      correct: 0,
      explanation: "Python uses print() function to output text to the console."
    },
    {
      id: 1502,
      question: "Which symbol is used for comments in Python?",
      options: ["//", "#", "/* */", "<!-- -->"],
      correct: 1,
      explanation: "Python uses # for single-line comments."
    },
    {
      id: 1503,
      question: "Which keyword is used to define a function in Python?",
      options: ["func", "function", "def", "lambda"],
      correct: 2,
      explanation: "Functions are defined using the def keyword."
    },
    {
      id: 1504,
      question: "Which data type is mutable in Python?",
      options: ["String", "Tuple", "List", "Integer"],
      correct: 2,
      explanation: "Lists are mutable, while strings, tuples, and integers are immutable."
    },
    {
      id: 1505,
      question: "What is the output of len('Python')?",
      options: ["5", "6", "7", "Error"],
      correct: 1,
      explanation: "len() returns the number of characters in a string, so 'Python' → 6."
    },
    {
      id: 1506,
      question: "Which operator is used for exponentiation?",
      options: ["^", "**", "exp()", "pow()"],
      correct: 1,
      explanation: "** is the exponentiation operator (e.g., 2 ** 3 = 8)."
    },
    {
      id: 1507,
      question: "Which collection type stores key-value pairs?",
      options: ["List", "Set", "Tuple", "Dictionary"],
      correct: 3,
      explanation: "Dictionaries store data as key-value pairs."
    },
    {
      id: 1508,
      question: "What is the correct way to declare a variable in Python?",
      options: ["int x = 5", "let x = 5", "x = 5", "var x = 5"],
      correct: 2,
      explanation: "Python variables are declared simply using assignment (x = 5)."
    },
    {
      id: 1509,
      question: "What does the input() function do?",
      options: [
        "Takes input from the user as a string",
        "Reads data from a file",
        "Stops execution",
        "Displays output"
      ],
      correct: 0,
      explanation: "input() always returns user input as a string."
    },
    {
      id: 1510,
      question: "What is the file extension for Python files?",
      options: [".java", ".js", ".py", ".txt"],
      correct: 2,
      explanation: "Python files have the .py extension."
    }
  ],
  intermediate: [
    {
      id: 1651,
      question: "What are Python decorators?",
      options: [
        "Functions that modify other functions",
        "Special comments for documentation",
        "CSS styling for Python",
        "Database optimization tools"
      ],
      correct: 0,
      explanation: "Decorators are functions that modify the behavior of other functions."
    },
    {
      id: 1652,
      question: "What is the purpose of 'self' in class methods?",
      options: [
        "Represents the current instance of the class",
        "Refers to the superclass",
        "Acts as a keyword for global variables",
        "Automatically calls the constructor"
      ],
      correct: 0,
      explanation: "'self' is used to access instance variables and methods of the class."
    },
    {
      id: 1653,
      question: "What is the difference between 'is' and '==' in Python?",
      options: [
        "No difference",
        "'is' compares identity, '==' compares values",
        "'is' compares values, '==' compares identity",
        "'is' is used only for strings"
      ],
      correct: 1,
      explanation: "'is' checks object identity, '==' checks equality of values."
    },
    {
      id: 1654,
      question: "Which method is called automatically when an object is created?",
      options: ["__str__", "__init__", "__new__", "__del__"],
      correct: 1,
      explanation: "__init__ is the constructor method executed when a class instance is created."
    },
    {
      id: 1655,
      question: "Which module in Python supports regular expressions?",
      options: ["regex", "re", "regexp", "match"],
      correct: 1,
      explanation: "The re module provides regular expression support in Python."
    },
    {
      id: 1656,
      question: "Which keyword is used for exception handling?",
      options: ["try...catch", "try...except", "handle...error", "catch...throw"],
      correct: 1,
      explanation: "Python uses try...except for exception handling."
    },
    {
      id: 1657,
      question: "What does the zip() function do?",
      options: [
        "Combines multiple iterables into tuples",
        "Compresses files",
        "Encrypts data",
        "Merges dictionaries"
      ],
      correct: 0,
      explanation: "zip() pairs elements from multiple iterables into tuples."
    },
    {
      id: 1658,
      question: "What is a Python generator?",
      options: [
        "A function that yields values using 'yield'",
        "A function that generates random numbers",
        "A recursive function",
        "A class method"
      ],
      correct: 0,
      explanation: "Generators are functions that yield values one at a time using 'yield'."
    },
    {
      id: 1659,
      question: "Which statement is used to import a module?",
      options: ["load", "require", "import", "include"],
      correct: 2,
      explanation: "Modules are imported using the 'import' statement."
    },
    {
      id: 1660,
      question: "What does the enumerate() function return?",
      options: [
        "Pairs of index and value from an iterable",
        "A dictionary of values",
        "Only indices",
        "Only values"
      ],
      correct: 0,
      explanation: "enumerate() returns index and value pairs from an iterable."
    }
  ],
  advanced: [
    {
      id: 1801,
      question: "What is the Global Interpreter Lock (GIL) in Python?",
      options: [
        "A mutex that allows only one thread to execute",
        "A security feature",
        "A memory management tool",
        "A debugging mechanism"
      ],
      correct: 0,
      explanation: "GIL is a mutex that allows only one thread to execute in the interpreter at a time."
    },
    {
      id: 1802,
      question: "What is monkey patching in Python?",
      options: [
        "Dynamically modifying classes or modules at runtime",
        "Installing external libraries",
        "Debugging a program",
        "A memory optimization technique"
      ],
      correct: 0,
      explanation: "Monkey patching allows modifying classes or functions during runtime."
    },
    {
      id: 1803,
      question: "What is the difference between deep copy and shallow copy?",
      options: [
        "Shallow copy copies references, deep copy copies values",
        "Both copy values only",
        "Both copy references only",
        "No difference"
      ],
      correct: 0,
      explanation: "Deep copy duplicates objects completely, shallow copy only references nested objects."
    },
    {
      id: 1804,
      question: "What is a metaclass in Python?",
      options: [
        "A class that defines the behavior of other classes",
        "A superclass",
        "A function that returns a class",
        "A library in Python"
      ],
      correct: 0,
      explanation: "Metaclasses define the behavior and structure of other classes."
    },
    {
      id: 1805,
      question: "What is the purpose of __slots__ in Python classes?",
      options: [
        "Restrict dynamic attribute creation",
        "Optimize memory usage",
        "Improve attribute lookup speed",
        "All of the above"
      ],
      correct: 3,
      explanation: "__slots__ is used to restrict attributes and optimize memory."
    },
    {
      id: 1806,
      question: "Which library is used for numerical computing in Python?",
      options: ["NumPy", "Pandas", "SciPy", "All of the above"],
      correct: 3,
      explanation: "NumPy, Pandas, and SciPy are commonly used for numerical computing."
    },
    {
      id: 1807,
      question: "What is the difference between @staticmethod and @classmethod?",
      options: [
        "staticmethod has no self/cls, classmethod takes cls",
        "Both are same",
        "classmethod cannot access class variables",
        "staticmethod requires cls parameter"
      ],
      correct: 0,
      explanation: "staticmethod doesn’t take self/cls, classmethod takes cls to access class variables."
    },
    {
      id: 1808,
      question: "What is the difference between asyncio and threading?",
      options: [
        "asyncio is single-threaded cooperative multitasking",
        "threading uses OS threads",
        "asyncio is better for I/O-bound tasks",
        "All of the above"
      ],
      correct: 3,
      explanation: "asyncio is event-loop based, while threading uses OS threads."
    },
    {
      id: 1809,
      question: "What does the with statement do in Python?",
      options: [
        "Ensures proper resource cleanup using context managers",
        "Creates loops",
        "Defines functions",
        "Handles exceptions"
      ],
      correct: 0,
      explanation: "with ensures resources like files are properly closed after use."
    },
    {
      id: 1810,
      question: "What is the difference between pickling and unpickling?",
      options: [
        "Pickling = serialization, Unpickling = deserialization",
        "Pickling = compressing, Unpickling = decompressing",
        "Both are encryption methods",
        "No difference"
      ],
      correct: 0,
      explanation: "Pickling serializes Python objects, unpickling deserializes them back."
    }
  ]
},
  // DevOps Questions 
devops: {
  beginner: [
    {
      id: 2601,
      question: "What is CI/CD?",
      options: [
        "Continuous Integration/Continuous Deployment",
        "Code Inspection/Code Development",
        "Computer Interface/Computer Design",
        "Continuous Improvement/Continuous Delivery"
      ],
      correct: 0,
      explanation: "CI/CD automates the software delivery process."
    },
    {
      id: 2602,
      question: "Which tool is commonly used for version control in DevOps?",
      options: ["Git", "Jenkins", "Docker", "Kubernetes"],
      correct: 0,
      explanation: "Git is the most widely used version control system in DevOps."
    },
    {
      id: 2603,
      question: "What does IaC stand for?",
      options: ["Infrastructure as Code", "Internet as Cloud", "Instance and Cluster", "Interface as Command"],
      correct: 0,
      explanation: "IaC (Infrastructure as Code) means managing infrastructure using code."
    },
    {
      id: 2604,
      question: "Which tool is used for containerization?",
      options: ["Jenkins", "Docker", "Terraform", "Ansible"],
      correct: 1,
      explanation: "Docker is the most popular tool for containerization."
    },
    {
      id: 2605,
      question: "Which DevOps practice helps detect bugs early?",
      options: ["Continuous Integration", "Manual Testing", "Big Bang Testing", "Code Review"],
      correct: 0,
      explanation: "Continuous Integration (CI) integrates code frequently to detect bugs early."
    },
    {
      id: 2606,
      question: "Which command initializes a Git repository?",
      options: ["git start", "git init", "git repo", "git new"],
      correct: 1,
      explanation: "'git init' initializes a new Git repository."
    },
    {
      id: 2607,
      question: "Which tool is commonly used for automation of IT tasks?",
      options: ["Terraform", "Ansible", "Nagios", "Slack"],
      correct: 1,
      explanation: "Ansible automates configuration management and deployment tasks."
    },
    {
      id: 2608,
      question: "What does YAML stand for?",
      options: [
        "Yet Another Markup Language",
        "Your Application Markup Language",
        "Your Automated Machine Language",
        "Yield A Markup Layout"
      ],
      correct: 0,
      explanation: "YAML originally stood for 'Yet Another Markup Language'."
    },
    {
      id: 2609,
      question: "Which tool is primarily used for monitoring applications?",
      options: ["Prometheus", "Git", "Docker", "Jira"],
      correct: 0,
      explanation: "Prometheus is widely used for monitoring and alerting."
    },
    {
      id: 2610,
      question: "Which cloud platform is offered by Amazon?",
      options: ["Azure", "AWS", "GCP", "DigitalOcean"],
      correct: 1,
      explanation: "AWS (Amazon Web Services) is Amazon’s cloud platform."
    }
  ],
  intermediate: [
    {
      id: 2701,
      question: "What is Docker used for?",
      options: [
        "Containerization of applications",
        "Virtual machine management",
        "Network configuration",
        "Database administration"
      ],
      correct: 0,
      explanation: "Docker packages applications into containers for consistent deployment."
    },
    {
      id: 2702,
      question: "Which tool is used for Infrastructure as Code?",
      options: ["Ansible", "Terraform", "Nagios", "Puppet"],
      correct: 1,
      explanation: "Terraform is the most widely used IaC tool."
    },
    {
      id: 2703,
      question: "What is Jenkins mainly used for?",
      options: [
        "Continuous Integration and Continuous Delivery",
        "Container orchestration",
        "Monitoring",
        "Code versioning"
      ],
      correct: 0,
      explanation: "Jenkins is an automation server for CI/CD pipelines."
    },
    {
      id: 2704,
      question: "Which DevOps practice ensures environments are identical across dev, test, and prod?",
      options: ["Containerization", "Virtualization", "Code Review", "Agile"],
      correct: 0,
      explanation: "Containerization ensures consistency across environments."
    },
    {
      id: 2705,
      question: "Which tool is often used for configuration management?",
      options: ["Ansible", "Jenkins", "Docker", "GitHub"],
      correct: 0,
      explanation: "Ansible is popular for automating configuration management."
    },
    {
      id: 2706,
      question: "Which DevOps tool is used for logging and visualization?",
      options: ["Grafana", "ElasticSearch", "Kibana", "All of the above"],
      correct: 3,
      explanation: "The ELK stack (ElasticSearch, Logstash, Kibana) with Grafana is widely used."
    },
    {
      id: 2707,
      question: "Which command creates a new branch in Git?",
      options: ["git create branch", "git checkout -b", "git branch new", "git make branch"],
      correct: 1,
      explanation: "'git checkout -b branchName' creates and switches to a new branch."
    },
    {
      id: 2708,
      question: "Which Kubernetes object ensures desired replicas of a pod?",
      options: ["Deployment", "Service", "ConfigMap", "Secret"],
      correct: 0,
      explanation: "Deployment ensures the desired state of pod replicas."
    },
    {
      id: 2709,
      question: "What does blue-green deployment mean?",
      options: [
        "Using two environments (blue and green) to switch traffic",
        "Running tests in two colors",
        "Using two different CI/CD tools",
        "Load balancing"
      ],
      correct: 0,
      explanation: "Blue-green deployment reduces downtime by switching traffic between two environments."
    },
    {
      id: 2710,
      question: "Which tool is used for container orchestration?",
      options: ["Kubernetes", "Jenkins", "Git", "Ansible"],
      correct: 0,
      explanation: "Kubernetes is the most popular container orchestration platform."
    }
  ],
  advanced: [
    {
      id: 2801,
      question: "What is Kubernetes?",
      options: [
        "A container orchestration system",
        "A programming language",
        "A database management tool",
        "A cloud storage service"
      ],
      correct: 0,
      explanation: "Kubernetes automates deployment, scaling, and management of containerized applications."
    },
    {
      id: 2802,
      question: "What is a Helm chart in Kubernetes?",
      options: [
        "A package manager for Kubernetes applications",
        "A monitoring tool",
        "A Docker image",
        "A CI/CD pipeline"
      ],
      correct: 0,
      explanation: "Helm charts package and deploy Kubernetes applications."
    },
    {
      id: 2803,
      question: "What is canary deployment?",
      options: [
        "Gradual rollout of new features to a subset of users",
        "Complete replacement of production environment",
        "Testing in staging only",
        "Rolling back to previous version"
      ],
      correct: 0,
      explanation: "Canary deployment reduces risk by gradually releasing changes to a small user set."
    },
    {
      id: 2804,
      question: "Which API does Kubernetes use for communication?",
      options: ["REST API", "SOAP API", "GraphQL", "RPC"],
      correct: 0,
      explanation: "Kubernetes exposes a REST API for communication."
    },
    {
      id: 2805,
      question: "What is GitOps?",
      options: [
        "Using Git as the single source of truth for deployments",
        "Optimizing Git commits",
        "Monitoring GitHub repositories",
        "Automating Git branching"
      ],
      correct: 0,
      explanation: "GitOps is a DevOps practice where infrastructure and apps are managed via Git."
    },
    {
      id: 2806,
      question: "What is chaos engineering?",
      options: [
        "Deliberately injecting failures to test resilience",
        "Debugging random errors",
        "Unstructured testing",
        "Automated bug fixing"
      ],
      correct: 0,
      explanation: "Chaos engineering introduces controlled failures to improve system reliability."
    },
    {
      id: 2807,
      question: "Which Kubernetes object stores sensitive information?",
      options: ["Secret", "ConfigMap", "Deployment", "Pod"],
      correct: 0,
      explanation: "Kubernetes Secrets are used for storing sensitive data like passwords and tokens."
    },
    {
      id: 2808,
      question: "What is the difference between horizontal and vertical scaling?",
      options: [
        "Horizontal adds more machines, vertical increases resources in one machine",
        "Both add more CPUs",
        "Both add more memory",
        "No difference"
      ],
      correct: 0,
      explanation: "Horizontal scaling adds more nodes, vertical scaling upgrades a single node."
    },
    {
      id: 2809,
      question: "What is the role of a Service Mesh in DevOps?",
      options: [
        "Manages service-to-service communication",
        "Builds Docker images",
        "Handles Git repositories",
        "Automates deployments"
      ],
      correct: 0,
      explanation: "Service mesh (e.g., Istio) manages microservice communication, security, and observability."
    },
    {
      id: 2810,
      question: "What is the purpose of etcd in Kubernetes?",
      options: [
        "Stores cluster configuration data",
        "Runs pods",
        "Manages secrets",
        "Acts as a load balancer"
      ],
      correct: 0,
      explanation: "etcd is a distributed key-value store that holds Kubernetes cluster state."
    }
  ]
},
// Java Questions
java: {
  beginner: [
    {
      id: 3101,
      question: "Which keyword is used to define a class in Java?",
      options: ["class", "define", "struct", "new"],
      correct: 0,
      explanation: "The 'class' keyword is used to declare a class in Java."
    },
    {
      id: 3102,
      question: "Which method is the entry point of any Java program?",
      options: ["start()", "main()", "init()", "run()"],
      correct: 1,
      explanation: "The main() method is the entry point for Java applications."
    },
    {
      id: 3103,
      question: "Which symbol is used to end a statement in Java?",
      options: [";", ".", ":", ","],
      correct: 0,
      explanation: "Every statement in Java must end with a semicolon (;)."
    },
    {
      id: 3104,
      question: "Which keyword is used to create an object in Java?",
      options: ["create", "new", "init", "construct"],
      correct: 1,
      explanation: "The 'new' keyword is used to create objects in Java."
    },
    {
      id: 3105,
      question: "Which data type is used to store a single character in Java?",
      options: ["char", "string", "character", "text"],
      correct: 0,
      explanation: "The 'char' type is used for storing a single 16-bit Unicode character."
    },
    {
      id: 3106,
      question: "What is the size of an int in Java?",
      options: ["8-bit", "16-bit", "32-bit", "64-bit"],
      correct: 2,
      explanation: "The 'int' data type in Java is 32 bits (4 bytes)."
    },
    {
      id: 3107,
      question: "Which operator is used for string concatenation in Java?",
      options: ["+", "&", "concat", "||"],
      correct: 0,
      explanation: "The '+' operator is used to concatenate strings in Java."
    },
    {
      id: 3108,
      question: "Which keyword is used to inherit a class in Java?",
      options: ["implements", "extends", "inherits", "super"],
      correct: 1,
      explanation: "The 'extends' keyword is used to inherit from a class."
    },
    {
      id: 3109,
      question: "Which package is imported by default in every Java program?",
      options: ["java.util", "java.io", "java.lang", "java.sql"],
      correct: 2,
      explanation: "The java.lang package is automatically imported in all Java programs."
    },
    {
      id: 3110,
      question: "Which keyword is used to prevent inheritance of a class?",
      options: ["abstract", "final", "static", "private"],
      correct: 1,
      explanation: "The 'final' keyword prevents a class from being inherited."
    }
  ],
  intermediate: [
    {
      id: 3201,
      question: "What is a constructor in Java?",
      options: [
        "A method used to initialize an object",
        "A special type of variable",
        "A method that returns void only",
        "A block to define classes"
      ],
      correct: 0,
      explanation: "A constructor is a special method used to initialize objects of a class."
    },
    {
      id: 3202,
      question: "What is method overloading in Java?",
      options: [
        "Defining multiple methods with same name but different parameters",
        "Creating methods in multiple classes",
        "Calling one method inside another",
        "Overriding methods from superclass"
      ],
      correct: 0,
      explanation: "Method overloading allows multiple methods in a class with the same name but different parameter lists."
    },
    {
      id: 3203,
      question: "What is method overriding in Java?",
      options: [
        "Redefining a superclass method in a subclass",
        "Creating multiple methods with same name",
        "Using methods from multiple interfaces",
        "Calling a method recursively"
      ],
      correct: 0,
      explanation: "Method overriding allows a subclass to provide a specific implementation of a method defined in the superclass."
    },
    {
      id: 3204,
      question: "Which access modifier allows access within the same package only?",
      options: ["private", "protected", "public", "default"],
      correct: 3,
      explanation: "Default access (no modifier) allows access to classes, methods, and variables within the same package."
    },
    {
      id: 3205,
      question: "What is the difference between abstract class and interface?",
      options: [
        "Abstract class can have concrete methods, interface cannot (Java < 8)",
        "Interface can have multiple inheritance",
        "Abstract class cannot be instantiated",
        "All of the above"
      ],
      correct: 3,
      explanation: "Abstract classes can have concrete methods; interfaces (Java < 8) cannot. Interfaces support multiple inheritance and abstract classes cannot be instantiated."
    },
    {
      id: 3206,
      question: "Which collection class maintains insertion order in Java?",
      options: ["HashMap", "TreeMap", "LinkedHashMap", "Hashtable"],
      correct: 2,
      explanation: "LinkedHashMap maintains insertion order of elements."
    },
    {
      id: 3207,
      question: "Which keyword is used to handle exceptions in Java?",
      options: ["try...catch", "handle", "throw", "except"],
      correct: 0,
      explanation: "try...catch is used to handle exceptions in Java."
    },
    {
      id: 3208,
      question: "What is the use of the 'super' keyword in Java?",
      options: [
        "Refers to superclass constructor or methods",
        "Refers to current object",
        "Creates a new object",
        "Calls private methods"
      ],
      correct: 0,
      explanation: "The 'super' keyword is used to refer to superclass methods or constructors."
    },
    {
      id: 3209,
      question: "Which method is used to start a new thread in Java?",
      options: ["run()", "start()", "execute()", "init()"],
      correct: 1,
      explanation: "The start() method begins execution of a new thread."
    },
    {
      id: 3210,
      question: "What is the difference between checked and unchecked exceptions?",
      options: [
        "Checked exceptions are checked at compile-time, unchecked at runtime",
        "Unchecked exceptions are checked at compile-time, checked at runtime",
        "Both are checked at runtime",
        "Both are checked at compile-time"
      ],
      correct: 0,
      explanation: "Checked exceptions must be handled at compile-time, whereas unchecked exceptions occur at runtime."
    }
  ],
  advanced: [
    {
      id: 3301,
      question: "What is the difference between JVM, JRE, and JDK?",
      options: [
        "JVM runs Java bytecode, JRE includes JVM + libraries, JDK includes JRE + development tools",
        "JVM compiles code, JRE runs code, JDK is IDE",
        "JVM is compiler, JRE is debugger, JDK is library",
        "All are same"
      ],
      correct: 0,
      explanation: "JVM executes bytecode, JRE provides JVM and libraries, JDK includes JRE and tools for development."
    },
    {
      id: 3302,
      question: "What is the purpose of Java Reflection API?",
      options: [
        "Inspect and modify classes, methods, and fields at runtime",
        "Debug Java programs",
        "Improve performance",
        "Handle exceptions"
      ],
      correct: 0,
      explanation: "Reflection allows runtime inspection and manipulation of classes, methods, and fields."
    },
    {
      id: 3303,
      question: "What is the difference between fail-fast and fail-safe iterators?",
      options: [
        "Fail-fast throws exception on concurrent modification, fail-safe allows modification",
        "Fail-safe throws exception, fail-fast allows modification",
        "Both allow concurrent modification",
        "Both prevent modification"
      ],
      correct: 0,
      explanation: "Fail-fast iterators throw ConcurrentModificationException on changes; fail-safe iterators work on a clone of collection."
    },
    {
      id: 3304,
      question: "Which Java feature supports functional programming?",
      options: ["Lambda expressions", "Generics", "Polymorphism", "Encapsulation"],
      correct: 0,
      explanation: "Lambda expressions allow treating functions as first-class objects for functional programming."
    },
    {
      id: 3305,
      question: "What is the difference between synchronized method and synchronized block?",
      options: [
        "Method locks whole object, block locks only specific code",
        "Block locks whole object, method locks code only",
        "Both are same",
        "Neither locks anything"
      ],
      correct: 0,
      explanation: "Synchronized method locks the entire object, whereas synchronized block locks only specified code."
    },
    {
      id: 3306,
      question: "What is the purpose of volatile keyword in Java?",
      options: [
        "Ensures visibility of variable changes across threads",
        "Locks a variable",
        "Prevents variable modification",
        "Makes variable final"
      ],
      correct: 0,
      explanation: "Volatile ensures that updates to a variable are visible to all threads immediately."
    },
    {
      id: 3307,
      question: "What is Java Memory Model (JMM)?",
      options: [
        "Defines how threads interact through memory",
        "Defines garbage collection process",
        "Defines JVM classloading",
        "Defines network protocols"
      ],
      correct: 0,
      explanation: "JMM specifies how threads read and write shared variables and interact through memory."
    },
    {
      id: 3308,
      question: "Which type of reference is eligible for garbage collection first?",
      options: ["Strong", "Soft", "Weak", "Phantom"],
      correct: 3,
      explanation: "Phantom references are cleared before the object is garbage collected, weaker than weak references."
    },
    {
      id: 3309,
      question: "What is the purpose of Java Stream API?",
      options: [
        "Perform functional-style operations on collections",
        "Handle I/O streams",
        "Manage threads",
        "Compile Java code"
      ],
      correct: 0,
      explanation: "Stream API enables functional-style operations like map, filter, reduce on collections."
    },
    {
      id: 3310,
      question: "Which type of class loader is responsible for loading core Java classes?",
      options: ["Bootstrap ClassLoader", "Extension ClassLoader", "System ClassLoader", "Custom ClassLoader"],
      correct: 0,
      explanation: "Bootstrap ClassLoader loads core Java classes from the JDK (like java.lang.*)."
    }
  ]
},
// PHP Questions
php: {
  beginner: [
    {
      id: 4101,
      question: "Which symbol is used to start a variable in PHP?",
      options: ["$", "@", "#", "&"],
      correct: 0,
      explanation: "PHP variables always start with the $ symbol."
    },
    {
      id: 4102,
      question: "Which function is used to output text in PHP?",
      options: ["echo()", "print()", "write()", "Both echo() and print()"],
      correct: 3,
      explanation: "Both echo() and print() functions can be used to output text in PHP."
    },
    {
      id: 4103,
      question: "Which symbol is used for comments in PHP?",
      options: ["//", "/* */", "#", "All of the above"],
      correct: 3,
      explanation: "PHP supports // for single-line, /* */ for multi-line, and # for single-line comments."
    },
    {
      id: 4104,
      question: "Which function is used to get the length of a string in PHP?",
      options: ["strlen()", "size()", "length()", "count()"],
      correct: 0,
      explanation: "strlen() returns the number of characters in a string."
    },
    {
      id: 4105,
      question: "Which symbol is used to concatenate strings in PHP?",
      options: ["+", ".", "&", "concat()"],
      correct: 1,
      explanation: "The dot (.) operator is used to concatenate strings in PHP."
    },
    {
      id: 4106,
      question: "How do you declare an array in PHP?",
      options: [
        "$arr = array();",
        "$arr = [];",
        "$arr = new Array();",
        "Both $arr = array(); and $arr = [];"
      ],
      correct: 3,
      explanation: "Both array() and [] can be used to declare arrays in PHP."
    },
    {
      id: 4107,
      question: "Which superglobal variable is used to collect form data using POST method?",
      options: ["$_POST", "$_GET", "$_REQUEST", "$_FORM"],
      correct: 0,
      explanation: "$_POST is used to collect form data sent via POST method."
    },
    {
      id: 4108,
      question: "Which function is used to include files in PHP?",
      options: ["include()", "require()", "Both include() and require()", "import()"],
      correct: 2,
      explanation: "Both include() and require() can be used to include PHP files."
    },
    {
      id: 4109,
      question: "Which operator is used to compare values and type in PHP?",
      options: ["==", "=", "===", "!="],
      correct: 2,
      explanation: "The === operator checks both value and type equality."
    },
    {
      id: 4110,
      question: "Which keyword is used to define a constant in PHP?",
      options: ["const", "define", "constant", "Both const and define"],
      correct: 3,
      explanation: "Both const and define() can be used to define constants in PHP."
    }
  ],
  intermediate: [
    {
      id: 4201,
      question: "Which function is used to start a session in PHP?",
      options: ["session_start()", "session_begin()", "start_session()", "init_session()"],
      correct: 0,
      explanation: "session_start() is used to begin a new session or resume an existing one."
    },
    {
      id: 4202,
      question: "What is the difference between include() and require() in PHP?",
      options: [
        "include() gives a warning if file is missing, require() gives a fatal error",
        "require() gives a warning, include() gives a fatal error",
        "Both behave the same",
        "include() stops execution, require() continues"
      ],
      correct: 0,
      explanation: "include() produces a warning but continues execution; require() produces a fatal error if file is missing."
    },
    {
      id: 4203,
      question: "Which function is used to connect to a MySQL database in PHP (mysqli)?",
      options: ["mysqli_connect()", "mysql_connect()", "connect()", "db_connect()"],
      correct: 0,
      explanation: "mysqli_connect() establishes a connection to a MySQL database using the improved MySQLi extension."
    },
    {
      id: 4204,
      question: "Which PHP function is used to check if a variable is set?",
      options: ["isset()", "empty()", "defined()", "check()"],
      correct: 0,
      explanation: "isset() returns true if a variable is set and is not NULL."
    },
    {
      id: 4205,
      question: "Which function is used to send headers in PHP?",
      options: ["header()", "set_header()", "send()", "http_header()"],
      correct: 0,
      explanation: "header() is used to send raw HTTP headers to the browser."
    },
    {
      id: 4206,
      question: "What is PDO in PHP?",
      options: [
        "PHP Data Objects, a database access abstraction layer",
        "PHP Data Optimization tool",
        "PHP Data Output function",
        "PHP Debugging Object"
      ],
      correct: 0,
      explanation: "PDO provides a consistent interface for accessing multiple databases."
    },
    {
      id: 4207,
      question: "Which function is used to remove whitespace from the beginning and end of a string?",
      options: ["trim()", "strip()", "clean()", "remove()"],
      correct: 0,
      explanation: "trim() removes whitespace (or other characters) from the start and end of a string."
    },
    {
      id: 4208,
      question: "Which superglobal array contains uploaded file information in PHP?",
      options: ["$_FILES", "$_POST", "$_UPLOAD", "$_DATA"],
      correct: 0,
      explanation: "$_FILES contains information about files uploaded via HTTP POST."
    },
    {
      id: 4209,
      question: "Which function is used to serialize a value in PHP?",
      options: ["serialize()", "json_encode()", "var_export()", "stringify()"],
      correct: 0,
      explanation: "serialize() converts a PHP value into a storable string representation."
    },
    {
      id: 4210,
      question: "Which keyword is used to define an abstract class in PHP?",
      options: ["abstract", "virtual", "interface", "class"],
      correct: 0,
      explanation: "The 'abstract' keyword defines a class that cannot be instantiated and may contain abstract methods."
    }
  ],
  advanced: [
    {
      id: 4301,
      question: "What is the difference between include_once() and require_once() in PHP?",
      options: [
        "Both include/require a file only once; require_once causes fatal error if file missing",
        "Both behave the same and ignore missing files",
        "include_once always reloads the file",
        "require_once allows multiple inclusions"
      ],
      correct: 0,
      explanation: "include_once includes a file once, giving a warning if missing; require_once includes once and causes fatal error if missing."
    },
    {
      id: 4302,
      question: "Which PHP function is used to hash passwords securely?",
      options: ["password_hash()", "md5()", "sha1()", "crypt()"],
      correct: 0,
      explanation: "password_hash() provides secure password hashing using algorithms like bcrypt."
    },
    {
      id: 4303,
      question: "Which PHP feature allows traits to be reused across multiple classes?",
      options: ["Traits", "Interfaces", "Abstract Classes", "Namespaces"],
      correct: 0,
      explanation: "Traits allow reusable methods to be included in multiple classes."
    },
    {
      id: 4304,
      question: "Which PHP function converts an array into a JSON string?",
      options: ["json_encode()", "json_decode()", "serialize()", "array_to_json()"],
      correct: 0,
      explanation: "json_encode() converts PHP arrays/objects into JSON format."
    },
    {
      id: 4305,
      question: "What is the purpose of namespaces in PHP?",
      options: [
        "Prevent name conflicts between classes, functions, and constants",
        "Improve performance",
        "Enhance security",
        "Define global variables"
      ],
      correct: 0,
      explanation: "Namespaces allow organizing code and avoiding naming collisions."
    },
    {
      id: 4306,
      question: "Which PHP function is used to filter user input?",
      options: ["filter_var()", "validate()", "sanitize()", "check_input()"],
      correct: 0,
      explanation: "filter_var() is used to validate and sanitize external input."
    },
    {
      id: 4307,
      question: "What is the difference between session and cookie in PHP?",
      options: [
        "Session stores data on server, cookie stores data on client",
        "Cookie stores data on server, session stores on client",
        "Both store data on client",
        "Both store data on server"
      ],
      correct: 0,
      explanation: "Sessions store data on the server side; cookies store small pieces of data on client browsers."
    },
    {
      id: 4308,
      question: "Which PHP function is used to connect to a MySQL database using PDO?",
      options: ["new PDO()", "mysqli_connect()", "connect()", "db_connect()"],
      correct: 0,
      explanation: "PDO connections are created using new PDO() with DSN, username, and password."
    },
    {
      id: 4309,
      question: "What is late static binding in PHP?",
      options: [
        "Allows static methods to reference called class rather than defining class",
        "Executes methods after main script",
        "Executes code at runtime",
        "Refers to deferred object creation"
      ],
      correct: 0,
      explanation: "Late static binding allows static methods to refer to the class that was called at runtime."
    },
    {
      id: 4310,
      question: "Which PHP mechanism allows automatic object cleanup?",
      options: ["__destruct()", "__cleanup()", "unset()", "garbage_collect()"],
      correct: 0,
      explanation: "__destruct() is invoked when an object is destroyed, allowing cleanup tasks."
    }
  ]
},
// C# Questions
csharp: {
  beginner: [
    {
      id: 5101,
      question: "Which keyword is used to define a class in C#?",
      options: ["class", "struct", "object", "new"],
      correct: 0,
      explanation: "The 'class' keyword is used to declare a class in C#."
    },
    {
      id: 5102,
      question: "Which method is the entry point of a C# program?",
      options: ["main()", "Start()", "Init()", "Run()"],
      correct: 0,
      explanation: "The Main() method is the entry point for C# applications."
    },
    {
      id: 5103,
      question: "Which symbol is used to end a statement in C#?",
      options: [";", ".", ":", ","],
      correct: 0,
      explanation : "Every statement in C# ends with a semicolon (;)."
    },
    {
      id: 5104,
      question: "Which keyword is used to create an object in C#?",
      options: ["new", "create", "init", "construct"],
      correct: 0,
      explanation: "The 'new' keyword creates an instance of a class in C#."
    },
    {
      id: 5105,
      question: "Which data type is used to store a single character in C#?",
      options: ["char", "string", "character", "text"],
      correct: 0,
      explanation: "The 'char' type stores a single 16-bit Unicode character."
    },
    {
      id: 5106,
      question: "What is the size of an int in C#?",
      options: ["8-bit", "16-bit", "32-bit", "64-bit"],
      correct: 2,
      explanation: "The 'int' type in C# is 32 bits (4 bytes)."
    },
    {
      id: 5107,
      question: "Which operator is used for string concatenation in C#?",
      options: ["+", "&", "concat", "||"],
      correct: 0,
      explanation: "The '+' operator concatenates strings in C#."
    },
    {
      id: 5108,
      question: "Which keyword is used to inherit a class in C#?",
      options: ["extends", "inherits", ":", "super"],
      correct: 2,
      explanation: "C# uses the ':' symbol to inherit from a base class."
    },
    {
      id: 5109,
      question: "Which namespace is included by default in every C# program?",
      options: ["System", "Collections", "IO", "Generic"],
      correct: 0,
      explanation: "The 'System' namespace is automatically included in C# programs."
    },
    {
      id: 5110,
      question: "Which keyword prevents a class from being inherited in C#?",
      options: ["final", "sealed", "static", "private"],
      correct: 1,
      explanation: "The 'sealed' keyword prevents a class from being inherited."
    }
  ],
  intermediate: [
    {
      id: 5201,
      question: "What is a constructor in C#?",
      options: [
        "A method used to initialize an object",
        "A special type of variable",
        "A method that returns void only",
        "A block to define classes"
      ],
      correct: 0,
      explanation: "A constructor is a special method used to initialize objects of a class."
    },
    {
      id: 5202,
      question: "What is method overloading in C#?",
      options: [
        "Defining multiple methods with same name but different parameters",
        "Creating methods in multiple classes",
        "Calling one method inside another",
        "Overriding methods from base class"
      ],
      correct: 0,
      explanation: "Method overloading allows multiple methods in a class with the same name but different parameter lists."
    },
    {
      id: 5203,
      question: "What is method overriding in C#?",
      options: [
        "Redefining a base class method in a derived class",
        "Creating multiple methods with same name",
        "Using methods from multiple interfaces",
        "Calling a method recursively"
      ],
      correct: 0,
      explanation: "Method overriding allows a derived class to provide a specific implementation of a method defined in the base class."
    },
    {
      id: 5204,
      question: "Which access modifier allows access within the same assembly only?",
      options: ["private", "protected", "internal", "public"],
      correct: 2,
      explanation: "The 'internal' access modifier allows access to classes, methods, and variables within the same assembly."
    },
    {
      id: 5205,
      question: "Which collection class maintains insertion order in C#?",
      options: ["Dictionary", "SortedList", "List", "HashSet"],
      correct: 2,
      explanation: "List<T> maintains insertion order of elements in C#."
    },
    {
      id: 5206,
      question: "Which keyword is used to handle exceptions in C#?",
      options: ["try...catch", "handle", "throw", "except"],
      correct: 0,
      explanation: "try...catch is used to handle exceptions in C#."
    },
    {
      id: 5207,
      question: "What is the use of the 'base' keyword in C#?",
      options: [
        "Refers to base class constructor or methods",
        "Refers to current object",
        "Creates a new object",
        "Calls private methods"
      ],
      correct: 0,
      explanation: "The 'base' keyword is used to refer to base class methods or constructors."
    },
    {
      id: 5208,
      question: "Which method is used to start a new thread in C#?",
      options: ["Start()", "Run()", "Execute()", "Init()"],
      correct: 0,
      explanation: "The Start() method begins execution of a new thread."
    },
    {
      id: 5209,
      question: "What is the difference between value types and reference types in C#?",
      options: [
        "Value types store data directly, reference types store a reference to data",
        "Reference types store data directly, value types store a reference",
        "Both store data directly",
        "Both store references only"
      ],
      correct: 0,
      explanation: "Value types store actual data, whereas reference types store a pointer to the data in memory."
    },
    {
      id: 5210,
      question: "Which keyword is used to define an abstract class in C#?",
      options: ["abstract", "virtual", "interface", "class"],
      correct: 0,
      explanation: "The 'abstract' keyword defines a class that cannot be instantiated and may contain abstract methods."
    }
  ],
  advanced: [
    {
      id: 5301,
      question: "What is the difference between an interface and an abstract class in C#?",
      options: [
        "Interface cannot have fields; abstract class can have fields and methods",
        "Both are the same",
        "Interface can have constructors; abstract class cannot",
        "Abstract class cannot have methods"
      ],
      correct: 0,
      explanation: "Interfaces define method signatures without fields; abstract classes can have both fields and concrete or abstract methods."
    },
    {
      id: 5302,
      question: "Which C# feature supports functional programming?",
      options: ["Lambda expressions", "Generics", "Polymorphism", "Encapsulation"],
      correct: 0,
      explanation: "Lambda expressions allow treating functions as first-class objects for functional programming."
    },
    {
      id: 5303,
      question: "What is the difference between checked and unchecked exceptions in C#?",
      options: [
        "C# does not have checked exceptions; all exceptions are unchecked",
        "Checked exceptions occur at runtime, unchecked at compile-time",
        "Both are same in C#",
        "Only runtime errors exist"
      ],
      correct: 0,
      explanation: "C# does not enforce checked exceptions; all exceptions are unchecked and handled at runtime."
    },
    {
      id: 5304,
      question: "Which keyword ensures thread-safe operations in C#?",
      options: ["lock", "volatile", "synchronized", "mutex"],
      correct: 0,
      explanation: "The lock statement ensures that a block of code runs by only one thread at a time."
    },
    {
      id: 5305,
      question: "What is the purpose of the 'readonly' keyword in C#?",
      options: [
        "Ensures that a field can only be assigned during declaration or in a constructor",
        "Prevents class inheritance",
        "Prevents method overriding",
        "Defines a constant value"
      ],
      correct: 0,
      explanation: "'readonly' fields can only be assigned during declaration or inside the constructor and remain immutable afterwards."
    },
    {
      id: 5306,
      question: "Which C# mechanism is used for automatic memory cleanup?",
      options: ["Garbage Collector", "__destruct()", "Dispose()", "finalize()"],
      correct: 0,
      explanation: "The Garbage Collector automatically frees memory occupied by objects no longer in use."
    },
    {
      id: 5307,
      question: "What is the purpose of async and await keywords in C#?",
      options: [
        "Simplify asynchronous programming and non-blocking operations",
        "Pause program execution",
        "Ensure multithreading",
        "Compile-time optimization"
      ],
      correct: 0,
      explanation: "async and await allow asynchronous execution, making non-blocking code easier to write and read."
    },
    {
      id: 5308,
      question: "Which C# feature allows creating reusable code for multiple classes without inheritance?",
      options: ["Interfaces", "Delegates", "Generics", "Events"],
      correct: 0,
      explanation: "Interfaces allow defining reusable contracts implemented by multiple classes without using inheritance."
    },
    {
      id: 5309,
      question: "What is the purpose of the 'dynamic' keyword in C#?",
      options: [
        "Allows variable types to be determined at runtime",
        "Declares a constant",
        "Creates thread-safe variables",
        "Prevents type casting"
      ],
      correct: 0,
      explanation: "The 'dynamic' keyword allows variables to bypass compile-time type checking and determine type at runtime."
    },
    {
      id: 5310,
      question: "What is reflection in C#?",
      options: [
        "Ability to inspect metadata, types, and objects at runtime",
        "Compile-time optimization",
        "Multithreading tool",
        "Memory management feature"
      ],
      correct: 0,
      explanation: "Reflection allows inspecting types, methods, properties, and metadata of objects during runtime."
    }
  ]
},
// Ruby Questions
ruby: {
  beginner: [
    {
      id: 6101,
      question: "Which symbol is used to start a comment in Ruby?",
      options: ["#", "//", "/* */", "<!-- -->"],
      correct: 0,
      explanation: "In Ruby, # is used for single-line comments."
    },
    {
      id: 6102,
      question: "Which method is used to output text in Ruby?",
      options: ["puts", "print", "echo", "Both puts and print"],
      correct: 3,
      explanation: "Both puts and print can output text; puts adds a newline after output."
    },
    {
      id: 6103,
      question: "Which keyword is used to define a function (method) in Ruby?",
      options: ["def", "function", "func", "method"],
      correct: 0,
      explanation: "The 'def' keyword is used to define methods in Ruby."
    },
    {
      id: 6104,
      question: "Which symbol is used to define a variable in Ruby?",
      options: ["No symbol", "$", "@", "%"],
      correct: 0,
      explanation: "Local variables in Ruby do not require a symbol; global variables use $, instance variables @."
    },
    {
      id: 6105,
      question: "Which operator is used for string concatenation in Ruby?",
      options: ["+", ".", "&", "||"],
      correct: 0,
      explanation: "The '+' operator is used to concatenate strings in Ruby."
    },
    {
      id: 6106,
      question: "How do you define an array in Ruby?",
      options: ["[]", "array()", "{}", "new Array()"],
      correct: 0,
      explanation: "Arrays in Ruby are defined using square brackets []."
    },
    {
      id: 6107,
      question: "Which method returns the length of a string in Ruby?",
      options: ["length", "size", "Both length and size", "strlen"],
      correct: 2,
      explanation: "Both length and size methods return the number of characters in a string."
    },
    {
      id: 6108,
      question: "Which keyword is used to create a class in Ruby?",
      options: ["class", "def", "module", "object"],
      correct: 0,
      explanation: "The 'class' keyword is used to define classes in Ruby."
    },
    {
      id: 6109,
      question: "Which symbol is used for instance variables in Ruby?",
      options: ["@", "$", "#", "%"],
      correct: 0,
      explanation: "Instance variables in Ruby start with @."
    },
    {
      id: 6110,
      question: "Which keyword is used to inherit a class in Ruby?",
      options: ["<", "extends", "inherits", ":"],
      correct: 0,
      explanation: "The '<' symbol is used for inheritance in Ruby (e.g., class Child < Parent)."
    }
  ],
  intermediate: [
    {
      id: 6201,
      question: "What is method overloading in Ruby?",
      options: [
        "Ruby does not support traditional method overloading",
        "Defining multiple methods with the same name but different parameters",
        "Calling one method inside another",
        "Redefining a method from a superclass"
      ],
      correct: 0,
      explanation: "Ruby does not support traditional method overloading; last defined method with the same name overwrites the previous one."
    },
    {
      id: 6202,
      question: "What is method overriding in Ruby?",
      options: [
        "Redefining a method in a subclass",
        "Creating multiple methods with same name",
        "Using modules in multiple classes",
        "Calling a method recursively"
      ],
      correct: 0,
      explanation: "Method overriding occurs when a subclass provides a new definition for a method inherited from a superclass."
    },
    {
      id: 6203,
      question: "Which access modifier allows methods to be called only within the same class in Ruby?",
      options: ["private", "protected", "public", "internal"],
      correct: 0,
      explanation: "The private keyword restricts access to methods so they can only be called within the same class."
    },
    {
      id: 6204,
      question: "Which collection class maintains insertion order in Ruby?",
      options: ["Array", "Hash", "Set", "List"],
      correct: 1,
      explanation: "Hash in Ruby 1.9+ maintains the insertion order of key-value pairs."
    },
    {
      id: 6205,
      question: "Which method is used to handle exceptions in Ruby?",
      options: ["begin...rescue", "try...catch", "handle", "except"],
      correct: 0,
      explanation: "The begin...rescue block is used to handle exceptions in Ruby."
    },
    {
      id: 6206,
      question: "What is the purpose of the 'super' keyword in Ruby?",
      options: [
        "Calls the method from the superclass",
        "Refers to current object",
        "Creates a new object",
        "Calls private methods"
      ],
      correct: 0,
      explanation: "'super' invokes the method of the same name from the superclass."
    },
    {
      id: 6207,
      question: "Which method is used to start a new thread in Ruby?",
      options: ["Thread.new", "start()", "run()", "spawn()"],
      correct: 0,
      explanation: "Thread.new creates and starts a new thread in Ruby."
    },
    {
      id: 6208,
      question: "What is the difference between symbols and strings in Ruby?",
      options: [
        "Symbols are immutable and reusable; strings are mutable",
        "Strings are immutable; symbols are mutable",
        "Both are same",
        "Symbols are numeric representations of strings"
      ],
      correct: 0,
      explanation: "Symbols are immutable and unique identifiers, while strings are mutable sequences of characters."
    },
    {
      id: 6209,
      question: "Which keyword is used to define a module in Ruby?",
      options: ["module", "class", "def", "package"],
      correct: 0,
      explanation: "The 'module' keyword is used to define a module for grouping methods, constants, and classes."
    },
    {
      id: 6210,
      question: "Which operator is used for inheritance in Ruby?",
      options: ["<", "extends", "inherits", ":"],
      correct: 0,
      explanation: "The '<' symbol indicates inheritance in Ruby (e.g., class Child < Parent)."
    }
  ],
  advanced: [
    {
      id: 6301,
      question: "What is the difference between include and extend in Ruby?",
      options: [
        "include adds module methods as instance methods; extend adds as class methods",
        "extend adds module methods as instance methods; include adds as class methods",
        "Both are same",
        "Both prevent inheritance"
      ],
      correct: 0,
      explanation: "include mixes module methods as instance methods; extend mixes them as class methods."
    },
    {
      id: 6302,
      question: "What is a Ruby block?",
      options: [
        "A chunk of code that can be passed to methods",
        "A type of class",
        "A method for multithreading",
        "A memory segment"
      ],
      correct: 0,
      explanation: "Blocks are chunks of code enclosed in do...end or {} that can be passed to methods."
    },
    {
      id: 6303,
      question: "Which feature allows Ruby methods to accept variable number of arguments?",
      options: ["Splat operator (*)", "Double splat (**)", "Optional parameters", "Varargs keyword"],
      correct: 0,
      explanation: "The * (splat) operator allows a method to accept variable numbers of arguments."
    },
    {
      id: 6304,
      question: "What is metaprogramming in Ruby?",
      options: [
        "Writing code that writes or modifies code at runtime",
        "Debugging code automatically",
        "Optimizing memory usage",
        "Multithreading feature"
      ],
      correct: 0,
      explanation: "Metaprogramming allows Ruby code to generate or modify methods and classes dynamically at runtime."
    },
    {
      id: 6305,
      question: "Which method is used to freeze an object in Ruby?",
      options: ["freeze", "lock", "seal", "immutable"],
      correct: 0,
      explanation: "freeze prevents further modifications to an object."
    },
    {
      id: 6306,
      question: "What is the purpose of the 'yield' keyword in Ruby?",
      options: [
        "Transfers control from method to the block passed to it",
        "Pauses execution",
        "Creates a thread",
        "Invokes superclass method"
      ],
      correct: 0,
      explanation: "yield passes execution from the method to the block provided when calling the method."
    },
    {
      id: 6307,
      question: "Which method is used to handle exceptions in Ruby?",
      options: ["begin...rescue...ensure", "try...catch", "handle", "except"],
      correct: 0,
      explanation: "begin...rescue...ensure blocks are used for exception handling and cleanup."
    },
    {
      id: 6308,
      question: "What is the difference between a Proc and a Lambda in Ruby?",
      options: [
        "Lambdas check number of arguments strictly; Procs do not",
        "Procs are faster",
        "Both are identical",
        "Proc cannot be passed as block"
      ],
      correct: 0,
      explanation: "Lambdas enforce argument count and return behavior differently than Procs."
    },
    {
      id: 6309,
      question: "What is the difference between class variables and instance variables in Ruby?",
      options: [
        "Class variables (@@) are shared across all instances; instance variables (@) belong to individual objects",
        "Instance variables are shared; class variables belong to one object",
        "Both are same",
        "Instance variables are constants"
      ],
      correct: 0,
      explanation: "Class variables are shared across all instances of a class; instance variables are unique to each object."
    },
    {
      id: 6310,
      question: "What is monkey patching in Ruby?",
      options: [
        "Modifying existing classes or modules at runtime",
        "Debugging tool",
        "Memory optimization technique",
        "Multithreading technique"
      ],
      correct: 0,
      explanation: "Monkey patching allows changing or adding methods to existing classes or modules at runtime."
    }
  ]
},
// Rust Questions
rust: {
  beginner: [
    {
      id: 7101,
      question: "Which keyword is used to define a variable in Rust?",
      options: ["let", "var", "const", "mut"],
      correct: 0,
      explanation: "The 'let' keyword declares variables in Rust. 'mut' is added for mutable variables."
    },
    {
      id: 7102,
      question: "Which function is used to print output to the console in Rust?",
      options: ["println!", "print!", "echo!", "write!"],
      correct: 0,
      explanation: "println! macro prints output with a newline; print! prints without newline."
    },
    {
      id: 7103,
      question: "Which symbol is used to start a comment in Rust?",
      options: ["//", "#", "/* */", "<!-- -->"],
      correct: 0,
      explanation: "Single-line comments use //; multi-line comments use /* */."
    },
    {
      id: 7104,
      question: "Which keyword is used to define a constant in Rust?",
      options: ["const", "let", "static", "final"],
      correct: 0,
      explanation: "The 'const' keyword defines compile-time constants in Rust."
    },
    {
      id: 7105,
      question: "Which keyword makes a variable mutable in Rust?",
      options: ["mut", "var", "mutable", "changeable"],
      correct: 0,
      explanation: "Adding 'mut' allows changing the value of a variable after initialization."
    },
    {
      id: 7106,
      question: "Which operator is used for string concatenation in Rust?",
      options: ["+", "&", ".", "||"],
      correct: 0,
      explanation: "The + operator concatenates String values using references (&)."
    },
    {
      id: 7107,
      question: "Which macro is used to define tests in Rust?",
      options: ["#[test]", "#test", "test!", "check!"],
      correct: 0,
      explanation: "#[test] marks a function as a test to be run with cargo test."
    },
    {
      id: 7108,
      question: "Which data type is used to store a single character in Rust?",
      options: ["char", "String", "u8", "str"],
      correct: 0,
      explanation: "'char' stores a single Unicode character."
    },
    {
      id: 7109,
      question: "Which keyword is used to define a function in Rust?",
      options: ["fn", "function", "def", "func"],
      correct: 0,
      explanation: "The 'fn' keyword is used to define functions in Rust."
    },
    {
      id: 7110,
      question: "Which ownership rule ensures memory safety in Rust?",
      options: [
        "Each value has a single owner; memory is freed when owner goes out of scope",
        "Multiple owners for each value",
        "Manual memory management",
        "Garbage collection"
      ],
      correct: 0,
      explanation: "Rust enforces ownership rules to ensure memory safety without a garbage collector."
    }
  ],
  intermediate: [
    {
      id: 7201,
      question: "What is a reference in Rust?",
      options: [
        "A pointer to a value without taking ownership",
        "A copy of a value",
        "A variable with mutable access only",
        "A constant value"
      ],
      correct: 0,
      explanation: "References allow borrowing a value without taking ownership, using & or &mut."
    },
    {
      id: 7202,
      question: "What does the 'mut' keyword do in a reference declaration?",
      options: [
        "Allows modifying the borrowed value",
        "Creates a mutable copy",
        "Defines a mutable variable only",
        "Prevents modifications"
      ],
      correct: 0,
      explanation: "&mut allows a mutable reference to a value."
    },
    {
      id: 7203,
      question: "Which keyword is used to define a struct in Rust?",
      options: ["struct", "class", "object", "record"],
      correct: 0,
      explanation: "The 'struct' keyword defines a structure with named fields."
    },
    {
      id: 7204,
      question: "Which macro is used to unwrap a Result or Option in Rust?",
      options: ["unwrap()", "expect()", "unwrap_or()", "All of the above"],
      correct: 3,
      explanation: "unwrap(), expect(), and unwrap_or() are used to handle Result or Option types safely or panic if invalid."
    },
    {
      id: 7205,
      question: "What is pattern matching in Rust?",
      options: [
        "A way to compare values using match and if let",
        "Comparing types only",
        "A string matching mechanism",
        "Looping through arrays"
      ],
      correct: 0,
      explanation: "Pattern matching allows destructuring and handling different cases with match and if let."
    },
    {
      id: 7206,
      question: "Which trait must a type implement to allow cloning?",
      options: ["Clone", "Copy", "Debug", "Eq"],
      correct: 0,
      explanation: "Implementing Clone allows creating copies of a type explicitly."
    },
    {
      id: 7207,
      question: "What is the difference between Copy and Clone in Rust?",
      options: [
        "Copy is implicit bitwise copy; Clone requires explicit call",
        "Clone is implicit; Copy is explicit",
        "Both are identical",
        "Copy creates reference, Clone creates value"
      ],
      correct: 0,
      explanation: "Copy allows implicit shallow copying; Clone allows explicit deep or custom copying."
    },
    {
      id: 7208,
      question: "What is the purpose of lifetimes in Rust?",
      options: [
        "Ensure references are valid for a certain scope to prevent dangling pointers",
        "Track variable types",
        "Optimize memory allocation",
        "Debugging runtime errors"
      ],
      correct: 0,
      explanation: "Lifetimes ensure that references do not outlive the data they point to, preventing memory issues."
    },
    {
      id: 7209,
      question: "Which Rust type represents a value that may be present or absent?",
      options: ["Option", "Result", "Maybe", "Nullable"],
      correct: 0,
      explanation: "Option<T> represents a value that can be Some(T) or None."
    },
    {
      id: 7210,
      question: "Which Rust type is used for error handling?",
      options: ["Result", "Option", "Error", "Exception"],
      correct: 0,
      explanation: "Result<T, E> represents either a success (Ok) or an error (Err)."
    }
  ],
  advanced: [
    {
      id: 7301,
      question: "What is the difference between Box<T> and Rc<T> in Rust?",
      options: [
        "Box<T> provides single ownership; Rc<T> provides reference-counted shared ownership",
        "Rc<T> provides single ownership; Box<T> provides shared ownership",
        "Both are identical",
        "Box<T> is for threads only"
      ],
      correct: 0,
      explanation: "Box<T> gives exclusive ownership; Rc<T> allows multiple ownership via reference counting."
    },
    {
      id: 7302,
      question: "What is the purpose of the 'unsafe' keyword in Rust?",
      options: [
        "Allows operations that bypass some compiler safety checks",
        "Declares variables as immutable",
        "Marks a function for optimization",
        "Defines global constants"
      ],
      correct: 0,
      explanation: "'unsafe' allows certain operations like raw pointers that the compiler cannot guarantee as safe."
    },
    {
      id: 7303,
      question: "Which Rust feature allows zero-cost abstractions?",
      options: ["Traits", "Macros", "Generics", "All of the above"],
      correct: 3,
      explanation: "Traits, macros, and generics provide abstraction without runtime overhead, enabling zero-cost abstractions."
    },
    {
      id: 7304,
      question: "What is a lifetime elision in Rust?",
      options: [
        "Compiler automatically infers lifetimes in certain scenarios",
        "Removing unused references",
        "Memory cleanup",
        "Optimizing loops"
      ],
      correct: 0,
      explanation: "Lifetime elision rules allow the compiler to infer lifetimes, reducing the need for explicit annotations."
    },
    {
      id: 7305,
      question: "What is the difference between &T and &mut T in Rust?",
      options: [
        "&T is an immutable reference; &mut T is a mutable reference",
        "&T is mutable; &mut T is immutable",
        "Both are mutable",
        "Both are immutable"
      ],
      correct: 0,
      explanation: "&T allows reading data without modifying; &mut T allows modification of the borrowed value."
    },
    {
      id: 7306,
      question: "Which macro is used to define custom derive in Rust?",
      options: ["#[derive]", "#[custom]", "#macro", "#[derive_custom]"],
      correct: 0,
      explanation: "#[derive] allows automatic implementation of traits like Debug, Clone, or custom traits via procedural macros."
    },
    {
      id: 7307,
      question: "What is interior mutability in Rust?",
      options: [
        "Allows mutation of data even through immutable references using types like RefCell or Mutex",
        "Immutable data cannot be modified",
        "Mutable data is always thread-safe",
        "A compile-time error mechanism"
      ],
      correct: 0,
      explanation: "Interior mutability enables mutation through immutable references via special types that enforce borrow rules at runtime."
    },
    {
      id: 7308,
      question: "Which Rust type allows multiple ownership with mutable access in a single-threaded context?",
      options: ["RefCell<Rc<T>>", "Box<T>", "Arc<T>", "&mut T"],
      correct: 0,
      explanation: "RefCell<Rc<T>> allows multiple owners with controlled mutable access checked at runtime."
    },
    {
      id: 7309,
      question: "What is the purpose of the Send and Sync traits in Rust?",
      options: [
        "Indicate thread safety for transferring or sharing types across threads",
        "Memory optimization",
        "Serialization",
        "Garbage collection"
      ],
      correct: 0,
      explanation: "Send allows ownership transfer to another thread; Sync allows shared references to be used safely across threads."
    },
    {
      id: 7310,
      question: "Which Rust feature allows creating efficient embedded DSLs?",
      options: ["Macros", "Traits", "Enums", "Structs"],
      correct: 0,
      explanation: "Macros allow creating embedded domain-specific languages efficiently by generating code at compile time."
    }
  ]
},
// Go Questions
go: {
  beginner: [
    {
      id: 8101,
      question: "Which keyword is used to declare a variable in Go?",
      options: ["var", "let", "const", "dim"],
      correct: 0,
      explanation: "The 'var' keyword declares variables in Go."
    },
    {
      id: 8102,
      question: "Which function is used to print output in Go?",
      options: ["fmt.Println", "print()", "console.log", "echo"],
      correct: 0,
      explanation: "fmt.Println prints output to the console with a newline."
    },
    {
      id: 8103,
      question: "Which symbol is used to start a comment in Go?",
      options: ["//", "#", "/* */", "<!-- -->"],
      correct: 0,
      explanation: "Single-line comments use //; multi-line comments use /* */."
    },
    {
      id: 8104,
      question: "Which keyword is used to define a constant in Go?",
      options: ["const", "var", "define", "static"],
      correct: 0,
      explanation: "The 'const' keyword defines constants whose values cannot change."
    },
    {
      id: 8105,
      question: "Which keyword is used to define a function in Go?",
      options: ["func", "function", "def", "fn"],
      correct: 0,
      explanation: "The 'func' keyword defines functions in Go."
    },
    {
      id: 8106,
      question: "Which data type is used to store a single character in Go?",
      options: ["rune", "char", "string", "byte"],
      correct: 0,
      explanation: "'rune' represents a Unicode code point in Go."
    },
    {
      id: 8107,
      question: "Which keyword is used for conditional statements in Go?",
      options: ["if", "when", "switch", "case"],
      correct: 0,
      explanation: "Go uses 'if' for conditional execution."
    },
    {
      id: 8108,
      question: "Which keyword is used to define a package in Go?",
      options: ["package", "import", "module", "namespace"],
      correct: 0,
      explanation: "The 'package' keyword defines the package name at the top of a Go file."
    },
    {
      id: 8109,
      question: "Which operator is used for string concatenation in Go?",
      options: ["+", "&", ".", "||"],
      correct: 0,
      explanation: "The '+' operator concatenates strings in Go."
    },
    {
      id: 8110,
      question: "Which keyword is used to declare a variable with inferred type in Go?",
      options: [":=", "var", "let", "="],
      correct: 0,
      explanation: "The := operator declares a variable and infers its type from the assigned value."
    }
  ],
  intermediate: [
    {
      id: 8201,
      question: "What is a pointer in Go?",
      options: [
        "A variable that stores the memory address of another variable",
        "A reference to a function",
        "A value type only",
        "A keyword for arrays"
      ],
      correct: 0,
      explanation: "Pointers store the memory address of another variable, allowing indirect access."
    },
    {
      id: 8202,
      question: "Which keyword is used to handle multiple return values in Go?",
      options: ["Go functions can naturally return multiple values", "return", "yield", "multi"],
      correct: 0,
      explanation: "Go functions can return multiple values by specifying multiple return types."
    },
    {
      id: 8203,
      question: "Which keyword is used to define a struct in Go?",
      options: ["struct", "class", "record", "object"],
      correct: 0,
      explanation: "The 'struct' keyword defines composite types with fields."
    },
    {
      id: 8204,
      question: "Which keyword is used to start a new goroutine in Go?",
      options: ["go", "async", "thread", "spawn"],
      correct: 0,
      explanation: "The 'go' keyword starts a new goroutine for concurrent execution."
    },
    {
      id: 8205,
      question: "Which package is used for formatting I/O in Go?",
      options: ["fmt", "io", "log", "strings"],
      correct: 0,
      explanation: "The 'fmt' package provides functions for formatted I/O."
    },
    {
      id: 8206,
      question: "Which keyword is used for error handling in Go?",
      options: ["error type and if statements", "try...catch", "throw", "handle"],
      correct: 0,
      explanation: "Go handles errors using the error type and if statements, no exceptions exist."
    },
    {
      id: 8207,
      question: "Which collection type maintains insertion order in Go?",
      options: ["slice", "map", "array", "list"],
      correct: 0,
      explanation: "Slices and arrays maintain insertion order; maps do not guarantee order."
    },
    {
      id: 8208,
      question: "Which keyword is used to import packages in Go?",
      options: ["import", "include", "require", "using"],
      correct: 0,
      explanation: "The 'import' keyword is used to include packages in Go programs."
    },
    {
      id: 8209,
      question: "What is the zero value in Go?",
      options: [
        "Default value assigned to a variable when not explicitly initialized",
        "Null value",
        "Error value",
        "Uninitialized memory"
      ],
      correct: 0,
      explanation: "Every variable in Go has a default zero value depending on its type if not initialized."
    },
    {
      id: 8210,
      question: "Which keyword is used to define an interface in Go?",
      options: ["interface", "abstract", "implements", "typeclass"],
      correct: 0,
      explanation: "The 'interface' keyword defines a set of method signatures in Go."
    }
  ],
  advanced: [
    {
      id: 8301,
      question: "What is the difference between a goroutine and a thread in Go?",
      options: [
        "Goroutines are lightweight, managed by the Go runtime; threads are managed by the OS",
        "Threads are lightweight; goroutines are OS-level",
        "Both are identical",
        "Goroutines cannot run concurrently"
      ],
      correct: 0,
      explanation: "Goroutines are managed by the Go runtime and are more lightweight than OS threads, allowing thousands of concurrent routines."
    },
    {
      id: 8302,
      question: "What is a channel in Go?",
      options: [
        "A mechanism to communicate between goroutines safely",
        "A type of slice",
        "An interface for I/O",
        "A network protocol"
      ],
      correct: 0,
      explanation: "Channels provide a safe way for goroutines to communicate and synchronize by sending and receiving values."
    },
    {
      id: 8303,
      question: "Which keyword is used to select among multiple channel operations?",
      options: ["select", "switch", "case", "choose"],
      correct: 0,
      explanation: "The 'select' statement waits on multiple channel operations and executes one that is ready."
    },
    {
      id: 8304,
      question: "What is the difference between buffered and unbuffered channels in Go?",
      options: [
        "Buffered channels have capacity and can store values; unbuffered channels block until received",
        "Unbuffered channels store multiple values; buffered channels do not",
        "Both behave the same",
        "Buffered channels are slower than unbuffered"
      ],
      correct: 0,
      explanation: "Buffered channels allow sending without immediate receiver up to capacity; unbuffered channels block until a receiver is ready."
    },
    {
      id: 8305,
      question: "Which Go feature provides automatic garbage collection?",
      options: ["Garbage collector in Go runtime", "Manual free()", "Defer statements", "Memory manager package"],
      correct: 0,
      explanation: "Go runtime automatically manages memory using garbage collection, freeing unreachable objects."
    },
    {
      id: 8306,
      question: "What is the purpose of the 'defer' keyword in Go?",
      options: [
        "Schedules a function call to run after the current function completes",
        "Delays variable initialization",
        "Starts a goroutine",
        "Handles errors"
      ],
      correct: 0,
      explanation: "'defer' ensures a function is executed at the end of the surrounding function, commonly used for cleanup."
    },
    {
      id: 8307,
      question: "Which Go type represents a set of method signatures?",
      options: ["interface", "struct", "type", "class"],
      correct: 0,
      explanation: "Interfaces define a set of method signatures and can be implemented by any type with matching methods."
    },
    {
      id: 8308,
      question: "Which Go feature allows embedding types within structs?",
      options: ["Embedding", "Inheritance", "Composition", "Interfaces"],
      correct: 0,
      explanation: "Go allows embedding types within structs to achieve composition and reuse methods without traditional inheritance."
    },
    {
      id: 8309,
      question: "Which Go keyword handles panic and recovers from it?",
      options: ["recover", "try", "catch", "handle"],
      correct: 0,
      explanation: "The recover() function is used inside deferred functions to regain control after a panic."
    },
    {
      id: 8310,
      question: "What is the zero value of a pointer in Go?",
      options: ["nil", "0", "undefined", "empty"],
      correct: 0,
      explanation: "Pointers that are not initialized in Go have the zero value nil, representing no memory address."
    }
  ]
},
};

// Helper function to get questions based on user selections
export const getQuestionsForAssessment = (selections, count = 20) => {
  const { field, role, language, level } = selections;
  
  // Get questions based on field and language
  const fieldQuestions = assessmentQuestions[field] || {};
  const levelQuestions = fieldQuestions[level] || [];
  
  // Get questions based on language
  const languageQuestions = assessmentQuestions[language] || {};
  const languageLevelQuestions = languageQuestions[level] || [];
  
  // Get questions based on role
  const roleQuestions = assessmentQuestions[role] || {};
  const roleLevelQuestions = roleQuestions[level] || [];
  
  // Combine all relevant questions
  const allQuestions = [
    ...levelQuestions,
    ...languageLevelQuestions,
    ...roleLevelQuestions
  ];
  
  // Remove duplicates and shuffle
  const uniqueQuestions = allQuestions.filter((q, index, self) =>
    index === self.findIndex((t) => t.id === q.id)
  );
  
  // Select random questions
  const selectedQuestions = [];
  const questionCount = Math.min(count, uniqueQuestions.length);
  
  for (let i = 0; i < questionCount; i++) {
    const randomIndex = Math.floor(Math.random() * uniqueQuestions.length);
    selectedQuestions.push(uniqueQuestions[randomIndex]);
    uniqueQuestions.splice(randomIndex, 1);
  }
  
  return selectedQuestions;
};