const User = require("../models/User");
const Movie = require("../models/Movie");

exports.getMovies = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("movies");
    res.status(200).json(user.movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addMovie = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      poster,
      cover,
      title,
      description,
      director,
      cast,
      runtime,
      releaseDate,
      score,
    } = req.body;

    const newMovie = new Movie({
      poster,
      cover,
      title,
      description,
      director,
      cast,
      runtime,
      releaseDate,
      score,
      user: userId,
    });

    await newMovie.save();

    const user = await User.findById(userId);
    user.movies.push(newMovie);
    await user.save();

    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const {
      poster,
      cover,
      title,
      description,
      director,
      cast,
      runtime,
      releaseDate,
      score,
    } = req.body;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    movie.poster = poster || movie.poster;
    movie.cover = cover || movie.cover;
    movie.title = title || movie.title;
    movie.description = description || movie.description;
    movie.director = director || movie.director;
    movie.cast = cast || movie.cast;
    movie.runtime = runtime || movie.runtime;
    movie.releaseDate = releaseDate || movie.releaseDate;
    movie.score = score || movie.score;

    await movie.save();

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    await Movie.findByIdAndDelete(movieId);

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const movieId = req.params.movieId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    if (!user.favoriteMovies.includes(movieId)) {
      user.favoriteMovies.push(movieId);
      await user.save();
    }

    res.status(200).json({ message: "Movie added to favorites" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const movieId = req.params.movieId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    user.favoriteMovies = user.favoriteMovies.filter(
      (id) => id.toString() !== movieId
    );
    await user.save();

    res.status(200).json({ message: "Movie removed from favorites" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFavoriteMovies = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("favoriteMovies");
    res.status(200).json(user.favoriteMovies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
