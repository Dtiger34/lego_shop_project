const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      "http://localhost:3000",
      "http://localhost:8080",
      "https://viettich.store",
      "https://www.viettich.store",
      "https://bamboshop.azurewebsites.net",
    ],
    credentials: true,
  }),
);
// middleware
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
const route = require("./routes/route");
app.use("/api/v1", route);

module.exports = app;
