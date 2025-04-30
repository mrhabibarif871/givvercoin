const express = require("express");
const connectDB = require("./config/db");
const helmet = require("helmet");
const CORS = require("cors");
const test = require("./tests/phaser");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(helmet());
app.use(CORS());

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/play", require("./routes/api/play"));
app.use("/api/task", require("./routes/api/task"));

// Removed frontend serving code to avoid index.html error

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(Server started on port ${PORT}));

module.exports = app;

// Testing server
// test();
