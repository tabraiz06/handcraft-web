import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const { data } = await axios.get(
      "https://handcraft-web-j6a7.vercel.app/api/admin/products",
      { headers: { token: localStorage.getItem("token") } }
    );
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    navigate("/admin/add-product"); // Navigate to add product form
  };
  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(
        `https://handcraft-web-j6a7.vercel.app/api/admin/products/${id}`,
        { headers: { token: localStorage.getItem("token") } }
      );
      console.log(res.data);
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const handleViewProduct = (id) => {
    navigate(`/admin/view-product/${id}`); // Navigate to view product details
  };

  return (
    <div className="container mx-auto py-8 px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Product Management</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          onClick={handleAddProduct}
        >
          Add New Product
        </button>
      </div>

      <table className="w-full border text-center">
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
                <div className="flex justify-around">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    onClick={() => handleViewProduct(product._id)}
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
