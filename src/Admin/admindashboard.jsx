import React, { useState, useContext } from "react";
import { VscAccount } from "react-icons/vsc";
import { BsBriefcaseFill, BsFillBoxFill } from "react-icons/bs";
import { FaCartShopping } from "react-icons/fa6";
import { FiMenu, FiHome, FiUsers, FiLogOut } from "react-icons/fi";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { adminLogout, admin } = useContext(AdminContext);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await adminLogout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="fixed flex justify-between items-center top-0 left-0 right-0 w-screen h-20 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0c46a4] shadow-lg px-6 py-3 z-50 border-b border-gray-700">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="text-white mr-4 hover:text-blue-400">
            <FiMenu size={22} />
          </button>
          <img className="w-22 h-22" src={assets.logo_icon1} alt="logo not found" />
          <p className="text-3xl italic font-serif text-white mx-4 tracking-wide">Neva</p>
        </div>

        <div className="mr-20 flex justify-center items-center gap-2 hover:text-blue-400 transition-colors cursor-pointer">
          <VscAccount className="text-gray-200 text-2xl" />
          <p className="text-sm text-white font-medium">
            {admin?.name || "Admin"}
          </p>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-20 left-0 h-[100vh] bg-[#0f172a] text-gray-300 border-r border-gray-700 transition-all duration-300 ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        

          <Link to="/admin/DisplayUsers">
            <div className="flex items-center gap-4 px-6 py-3 hover:bg-blue-500/20 cursor-pointer transition-all">
              <FiUsers size={20} />
              {isOpen && <p className="text-sm">Users</p>}
            </div>
          </Link>

          <Link to="/admin/CategoryDisplay">
            <div className="flex items-center gap-4 px-6 py-3 hover:bg-blue-500/20 cursor-pointer transition-all">
              <BsBriefcaseFill size={20} />
              {isOpen && <p className="text-sm">Category</p>}
            </div>
          </Link>

          <Link to="/admin/ProductDisplay">
            <div className="flex items-center gap-4 px-6 py-3 hover:bg-blue-500/20 cursor-pointer transition-all">
              <BsFillBoxFill size={20} />
              {isOpen && <p className="text-sm">Products</p>}
            </div>
          </Link>

          <Link to="/admin/orders">
            <div className="flex items-center gap-4 px-6 py-3 hover:bg-blue-500/20 cursor-pointer transition-all">
              <FaCartShopping size={20} />
              {isOpen && <p className="text-sm">Orders</p>}
            </div>
          </Link>

          <div
            onClick={handleLogout}
            className="flex items-center gap-4 px-6 py-3 hover:bg-red-500/20 cursor-pointer transition-all mt-auto"
          >
            <FiLogOut size={20} />
            {isOpen && <p className="text-sm">Logout</p>}
          </div>
        </div>
    </>
  );
};

export default AdminDashboard;
