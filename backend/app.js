const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: [
      "https://viettich.store",
      "https://www.viettich.store",
      "https://bamboshop.azurewebsites.net",
    ],
    credentials: true,
  }),
);
// middleware
app.use(express.json());

// routes
const route = require("./routes/route");
app.use("/api/v1", route);

module.exports = app;
