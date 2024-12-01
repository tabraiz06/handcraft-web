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

const App = () => {
  return (
    <Router>
      <div className="head min-h-[10vh]">
        <Header />
      </div>
      <div className="main min-h-[90vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/make-order" element={<MakeOrder />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />;
        </Routes>
      </div>
    </Router>
  );
};

export default App;
