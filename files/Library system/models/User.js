const mongoose = require('mongoose');

// Define the blueprint for a User
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensures no two users can register with the same username
  },
  password: {
    type: String,
    required: true, // The password will be saved in a secure, hashed format
  }
});

module.exports = mongoose.model('User', userSchema);
