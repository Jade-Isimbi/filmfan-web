import express from "express";

import {
  getUsers,
  getMovies,
  getMovieById,
  getMovieCredits,
  getMovieRecommendations,
  postMovieRating,
  toggleFavoriteMovie,
  getFavorites,
  registerUser,
  loginUser,
} from "../controllers/index.js";
import { verifyToken } from "../middleware/index.js";

const router = express();

router.get("/users", verifyToken, getUsers);
router.get("/movies", verifyToken, getMovies);
router.get("/movies/:id", verifyToken, getMovieById);
router.get("/movies/:id/credits", verifyToken, getMovieCredits);
router.get("/movies/:id/recommendations", verifyToken, getMovieRecommendations);
router.post("/movies/:id/rating", verifyToken, postMovieRating);
router.post("/movies/:id/favorites", verifyToken, toggleFavoriteMovie);
router.get("/favorites",verifyToken,getFavorites);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
