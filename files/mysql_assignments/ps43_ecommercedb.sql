CREATE DATABASE ecommercedb;
USE ecommercedb;

CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    Name VARCHAR(100),
    Category VARCHAR(50),
    Price DECIMAL(10,2),
    Stock INT
);

CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    ProductID INT,
    Quantity INT,
    OrderDate DATE,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

INSERT INTO Products (ProductID, Name, Category, Price, Stock) VALUES
(1, 'Laptop', 'Electronics', 800.00, 10),
(2, 'Phone', 'Electronics', 500.00, 3),
(3, 'T-Shirt', 'Clothing', 20.00, 50),
(4, 'Jeans', 'Clothing', 40.00, 2),
(5, 'Apple', 'Food', 1.00, 100);

INSERT INTO Orders (OrderID, ProductID, Quantity, OrderDate) VALUES
(1, 1, 1, '2023-10-01'),
(2, 2, 2, '2023-10-15'),
(3, 4, 1, '2023-10-20');

-- (a) total revenue per category
SELECT P.Category, SUM(P.Price * O.Quantity) AS TotalRevenue
FROM Products P
JOIN Orders O ON P.ProductID = O.ProductID
GROUP BY P.Category;

-- (b) products with stock < 5
SELECT * FROM Products WHERE Stock < 5;

-- (c) orders in last 30 days
SELECT * FROM Orders WHERE OrderDate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY);
