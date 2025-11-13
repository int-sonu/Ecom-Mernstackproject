import { createContext, useState, useEffect } from "react";
import api from "../global/axios";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(
    () => Number(localStorage.getItem("cartCount")) || 0
  );

  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn") === "true";
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedLogin && storedUser) {
      setIsLoggedIn(true);
      setUser(storedUser);
      const storedCount = Number(localStorage.getItem("cartCount")) || 0;
      setCartCount(storedCount);
      setTimeout(fetchCartCount, 500);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get("/profile", { withCredentials: true });
      if (res.data?.user) {
        const fetchedUser = res.data.user;
        setUser(fetchedUser);
        setIsLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(fetchedUser));
        localStorage.setItem("isLoggedIn", true);
        fetchCartCount();
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchCartCount = async () => {
    if (!isLoggedIn) return;
    try {
      const res = await api.get("user/cart", { withCredentials: true });
      console.log(res.data)
      const items = res.data?.[0]?.items || [];
      const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalQty);
    } catch (err) {
      console.warn("Cart fetch failed once:", err?.response?.status || err.message);
    }
  };

  const adjustCartCount = (change) => {
    setCartCount((prev) => {
      const newCount = Math.max(prev + change, 0);
      return newCount;
    });
  };

  // Sign up success
  const signupSuccess = (userData) => {
    const cleanUser = {
      _id: userData._id,
      username: userData.username,
      email: userData.email,
      role: userData.role || "user",
    };

    setIsLoggedIn(true);
    setUser(cleanUser);
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("user", JSON.stringify(cleanUser));
    fetchCartCount();
    navigate("/login");
  };

  const login = (userData) => {
    const cleanUser = {
      _id: userData._id,
      username: userData.username,
      email: userData.email,
      role: userData.role || "user",
    };

    setIsLoggedIn(true);
    setUser(cleanUser);
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("user", JSON.stringify(cleanUser));
    fetchCartCount();
    navigate("/");
  };

  const canAddToCart = () => {
    if (!isLoggedIn || !user) {
      alert("Please login or register to add items to cart");
      navigate("/login");
      return false;
    }
    return true;
  };

  const updateUserProfile = async (updatedData) => {
    try {
      const res = await api.put("/profile", updatedData, {
        withCredentials: true,
      });

      if (res.data?.user) {
        const updatedUser = res.data.user;
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("Profile updated successfully!");
      } else {
        console.warn("Unexpected response from server:", res.data);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const logout = async () => {
    try {
      await api.delete("/logout", { withCredentials: true });
    } catch (err) {
      console.error("Logout failed:", err);
    }
    setIsLoggedIn(false);
    setUser(null);
    setCartCount(0);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("cartCount");
    navigate("/login");
  };

  useEffect(() => {
    localStorage.setItem("cartCount", cartCount);
  }, [cartCount]);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        signupSuccess,
        logout,
        cartCount,
        setCartCount,
        fetchCartCount,
        adjustCartCount,
        canAddToCart,
        fetchUser,
        updateUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
