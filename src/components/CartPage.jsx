import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../global/axios";
import { UserContext } from "../context/UserContext";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const { fetchCartCount, adjustCartCount } = useContext(UserContext);

  const fetchCart = async () => {
    try {
      const res = await api.get("/user/cart/id");
      setCart(res.data?.[0]?.items || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart([]); 
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = Array.isArray(cart)
    ? cart.reduce(
        (acc, item) =>
          acc + (Number(item.quantity) || 0) * (Number(item.price) || 0),
        0
      )
    : 0;

  const handleIncrease = async (productId) => {
    const item = cart.find((i) => i.Product === productId);
    if (!item) return;

    if (item.quantity >= item.stock) {
      alert(`Only ${item.stock} ${item.product_name} available in stock!`);
      return;
    }

    try {
      await api.put(`/user/cart/${productId}`, { quantity: item.quantity + 1 });
      await fetchCart();
      adjustCartCount(1); 
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleDecrease = async (productId) => {
    const item = cart.find((i) => i.Product === productId);
    if (!item || item.quantity <= 1) return;

    try {
      await api.put(`/user/cart/${productId}`, { quantity: item.quantity - 1 });
      await fetchCart();
      adjustCartCount(-1); 
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const item = cart.find((i) => i.Product === productId);
      await api.delete(`/user/cart/${productId}`);
      await fetchCart(); 
      if (item) adjustCartCount(-item.quantity); 
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleCheckout = () => {
    
    if (cart.length === 0) {
      alert("Your cart is empty!");
      
      return;
      

    }
    navigate("/place-order", { state: { cart } });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 pt-40">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        My Cart ({cart.length})
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-center text-lg mt-12">
          Your cart is empty
        </p>
      ) : (
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-6">
            {cart.map((item) => (
              <div
                key={item.Product}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center justify-between gap-6"
              >
                <img
                  src={`${api.defaults.baseURL}/uploads/${item.image}`}
                  alt={item.product_name}
                  className="w-28 h-28 md:w-36 md:h-36 object-contain rounded"
                />

                <div className="flex-1 flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
                  <div className="flex-1">
                    <h2 className="font-semibold text-lg md:text-xl text-gray-800">
                      {item.product_name}
                    </h2>
                    <p className="text-gray-500">Price: ₹{item.price}</p>
                    <p className="text-gray-500">
                      Subtotal: ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                    {item.stock === 0 && (
                      <p className="text-red-500 font-semibold">Out of Stock</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-2 md:mt-0">
                    {item.stock > 0 && (
                      <>
                        <button
                          onClick={() => handleDecrease(item.Product)}
                          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition"
                        >
                          -
                        </button>

                        <span className="px-3 py-1 border rounded text-center w-12">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => handleIncrease(item.Product)}
                          disabled={item.quantity >= item.stock}
                          className={`px-3 py-1 rounded transition ${
                            item.quantity >= item.stock
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-gray-200 hover:bg-gray-300"
                          }`}
                        >
                          +
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => handleRemove(item.Product)}
                      className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-6 bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-xl font-semibold text-gray-800">Total:</div>
              <div className="text-2xl font-bold text-green-600">
                ₹{total.toFixed(2)}
              </div>
              <button
                onClick={handleCheckout}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
                CHECKOUT
              </button>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 w-full md:w-80 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              PRICE DETAILS
            </h2>

            <div className="flex justify-between text-gray-700 mb-2">
              <span>Price ({cart.length} items)</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <div className="border-t mt-3 pt-3 flex justify-between font-bold text-gray-900 text-lg">
              <span>Total Amount</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
