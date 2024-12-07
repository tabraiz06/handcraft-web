import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `https://handcraft-web-j6a7.vercel.app/api/products/${id}`
        );
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading product details...</p>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-xl text-green-500 mb-4">${product.price}</p>
      <div className="grid grid-cols-2 gap-4">
        {product.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Product ${index}`}
            className="w-full h-64 object-cover rounded"
          />
        ))}
      </div>
    </div>
  );
};

export default ViewProduct;
