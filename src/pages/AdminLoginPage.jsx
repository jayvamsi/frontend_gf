import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "../App.css";

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   if (sessionStorage.getItem("isAdmin") === "true") {
  //     navigate("/home");
  //   }
  // }, [navigate]);

  useEffect(() => {
  const isAdmin = sessionStorage.getItem("isAdmin") === "true";
  if (isAdmin) {
    // navigate("/home", { replace: true });
    window.location.href = "/home";
  }
}, []);


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://gf-backend-im3h.onrender.com/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (res.ok && data.success) {
        sessionStorage.setItem("isAdmin", "true");
        sessionStorage.setItem("adminToken", data.token || "default-admin-token");
        sessionStorage.setItem("adminEmail", data.email); // 👈 already needed
        sessionStorage.setItem("adminUsername", data.username); // 👈 new

        // ✅ Instant redirect (avoids lag)
        window.location.href = "/home";
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error");
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
          <h2 className="login-title">Admin Login</h2>
          <form onSubmit={handleLogin} className="login-form">
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

            <button type="submit" className="login-button">Login</button>

            <p style={{ textAlign: "center", marginTop: "10px", color: "white" }}>
              Don't have an account?{" "}
              <span
                style={{ color: "#1dd1a1", cursor: "pointer" }}
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
