// Setting a constant for our backend URL
// Using a relative path '/api' means it will automatically use the same port as the frontend!
const API_URL = '/api';

// Find the form elements if they exist on the current page
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const errorMessage = document.getElementById('errorMessage');

// --- HANDLE LOGIN ---
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Stops the page from reloading
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      // Basic fetch syntax for a POST request
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json(); // Transform the response into a JS object

      if (response.ok) {
        // If login is successful, save the token the server sent us
        // localStorage acts like a mini-database in the user's browser
        localStorage.setItem('token', data.token);
        
        // Redirect the user to the main dashboard page
        window.location.href = 'index.html';
      } else {
        // If it fails (e.g. wrong password), show the error
        errorMessage.innerText = data.message;
      }
    } catch (error) {
      errorMessage.innerText = "Error connecting to the server.";
    }
  });
}

// --- HANDLE SIGNUP ---
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account created successfully! Please login.");
        // Redirect to login page after successful signup
        window.location.href = 'login.html';
      } else {
        errorMessage.innerText = data.message;
      }
    } catch (error) {
      errorMessage.innerText = "Error connecting to the server.";
    }
  });
}
