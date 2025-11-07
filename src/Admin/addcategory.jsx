import React, { useState } from "react";
import api from "../global/axios";
import AdminDashboard from "./admindashboard";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [categoryname, setCategoryName] = useState("");
  const [categorydescription, setCategoryDescription] = useState("");
  const navigate = useNavigate();

  // Submit new category
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryname.trim() || !categorydescription.trim()) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await api.post("/admin/categories", {
        categoryname,
        categorydescription,
      });
      alert("Category added successfully!");
      navigate("/admin/CategoryDisplay"); // 
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category");
    }
  };

  return (
    <div>
      <AdminDashboard />

      <section className="ml-64 p-6 mt-20">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Add New Category
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Category Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Category Name
              </label>
              <input
                type="text"
                value={categoryname}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <textarea
                value={categorydescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
                placeholder="Enter category description"
                rows="4"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition"
              >
                Add Category
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/categories")}
                className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-md transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddCategory;
