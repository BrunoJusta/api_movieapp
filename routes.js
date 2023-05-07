const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("./controllers/authController");
const {
  getProfile,
  updateProfile,
} = require("./controllers/profileController");
const {
  getMovies,
  addMovie,
  getMovieById,
  updateMovie,
  deleteMovie,
  addFavorite,
  removeFavorite,
} = require("./controllers/movieController");

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);

router.get("/profile", getProfile);
router.put("/profile", updateProfile);

router.get("/movies", getMovies);
router.post("/movies", addMovie);
router.get("/movies/:movieId", getMovieById);
router.put("/movies/:movieId", updateMovie);
router.delete("/movies/:movieId", deleteMovie);
router.post("/movies/:movieId/favorite", addFavorite);
router.delete("/movies/:movieId/favorite", removeFavorite);

module.exports = router;
