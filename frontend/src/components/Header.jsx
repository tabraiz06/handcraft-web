// src/components/Header.js

import React, { useState, useEffect } from "react";
// import logo from "../assets/islamia.gif";
import { NavLink } from "react-router-dom";
const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);

    if (!isSidebarOpen) {
      // Automatically close the sidebar after 3 seconds
      const id = setTimeout(() => {
        setIsSidebarOpen(false);
      }, 3000);
      setTimeoutId(id);
    } else if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <header className="bg-slate-500 text-white fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <NavLink to={"/"}>
          <img src='' alt="islami-school" className="w-[100px]" />
        </NavLink>
        <nav className="hidden md:flex space-x-4 font-bold">
          <NavLink to="/" className="hover:text-yellow-500">
            Home
          </NavLink>
          <NavLink to="/about" className="hover:text-yellow-500">
            About
          </NavLink>
          <NavLink to="/courses" className="hover:text-yellow-500">
            Products
          </NavLink>
          
          <NavLink to="/gallery" className="hover:text-yellow-500">
            Gallery
          </NavLink>
          
          <NavLink to="/contact" className="hover:text-yellow-500">
            Contact Us
          </NavLink>
          <NavLink to="/admin" className="hover:text-yellow-500">
            Admin
          </NavLink>
        </nav>
        <button
          onClick={toggleSidebar}
          className="md:hidden text-2xl focus:outline-none text-black"
        >
          ☰
        </button>
      </div>
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-gray-800 text-white shadow-lg transition-transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-2xl"
        >
          ×
        </button>
        <nav className="mt-16 text-white font-bold">
          <NavLink
            to="/"
            className="block py-2 px-4 hover:bg-gray-700"
            onClick={toggleSidebar}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="block py-2 px-4 hover:bg-gray-700"
            onClick={toggleSidebar}
          >
            About
          </NavLink>
          <NavLink
            to="/courses"
            className="block py-2 px-4 hover:bg-gray-700"
            onClick={toggleSidebar}
          >
            Products
          </NavLink>
          
          <NavLink to="/gallery" className="block py-2 px-4 hover:bg-gray-700">
            Gallery
          </NavLink>
          
          <NavLink
            to="/contact"
            className="block py-2 px-4 hover:bg-gray-700"
            onClick={toggleSidebar}
          >
            Contact Us
          </NavLink>
          <NavLink
            to="/admin"
            className="block py-2 px-4 hover:bg-gray-700"
            onClick={toggleSidebar}
          >
            Admin
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
