import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `https://handcraft-web-j6a7.vercel.app/api/products/${id}`
        );
        setProduct(data);
        setSelectedImage(data.images[0]); // Default selected image
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    // Add product and selected quantity to the cart (you can store it in local storage or context)
    console.log(`Added ${quantity} of ${product.name} to the cart.`);
    // Implement cart logic here
  };

  // const handleBuyNow = () => {
  //   // Redirect to checkout page with the product and selected quantity
  //   console.log(`Buying ${quantity} of ${product.name}`);
  //   navigate("/checkout", { state: { product, quantity } });
  // };
  const handleBuyNow = () => {
    navigate("/make-order", { state: { product, quantity } });
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  if (loading) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          {/* Main Image */}
          <div className="w-full h-[400px] mb-4">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex space-x-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded cursor-pointer shadow-md transition-all ${
                  selectedImage === image
                    ? "ring-2 ring-blue-500 scale-105"
                    : "hover:scale-105 hover:ring-1 hover:ring-gray-300"
                }`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-gray-600 mt-4">{product.description}</p>
          <p className="text-2xl font-bold text-green-600 mt-4">
            ${product.price}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4 mt-4">
            <button
              className="bg-gray-200 p-2 rounded-md"
              onClick={handleDecrease}
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-12 text-center border p-2 rounded-md"
            />
            <button
              className="bg-gray-200 p-2 rounded-md"
              onClick={handleIncrease}
            >
              +
            </button>
          </div>

          {/* Add to Cart & Buy Now Buttons */}
          <div className="mt-6 space-x-4">
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded shadow-md hover:bg-blue-600 transition"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              className="bg-green-500 text-white px-6 py-3 rounded shadow-md hover:bg-green-600 transition"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
