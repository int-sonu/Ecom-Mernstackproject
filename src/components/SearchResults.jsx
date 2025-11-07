import React from "react";
import { useLocation, Link } from "react-router-dom";
import ProductList from "./productview"; 

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  return (
    <div className="pt-[120px] bg-gray-50 min-h-screen px-6 lg:px-20">
      <h2 className="text-3xl font-semibold mb-8 text-gray-900 text-center">
        Search Results for "{query}"
      </h2>

      <ProductList searchQuery={query} />
      
    </div>
  );
};

export default SearchResults;
