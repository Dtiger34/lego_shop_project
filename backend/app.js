const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:8080/api/v1",
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
