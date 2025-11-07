import React, { useState, useEffect } from "react";
import api from "../global/axios";
import AdminDashboard from "../Admin/admindashboard";

const DisplayUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/admin/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);
const handleToggleStatus = async (userId, currentStatus) => {
  try {
    const newStatus = currentStatus === "Enable" ? "Disable" : "Enable";

    const endpoint =newStatus === "Enable"? `/admin/users/${userId}` : `/getupdateuser/${userId}`; 

    await api.put(endpoint, { status: newStatus });

    setUsers(prevUsers =>prevUsers.map(user =>
        user._id === userId ? { ...user, status: newStatus } : user
      )
    );
  } catch (error) {
    console.error("Error toggling user status:", error);
  }
};

const handleDelete = async (userId) => {
  if (!window.confirm("Are you sure you want to delete this user?")) return;

  try {
    await api.delete(`/admin/users/${userId}`);
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};


  return (
    <div>
      <AdminDashboard />
<section className="mt-24 ml-64 px-8 transition-all duration-300">
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
          Registered Users
        </h2>

        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 bg-white">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-[#334155] text-gray-200 uppercase text-sm">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Name</th>
                <th className="px-6 py-3 text-left font-semibold">Email</th>
                <th className="px-6 py-3 text-center font-semibold">Status</th>
                <th className="px-6 py-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-100 border-b border-gray-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-left capitalize">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status === "Enable"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() =>
                          handleToggleStatus(user._id, user.status)
                        }
                        className={`px-4 py-1.5 rounded text-white text-xs font-medium shadow-md ${
                          user.status === "Enable"
                            ? "bg-yellow-500 hover:bg-yellow-600"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {user.status === "Enable" ? "Disable" : "Enable"}
                      </button>

                      <button
                        onClick={() => handleDelete(user._id)}
                        className="px-4 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white text-xs font-medium shadow-md"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default DisplayUsers;
