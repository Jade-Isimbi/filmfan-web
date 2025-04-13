import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../services/tmdb";
import {
  Box,
  Button,
  Typography,
  TextField,
  Link,
  Divider,
} from "@mui/material";

import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "../slices/auth";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [registerUser, { isLoading, error }] = useRegisterUserMutation();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerUser({ name, email, password }).unwrap();
      setMessage("User registered successfully!");

      if (response.token) {
        localStorage.setItem("authToken", response.token);
      }

      dispatch(
        setIsAuthenticated({
          name: response.user.name,
          email: response.user.email,
          token: response.token,
        })
      );
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      let errorMessage = "Registration failed. Please try again.";

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

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        backgroundColor: "#f4f4f4",
      }}
    >
      <Box
        sx={{
          width: 400,
          p: 4,
          backgroundColor: "#fff",
          borderRadius: 3,
          boxShadow: 5,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          align="center"
          color="primary"
        >
          Welcome to Film Fan
        </Typography>

        <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
          Sign Up
        </Typography>

        <Box component="form" onSubmit={handleRegister}>
          <TextField
            fullWidth
            label="Full Name"
            type="text"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 1 }}
            disabled={isLoading}
          >
            Sign Up
          </Button>
        </Box>

        <Divider sx={{ my: 2 }}>OR</Divider>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don’t have an account?{" "}
          <Link href="/login" underline="hover" color="primary">
            Sign In
          </Link>
        </Typography>

        {message && (
          <Typography
            variant="body2"
            color={
              message.toLowerCase().includes("success")
                ? "success.main"
                : "error"
            }
            align="center"
            sx={{ mt: 2 }}
          >
            {message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Register;
