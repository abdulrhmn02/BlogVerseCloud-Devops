import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Button from "../../components/Button"
import Loader from "../../components/Loader"

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/blogs/${id}`);
        setBlog(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Blog not found.");
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      navigate("/blogs");
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  if (loading)
    return <Loader/>
  if (error)
    return <p className="text-center mt-4 text-red-400 font-medium">{error}</p>;
  if (!blog) return null;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-[#1A1A1A] text-gray-200 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-white mb-3">{blog.title}</h1>
      <p className="text-sm text-gray-400 mb-6">
        by {blog.author?.username || "Unknown Author"}
      </p>
      <div className="prose prose-invert max-w-none text-gray-300 mb-8">
        <p>{blog.content}</p>
      </div>

      {/* {user?.userId === blog.author?._id && (
        <div className="flex gap-4">
          <Link
            to={`/blogs/edit/${id}`}
            className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded transition"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded transition"
          >
            Delete
          </button>
        
        </div>
      )} */}
    </div>
  );
};

export default BlogDetails;
