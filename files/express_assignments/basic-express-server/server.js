const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

app.get('/', (req, res) => {
  res.send('Welcome to Basic Express Server');
});

app.get('/about', (req, res) => {
  res.json({ app: 'Basic Express Server', version: '1.0.0' });
});

app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(newUser);
  res.json({ message: 'User added', user: newUser });
});

app.use((req, res) => {
  res.status(404).send('404 - Page Not Found');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
