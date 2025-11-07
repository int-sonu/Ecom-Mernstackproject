import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

function ProfilePage() {
  const { user, updateUserProfile } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUserProfile(formData);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </label>

        <label className="block mb-2">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded mt-3"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default ProfilePage;
