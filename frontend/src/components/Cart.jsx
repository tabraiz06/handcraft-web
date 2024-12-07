import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  // Fetch cart data
  const fetchCart = async () => {
    try {
      const { data } = await axios.get(
        "https://handcraft-web-j6a7.vercel.app/api/cart",
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      setCart(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart:", error);
      alert("Failed to fetch cart.");
    }
  };

  // Update item quantity
  const updateQuantity = async (productId, quantity) => {
    try {
      if (quantity < 1) {
        alert("Quantity cannot be less than 1.");
        return;
      }
      await axios.post(
        "https://handcraft-web-j6a7.vercel.app/api/cart/add",
        { productId, quantity },
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity.");
    }
  };

  // Remove item from cart
  const removeItem = async (productId) => {
    try {
      await axios.delete(
        `https://handcraft-web-j6a7.vercel.app/api/cart/remove/${productId}`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item.");
    }
  };

  // Clear the entire cart
  const clearCart = async () => {
    try {
      await axios.delete(
        "https://handcraft-web-j6a7.vercel.app/api/cart/clear",
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      fetchCart();
    } catch (error) {
      console.error("Error clearing cart:", error);
      alert("Failed to clear cart.");
    }
  };

  // Proceed to checkout
  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (loading) {
    return <p>Loading your cart...</p>;
  }

  if (!cart || cart.items.length === 0) {
    return <p>Your cart is empty. Add some products!</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="space-y-6">
        {cart.items.map((item) => (
          <div
            key={item.product._id}
            className="flex items-center justify-between border-b py-4 cart"
          >
            {/* Product Info */}
            <div className="flex items-center space-x-4">
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="min-w-[14rem]">
                <h2 className="text-lg font-bold">{item.product.name}</h2>
                <p className="text-sm text-gray-600">${item.product.price}</p>
              </div>
            </div>

            {/* Quantity Control */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() =>
                  updateQuantity(item.product._id, item.quantity - 1)
                }
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() =>
                  updateQuantity(item.product._id, item.quantity + 1)
                }
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>

            {/* Total Price and Remove */}
            <div className="flex items-center space-x-4">
              <p className="font-bold">${item.quantity * item.product.price}</p>
              <button
                onClick={() => removeItem(item.product._id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Actions */}
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={clearCart}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
        >
          Clear Cart
        </button>
        <button
          onClick={handleCheckout}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
