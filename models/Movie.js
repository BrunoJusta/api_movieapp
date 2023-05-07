const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  poster: String,
  cover: String,
  title: { type: String, required: true },
  description: String,
  director: String,
  cast: [String],
  runTime: String,
  releaseDate: Date,
  score: Number,
});

module.exports = mongoose.model("Movie", MovieSchema);
