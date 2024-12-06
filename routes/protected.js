const express = require("express");
const router = express.Router();
const { authenticateToken, authorizeLevel } = require("../middleware/auth");

// Route accessible by all authenticated users
router.get("/profile", authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// Route accessible by instructors and admins
router.get(
  "/course-management",
  authenticateToken,
  authorizeLevel(["instructor", "admin"]),
  (req, res) => {
    res.json({ message: "Course management access granted" });
  }
);

// Route accessible only by admins
router.get(
  "/user-management",
  authenticateToken,
  authorizeLevel(["admin"]),
  (req, res) => {
    res.json({ message: "User management access granted" });
  }
);

module.exports = router;
