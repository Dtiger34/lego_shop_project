const app = require("./app");
const path = require("path");
const express = require("express");
const connectionDB = require("./config/db");

app.use(express.static(path.join(__dirname, "public")));

app.get(/.*/, (req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(404).json({ message: "API route not found" });
  }

  res.sendFile(path.join(__dirname, "public", "index.html"));
});

connectionDB();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});