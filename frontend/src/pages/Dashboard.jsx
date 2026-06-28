// import React, { useEffect, useState } from "react";
// import axios from "../api/axios";
// import { Link, useNavigate } from "react-router-dom";
// import Button from "../components/Button";
// import Loader from '../components/Loader'

// const Dashboard = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchUserBlogs = async () => {
//       try {
//         const res = await axios.get("/blogs/user", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setBlogs(res.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching user's blogs:", err);
//         setError("Failed to load your blogs.");
//         setLoading(false);
//       }
//     };

//     fetchUserBlogs();
//   }, [token]);

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`/blogs/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setBlogs((prev) => prev.filter((blog) => blog._id !== id));

//     } catch (err) {
//       console.error("Error deleting blog:", err);
//       alert("Failed to delete blog.");
//     }
//   };

//   if (loading) return <Loader/>;
//   if (error) return <p className="text-center mt-4 text-red-400">{error}</p>;

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-4 text-gray-200">
//       <h2 className="text-3xl font-bold mb-6 text-white">Your Blogs</h2>
//       {blogs.length === 0 ? (
//         <p className="text-gray-400">You have not created any blogs yet.</p>
//       ) : (
//         blogs.map((blog) => (
//           <div
//             key={blog._id}
//             className="bg-[#1E1E1E] rounded-md p-5 shadow-md mb-6"
//           >
//             <Link
//               to={`/blogs/${blog._id}`}
//               className="text-2xl font-semibold text-purple-400 hover:underline"
//             >
//               {blog.title}
//             </Link>
//             <p className="text-sm text-gray-400 mt-1">
//               by {blog.author?.username || "Unknown Author"}
//             </p>
//             <p className="mt-3 text-gray-300 text-sm">
//               {blog.content.length > 150
//                 ? blog.content.slice(0, 150) + "..."
//                 : blog.content}
//             </p>
//             <div className="mt-4 flex gap-4">
//               {/* <button
//                 onClick={() => navigate(`/blogs/${blog._id}/edit`)}
//                 className="text-sm text-yellow-400 hover:underline"
//               >
//                 Edit
//               </button> */}
//               <Button
//   onClick={() => navigate(`/blogs/${blog._id}/edit`)}
//   variant="warning" // add this to support yellow buttons
//   className="text-sm"
// >
//   Edit
// </Button>
//               {/* <button
//                 onClick={() => handleDelete(blog._id)}
//                 className="text-sm text-red-400 hover:underline"
//               >
//                 Delete
//               </button> */}
//               <Button variant="danger" onClick={handleDelete}>
//   Delete
// </Button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Dashboard;



import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Loader from "../components/Loader";
import ConfirmModal from "../components/ConfirmModal";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const res = await axios.get("/blogs/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user's blogs:", err);
        setError("Failed to load your blogs.");
        setLoading(false);
      }
    };

    fetchUserBlogs();
  }, [token]);

  const deleteConfirmedBlog = async (id) => {
    try {
      await axios.delete(`/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      toast.success("Blog deleted successfully!");
    } catch (err) {
      console.error("Error deleting blog:", err);
      toast.error("Failed to delete blog.");
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-center mt-4 text-red-400">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 text-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-white">Your Blogs</h2>
      {blogs.length === 0 ? (
        <p className="text-gray-400">You have not created any blogs yet.</p>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-[#1E1E1E] rounded-md p-5 shadow-md mb-6"
          >
            <Link
              to={`/blogs/${blog._id}`}
              className="text-2xl font-semibold text-purple-400 hover:underline"
            >
              {blog.title}
            </Link>
            <p className="text-sm text-gray-400 mt-1">
              by {blog.author?.username || "Unknown Author"}
            </p>
            <p className="mt-3 text-gray-300 text-sm">
              {blog.content.length > 150
                ? blog.content.slice(0, 150) + "..."
                : blog.content}
            </p>
            <div className="mt-4 flex gap-4">
              <Button
                onClick={() => navigate(`/blogs/${blog._id}/edit`)}
                variant="warning"
                className="text-sm"
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  setSelectedBlogId(blog._id);
                  setShowConfirm(true);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        ))
      )}

      <ConfirmModal
        isOpen={showConfirm}
        message="Are you sure you want to delete this blog?"
        onCancel={() => {
          setShowConfirm(false);
          setSelectedBlogId(null);
        }}
        onConfirm={() => {
          deleteConfirmedBlog(selectedBlogId);
          setShowConfirm(false);
          setSelectedBlogId(null);
        }}
      />
    </div>
  );
};

export default Dashboard;