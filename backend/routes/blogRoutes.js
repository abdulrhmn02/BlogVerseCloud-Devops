// // module.exports = router;
// const express = require("express");
// const router = express.Router();
// const Blog = require("../models/Blog");
// const jwt = require("jsonwebtoken");

// // Middleware to verify token
// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Access Denied" });

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ message: "Invalid token" });
//     req.user = user;
//     next();
//   });
// };

// // CREATE a blog (Protected)
// router.post("/", verifyToken, async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const newBlog = new Blog({
//       title,
//       content,
//       author: req.user.userId,
//     });

//     const savedBlog = await newBlog.save();
//     res.status(201).json(savedBlog);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // GET all blogs (Public)
// router.get("/", async (req, res) => {
//   try {
//     const blogs = await Blog.find().populate("author", "username email");
//     // console.log(blogs); 
//     res.json(blogs);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


//   // GET blogs of logged-in user (Protected)
//   router.get("/user", verifyToken, async (req, res) => {
//     try {
//       const blogs = await Blog.find({ author: req.user.userId }).populate("author", "username email");
//       res.json(blogs);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });

// // GET blog by ID (Public)
// router.get("/:id", async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id).populate("author", "username email");
//     if (!blog) return res.status(404).json({ message: "Blog not found" });
//     res.json(blog);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // UPDATE blog (Protected + Only author)
// router.put("/:id", verifyToken, async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);
//     if (!blog) return res.status(404).json({ message: "Blog not found" });

//     if (blog.author.toString() !== req.user.userId)
//       return res.status(403).json({ message: "You can only update your own blog" });

//     const { title, content } = req.body;
//     blog.title = title || blog.title;
//     blog.content = content || blog.content;

//     const updatedBlog = await blog.save();
//     res.json(updatedBlog);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // DELETE blog (Protected + Only author)
// router.delete("/:id", verifyToken, async (req, res) => {
//     try {
//       const blog = await Blog.findById(req.params.id);
//       if (!blog) return res.status(404).json({ message: "Blog not found" });
  
//       if (blog.author.toString() !== req.user.userId)
//         return res.status(403).json({ message: "You can only delete your own blog" });
  
//       await Blog.findByIdAndDelete(req.params.id);  // ✅ Correct way
//       res.json({ message: "Blog deleted successfully" });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });






// module.exports = router;




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
