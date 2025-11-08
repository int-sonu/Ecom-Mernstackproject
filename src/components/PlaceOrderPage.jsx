import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../global/axios";

const PlaceOrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const initialCart = location.state?.cart || [];
  const [cart, setCart] = useState(initialCart);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleConfirmOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      const res = await api.post("/user/order/create");

      if (res.status === 201) {
        alert("Order placed successfully!");
        console.log("Order response:", res.data);

        setCart([]);

        navigate("/myorders");
      } else {
        alert("Failed to place order. Please try again.");
        console.error("Order error response:", res.data);
      }
    } catch (error) {
      console.error("Order placement error:", error.response?.data || error.message);
      alert(` Failed to place order: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 pt-40">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Place Your Order
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-center">No items found in your cart.</p>
      ) : (
        <div className="bg-white shadow-lg rounded-xl p-6 space-y-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
            Order Summary
          </h2>

          {cart.map((item) => (
            <div
              key={item._id || item.Product}
              className="flex items-center justify-between border-b pb-3"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={`${api.defaults.baseURL}/uploads/${item.image}`}
                  alt={item.product_name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-medium text-gray-800">{item.product_name}</h3>
                  <p className="text-sm text-gray-600">
                    ₹{item.price} <br />
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
              <p className="font-semibold text-gray-900">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}

          <div className="flex justify-between font-semibold text-lg pt-4 border-t text-gray-900">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handleConfirmOrder}
            disabled={cart.length === 0}
            className={`w-full mt-6 py-3 rounded-lg text-lg text-white transition 
              ${cart.length === 0 ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
};

export default PlaceOrderPage;
