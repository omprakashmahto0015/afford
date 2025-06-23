
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/notes")
      .then(res => setNotes(res.data));
  }, []);

  const addNote = () => {
    axios.post("http://localhost:5000/api/notes", { title, description })
      .then(res => {
        setNotes([...notes, res.data]);
        setTitle("");
        setDescription("");
      });
  };

  const deleteNote = (id) => {
    axios.delete(`http://localhost:5000/api/notes/${id}`)
      .then(() => {
        setNotes(notes.filter(note => note.id !== id));
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>QuickNotes App</h2>
      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <br />
      <button onClick={addNote}>Add Note</button>

      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <strong>{note.title}</strong> - {note.description}
            <button onClick={() => deleteNote(note.id)} style={{ marginLeft: 10 }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
