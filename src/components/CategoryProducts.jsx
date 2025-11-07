import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../global/axios";
import ProductCard from "./ProductCard";
import Footer from "./Footer";

const CategoryProducts = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // default sort

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await api.get(
          `/user/products/category/${categoryId}?sortBy=${sortBy}`
        );
        setProducts(response.data.products);

        const categoryRes = await api.get(`/categories/${categoryId}`);
        setCategoryName(categoryRes.data.categoryname);
      } catch (error) {
        console.log("Error fetching category products:", error);
      }
    };

    fetchCategoryProducts();
  }, [categoryId, sortBy]); // re-fetch when sort changes

 return (
  <>
    <div className="pt-[120px] px-6 lg:px-20 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        {categoryName ? `Products in ${categoryName}` : "Products"}
      </h1>

      {/* Sort Dropdown */}
      <div className="flex justify-end mb-6">
        <select
          className="border rounded-lg px-3 py-2"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="nameAsc">Name: A to Z</option>
          <option value="nameDesc">Name: Z to A</option>
        </select>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No products found in this category.</p>
      )}
    </div>

    <Footer />
  </>
);

};

export default CategoryProducts;
