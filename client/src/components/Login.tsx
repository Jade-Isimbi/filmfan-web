import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useLoginUserMutation } from "../services/tmdb";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "../slices/auth";
import {
  Box,
  Button,
  Typography,
  TextField,
  Link,
  Divider,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please fill in all fields");
      return;
    }

    try {
      const response = await loginUser({ email, password }).unwrap();
      setMessage("Login successful!");

      dispatch(
        setIsAuthenticated({
          name: response.user.name,
          email: response.user.email,
          token: response.token,
        })
      );

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

  // const [user, setUser] = useState<{ access_token: string } | null>(null);

  // const googleLogin = useGoogleLogin({
  //   onSuccess: (response) => setUser(response),
  //   onError: (error) => console.log("Google Login Failed:", error),
  // });

  // useEffect(() => {
  //   if (user?.access_token) {
  //     axios
  //       .get("https://www.googleapis.com/oauth2/v1/userinfo", {
  //         headers: {
  //           Authorization: `Bearer ${user.access_token}`,
  //           Accept: "application/json",
  //         },
  //       })
  //       .then((res) => {
  //         localStorage.setItem("authToken", user.access_token);
  //         setMessage("Login successful!");
  //         setTimeout(() => navigate("/"), 1000);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [user, navigate]);

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
          Login
        </Typography>

        <Box component="form" onSubmit={handleLogin}>
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
            Sign In
          </Button>
        </Box>

        <Divider sx={{ my: 2 }}>OR</Divider>

        {/* <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={() => googleLogin()}
          sx={{
            backgroundColor: "#fff",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          Sign in with Google
        </Button> */}

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don’t have an account?{" "}
          <Link href="/registration" underline="hover" color="primary">
            Sign Up
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

export default Login;
