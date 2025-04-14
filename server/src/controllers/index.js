import axiosInstance from "../../util/axios.js";
import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express from "express";
const router = express.Router();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TOKEN = process.env.TOKEN;
const SECRET_KEY = process.env.JWT_SECRET;

export const getUsers = async (req, res) => {
  try {
    const result = await User.findAll();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMovies =
  ("/movies",
  async (req, res) => {
    try {
      const api = axiosInstance(TOKEN);
      const response = await api.get(`/discover/movie`, {
        params: {
          include_adult: false,
          language: "en-US",
          sort_by: "popularity.desc",
          page: "2",
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

export const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const api = axiosInstance(TOKEN);

    const response = await api.get(`/movie/${id}`, {
      params: { language: "en-US", api_key: TMDB_API_KEY },
    });

    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching movie", error: error.message });
  }
};

export const getMovieCredits = async (req, res) => {
  try {
    const { id } = req.params;
    const api = axiosInstance(TOKEN);

    const response = await api.get(`/movie/${id}/credits`, {
      params: { language: "en-US", api_key: TMDB_API_KEY },
    });

    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching movie credits", error: error.message });
  }
};

export const getMovieRecommendations = async (req, res) => {
  try {
    const { id } = req.params;
    const api = axiosInstance(TOKEN);

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
};

export const postMovieRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;

    const api = axiosInstance(TOKEN);

    const response = await api.post(
      `/movie/${id}/rating`,
      { value },
      {
        params: {
          api_key: TMDB_API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Error posting rating",
      error: error.response?.data || error.message,
    });
  }
};

export const toggleFavoriteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;

    const api = axiosInstance(TOKEN);

    const response = await api.post(
      `/account/${id}/favorite`,
      {
        media_type: "movie",
        media_id: id,
        favorite: value,
      },
      {
        params: {
          api_key: TMDB_API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: "Error posting favorites",
      error: error.response?.data || error.message,
    });
  }
};
export const getFavorites =
  ("/favorites",
  async (req, res) => {
    try {
      const { id } = req.params;
      const api = axiosInstance(TOKEN);
      const response = await api.get(`/account/${id}/favorite/movies`, {
        params: {
          language: "en-US",
          page: 1,
          sort_by: "created_at.asc",
          api_key: TMDB_API_KEY,
        },
      });
      res.json(response.data);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching favorites", error: error.message });
    }
  });

export const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({ message: "Fill out all credentials" });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      name,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
