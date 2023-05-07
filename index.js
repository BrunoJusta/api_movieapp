require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./database");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", routes);

// Error handling middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ message: error.message });
});

connectDB();

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
