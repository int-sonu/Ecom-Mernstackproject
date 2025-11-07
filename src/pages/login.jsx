import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../global/axios";
import { UserContext } from "../context/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, fetchCartCount } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/login", { email, password });
      const userData =
        response.data.user || response.data.newUser || response.data;

      const cleanUser = {
        _id: userData._id,
        username: userData.username,
        email: userData.email,
        role: userData.role || "user",
        status: userData.status || "Enable",
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt,
      };

      login(cleanUser);
      await fetchCartCount(cleanUser._id);
      navigate("/homepage");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center pt-40 min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

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

export default Login;
