require('dotenv').config(); // Load environment variables from .env file into process.env
const express = require('express');
const mongoose = require('mongoose');

// Import our custom route handlers
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

// Initialize the Express application
const app = express();
// Use the PORT from the .env file, or default to 3000 if not found
const PORT = process.env.PORT || 3000;

const cors = require('cors'); // Import CORS middleware

// This built-in middleware allows our app to read JSON data sent in the request body
app.use(express.json());
// Allow cross-origin requests from our frontend
app.use(cors());

// Connect to MongoDB using Mongoose
// Mongoose is a popular library that makes working with MongoDB extremely easy in Node.js
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Successfully connected to MongoDB database!");
  })
  .catch((error) => {
    console.log("❌ Error connecting to MongoDB:", error.message);
  });

// Serve static files from the "frontend" directory
// Now, if you go to http://localhost:3000, it will load index.html from the frontend folder!
app.use(express.static('frontend'));

// Link up our route handlers
// Any web request that starts with '/api/auth' will go to the authRoutes
app.use('/api/auth', authRoutes);

// Any web request that starts with '/api/books' will go to the bookRoutes
app.use('/api/books', bookRoutes);

// Start listening for incoming requests!
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
