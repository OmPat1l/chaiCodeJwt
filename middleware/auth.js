const jwt = require("jsonwebtoken");

const JWT_SECRET = "your-secret-key";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

const authorizeLevel = (allowedLevels) => {
  return (req, res, next) => {
    if (!req.user || !allowedLevels.includes(req.user.userLevel)) {
      return res.status(403).json({ message: "Insufficient permissions" });
    }
    next();
  };
};

module.exports = { authenticateToken, authorizeLevel, JWT_SECRET };
