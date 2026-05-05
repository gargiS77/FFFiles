const express = require('express');
const Book = require('../models/Book');
const verifyToken = require('../middleware/authMiddleware'); // Import the auth middleware

const router = express.Router();

// GET: Get all books using Pagination and Filtering. (Public route - no login needed)
router.get('/', async (req, res) => {
  try {
    // --- Pagination ---
    // Extract page and limit from query parameters (e.g., /api/books?page=2&limit=5)
    const page = parseInt(req.query.page) || 1;    // default page is 1
    const limit = parseInt(req.query.limit) || 10; // default limit is 10 books per page
    const skip = (page - 1) * limit;               // calcualte how many books to skip

    // --- Filtering ---
    let filter = {}; // Empty filter means "find all"
    
    // If the user specified an 'author' query parameter, add it to the filter
    if (req.query.author) {
      // Using $regex to allow partial and case-insensitive matching (e.g., 'row' matches 'Rowling')
      filter.author = { $regex: req.query.author, $options: 'i' }; 
    }
    
    // If the user specified a 'genre' query parameter
    if (req.query.genre) {
      filter.genre = { $regex: req.query.genre, $options: 'i' };
    }

    // --- Fetch Data ---
    // Find books matching the filter, skip the required amount, and limit the result size
    const books = await Book.find(filter).skip(skip).limit(limit);
    
    // Count the total number of books that match our filter (useful for frontend pagination)
    const totalBooks = await Book.countDocuments(filter);

    // Send the response
    res.json({
      totalPages: Math.ceil(totalBooks / limit), // Calculate total number of pages
      currentPage: page,
      totalBooks: totalBooks,
      books: books
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST: Add a new book (Protected route - requires user to be logged in)
// Notice how 'verifyToken' is passed as the second argument.
router.post('/', verifyToken, async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json({ message: "Book added successfully!", book: newBook });
  } catch (error) {
    res.status(400).json({ message: "Failed to add book", error: error.message });
  }
});

// PUT: Update an existing book by its unique ID (Protected route)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    // Find the book by its ID and overwrite it with req.body
    // The { new: true } option ensures we get the updated book back in the response
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    
    res.json({ message: "Book updated successfully!", book: updatedBook });
  } catch (error) {
    res.status(400).json({ message: "Failed to update book", error: error.message });
  }
});

// DELETE: Remove a book by its unique ID (Protected route)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    
    res.json({ message: "Book deleted successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete book", error: error.message });
  }
});

module.exports = router;
