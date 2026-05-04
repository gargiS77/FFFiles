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
  if (err) console.log("Error connecting to db");
  else console.log("Connected to MySQL");
});

app.get('/products', (req, res) => {
  db.query("SELECT * FROM Products", (err, rows) => {
    if (err) res.json({ error: "Error reading products" });
    else res.json(rows);
  });
});

app.get('/products/:id', (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Products WHERE id = ?", [id], (err, rows) => {
    if (err) {
      res.json({ error: "Error reading product" });
    } else if (rows.length === 0) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json(rows[0]);
    }
  });
});

app.put('/products/:id', (req, res) => {
  const id = req.params.id;
  const { price, stock } = req.body;
  
  const sql = "UPDATE Products SET price = ?, stock = ? WHERE id = ?";
  
  db.query(sql, [price, stock, id], (err, result) => {
    if (err) {
      res.json({ error: "Error updating product" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json({ message: "Product updated successfully" });
    }
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
