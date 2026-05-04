const express = require('express');
const app = express();

// Use PORT from environment variable, or default to 3000 locally
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/status', (req, res) => {
  res.json({
    status: 'running',
    time: new Date().toISOString()
  });
});

app.get('/info', (req, res) => {
  res.json({
    name: 'Your Name', // Add your actual name here
    prn: 'Your PRN'    // Add your actual PRN here
  });
});

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
