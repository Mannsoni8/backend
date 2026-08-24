const express = require("express");

const {
  noteController,
  getAllNotesController,
  getSingleNoteController,
  updateNotesController,
  deleteNotesController,
} = require("../controllers/noteController");
const NotesModel = require("../models/notes.model");

const router = express.Router();

//create
router.post("/create", noteController);
//read
router.get("/allNotes", getAllNotesController);
//read 1
router.get("/:id", getSingleNoteController);
//update
router.put("/:id", updateNotesController);
//delete
router.delete("/:id", deleteNotesController);

module.exports = router;
