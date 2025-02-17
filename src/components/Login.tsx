import React, { useState } from "react";
import { login } from "../auth";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [email,setEmail]= useState ("");
    const [password,setPassword]= useState ("");
    const [message,setMessage]= useState ("");
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) =>{
        e.preventDefault()

        if (!email || !password) {
            setMessage('Please fill in all fields')
            return
        }

        const response = login(email, password)
        setMessage(response)

        if (response.startsWith('Login successful')) {
            localStorage.setItem('loggedInUser', email)
            console.log('User logged in:', email)

            window.dispatchEvent(new Event('storage'))

            navigate('/')
        }


};
    return (
        <div style={containerStyle}>
          <h2 style={titleStyle}>Login</h2>
          
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
          <button onClick={handleLogin} style={buttonStyle}>
            Sign In
          </button>
          {message && <p style={messageStyle}>{message}</p>}
          
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
    
    
    
    export default Login;
