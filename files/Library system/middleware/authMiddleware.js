const jwt = require('jsonwebtoken');

// Middleware to check if the user is authenticated
const verifyToken = (req, res, next) => {
  // Get the token from the "Authorization" header. 
  // It usually looks like this: "Bearer eyJhbGciOiJIUz..."
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  // Split "Bearer <token>" to extract just the token part
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: "Access denied. Invalid token format." });
  }

  try {
    // Verify the token using our secret key from the .env file
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user information to the request object so the next functions can use it
    req.user = decoded; 
    
    // Move to the next middleware or the actual route
    next(); 
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = verifyToken;
