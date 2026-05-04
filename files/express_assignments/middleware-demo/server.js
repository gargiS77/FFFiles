const express = require('express');
const app = express();

// Logger Middleware
function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
}

// Auth Middleware
function auth(req, res, next) {
  const token = req.headers['x-auth-token'];
  if (token === 'my-secret-token') {
    next();
  } else {
    res.status(401).json({ error: 'Access Denied: No or Invalid Token' });
  }
}

app.use(logger);

app.get('/', (req, res) => {
  res.send('Home Page - Open to all');
});

// Protected route
app.get('/dashboard', auth, (req, res) => {
  res.json({ message: 'Welcome to the dashboard!', secretData: '12345' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
