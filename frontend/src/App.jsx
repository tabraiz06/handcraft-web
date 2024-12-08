// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProductDetails from "./components/ProductDetails";
import Home from "./pages/Home";
import Header from "./components/Header";
import MakeOrder from "./components/MakeOrder";
import Cart from "./components/Cart";
import Login from "./components/Login/Login";
import Register from "./components/Register";
import AdminProducts from "./components/AdminProducts";
import AddProduct from "./components/AddProduct";
import ViewProduct from "./components/ViewProduct";
import { RiWhatsappFill } from "react-icons/ri";
import ContactUs from "./components/ContactUs";
import AdminContacts from "./components/AdminContacts";

const App = () => {
  const handleWhatsAppRedirect = () => {
    const phoneNumber = "+919148943362"; // Replace with your WhatsApp number
    const message = encodeURIComponent(
      "Hello! I am interested in your handcrafted wooden items."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };
  return (
    <Router>
      <div className="head min-h-[10vh]">
        <Header />
      </div>
      <div className="main min-h-[90vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminProducts />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/make-order" element={<MakeOrder />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />;
          <Route path="/admin/view-product/:id" element={<ViewProduct />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route
            path="/admin/contact"
            element={<AdminContacts />}
          />
        </Routes>
        {/* WhatsApp Icon */}
        <RiWhatsappFill
          className="fixed right-6 top-[80%] text-5xl text-green-500 cursor-pointer transform transition-transform duration-300 hover:scale-110 hover:text-green-600"
          onClick={handleWhatsAppRedirect}
        />
      </div>
    </Router>
  );
};

export default App;
