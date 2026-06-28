import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import BlogCard from "../../components/BlogCard";
import Loader from "../../components/Loader"

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/blogs");
        setBlogs(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs.");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <Loader/>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 mt-6">
      <h2 className="text-2xl font-bold mb-6 text-center">All Blogs</h2>
      {blogs.length === 0 ? (
        <p className="text-center">No blogs found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
