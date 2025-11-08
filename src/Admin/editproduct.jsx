import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../global/axios";
import AdminDashboard from "./admindashboard";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    product_name: "",
    product_description: "",
    price: "",
    product_brand: "",
    category: "",
    stock: "",
    image: "",
  });

  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/admin/products/${id}`);
      const p = res.data;
      setProduct({
        product_name: p.product_name,
        product_description: p.product_description,
        price: p.price,
        product_brand: p.product_brand,
        category: p.Category?._id || "",
        stock: p.stock || 0,
        image: p.image,
      });
    } catch (error) {
      alert("Failed to load product details");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/admin/categories");
      setCategories(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setProduct((prev) => ({ ...prev, image: previewUrl }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("product_name", product.product_name);
    formData.append("product_description", product.product_description);
    formData.append("price", product.price);
    formData.append("product_brand", product.product_brand);
    formData.append("category", product.category);
    formData.append("stock", product.stock);
    if (image) formData.append("image", image);

    try {
      await api.put(`/admin/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product updated successfully!");
      navigate("/admin/productdisplay");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update product");
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminDashboard />
      <section className="flex-1 ml-64 p-8 mt-10">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Edit Product
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Product Name
              </label>
              <input
                type="text"
                name="product_name"
                value={product.product_name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <textarea
                name="product_description"
                value={product.product_description}
                onChange={handleChange}
                rows="4"
                placeholder="Enter product description"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Brand
              </label>
              <input
                type="text"
                name="product_brand"
                value={product.product_brand}
                onChange={handleChange}
                placeholder="Enter brand"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Category
              </label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.categoryname}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                placeholder="Enter stock quantity"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white"
              />
              {product.image && (
                 <img
    src={
      image
        ? URL.createObjectURL(image)
        : `${api.defaults.baseURL}/uploads/${product.image}`
    }
                  alt="Product Preview"
                  className="w-24 h-24 object-cover mt-3 rounded-md border"
                />
              )}
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
              >
                Update Product
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/productdisplay")}
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

export default EditProduct;
