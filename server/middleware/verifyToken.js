const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const verifyToken = (req, res, next) => {
  console.log('Middleware: verifyToken');
  const token = req.headers.authorization.split(' ')[1];; 
  console.log('Token:', token);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err); 
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    console.log('Decoded Token:', decoded); 
    req.userId = decoded.userId; // stick user id to request object
    next(); // send me on to protected route
  });
};

module.exports = verifyToken;
