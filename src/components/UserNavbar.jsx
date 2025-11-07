import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { assets } from "../assets/assets";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/profile", {
          withCredentials: true, 
        });
        setUser(res.data);
      } catch (error) {
        console.error("User not logged in or error fetching profile");
      }
    };

    fetchUser();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-8 py-4">

        <div className="flex items-center space-x-2">
          <img src={assets.logo_icon} alt="Logo" className="w-10" />
          <span className="text-2xl font-serif italic text-gray-800">Neva</span>
        </div>

        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/category/formal">Categories</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>

        <div className="flex items-center space-x-4">
          {user ? (
            <p className="text-gray-700 font-medium">
              Hi, <span className="text-pink-600">{user.username}</span> 👋
            </p>
          ) : (
            <Link
              to="/login"
              className="bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
