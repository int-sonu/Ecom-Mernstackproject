import { createContext, useState } from "react";
import api from "../global/axios";
import { useNavigate } from "react-router-dom";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem("isAdminLoggedIn") === "true";
  });

  const [admin, setAdmin] = useState(() => {
    const storedAdmin = localStorage.getItem("admin");
    try {
      return storedAdmin && storedAdmin !== "undefined" ? JSON.parse(storedAdmin) : null;
    } catch (err) {
      console.error("Failed to parse admin from localStorage:", err);
      return null;
    }
  });

  const adminLogin = (adminData) => {
    setIsAdminLoggedIn(true);
    setAdmin(adminData);

    localStorage.setItem("isAdminLoggedIn", "true");
    localStorage.setItem("admin", JSON.stringify(adminData));
  };

  const adminLogout = async () => {
    try {
      await api.delete("/logout", { withCredentials: true });

      setIsAdminLoggedIn(false);
      setAdmin(null);

      localStorage.removeItem("isAdminLoggedIn");
      localStorage.removeItem("admin");

      navigate("/admin/login");
    } catch (err) {
      console.error("Admin logout failed:", err);
    }
  };

  return (
    <AdminContext.Provider value={{ isAdminLoggedIn, admin, adminLogin, adminLogout }}>
      {children}
    </AdminContext.Provider>
  );
};
