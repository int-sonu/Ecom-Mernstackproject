import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../global/axios";

const ProductList = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      console.log(response.data);
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === "") {
      setFilteredProducts(products);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = products.filter(
        (product) =>
          product.product_name.toLowerCase().includes(query) ||
          (product.description &&
            product.description.toLowerCase().includes(query))
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  return (
    <div className="product-list p-4">
      {filteredProducts.length === 0 ? (
        <p className="text-center mt-10">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              onClick={() => navigate(`/product/${product._id}`)}
              className="px-4 py-2 bg-yellow-500 text-white font-medium rounded-md hover:bg-yellow-600 transition-all duration-300 shadow-sm min-w-[100px]"
            >
              <img
                src={`${api.defaults.baseURL}/uploads/${product.image}`}
                alt={product.product_name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="font-bold text-lg mb-2">{product.product_name}</h3>
              <p className="font-bold text-green-600 text-md">₹{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
