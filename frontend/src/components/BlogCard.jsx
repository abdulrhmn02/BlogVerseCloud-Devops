import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-[#1E1E1E] text-gray-200 rounded-lg p-5 shadow-lg hover:shadow-xl transition duration-300">
      <h3 className="text-2xl font-semibold text-white hover:text-purple-400 transition">
        <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
      </h3>
      <p className="text-sm text-gray-400 mt-1">
        by {blog.author?.username || "Unknown Author"}
      </p>
      <p className="text-sm text-gray-300 mt-3">
        {blog.content.length > 150
          ? blog.content.slice(0, 150) + "..."
          : blog.content}
      </p>
      <Link
        to={`/blogs/${blog._id}`}
        className="inline-block mt-4 text-sm text-purple-400 hover:underline transition"
      >
        Read More →
      </Link>
    </div>
  );
};

export default BlogCard;
