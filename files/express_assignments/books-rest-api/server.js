const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

let books = [
  { id: 1, title: 'Learn HTML', author: 'John Doe' },
  { id: 2, title: 'CSS Basics', author: 'Jane Smith' }
];

app.get('/books', (req, res) => {
  res.json(books);
});

app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

app.post('/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author
  };
  books.push(newBook);
  res.json({ message: 'Book created', book: newBook });
});

app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let book = books.find(b => b.id === id);
  if (book) {
    book.title = req.body.title;
    book.author = req.body.author;
    res.json({ message: 'Book updated', book });
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = books.length;
  books = books.filter(b => b.id !== id);
  
  if (books.length < initialLength) {
    res.json({ message: 'Book deleted' });
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
