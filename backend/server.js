const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectionDB = require("./config/db");
const route = require("./routes/route");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

// Uploads folder
app.use("/uploads", express.static("uploads"));

// API Routes - MUST come before static files
app.use("/api/v1", route);

// Serve React build (production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "public")));
  
  // Fallback to React router (NOT for API routes)
  app.get("*", (req, res) => {
    if (!req.path.startsWith("/api")) {
      res.sendFile(path.join(__dirname, "public", "index.html"));
    }
  });
}

connectionDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});