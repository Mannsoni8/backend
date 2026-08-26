import axios from "axios";
import { useEffect, useState } from "react";
import NoteCard from "./components/NoteCard";

const App = () => {
  const [formValues, setFormValues] = useState({ title: "", description: "" });

  const [allNotes, setAllNotes] = useState([]);

  const [updateNoteId, setUpdateNoteId] = useState(null);

  const handelChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  let getAllNotes = async () => {
    try {
      let res = await axios.get(`http://localhost:3000/notes/allNotes`);
      setAllNotes(res.data.data);
    } catch (error) {
      console.log("error in geting notes", error);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  const handelSubmit = async (e) => {
    e.preventDefault();

    if (updateNoteId) {
      //update api call

      let res = await axios.put(
        `http://localhost:3000/notes/${updateNoteId}`,
        formValues,
      );
      console.log(res);
      setUpdateNoteId(null);
    } else {
      //api call for create
      let res = await axios.post(
        `http://localhost:3000/notes/create`,
        formValues,
      );
    }

    setFormValues({
      title: "",
      description: "",
    });
    getAllNotes();
  };

  let deleteNote = async (id) => {
    try {
      let res = await axios.delete(`http://localhost:3000/notes/${id}`);
      getAllNotes();
    } catch (error) {
      console.log("error in delete note", error);
    }
  };

  let noteForUpdate = (note) => {
    setUpdateNoteId(note._id);

    setFormValues({
      title: note.title,
      description: note.description,
    });
  };

  return (
    <div className="h-screen p-5 flex flex-col gap-5">
      <h1 className="text-3xl font-semibold">Notes App</h1>
      <form
        onSubmit={handelSubmit}
        className="w-70 border border-black flex flex-col p-4 gap-4">
        <input
          onChange={handelChange}
          name="title"
          value={formValues.title}
          className="p-2 outline-none text-xl rounded border border-black"
          type="text"
          placeholder="Title"
        />
        <textarea
          onChange={handelChange}
          name="description"
          value={formValues.description}
          className="p-2 outline-none text-xl rounded border border-black"
          placeholder="description"
          minLength={20}
          required
        />
        <button className="bg-blue-400 rounded-3xl p-2">
          {updateNoteId ? "Update Note" : "Add Note"}
        </button>
      </form>
      <div className="flex flex-wrap gap-5 p-4">
        {allNotes.map((val) => (
          <NoteCard
            key={val._id}
            note={val}
            deleteNote={deleteNote}
            noteForUpdate={noteForUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
