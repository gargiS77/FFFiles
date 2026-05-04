const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password', // Replace with your password
  database: 'testdb'    // Replace with your database
});

db.connect((err) => {
  if (err) console.log("DB connection failed");
  else console.log("Connected to database");
});

app.get('/notes', (req, res) => {
  db.query("SELECT * FROM Notes", (err, rows) => {
    if (err) res.json({ error: "Error fetching notes" });
    else res.json(rows);
  });
});

app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  const sql = "INSERT INTO Notes (title, content) VALUES (?, ?)";
  
  db.query(sql, [title, content], (err, result) => {
    if (err) res.json({ error: "Error inserting note" });
    else res.json({ message: "Note added successfully", id: result.insertId });
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
