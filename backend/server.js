const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectionDB = require("./config/db");
const app = require("./app");
require("dotenv").config();

// Middleware
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
const path = require("path");

// Fallback route not found
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Connect to DB & Start Server
connectionDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend is running at http://localhost:${PORT}`);
});