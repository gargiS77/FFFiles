const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'testdb'
});

db.connect((err) => {
  if (err) console.log("DB connection error");
  else console.log("DB connected");
});

app.get('/contacts', (req, res) => {
  db.query("SELECT * FROM Contacts", (err, rows) => {
    if (err) res.json({ error: "Error fetching" });
    else res.json(rows);
  });
});

app.post('/contacts', (req, res) => {
  const { name, phone, email } = req.body;
  const sql = "INSERT INTO Contacts (name, phone, email) VALUES (?, ?, ?)";
  
  db.query(sql, [name, phone, email], (err, result) => {
    if (err) res.json({ error: "Error adding contact" });
    else res.json({ message: "Contact added", id: result.insertId });
  });
});

app.delete('/contacts/:id', (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Contacts WHERE id = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) res.json({ error: "Error deleting contact" });
    else res.json({ message: "Contact deleted" });
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
