import React, { useEffect, useState } from "react";
import api from "../global/axios";
import AdminDashboard from "./admindashboard";
import { useNavigate } from "react-router-dom";

const CategoryDisplay = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/admin/categories");
      const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setCategories(sorted);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const res = await api.delete(`/admin/categories/${id}`);
        alert(res.data.message);
        fetchCategories();
      } catch (error) {
        const msg = error.response?.data?.message || "Failed to delete category";
        alert(msg);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/editcategories/${id}`);
  };

  const handleAdd = () => {
    navigate("/admin/addcategory");
  };

  return (
    <div>
      <AdminDashboard />
      <section className="ml-64 p-6 mt-20">
        <div className="flex justify-between items-center mb-6 w-[95%] mx-auto">
          <h2 className="text-3xl font-semibold">Categories</h2>
          <button
            onClick={handleAdd}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-md transition"
          >
            + Add Category
          </button>
        </div>
        <div className="rounded-lg shadow-lg border border-gray-200 bg-white w-[95%] mx-auto overflow-hidden">
          <table className="min-w-full text-sm text-gray-700 table-auto">
            <thead className="bg-[#334155] text-gray-200 uppercase text-sm">
              <tr>
                <th className="px-6 py-3 text-left">Sl No</th>
                <th className="py-2 px-4 border-b text-left">Category Name</th>
                <th className="py-2 px-4 border-b text-left">Description</th>
                <th className="py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <tr key={category._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{category.categoryname}</td>
                    <td className="py-2 px-4 border-b">{category.categorydescription}</td>
                    <td className="py-2 px-4 border-b">
                      <div className="flex justify-center items-center gap-3">
                        <button
                          onClick={() => handleEdit(category._id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(category._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CategoryDisplay;
