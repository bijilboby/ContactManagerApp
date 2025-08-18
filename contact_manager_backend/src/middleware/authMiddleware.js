const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // Check if the header exists and starts with Bearer
  if( !authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied"  });
  }

  // Extract the token from the header
  const token = authHeader.split(" ")[1];

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid" });
    }
    req.user = user;
    next();
  });
};

module.exports = authMiddleware;
