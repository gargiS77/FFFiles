const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// POST: Register a new user
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // 2. Hash the password securely. '10' is the salt rounds (security level)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create a new user with the hashed password
    const newUser = new User({
      username: username,
      password: hashedPassword
    });

    // 4. Save to database
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST: Login an existing user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // 2. Compare the plain password with the hashed password in the DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // 3. Create a JSON Web Token (JWT) that will expire in 1 hour
    const token = jwt.sign(
      { id: user._id, username: user.username }, // Data we want to store in the token
      process.env.JWT_SECRET,                    // Secret key to sign it
      { expiresIn: '1h' }                        // Expiry time
    );

    // 4. Send the token back to the user
    res.json({ message: "Login successful", token: token });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
