const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    requires: true,
  },
  description: {
    type: String,
    requires: true,
    minlength: [20, "Minimum 20 characters are required"],
  },
});

const NotesModel = mongoose.model("notes", noteSchema);

module.exports = NotesModel;
