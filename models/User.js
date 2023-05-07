const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  birthDate: { type: Date, required: true },
  password: { type: String, required: true },
  watchedMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

module.exports = mongoose.model("User", UserSchema);
