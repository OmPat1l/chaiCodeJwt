const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { JWT_SECRET } = require("../middleware/auth");
const db = require("../db.json");

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = db.users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      userLevel: user.userLevel,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

module.exports = router;
