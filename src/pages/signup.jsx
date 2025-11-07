import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../global/axios";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await api.post("/register", { username, email, password });

      const userData = response.data.newUser || response.data.user || response.data;
      const userInfo = {
        _id: userData._id,
        username: userData.username,
        email: userData.email,
        role: userData.role || "user",
      };

      localStorage.setItem("user", JSON.stringify(userInfo));
      localStorage.removeItem("isLoggedIn"); 

      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center pt-20 min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Sign Up
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && <p className="text-green-500 mb-4 text-center">{success}</p>}

        <label className="block mb-4 text-black-700">
          <span className="block text-left font-medium mb-1">Name</span>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter your Username"
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </label>

        <label className="block mb-4 text-black-700">
          <span className="block text-left font-medium mb-1">Email</span>
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
          <span className="block text-left font-medium mb-1">Password</span>
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
          Sign Up
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-700 hover:underline font-semibold"
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
