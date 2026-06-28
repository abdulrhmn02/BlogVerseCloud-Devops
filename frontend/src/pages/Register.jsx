import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";
import FormWrapper from "../components/FormWrapper"; // Import FormWrapper
import Button from "../components/Button";
import Loader from "../components/Loader";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const res = await axios.post("/auth/register", form);
      toast.success("Registered successfully! Please login ✨", {
        position: "top-center",
        autoClose: 3000,
      });
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      setError(msg);
      toast.error(msg, {
        position: "top-center",
        autoClose: 3000,
      });
      
    }finally{
      setLoading(false);
    }
  };
  if (loading) return <Loader />;
  return (
    <FormWrapper title="Register">
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        {/* <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button> */}
        <Button type="submit">Register</Button>
      </form>
    </FormWrapper>
  );
}


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../api/axios";
// import { useAuth } from "../context/authContext";
// import { toast } from "react-toastify";
// import FormWrapper from "../components/FormWrapper";
// import Button from "../components/Button";
// import Loader from "../components/Loader"; // ✅ Import your Loader component

// export default function Register() {
//   const [form, setForm] = useState({ username: "", email: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false); // ✅ Loader state
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // ✅ Start loader
//     setError("");

//     try {
//       const res = await axios.post("/auth/register", form);
//       toast.success("Registered successfully! Please login ✨", {
//         position: "top-center",
//         autoClose: 3000,
//       });
//       navigate("/login");
//     } catch (err) {
//       const msg = err.response?.data?.message || "Something went wrong";
//       setError(msg);
//       toast.error(msg, {
//         position: "top-center",
//         autoClose: 3000,
//       });
//     } finally {
//       setLoading(false); // ✅ Stop loader
//     }
//   };

//   // ✅ Show loader while submitting
//   if (loading) return <Loader />;

//   return (
//     <FormWrapper title="Register">
//       {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={form.username}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border rounded"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border rounded"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border rounded"
//           required
//         />
//         <Button type="submit">Register</Button>
//       </form>
//     </FormWrapper>
//   );
// }