import React, { useState } from "react";
import { register } from "./auth";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    const response = register(name, email, password);
    setMessage(response);
    if (response === "User registered successfully!") {
      setTimeout(() => navigate("/login"), 1000);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Register</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={inputStyle}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />
      <button onClick={handleRegister} style={buttonStyle}>
        Sign Up
      </button>
      {message && <p style={messageStyle}>{message}</p>}
      <p style={loginTextStyle}>
        Already have an account?{" "}
        <a href="/login" style={loginLinkStyle}>
          Login
        </a>
      </p>
    </div>
  );
};


const containerStyle: React.CSSProperties = {
  maxWidth: "400px",
  margin: "auto",
  padding: "2rem",
  textAlign: "center",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const titleStyle: React.CSSProperties = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "#333",
  marginBottom: "1.5rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem",
  margin: "0.5rem 0",
  border: "1px solid #ddd",
  borderRadius: "4px",
  fontSize: "1rem",
  outline: "none",
  transition: "border-color 0.3s, box-shadow 0.3s",
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  fontSize: "1rem",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "background-color 0.3s, transform 0.2s",
};

const messageStyle: React.CSSProperties = {
  marginTop: "1rem",
  color: "#28a745",
  fontSize: "0.9rem",
};

const loginTextStyle: React.CSSProperties = {
  marginTop: "1rem",
  color: "#666",
  fontSize: "0.9rem",
};

const loginLinkStyle: React.CSSProperties = {
  color: "#007bff",
  textDecoration: "none",
  fontWeight: "bold",
};

export default Register;
