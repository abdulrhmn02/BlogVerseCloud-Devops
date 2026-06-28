import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinkClass = (path) =>
    `block py-2 px-4 transition-colors duration-300 ${
      location.pathname === path
        ? "text-purple-400 font-semibold"
        : "text-gray-300 hover:text-purple-400"
    }`;

  return (
    <nav className="bg-gradient-to-r from-[#1A1A1A] to-[#2A1A2A] shadow-lg border-b border-gray-800 text-white shadow-md sticky top-0 z-50 rounded-lg mx-4 mt-4">
      <div className="w-full px-4 py-3 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2 text-xl font-bold text-purple-400">
  <img src="/favicon.png" alt="Logo" className="h-7 w-7 rounded-full" />
  BlogVerse
</Link>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-6">
          <Link to="/" className={navLinkClass("/")}>Home</Link>
          <Link to="/blogs" className={navLinkClass("/blogs")}>All Blogs</Link>
          {!user ? (
            <>
              <Link to="/register" className={navLinkClass("/register")}>Register</Link>
              <Link to="/login" className={navLinkClass("/login")}>Login</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className={navLinkClass("/dashboard")}>Dashboard</Link>
              <Link to="/blogs/create" className={navLinkClass("/blogs/create")}>Create Blog</Link>
              <button onClick={logout} className="text-red-400 hover:underline transition">Logout</button>
            </>
          )}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#121212] border-t border-gray-800">
          <div className="flex flex-col items-start p-4 gap-2">
            <Link to="/" className={navLinkClass("/")} onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/blogs" className={navLinkClass("/blogs")} onClick={() => setMenuOpen(false)}>All Blogs</Link>
            {!user ? (
              <>
                <Link to="/register" className={navLinkClass("/register")} onClick={() => setMenuOpen(false)}>Register</Link>
                <Link to="/login" className={navLinkClass("/login")} onClick={() => setMenuOpen(false)}>Login</Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className={navLinkClass("/dashboard")} onClick={() => setMenuOpen(false)}>Dashboard</Link>
                <Link to="/blogs/create" className={navLinkClass("/blogs/create")} onClick={() => setMenuOpen(false)}>Create Blog</Link>
                <button onClick={() => { logout(); setMenuOpen(false); }} className="text-red-400 hover:underline">Logout</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;



