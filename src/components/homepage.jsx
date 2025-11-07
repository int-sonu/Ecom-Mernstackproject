import React, { useState } from "react";
import { assets } from "../assets/assets";
import CategoryList from "./categoryview";
import ProductList from "./productview";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom"; 

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate(); 

  const handleSelectCategory = (categoryId) => {
    navigate(`/category/${categoryId}`); 
  };

  return (
    <div className="pt-[120px] bg-gray-50 min-h-screen rounded-3xl">
      <section className="flex flex-col md:flex-row items-center justify-between px-8 lg:px-20 py-6 md:py-8 bg-white text-black overflow-hidden">
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-snug">
            “Style is a reflection of your attitude <br /> and your personality.”
          </h1>
          <p className="text-black text-lg max-w-md mx-auto md:mx-0">
            Discover timeless fashion that speaks confidence — only at{" "}
            <span className="text-pink-500 font-semibold">Neva</span>.
          </p>
        </div>

        <div className="md:w-1/2 h-auto mt-10 md:mt-0">
          <img
            src={assets.banner1}
            alt="Fashion Banner"
            className="rounded-2xl w-120 h-160 object-cover"
          />
        </div>
      </section>

      <section className="px-10 lg:px-20 py-16">
        <h2 className="text-3xl font-semibold mb-8 text-gray-900 text-center">
          Shop by Category
        </h2>
        <CategoryList onSelectCategory={handleSelectCategory} />
      </section>

      <section className="px-6 lg:px-20 py-6">
        <h2 className="text-3xl font-semibold mb-8 text-gray-900 text-center">
          Our Products
        </h2>
        <ProductList categoryId={selectedCategory} />
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
