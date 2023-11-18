// successfull react serve working code for react
const path = require("path");
const express = require("express");
const app = express(); // create express app

//middleware to server static files also
app.use(express.static("dist"));

//actual routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// start express server on port 80
app.listen(80, () => {
  console.log("server started on port 80");
});