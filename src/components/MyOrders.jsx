import React, { useEffect, useState } from "react";
import api from "../global/axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/user/order");
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const res = await api.put(`/user/order/cancel/${orderId}`);
      alert(res.data.message);
      fetchOrders();
    } catch (err) {
      console.error("Failed to cancel order", err);
      alert(err.response?.data?.message || "Failed to cancel order");
    }
  };

  return (
    <div className="min-h-screen pt-35 px-6 md:px-12 bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-lg">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <p className={`font-semibold mb-4 ${
                order.order_status === "Cancelled" ? "text-red-500" :
                order.order_status === "Delivered" ? "text-green-600" : "text-blue-600"
              }`}>
                {order.order_status}
              </p>

              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item._id} className="flex items-center gap-4 border-b border-gray-200 pb-3">
                    {item.image && (
                      <img
                        src={`${api.defaults.baseURL}/uploads/${item.image}`}
                        alt={item.product_name}
                        className="w-24 h-24 object-cover rounded-lg border"
                      />
                    )}

                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-lg">{item.product_name}</p>
                      <p className="text-sm text-gray-500">
                       Price = ₹{item.price}<br></br>
                        Quantity:{item.quantity} = ₹{item.price * item.quantity}
                      </p>
                    </div>

                    {order.order_status !== "Cancelled" &&
                      order.order_status !== "Delivered" && (
                        <button
                          onClick={() => handleCancel(order._id)}
                          className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-4">
                <p className="text-lg font-semibold text-gray-800">
                  Total: ₹{order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
