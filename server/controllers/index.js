import axiosInstance from "../util/axios.js";
import pool from "../util/db.js";
// import User from "../models/users.js";
import bcrypt from "bcryptjs";

const baseUrl = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TOKEN = process.env.TOKEN;
const SECRET_KEY = process.env.JWT_SECRET;
const USERS_FILE = "./users.json";

export const getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
    console.log("===== users", result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUsersById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users where id=");
    res.json(result.rows);
    console.log("===== users", result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMovies =
  ("/movies",
  async (req, res) => {
    try {
      const api = axiosInstance(req.headers["authorization"]);
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
};

export const getMovieCredits = async (req, res) => {
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
};

export const getMovieRecommendations = async (req, res) => {
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
};

export const postMovieRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;

    const api = axiosInstance(req.headers["authorization"]);

    const response = await api.post(`/movie/${id}/rating`, { value });

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
};

// const readUsers = () => {
//   if (!fs.existsSync(USERS_FILE)) return [];
//   const data = fs.readFileSync(USERS_FILE, "utf8");
//   return data ? JSON.parse(data) : [];
// };

// const writeUsers = (users) => {
//   fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
// };

export const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({ message: "Fill out all credentials" });
    }

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING *",
      [email, name, hashedPassword]
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: result.rows[0].id,
        email: result.rows[0].email,
        name: result.rows[0].name,
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

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];

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
