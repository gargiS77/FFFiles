// Using a relative path so it automatically talks to the backend running on the same port!
const API_URL = '/api';

// --- STEP 1: AUTHENTICATION CHECK ---
// Grab the token from localStorage.
const token = localStorage.getItem('token');

// If there is no token, it means the user isn't logged in. Redirect them!
if (!token) {
  window.location.href = 'login.html';
}

// Dom Elements
const logoutBtn = document.getElementById('logoutBtn');
const bookList = document.getElementById('bookList');
const addBookForm = document.getElementById('addBookForm');

// --- STEP 2: LOGOUT ---
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token'); // Delete the token to end the session
  window.location.href = 'login.html'; // Go back to the login screen
});

// --- STEP 3: FETCH AND DISPLAY BOOKS ---
async function fetchBooks() {
  try {
    const response = await fetch(`${API_URL}/books`); // Remember, GET is public in the API
    const data = await response.json();

    // Clear the "loading" text
    bookList.innerHTML = '';

    if (data.books.length === 0) {
      bookList.innerHTML = '<p>No books found. Add one above!</p>';
      return;
    }

    // Loop through each book we got from the API
    data.books.forEach(book => {
      // Create a div container for each book dynamically
      const bookDiv = document.createElement('div');
      bookDiv.className = 'book-card';
      
      // We pass the book._id (MongoDB ID) right into the delete/update buttons
      bookDiv.innerHTML = `
        <div class="book-info">
          <h3>${book.title}</h3>
          <p><strong>Author:</strong> ${book.author} | <strong>Genre:</strong> ${book.genre} | <strong>Year:</strong> ${book.year}</p>
        </div>
        <div class="book-actions">
          <button class="delete-btn" onclick="deleteBook('${book._id}')">Delete</button>
        </div>
      `;
      bookList.appendChild(bookDiv);
    });

  } catch (error) {
    bookList.innerHTML = '<p style="color:red;">Failed to load books. Is the backend running?</p>';
  }
}

// --- STEP 4: ADD A NEW BOOK ---
addBookForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('bookTitle').value;
  const author = document.getElementById('bookAuthor').value;
  const genre = document.getElementById('bookGenre').value;
  const year = document.getElementById('bookYear').value;

  try {
    const response = await fetch(`${API_URL}/books`, {
      method: 'POST', // POST creates new data
      headers: {
        'Content-Type': 'application/json',
        // EXTREMELY IMPORTANT: We append our JWT token to prove we have permission!
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ title, author, genre, year })
    });

    if (response.ok) {
      addBookForm.reset(); // Clear the form fields
      fetchBooks(); // Re-fetch the list so the new book appears!
    } else {
      const data = await response.json();
      alert("Failed to add book: " + data.message);
    }
  } catch (error) {
    console.error("Error adding book:", error);
  }
});

// --- STEP 5: DELETE A BOOK ---
// We attach this to `window` so it can be called from the inline HTML onclick="" attribute
window.deleteBook = async (bookId) => {
  // Show a standard confirmation popup
  if (!confirm("Are you sure you want to delete this book?")) return;

  try {
    const response = await fetch(`${API_URL}/books/${bookId}`, {
      method: 'DELETE', // DELETE removes data
      headers: {
        'Authorization': `Bearer ${token}` // Protect the route
      }
    });

    if (response.ok) {
      fetchBooks(); // Reload the list after deleting
    } else {
      const data = await response.json();
      alert("Failed to delete: " + data.message);
    }
  } catch (error) {
    console.error("Error deleting book:", error);
  }
};

// --- INITIALIZATION ---
// As soon as the page loads, fetch the books!
fetchBooks();
