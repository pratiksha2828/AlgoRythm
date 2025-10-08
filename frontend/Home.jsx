// frontend/Recommendations.jsx
import { Link } from "react-router-dom";

const paths = [
  {
    title: "Learn Coding from Scratch",
    desc: "Start your coding journey with beginner-friendly resources.",
    btn: "Get Started",
    link: "/learn",
    img: "https://cdn-icons-png.flaticon.com/512/906/906324.png"
  },
  {
    title: "Trace & Learn Algorithms",
    desc: "Understand logic step by step through tracing.",
    btn: "Trace Now",
    link: "/trace",
    img: "https://cdn-icons-png.flaticon.com/512/3242/3242257.png"
  },
  {
    title: "Build Live Projects",
    desc: "Engage in hands-on learning with real-world projects.",
    btn: "Join Project",
    link: "/projects",
    img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  },
  {
    title: "Refactor Your Code",
    desc: "Improve your code quality with optimization techniques.",
    btn: "Enhance Now",
    link: "/refactor",
    img: "https://cdn-icons-png.flaticon.com/512/4785/4785457.png"
  }
];

export default function Recommendations() {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 bg-gray-800">
        <h1 className="text-xl font-bold">CodeCraf</h1>
        <nav className="space-x-6">
          <a href="/">Home</a>
          <a href="/courses">Courses</a>
          <a href="/community">Community</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-12">
        <h2 className="text-4xl font-bold">Explore Your Coding Journey</h2>
        <p className="mt-2 text-gray-400">
          Choose your path and start learning today
        </p>
      </section>

      {/* Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-12 pb-12">
        {paths.map((p, i) => (
          <div
            key={i}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition"
          >
            <img src={p.img} alt={p.title} className="h-40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
            <p className="text-gray-400 mb-4">{p.desc}</p>
            <a
              href={p.link}
              className="bg-white text-gray-900 px-4 py-2 rounded-lg font-bold hover:bg-gray-200"
            >
              {p.btn}
            </a>
          </div>
        ))}
      </section>
    </div>
  );
}
