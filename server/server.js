import express from "express";
import fs from "fs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";

const app = express();
const PORT = 3002;

import axiosInstance from "./util/axios.js";

const baseUrl = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TOKEN = process.env.TOKEN;
const SECRET_KEY = process.env.JWT_SECRET;
const USERS_FILE = "./users.json";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("Request Headers=====>>:", req.headers);
  next();
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Authorization", `Bearer ${TOKEN}`);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Authorization"
  );
  next();
});

app.get("/movies", async (req, res) => {
  try {
    const api = axiosInstance(req.headers["authorization"]);
    const response = await api.get(`/discover/movie`, {
      params: {
        include_adult: false,
        language: "en-US",
        sort_by: "popularity.desc",
        page: "1",
        api_key: TMDB_API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching movie list", error: error.message });
  }
});

app.get("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const api = axiosInstance(req.headers["authorization"]);

    const response = await api.get(`/movie/${id}`, {
      params: { language: "en-US", api_key: TMDB_API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching movie", error: error.message });
  }
});

app.get("/movies/:id/credits", async (req, res) => {
  try {
    const { id } = req.params;
    const api = axiosInstance(req.headers["authorization"]);

    const response = await api.get(`/movie/${id}/credits`, {
      params: { language: "en-US", api_key: TMDB_API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching movie credits", error: error.message });
  }
});

app.get("/movies/:id/recommendations", async (req, res) => {
  try {
    const { id } = req.params;
    const api = axiosInstance(req.headers["authorization"]);

    const response = await api.get(`/movie/${id}/recommendations`, {
      params: { language: "en-US", api_key: TMDB_API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching movie recommendations",
      error: error.message,
    });
  }
});

app.post("/movies/:id/rating", async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;

    const api = axiosInstance(req.headers["authorization"]);

    const response = await api.post(`/movie/${id}/rating`, {
      value: value,
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Error posting rating",
      error: error.response?.data || error.message,
    });
  }
});
app.post("/movies/:id/favorites", async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;

    const api = axiosInstance(req.headers["authorization"]);

    const response = await api.post(`/account/${id}/favorite`, {
      media_type: "movie",
      media_id: id,
      favorite: value,
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Error posting favorites",
      error: error.response?.data || error.message,
    });
  }
});

const readUsers = () => {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE, "utf8");
  return data ? JSON.parse(data) : [];
};

const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

app.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password)
    return res.status(400).json({ message: "Fill out all credentials" });

  let users = readUsers();

  if (users.some((user) => user.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { email, name, password: hashedPassword };
  users.push(newUser);

  writeUsers(users);
  res.status(201).json({ message: "User registered successfully" });
});

app.post("/login", async (req, res) => {
  const { email, name, password } = req.body;
  let users = readUsers();

  const user = users.find((user) => user.email === email);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch)
    return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ message: "Login successful", token });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
