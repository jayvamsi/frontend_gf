import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import "../App.css"; // Already styled

function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !username) {
      alert("All fields are required.");
      return;
    }

    try {
      const res = await fetch("https://gf-backend-im3h.onrender.com/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Registration successful! Please log in.");
        navigate("/login");
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (err) {
      console.error("Register error:", err);
      alert("Server error.");
    }
  };

  return (
    <div className="login-video-wrapper">
      <video autoPlay muted loop className="background-video">
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="login-overlay">
        <div className="login-container">
          <h2 className="login-title">Admin Registration</h2>
          <form onSubmit={handleRegister} className="login-form">
            <div className="input-icon-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                className="login-input underline"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-icon-wrapper">
              <FaUser className="input-icon" />
              <input
                type="text"
                className="login-input underline"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-icon-wrapper">
              <FaLock className="input-icon" />
              <input
                type="password"
                className="login-input underline"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-button">
              Register
            </button>

            <p style={{ textAlign: "center", marginTop: "10px", color: "white" }}>
              Already have an account?{" "}
              <span
                style={{ color: "#1dd1a1", cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
