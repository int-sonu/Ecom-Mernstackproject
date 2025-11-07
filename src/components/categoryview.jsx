import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:3000/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  if (!categories.length)
    return <p className="text-center">No categories available.</p>;

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {categories.map((cat) => (
         <div
  key={cat._id}
  onClick={() => navigate(`/category/${cat._id}`)}
  className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg text-center cursor-pointer transition-transform hover:scale-105"
>
  <h3 className="text-xl font-semibold mb-2">{cat.categoryname}</h3>
  <p className="text-gray-600">{cat.categorydescription}</p>
</div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
