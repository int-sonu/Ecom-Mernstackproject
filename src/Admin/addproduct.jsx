import React, { useState, useEffect } from "react";
import api from "../global/axios";
import AdminDashboard from "./admindashboard";

const AddProduct = () => {
  const [product, setProduct] = useState({
    product_name: "",
    price: "",
    Category: "",
    product_description: "",
    product_brand: "",
    stock: "", 
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/admin/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setProduct((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("product_name", product.product_name);
      formData.append("price", product.price);
      formData.append("Category", product.Category);
      formData.append("product_description", product.product_description);
      formData.append("product_brand", product.product_brand);
      formData.append("stock", product.stock); 
      if (product.image) formData.append("image", product.image);

      const res = await api.post("/admin/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(res.data.message);
      setProduct({
        product_name: "",
        price: "",
        Category: "",
        product_description: "",
        product_brand: "",
        stock: "", 
        image: null,
      });
    } catch (error) {
      console.error(error.response);
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex gap-6">
      <div className="w-1/4">
        <AdminDashboard />
      </div>

      <div className="max-w-md mx-auto mt-25 p-5 border rounded shadow w-3/4">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>

        {message && (
          <p
            className={`mb-4 ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            name="product_name"
            placeholder="Product Name"
            value={product.product_name}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
            required
          />

          <select
            name="Category"
            value={product.Category}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.categoryname}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="product_description"
            placeholder="Description"
            value={product.product_description}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
            required
          />

          <input
            type="text"
            name="product_brand"
            placeholder="Brand"
            value={product.product_brand}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
            required
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock Quantity"
            value={product.stock}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
            min="0"
            required
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 mb-2 w-full"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
