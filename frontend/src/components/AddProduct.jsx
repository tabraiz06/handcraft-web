import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    images: [],
    stock: "",
  });
  const [uploading, setUploading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFilesUpload = async (e) => {
    const files = Array.from(e.target.files);
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    setUploading(true);
    try {
      const { data } = await axios.post(
        "https://handcraft-web-j6a7.vercel.app/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token"),
          },
        }
      );
      setFormData((prevState) => ({
        ...prevState,
        images: [...prevState.images, ...data.filePaths],
      }));
    } catch (error) {
      console.error("Failed to upload images:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "https://handcraft-web-j6a7.vercel.app/api/admin/products",
        formData,
        {
          headers: { token: localStorage.getItem("token") },
        }
      )
      .then(() => navigate("/admin"));

    setFormData({
      name: "",
      description: "",
      price: "",
      images: [],
      stock: "",
    });
  };
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
      <form onSubmit={handleAddProduct} className="space-y-4 mb-8">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleInputChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="file"
          multiple
          onChange={handleFilesUpload}
          className="w-full border px-4 py-2 rounded"
        />
        {uploading && <p>Uploading images...</p>}
        <button className="bg-blue-500 text-white px-6 py-2 rounded shadow">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
