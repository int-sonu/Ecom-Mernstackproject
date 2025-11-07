import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { assets } from "../assets/assets";
import { IoIosSearch } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import { FaShoppingCart, FaSignInAlt, FaUserPlus, FaClipboardList, FaUserEdit } from "react-icons/fa"; 
import api from "../global/axios";
const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoggedIn, logout, user, cartCount } = useContext(UserContext);
 const[count,setCartCount]=useState('')
  const navigate = useNavigate();

  const fetchCartCount = async () => {
    try {
      if (isLoggedIn) {
        const res = await api.get("/user/cart/id");
        const items = res.data[0]?.items || [];
        const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(totalQty);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.log("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, [isLoggedIn]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchQuery.trim() !== "") {
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        setSearchQuery("");
      }
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 flex justify-center items-center bg-black h-10 z-50">
        <p className="text-white text-sm font-semibold">
          Sign Up and get 20% off on your first order
        </p>
      </div>

      {/* Navbar */}
      <div className="fixed top-10 left-0 right-0 flex justify-between items-center bg-white h-20 border-b border-gray-200 px-10 shadow z-40">
        {/* Logo */}
        <div className="flex items-center">
          <img className="w-20" src={assets.logo_icon} alt="logo" />
          <p className="text-5xl italic font-serif text-black ml-2">Neva</p>
        </div>

        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-pink-500 transition-colors">Home</Link>
          <Link to="/about" className="hover:text-pink-500 transition-colors">About Us</Link>
          <Link to="/" className="hover:text-pink-500 transition-colors">Categories</Link>
        </div>

        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full w-72 border border-black">
          <IoIosSearch className="text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="bg-transparent focus:outline-none text-sm text-gray-700 w-full"
          />
        </div>

        <div className="flex items-center gap-4 text-sm font-medium">
          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-2 text-gray-800 font-semibold">
                <VscAccount className="text-xl" />
                <span>Hello, {user?.username || "User"}</span>
              </div>

             

              <Link
                to="/myorders"
                className="flex items-center gap-1 text-black hover:text-pink-500 transition-colors"
              >
                <FaClipboardList />
                My Orders
              </Link>

              <button
                onClick={logout}
                className="flex items-center gap-1 text-red-500 hover:text-red-600 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-1 text-gray-700 hover:text-pink-500 transition-colors"
              >
                <FaSignInAlt />
                Login
              </Link>

              <Link
                to="/signup"
                className="flex items-center gap-1 text-gray-700 hover:text-pink-500 transition-colors"
              >
                <FaUserPlus />
                Sign Up
              </Link>
            </>
          )}

          <Link
            to="/cart"
            className="flex items-center gap-1 text-gray-700 hover:text-pink-500 transition-colors relative"
          >
            <FaShoppingCart className="text-xl" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
