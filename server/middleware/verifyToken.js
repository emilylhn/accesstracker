const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];; 

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err); 
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    req.userId = decoded.userId; 
    next(); 
  });
};

module.exports = verifyToken;
