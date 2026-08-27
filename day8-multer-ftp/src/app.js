const express = require("express");
const fileRoute = require("./routes/files.route");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("backend running successfully");
});

app.use("/file", fileRoute);

module.exports = app;
