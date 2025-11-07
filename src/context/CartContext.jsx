import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../global/axios"; 

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const fetchCart = async () => {
    try {
      const res = await api.get("/user/cart/id");
      const items = res.data[0]?.items || [];
      setCart(items);
      const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalQty);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId) => {
    try {
      const productRes = await api.get(`/admin/products/${productId}`);
      const product = productRes.data;

      const existingItem = cart.find((item) => item.Product === productId);

      if (existingItem) {
        if (existingItem.quantity >= product.stock) {
          alert("Cannot add more, product is out of stock!");
          return; 
        }
      } else {
        if (product.stock <= 0) {
          alert("Product is out of stock!");
          return;
        }
      }

      const res = await api.post("/user/cart/add", { productId, quantity: 1 });
      const updatedCart = res.data.cart?.items || [];
      setCart(updatedCart);

      const totalQty = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalQty);

    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, cartCount, fetchCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
