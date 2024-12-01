// frontend/src/components/ProductDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-80 object-cover rounded shadow-md"
          />
          <div className="flex space-x-4">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                className="w-20 h-20 object-cover rounded cursor-pointer shadow-sm hover:shadow-md"
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-lg text-gray-700 mt-2">{product.description}</p>
          <p className="text-2xl font-semibold text-green-600 mt-4">
            ${product.price}
          </p>
          <button
            className="bg-blue-500 text-white px-6 py-2 mt-6 rounded shadow-md hover:bg-blue-600 transition"
            onClick={() => console.log("Add to Cart functionality here")}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
