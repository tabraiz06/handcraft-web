// frontend/src/components/PlaceOrder.js
import React, { useState } from "react";
import axios from "axios";

const PlaceOrder = ({ cartItems, user, shippingAddress }) => {
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    setLoading(true);
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    try {
      const { data } = await axios.post("/api/orders", {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
      });
      console.log("Order created:", data);
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="place-order">
      <h2>Place Order</h2>
      <button
        onClick={placeOrderHandler}
        className="btn bg-blue-500 text-white rounded px-4 py-2"
        disabled={loading}
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default PlaceOrder;
