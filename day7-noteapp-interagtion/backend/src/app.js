const express = require("express");

const cors = require("cors");
const connectDb = require("./config/db");

const notesROute = require("./routes/note.route");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

connectDb();

app.get("/", (req, res) => {
  res.send("done");
});

app.use("/notes", notesROute);

module.exports = app;
