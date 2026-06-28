import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios";
import Button from "../../components/Button";
import { toast } from "react-toastify";

export default function EditBlog() {
  const { id } = useParams();
  const [form, setForm] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/blogs/${id}`);
        setForm({ title: res.data.title, content: res.data.content });
      } catch (err) {
        toast.erroe("Failed to fetch a blog for editing");
        console.error("Error fetching blog for editing:", err);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/blogs/${id}`, form);
      toast.success("Blog updated successfully!");
      navigate(`/blogs/${id}`);
    } catch (err) {
      console.error("Error updating blog:", err);
      toast.error("Failed to update blog.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded h-48"
          required
        />

        <Button type="submit" variant="success">
          Update Blog
        </Button>
      </form>
    </div>
  );
}
