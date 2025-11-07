import React, { useEffect, useState } from "react";
import api from "../global/axios";
import AdminDashboard from "./admindashboard";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const fetchOrders = async () => {
    try {
      const res = await api.get("/admin/order");
      setOrders(res.data.orders);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Ordered":
        return "bg-yellow-500";
      case "Shipped":
        return "bg-blue-500";
      case "Delivered":
        return "bg-green-500";
      case "Cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const statusFlow = {
    Ordered: ["Shipped", "Cancelled"],
    Shipped: ["Delivered", "Cancelled"],
    Delivered: [],
    Cancelled: [],
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingStatus(orderId);
      await api.put(`/admin/order/${orderId}`, { status: newStatus });
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, order_status: newStatus } : o
        )
      );
    } catch {
      alert("Failed to update order status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const filteredOrders =
    filterStatus === "All"
      ? orders
      : orders.filter((o) => o.order_status === filterStatus);

  const indexOfLast = currentPage * ordersPerPage;
  const indexOfFirst = indexOfLast - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  const filterButtons = ["All", "Ordered", "Shipped", "Delivered", "Cancelled"];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminDashboard />
      <div className="ml-64 flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 tracking-wide">
            Orders
          </h1>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          {filterButtons.map((status) => (
            <button
              key={status}
              onClick={() => {
                setFilterStatus(status);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                filterStatus === status
                  ? "bg-slate-800 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-200">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-slate-800 text-gray-100 text-left text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Items</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Ordered Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Change Status</th>
              </tr>
            </thead>

            <tbody>
              {currentOrders.map((order, index) => {
                const total = order.items.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0
                );
                const currentStatus = order.order_status;
                const nextStatuses = statusFlow[currentStatus] || [];
                const isFinal =
                  currentStatus === "Delivered" || currentStatus === "Cancelled";

                return (
                  <tr
                    key={order._id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } border-t hover:bg-gray-100 transition`}
                  >
                    <td className="px-6 py-3 font-medium text-gray-800">
                      {order.user?.username || order.user?.email || "Guest"}
                    </td>

                    <td className="px-6 py-3 space-y-1">
                      {order.items.map((item, i) => (
                        <div key={i} className="text-gray-600">
                          {item.product_name}
                        </div>
                      ))}
                    </td>

                    <td className="px-6 py-3 space-y-1 font-semibold text-gray-800">
                      {order.items.map((item, i) => (
                        <div key={i}>{item.quantity}</div>
                      ))}
                    </td>

                    <td className="px-6 py-3 font-semibold text-gray-800">
                      ₹{total.toFixed(2)}
                    </td>

                    <td className="px-6 py-3 text-gray-700">
                      {new Date(order.order_date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td className="px-6 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${getStatusColor(
                          currentStatus
                        )}`}
                      >
                        {currentStatus}
                      </span>
                    </td>

                    <td className="px-6 py-3">
                      <select
                        value={currentStatus}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        disabled={updatingStatus === order._id || isFinal}
                        className={`border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                          isFinal
                            ? "opacity-50 cursor-not-allowed bg-gray-100"
                            : "bg-white hover:border-blue-400"
                        }`}
                      >
                        <option value={currentStatus}>{currentStatus}</option>
                        {["Ordered", "Shipped", "Delivered", "Cancelled"].map(
                          (status) => (
                            <option
                              key={status}
                              value={status}
                              disabled={
                                !nextStatuses.includes(status) ||
                                status === currentStatus
                              }
                              className={
                                !nextStatuses.includes(status)
                                  ? "text-gray-400"
                                  : "text-gray-800"
                              }
                            >
                              {status}
                            </option>
                          )
                        )}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {currentOrders.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No orders found for {filterStatus}.
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-sm disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded-md text-sm ${
                  currentPage === i + 1
                    ? "bg-slate-800 text-white shadow-md"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
