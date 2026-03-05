const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const connectionDB = require("./config/db");

const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/uploads", express.static("uploads"));

// serve React build
app.use(express.static(path.join(__dirname, "public")));

// fallback React router
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

connectionDB();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});