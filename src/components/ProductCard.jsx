import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="bg-white p-4 rounded-xl shadow hover:shadow-lg cursor-pointer transition-all duration-300"
    >
      <img
        src={`http://localhost:3000/uploads/${product.image}`}
        alt={product.product_name}
        className="w-full h-30 object-contain mb-3 rounded-md"
      />
      <h2 className="text-lg font-semibold text-gray-800">
        {product.product_name}
      </h2>
      <p className="text-sm text-black-500">Product Brand: {product.product_brand}</p>
      <p className="text-xl font-bold text-green-600 mt-2">₹{product.price}</p>
    </div>
  );
};

export default ProductCard;
