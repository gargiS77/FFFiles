CREATE DATABASE librarydb;
USE librarydb;

CREATE TABLE Books (
    BookID INT PRIMARY KEY,
    Title VARCHAR(100),
    Author VARCHAR(100),
    Genre VARCHAR(50),
    Available BOOLEAN
);

CREATE TABLE Members (
    MemberID INT PRIMARY KEY,
    Name VARCHAR(100),
    Email VARCHAR(100),
    Phone VARCHAR(15)
);

INSERT INTO Books (BookID, Title, Author, Genre, Available) VALUES
(1, 'Learn HTML', 'John Doe', 'Education', true),
(2, 'Harry Potter', 'J.K. Rowling', 'Fantasy', true),
(3, 'CSS Basics', 'Jane Smith', 'Education', false),
(4, 'The Hobbit', 'J.R.R. Tolkien', 'Fantasy', true),
(5, 'JS Guide', 'Mike', 'Programming', true);

INSERT INTO Members (MemberID, Name, Email, Phone) VALUES
(1, 'Alice', 'alice@test.com', '1234567890'),
(2, 'Bob', 'bob@test.com', '0987654321'),
(3, 'Charlie', 'charlie@test.com', '1122334455');

-- (a) available books
SELECT * FROM Books WHERE Available = true;

-- (b) update availability
UPDATE Books SET Available = false WHERE BookID = 1;

-- (c) delete member
DELETE FROM Members WHERE MemberID = 3;

-- (d) simple join to simulate borrow
SELECT M.Name AS Borrower, B.Title AS BorrowedBook 
FROM Members M 
JOIN Books B 
WHERE M.MemberID = 1 AND B.BookID = 3;
