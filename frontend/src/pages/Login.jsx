import React from "react";

export default function Login() {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/github"; 
    // backend route for GitHub OAuth
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to AlgoRythm 🚀</h1>
      <p>Login with GitHub to continue</p>
      <button
        onClick={handleLogin}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "8px",
          background: "#24292e",
          color: "#fff",
          border: "none"
        }}
      >
        Login with GitHub
      </button>
    </div>
  );
}
