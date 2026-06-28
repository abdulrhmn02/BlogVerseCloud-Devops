const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const jwt = require("jsonwebtoken");

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// Routes
router.post("/", verifyToken, blogController.createBlog);
router.get("/", blogController.getAllBlogs);
router.get("/user", verifyToken, blogController.getUserBlogs);
router.get("/:id", blogController.getBlogById);
router.put("/:id", verifyToken, blogController.updateBlog);
router.delete("/:id", verifyToken, blogController.deleteBlog);

module.exports = router;
