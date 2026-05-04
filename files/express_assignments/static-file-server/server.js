const express = require('express');
const app = express();
const path = require('path');

// Response time middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const time = Date.now() - start;
    res.setHeader('X-Response-Time', `${time}ms`);
  });
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
