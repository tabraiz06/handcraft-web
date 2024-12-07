// frontend/src/components/ProductList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(
        "https://handcraft-web-j6a7.vercel.app/api/products"
      );
      setProducts(data);
      console.log(data);
    };
    fetchProducts();
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await axios.post(
        "https://handcraft-web-j6a7.vercel.app/api/cart/add",
        { productId, quantity },
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      return response.data; // Return server response
    } catch (error) {
      console.error(
        "Error adding to cart:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Failed to add product to cart."
      );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.length > 0 &&
        products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            addToCart={addToCart}
          />
        ))}
    </div>
  );
};

export default ProductList;
