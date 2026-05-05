# 📚 Library Management API

Welcome to the Library Management API! This is a beginner-friendly Node.js and Express.js RESTful API that handles basic User Authentication and Book management (CRUD operations).

## 🗂️ Project Structure

The project has a very simple folder structure to keep things easy to understand:
- `index.js`: The main entry point of the server.
- `models/`: Defines how our data is structured in MongoDB (Book and User).
- `routes/`: Contains the different URL paths (like `/api/books`) and their logic.
- `middleware/`: Contains the specific function which checks if the user is safely logged in before performing secure actions.
- `.env`: Stores private configuration variables like passwords and secret keys.

## 🚀 How to Run the Project Locally

1. **Prerequisites**
   Before running this code, you need to have **Node.js** and **MongoDB** installed on your computer. Make sure that MongoDB is running locally on port 27017 (the default).

2. **Open the Terminal**
   Open your terminal/command prompt and make sure you are in this project's folder.

3. **Install Dependencies**
   Run the following command automatically install packages like Express, Mongoose, and JSONWebToken:
   ```bash
   npm install
   ```

4. **Start the Server**
   To start the API in development mode (which restarts automatically if you change a file), run:
   ```bash
   npm run dev
   ```
   Or to start it normally:
   ```bash
   node index.js
   ```

You should see messages in your console saying:
`🚀 Server is running at http://localhost:3000`
`✅ Successfully connected to MongoDB database!`

---

## 🧪 Testing the API

You can use a tool like **Postman** or **Thunder Client** inside VS Code to test these endpoints.

### 1. Authentication (Users)

#### Signup (Register a new user)
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/auth/signup`
- **Body (JSON):**
```json
{
  "username": "johndoe",
  "password": "mypassword123"
}
```

#### Login (Authenticate an existing user)
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/auth/login`
- **Body (JSON):**
```json
{
  "username": "johndoe",
  "password": "mypassword123"
}
```
**Response:** You will get a `token` back. Copy this token! You will need to put it in the **Authorization Header** as a **Bearer Token** to access protected routes.

---

### 2. Books Management

#### Add a New Book (Protected)
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/books`
- **Headers:** Authorization -> Bearer `<your-token-here>`
- **Body (JSON):**
```json
{
  "title": "Harry Potter and the Sorcerer's Stone",
  "author": "J.K. Rowling",
  "genre": "Fantasy",
  "year": 1997
}
```

#### Get All Books (Public - No Token Needed)
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/books`
- **What it does:** Returns all books with default pagination (Page 1, up to 10 limits).

#### Get All Books with Pagination & Filtering (Public)
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/books?page=1&limit=2&author=Rowling&genre=Fantasy`
- **What it does:** Gets only fantasy books written by someone named Rowling, limited to 2 items per page.

#### Update a Book (Protected)
- **Method:** `PUT`
- **URL:** `http://localhost:3000/api/books/<book_id>` *(replace `<book_id>` with an actual ID from MongoDB)*
- **Headers:** Authorization -> Bearer `<your-token-here>`
- **Body (JSON):**
```json
{
  "year": 1998,
  "genre": "Adventure"
}
```

#### Delete a Book (Protected)
- **Method:** `DELETE`
- **URL:** `http://localhost:3000/api/books/<book_id>`
- **Headers:** Authorization -> Bearer `<your-token-here>`

---

## 💾 Sample Book Data for Testing

If you want to quickly add some books using Postman, here are some sample JSON chunks you can copy and paste into your `POST` request bodies:

**Book 1:**
```json
{
  "title": "The Hobbit",
  "author": "J.R.R. Tolkien",
  "genre": "Fantasy",
  "year": 1937
}
```

**Book 2:**
```json
{
  "title": "To Kill a Mockingbird",
  "author": "Harper Lee",
  "genre": "Fiction",
  "year": 1960
}
```

**Book 3:**
```json
{
  "title": "1984",
  "author": "George Orwell",
  "genre": "Dystopian",
  "year": 1949
}
```
