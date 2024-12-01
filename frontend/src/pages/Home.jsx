import React from "react";
import ProductList from "../components/ProductList";
import { RiWhatsappFill } from "react-icons/ri";

const Home = () => {
  const handleWhatsAppRedirect = () => {
    const phoneNumber = "+919148943362"; // Replace with your WhatsApp number
    const message = encodeURIComponent(
      "Hello! I am interested in your handcrafted wooden items."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div>
      <ProductList />
      {/* WhatsApp Icon */}
      <RiWhatsappFill
        className="fixed right-6 top-[80%] text-5xl text-green-500 cursor-pointer transform transition-transform duration-300 hover:scale-110 hover:text-green-600"
        onClick={handleWhatsAppRedirect}
      />
    </div>
  );
};

export default Home;
