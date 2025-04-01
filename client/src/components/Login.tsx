import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import axios from "axios";
import { useLoginUserMutation } from "../services/tmdb";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please fill in all fields");
      return;
    }

    try {
      const response = await loginUser({ email, password }).unwrap();
      setMessage("Login successful!");
      console.log("====>>", response);

      if (response.token) {
        localStorage.setItem("authToken", response.token);
      }

      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      let errorMessage = "Login failed. Please check your credentials.";

      if (typeof err === "object" && err !== null) {
        if (
          "data" in err &&
          typeof err.data === "object" &&
          err.data !== null
        ) {
          errorMessage =
            (err.data as { message?: string }).message || errorMessage;
        } else if ("message" in err) {
          errorMessage = (err as { message?: string }).message || errorMessage;
        }
      }

      setMessage(errorMessage);
      console.error("Error:", err);
    }
  };

  const [user, setUser] = useState<{ access_token: string } | null>(null);
  const [profile, setProfile] = useState<{
    name: string;
    email: string;
    picture: string;
  } | null>(null);

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => setUser(response),
    onError: (error) => console.log("Google Login Failed:", error),
  });

  useEffect(() => {
    if (user?.access_token) {
      axios
        .get("https://www.googleapis.com/oauth2/v1/userinfo", {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json",
          },
        })
        .then((res) => {
          setProfile(res.data);
          localStorage.setItem("authToken", user.access_token);
          setMessage("Login successful!");
          setTimeout(() => navigate("/"), 1000);
        })
        .catch((err) => console.log(err));
    }
  }, [user, navigate]);

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
                                  
      <button onClick={() => googleLogin()} style={googleButtonStyle}>
        Sign in with Google 🚀
      </button>

      {message && <p style={messageStyle}>{message}</p>}
    </div>
  );
};

const containerStyle: React.CSSProperties = {

  width: "400px",
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
  marginBottom: "10px",
};

const googleButtonStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem",
  backgroundColor: "#ffffff",
  color: "#757575",
  border: "1px solid #ddd",
  borderRadius: "8px",
  fontSize: "1rem",
  fontWeight: "bold",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  transition: "background-color 0.3s, transform 0.2s, box-shadow 0.2s",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const googleButtonHoverStyle: React.CSSProperties = {
  backgroundColor: "#f5f5f5",
  transform: "scale(1.02)",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.15)",
};

const messageStyle: React.CSSProperties = {
  marginTop: "1rem",
  color: "#28a745",
  fontSize: "0.9rem",
};

export default Login;
