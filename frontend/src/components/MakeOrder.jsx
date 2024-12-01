import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MakeOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure product and quantity from state
  const { product, quantity } = location.state || {};

  // Redirect to home if no product data is available
  if (!product) {
    navigate("/");
    return null;
  }

  const handlePlaceOrder = () => {
    console.log("Order placed successfully!");
    // Add your order placement logic here (API call, confirmation, etc.)
    alert("Your order has been placed!");
    navigate("/"); // Redirect to home or another page after placing the order
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Confirm Your Purchase</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Summary */}
        <div>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-80 object-cover rounded shadow-md"
          />
          <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
          <p className="text-gray-700 mt-2">{product.description}</p>
          <p className="text-green-600 text-xl font-bold mt-4">
            Price: ${product.price} x {quantity} = $
            {(product.price * quantity).toFixed(2)}
          </p>
        </div>

        {/* Order Details */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full p-3 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Address</label>
              <textarea
                rows="3"
                placeholder="Enter your address"
                className="w-full p-3 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                placeholder="Enter your phone number"
                className="w-full p-3 border rounded"
              />
            </div>
            <button
              type="button"
              className="bg-blue-500 text-white px-6 py-3 rounded shadow-md hover:bg-blue-600 transition"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MakeOrder;
