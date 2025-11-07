import React, { useEffect, useState } from "react";
import { FaUsers, FaBoxOpen, FaClipboardList, FaRupeeSign } from "react-icons/fa";
import api from "../global/axios";

const AdminCards = () => {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/dashboard/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load dashboard stats:", err);
      }
    };
    fetchStats();
  }, []);

  const cardData = [
    { title: "Total Users", value: stats.users, icon: <FaUsers className="text-blue-500 text-4xl" />, gradient: "from-blue-500/20 to-blue-900/20" },
    { title: "Total Products", value: stats.products, icon: <FaBoxOpen className="text-green-500 text-4xl" />, gradient: "from-green-500/20 to-green-900/20" },
    { title: "Total Orders", value: stats.orders, icon: <FaClipboardList className="text-yellow-500 text-4xl" />, gradient: "from-yellow-500/20 to-yellow-900/20" },
    { title: "Total Revenue", value: `₹${stats.revenue.toLocaleString()}`, icon: <FaRupeeSign className="text-purple-500 text-4xl" />, gradient: "from-purple-500/20 to-purple-900/20" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Admin Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardData.map((card, i) => (
          <div key={i} className={`bg-gradient-to-br ${card.gradient} p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 font-medium">{card.title}</p>
                <h3 className="text-2xl font-bold mt-2">{card.value}</h3>
              </div>
              {card.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCards;
