import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../global/axios";
import { AdminContext } from "../context/AdminContext"; 
function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { adminLogin } = useContext(AdminContext); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await api.post("/admin/login", { email, password }, { withCredentials: true });

      console.log("Admin Login Response:", response.data);

      adminLogin(response.data.admin);

      setEmail("");
      setPassword("");
      setSuccess("Admin login successful!");

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1000);
    } catch (err) {
      console.error("Admin login failed:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Admin login failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center pt-40">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Admin Login
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && <p className="text-green-500 mb-4 text-center">{success}</p>}

        <label className="block mb-4 text-black-700">
          <span className="block text-left font-medium mb-1">Enter the Email</span>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </label>

        <label className="block mb-4 text-black-700">
          <span className="block text-left font-medium mb-1">Enter the Password</span>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
