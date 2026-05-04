CREATE DATABASE companydb;
USE companydb;

CREATE TABLE Employees (
    EmpID INT PRIMARY KEY,
    Name VARCHAR(100),
    Department VARCHAR(50),
    Salary DECIMAL(10,2),
    JoiningDate DATE
);

INSERT INTO Employees (EmpID, Name, Department, Salary, JoiningDate) VALUES
(1, 'Alice', 'IT', 60000, '2022-01-15'),
(2, 'Bob', 'IT', 45000, '2022-05-20'),
(3, 'Charlie', 'HR', 40000, '2021-08-10'),
(4, 'David', 'HR', 55000, '2020-11-25'),
(5, 'Eve', 'Finance', 80000, '2019-03-05');

-- (a) GROUP BY → avg salary per dept
SELECT Department, AVG(Salary) AS AvgSalary 
FROM Employees 
GROUP BY Department;

-- (b) HAVING → avg > 50000
SELECT Department, AVG(Salary) AS AvgSalary 
FROM Employees 
GROUP BY Department 
HAVING AVG(Salary) > 50000;

-- (c) ORDER BY → top 3 salaries
SELECT * FROM Employees 
ORDER BY Salary DESC 
LIMIT 3;

-- (d) LIKE → names starting with A
SELECT * FROM Employees 
WHERE Name LIKE 'A%';

-- (e) BETWEEN → joining date range
SELECT * FROM Employees 
WHERE JoiningDate BETWEEN '2021-01-01' AND '2022-12-31';
