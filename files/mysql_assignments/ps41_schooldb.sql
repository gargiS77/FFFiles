CREATE DATABASE schooldb;
USE schooldb;

CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    Name VARCHAR(100),
    Email VARCHAR(100),
    Class VARCHAR(50)
);

CREATE TABLE Marks (
    MarkID INT PRIMARY KEY,
    StudentID INT,
    Subject VARCHAR(50),
    Score INT,
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID)
);

INSERT INTO Students (StudentID, Name, Email, Class) VALUES
(1, 'Alice', 'alice@test.com', '10th'),
(2, 'Bob', 'bob@test.com', '10th'),
(3, 'Charlie', 'charlie@test.com', '10th'),
(4, 'David', 'david@test.com', '10th'),
(5, 'Eve', 'eve@test.com', '10th');

INSERT INTO Marks (MarkID, StudentID, Subject, Score) VALUES
(1, 1, 'Math', 85), (2, 1, 'Science', 90), (3, 1, 'English', 80),
(4, 2, 'Math', 35), (5, 2, 'Science', 45), (6, 2, 'English', 50),
(7, 3, 'Math', 95), (8, 3, 'Science', 85), (9, 3, 'English', 88),
(10, 4, 'Math', 40), (11, 4, 'Science', 30), (12, 4, 'English', 55),
(13, 5, 'Math', 60), (14, 5, 'Science', 65), (15, 5, 'English', 70);

-- (a) total score per student
SELECT StudentID, SUM(Score) AS TotalScore 
FROM Marks 
GROUP BY StudentID;

-- (b) top scorer
SELECT StudentID, SUM(Score) AS TotalScore 
FROM Marks 
GROUP BY StudentID 
ORDER BY TotalScore DESC 
LIMIT 1;

-- (c) students scoring below 40 in any subject
SELECT DISTINCT StudentID 
FROM Marks 
WHERE Score < 40;
