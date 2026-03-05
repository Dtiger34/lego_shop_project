const express = require("express");
const app = express();

// middleware
app.use(express.json());

// routes
const route = require("./routes/route");
app.use("/api/v1", route);

module.exports = app;