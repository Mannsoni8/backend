const express = require("express");
const { model } = require("mongoose");
const NotesModel = require("./models/notes.model");
const connectDb = require("./config/db");
const noteController = require("./controllers/noteController");
const notesROute = require("./routes/note.route");

const app = express();

app.use(express.json());

connectDb();

app.get("/", (req, res) => {
  res.send("done");
});

app.use("/notes", notesROute);

module.exports = app;
