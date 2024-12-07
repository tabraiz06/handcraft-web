// frontend/src/components/ProductCard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";

const ProductCard = ({ product, addToCart }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:scale-105 transform transition-transform duration-300">
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover rounded"
          onClick={handleViewDetails}
        />
        <button
          className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600"
          onClick={(e) => {
            e.stopPropagation(); // Prevents triggering the card click
            addToCart(product._id);
          }}
        >
          <FaCartPlus />
        </button>
      </div>
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-500">{product.description.slice(0, 50)}...</p>
      <p className="text-xl font-bold text-green-600 mt-1">${product.price}</p>
    </div>
  );
};

export default ProductCard;
