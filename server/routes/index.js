import express from "express";

import {
  getUsers,
  getMovies,
  getMovieById,
  getMovieCredits,
  getMovieRecommendations,
  postMovieRating,
  toggleFavoriteMovie,
  registerUser,
  loginUser,
} from "../controllers/index.js";

const router = express();

router.get("/users", getUsers);
router.get("/movies", getMovies);
router.get("/movies/:id", getMovieById);
router.get("/movies/:id/credits", getMovieCredits);
router.get("/movies/:id/recommendations", getMovieRecommendations);
router.post("/movies/:id/rating", postMovieRating);
router.post("/movies/:id/favorites", toggleFavoriteMovie);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
