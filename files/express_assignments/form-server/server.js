const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.json({ success: false, error: 'All fields are required' });
  }

  // Simple email format check
  if (!email.includes('@')) {
    return res.json({ success: false, error: 'Invalid email format' });
  }

  // Success
  res.json({ 
    success: true, 
    message: 'Form submitted successfully!',
    data: { name, email, message }
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
