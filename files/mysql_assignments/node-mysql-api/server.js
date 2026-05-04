const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());
app.use(express.static(__dirname)); // Serve index.html

// Basic connection (student level)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password', // Replace with actual password
  database: 'schooldb' // Connect to an existing database like schooldb
});

db.connect((err) => {
  if (err) {
    console.log('Error connecting to database');
  } else {
    console.log('Connected to MySQL');
    
    // Create Students table if not exists
    let createTableQuery = `
      CREATE TABLE IF NOT EXISTS AppStudents (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100)
      )
    `;
    db.query(createTableQuery, (err, result) => {
      if (err) console.log(err);
      else console.log("Students table ready");
    });
  }
});

// GET /students
app.get('/students', (req, res) => {
  db.query('SELECT * FROM AppStudents', (err, results) => {
    if (err) res.send('Error reading data');
    else res.json(results);
  });
});

// POST /students
app.post('/students', (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO AppStudents (name, email) VALUES (?, ?)', [name, email], (err, result) => {
    if (err) res.send('Error inserting data');
    else res.json({ message: 'Student added', id: result.insertId });
  });
});

// PUT /students/:id (update email)
app.put('/students/:id', (req, res) => {
  const id = req.params.id;
  const { email } = req.body;
  db.query('UPDATE AppStudents SET email = ? WHERE id = ?', [email, id], (err, result) => {
    if (err) res.send('Error updating data');
    else res.json({ message: 'Student updated' });
  });
});

// DELETE /students/:id
app.delete('/students/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM AppStudents WHERE id = ?', [id], (err, result) => {
    if (err) res.send('Error deleting data');
    else res.json({ message: 'Student deleted' });
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
