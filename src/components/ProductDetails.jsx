import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../global/axios";
import { UserContext } from "../context/UserContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn, setCartCount } = useContext(UserContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        Loading product details...
      </div>
    );

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    try {
      const res = await api.post(`/user/cart/${product._id}`, { quantity: 1 });
      console.log("Added to cart:", res.data);
      setCartCount((prev) => prev + 1);
      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleNotifyMe = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    alert("You will be notified when this product is back in stock!");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-5 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden">
        <div className="md:w-1/2 bg-gray-50 flex flex-col items-center justify-center p-6">
          <div className="border rounded-lg shadow-sm bg-white p-4">
            <img
              src={`http://localhost:3000/uploads/${product.image}`}
              alt={product.product_name}
              className="w-72 h-72 object-contain"
            />
          </div>
        </div>

        <div className="md:w-1/2 p-8 flex flex-col justify-center space-y-3">
          <h1 className="text-2xl font-bold text-gray-800">
            {product.product_name}
          </h1>

          {product.Category && (
            <p className="text-black text-lg font-semibold">
              Category:{" "}
              <span className="font-bold text-black">
                {product.Category.categoryname}
              </span>
            </p>
          )}

          <p className="text-gray-500 text-sm">{product.product_brand}</p>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-3xl font-semibold text-green-600">
              ₹{product.price}
            </span>
          </div>

          <p className="text-gray-700 text-sm leading-relaxed">
            {product.product_description}
          </p>

          <div className="border-t pt-3 mt-3 text-sm text-gray-600">
            <p>
              <strong>Available offers:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 mt-1">
              <li>5% cashback on Axis Bank Card</li>
              <li>₹50 off on Bajaj Finserv EMI Card</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-start">
            {product.stock > 0 ? (
              <button
                onClick={handleAddToCart}
                className="px-4 py-2 bg-yellow-500 text-white font-medium rounded-md hover:bg-yellow-600 transition-all duration-300 shadow-sm min-w-[100px]"
              >
                Add to Cart
              </button>
            ) : (
              <button
                onClick={handleNotifyMe}
                className="px-4 py-2 bg-yellow-500 text-white font-medium rounded-md cursor-not-allowed min-w-[100px]"
              >
                Notify Me
              </button>
            )}
          </div>

          {!isLoggedIn && (
            <p className="mt-3 text-red-500 text-sm">
              You must <span className="font-semibold">login</span> to add to
              cart or buy.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
