const mongoose = require('mongoose');

// A Schema is like a blueprint for our data in MongoDB.
// It defines the properties each "Book" document should have.
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // This field is mandatory
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  }
});

// Create and export the "Book" model.
// A Model is a wrapper around the schema that allows us to interact with the database.
module.exports = mongoose.model('Book', bookSchema);
