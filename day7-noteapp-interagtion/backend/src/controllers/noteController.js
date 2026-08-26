const NotesModel = require("../models/notes.model");

const noteController = async (req, res) => {
  try {
    let { title, description } = req.body;
    let newNote = await NotesModel.create({
      title,
      description,
    });

    return res.status(201).json({
      message: "Note created successfully",
      data: newNote,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getAllNotesController = async (req, res) => {
  try {
    const allNotes = await NotesModel.find();
    return res.status(200).json({
      message: "All notes fetched",
      data: allNotes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getSingleNoteController = async (req, res) => {
  try {
    let noteId = req.params;
    let note = await NotesModel.findById(noteId);
    return res.status(200).json({
      message: "singel note fetch",
      data: noteId,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateNotesController = async (req, res) => {
  try {
    let noteId = req.params.id;
    let body = req.body;
    let updateNote = await NotesModel.findByIdAndUpdate(noteId, body, {
      returnDocument: "after",
    });
    return res.status(200).json({
      message: "Update the data",
      data: updateNote,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const singleEntityUpdateController = async (req, res) => {
  try {
    let noteId = req.params.id;
    let body = req.body;
    let updatedNote = await NotesModel.findByIdAndUpdate(noteId, body, {
      new: true,
    });
    return res.status(200).json({
      message: "Note updated successfully",
      data: updatedNote,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteNotesController = async (req, res) => {
  try {
    let noteId = req.params.id;

    let deleteNote = await NotesModel.findByIdAndDelete(noteId);
    return res.status(200).json({
      message: "Delete the data",
      data: deleteNote,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  noteController,
  getAllNotesController,
  getSingleNoteController,
  updateNotesController,
  deleteNotesController,
  singleEntityUpdateController,
};
