import React, { useEffect, useState } from "react";
import api from "../global/axios";
import AdminDashboard from "./admindashboard";
import { useNavigate, Link } from "react-router-dom";

const ProductDisplay = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = async (page = 1, limit = rowsPerPage, search = "") => {
    try {
      setLoading(true);
      const res = await api.get("/admin/products", {
        params: { page, limit, search },
      });
      setProducts(res.data.products || []);
      setTotalPages(res.data.totalPages || 1);
      setCurrentPage(res.data.currentPage || 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, rowsPerPage, searchTerm);
  }, [currentPage, rowsPerPage, searchTerm]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/admin/products/${id}`);
        fetchProducts(currentPage, rowsPerPage, searchTerm);
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const handleEdit = (id) => navigate(`/admin/editproduct/${id}`);

  const handleRowsChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1); 
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminDashboard />
      <section className="mt-24 ml-64 mr-5 px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Product List</h2>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by name, category, or brand..."
              className="border border-gray-300 rounded-md px-4 py-2 w-72"
            />
            <Link
              to="/admin/addproduct"
              className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700"
            >
              + Add Product
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 bg-white">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-[#334155] text-gray-200 uppercase text-sm">
              <tr>
                <th className="px-6 py-3 text-left">Product Name</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-center">Price</th>
                <th className="px-6 py-3 text-center">Stock</th>
                <th className="px-6 py-3 text-center">Image</th>
                <th className="px-6 py-3 text-left">Description</th>
                <th className="px-6 py-3 text-left">Brand</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-3">{product.product_name}</td>
                    <td className="px-6 py-3">
                      {product.Category?.categoryname || "—"}
                    </td>
                    <td className="px-6 py-3 text-center">₹{product.price}</td>
                    <td
                      className={`px-6 py-3 text-center ${
                        product.stock === 0
                          ? "text-red-600"
                          : product.stock < 10
                          ? "text-orange-500"
                          : "text-green-600"
                      }`}
                    >
                      {product.stock ?? 0}
                    </td>
                    <td className="px-6 py-3 text-center">
                      {product.image ? (
                        <img
                          src={`http://localhost:3000/uploads/${product.image}`}
                          alt={product.product_name}
                          className="w-16 h-16 object-cover mx-auto rounded border"
                        />
                      ) : (
                        <span className="text-gray-400 italic">No Image</span>
                      )}
                    </td>
                    <td className="px-6 py-3 max-w-xs truncate">
                      {product.product_description || "—"}
                    </td>
                    <td className="px-6 py-3">
                      {product.product_brand || "—"}
                    </td>
                    <td className="px-6 py-3 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(product._id)}
                          className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6 px-4">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={handleRowsChange}
              className="border px-2 py-1 rounded-md"
            >
              {[5, 10, 15, 20].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Previous
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDisplay;
