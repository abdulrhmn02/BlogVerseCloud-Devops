import { useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../../components/FormWrapper"; // Import FormWrapper
import Button from "../../components/Button";
import { toast } from "react-toastify";

export default function CreateBlog() {
  const [form, setForm] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/blogs", { title: form.title, content: form.content });
      toast.success("Blog created successfully!");
      navigate("/blogs");
    } catch (err) {
      toast.error("Failed to create blog. Please try again.");
      alert("Failed to create blog");
    }
  };

  return (
    <FormWrapper title="Create New Blog">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={form.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <textarea
          name="content"
          placeholder="Write your blog content..."
          value={form.content}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded h-48"
          required
        />
        {/* <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Post Blog
        </button> */}
        <Button type="submit">Post Blog</Button>
      </form>
    </FormWrapper>
  );
}
