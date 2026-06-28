import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../components/Loader";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const[loading , setLoading] = useState(false);
  const navigate = useNavigate(); // Add this

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    toast.success(`Welcome back, ${userData.username || "user"}!`);
    navigate("/dashboard");
  };

  const logout = () => {
    setLoading(true); // ✅ Show loader
    setTimeout(() => {
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      toast.info("You have been logged out!");
      setLoading(false); // ✅ Hide loader
      navigate("/login");
    }, 1000); // Simulate slight delay (optional)
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {loading ? <Loader /> : children} {/* ✅ Conditional rendering */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);