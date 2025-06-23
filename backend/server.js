
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let notes = [];
let id = 1;

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
  const { title, description } = req.body;
  const newNote = { id: id++, title, description };
  notes.push(newNote);
  res.status(201).json(newNote);
});

app.delete("/api/notes/:id", (req, res) => {
  const noteId = parseInt(req.params.id);
  notes = notes.filter((note) => note.id !== noteId);
  res.status(204).end();
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

