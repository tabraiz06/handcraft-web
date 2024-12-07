import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    images: [],
    stock: "",
  });
  const [uploading, setUploading] = useState(false);

  const fetchProducts = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/api/admin/products",{headers:{token:localStorage.getItem('token')}}
    );
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
        "http://localhost:5000/api/upload",
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
    await axios.post("http://localhost:5000/api/admin/products", formData, {
      headers: { token: localStorage.getItem("token") },
    });
    fetchProducts();
    setFormData({
      name: "",
      description: "",
      price: "",
      images: [],
      stock: "",
    });
  };

  const deleteProduct= async(id)=>{
    try {
        const res = await axios.delete(
          `http://localhost:5000/api/admin/products/${id}`,{headers:{token:localStorage.getItem('token')}}
        );
        console.log(res.data)
        fetchProducts()
    } catch (error) {
        console.error("Failed to delete:", error);
    }
  }

  return (
    <div className="container mx-auto py-8">
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

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Stock</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">${product.price}</td>
              <td className="border px-4 py-2">{product.stock}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => console.log("Edit product functionality")}
                  className="bg-yellow-500 text-white px-4 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
