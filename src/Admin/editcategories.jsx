import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../global/axios";
import AdminDashboard from "./admindashboard";

const EditCategory = () => {
  const { id } = useParams();
  const [category, setCategory] = useState({ categoryname: "", categorydescription: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const res = await api.get(`/admin/categories/${id}`);
      setCategory(res.data);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category.categoryname.trim() || !category.categorydescription.trim()) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await api.put(`/admin/categories/${id}`, category);
      alert(res.data.message);
      navigate("/admin/categorydisplay");
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to update category";
      alert(msg);
      console.error("Error updating category:", error);
    }
  };

  const handleCancel = () => {
    navigate("/admin/categorydisplay");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminDashboard />
      <section className="ml-64 p-6 mt-20">
        <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8 transition-transform hover:scale-[1.01] duration-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
            Edit Category
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Category Name
              </label>
              <input
                type="text"
                name="categoryname"
                value={category.categoryname}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg p-3 outline-none transition"
                placeholder="Enter category name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Description
              </label>
              <textarea
                name="categorydescription"
                value={category.categorydescription}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg p-3 outline-none transition"
                placeholder="Enter category description"
                rows="4"
                required
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-lg font-medium transition duration-200 shadow-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition duration-200 shadow-md"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default EditCategory;
