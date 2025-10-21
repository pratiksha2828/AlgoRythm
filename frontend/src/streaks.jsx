import React, { useState, useEffect } from "react";
import "./app.css"; // Import the CSS you shared

export default function Streaks() {
  const [claimed, setClaimed] = useState([]);
  const [userId, setUserId] = useState(null);

  const streaksData = [
    { id: 1, title: "Learning Streak", desc: "You explored new coding topics today!"},
    { id: 2, title: "Tracing Streak", desc: "You sharpened your logic and thinking!"},
    { id: 3, title: "Test Streak", desc: "You tested your skills with dedication!" },
    { id: 4, title: "Projects Streak", desc: "You worked on your project today — keep building!"},
  ];

  useEffect(() => {
    fetch("http://localhost:5000/api/streaks/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUserId(data.streakUserId))
      .catch((err) => console.error("Error fetching user ID:", err));
  }, []);

  const getStreakKey = (title) => {
    switch (title) {
      case "Learning Streak": return "learningStreak";
      case "Tracing Streak": return "tracingStreak";
      case "Test Streak": return "testStreak";
      case "Projects Streak": return "projectsStreak";
      default: return "";
    }
  };

  const claimStreak = async (id) => {
    if (!claimed.includes(id) && userId) {
      setClaimed([...claimed, id]);
      const streakType = getStreakKey(streaksData.find(s => s.id === id).title);

      try {
        const res = await fetch(`http://localhost:5000/api/streaks/${userId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ streakType }),
          credentials: "include",
        });

        const data = await res.json();
        if (res.ok) {
          alert(`🔥 ${streaksData.find(s => s.id === id).title} claimed! Current streak: ${data.user[streakType]}`);
        } else {
          alert("Error: " + (data.message || data.error));
        }
      } catch (err) {
        console.error(err);
        alert("Error updating streak!");
      }
    }
  };

  return (
    <div className="wrap" style={{ minHeight: "100vh", paddingTop: "80px", paddingBottom: "60px" }}>
      <div className="hero">
        <h1>🔥 Claim Your Streaks</h1>
        <p>Celebrate your daily progress — claim your streak for what you accomplished today!</p>
      </div>

      <div
        className="cards-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)", // 2 columns
          gridTemplateRows: "repeat(2, 1fr)",    // 2 rows
          gap: "40px 30px",
          justifyItems: "center",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        {streaksData.map((streak) => (
          <div
            key={streak.id}
            className="card card-symmetric"
            onClick={() => claimStreak(streak.id)}
            style={{ width: "100%", maxWidth: "350px" }}
          >
            <div style={{ fontSize: "2.5rem" }}>{streak.emoji}</div>
            <h3>{streak.title}</h3>
            <p>{streak.desc}</p>
            <button
              disabled={claimed.includes(streak.id) || !userId}
              style={{
                backgroundColor: claimed.includes(streak.id) ? "var(--success)" : "var(--primary)",
                color: "white",
                border: "none",
                padding: "10px 18px",
                borderRadius: "var(--radius-md)",
                cursor: claimed.includes(streak.id) || !userId ? "not-allowed" : "pointer",
                fontWeight: "bold",
                width: "100%",
                marginTop: "10px",
              }}
            >
              {claimed.includes(streak.id) ? "✅ Claimed" : "Claim Streak"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
