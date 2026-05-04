const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

const FILE_NAME = 'notes.json';

// Helper function to read file
function getNotes() {
  const data = fs.readFileSync(FILE_NAME, 'utf8');
  return JSON.parse(data);
}

// Helper function to write file
function saveNotes(notes) {
  fs.writeFileSync(FILE_NAME, JSON.stringify(notes, null, 2));
}

app.get('/notes', (req, res) => {
  const notes = getNotes();
  res.json(notes);
});

app.post('/notes', (req, res) => {
  const notes = getNotes();
  const newNote = {
    id: Date.now().toString(),
    title: req.body.title,
    content: req.body.content,
    createdAt: new Date().toISOString()
  };
  notes.push(newNote);
  saveNotes(notes);
  res.json({ message: 'Note added', note: newNote });
});

app.get('/notes/:id', (req, res) => {
  const notes = getNotes();
  const note = notes.find(n => n.id === req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
});

app.delete('/notes/:id', (req, res) => {
  let notes = getNotes();
  const initialLength = notes.length;
  notes = notes.filter(n => n.id !== req.params.id);
  
  if (notes.length < initialLength) {
    saveNotes(notes);
    res.json({ message: 'Note deleted' });
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
