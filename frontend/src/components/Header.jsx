import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState(0); // Simulated cart count
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate checking authentication and cart items
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUser(loggedInUser);
    }
    setCartItems(storedCartItems.length);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);

    if (!isSidebarOpen) {
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

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const navigateToCart = () => {
    navigate("/cart");
  };

  return (
    <header className="bg-slate-500 text-white fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <NavLink to={"/"}>
          <img src="" alt="islami-school" className="w-[100px]" />
        </NavLink>
        <nav className="hidden md:flex space-x-4 font-bold">
          <NavLink to="/" className="hover:text-yellow-500">
            Home
          </NavLink>
          <NavLink to="/about" className="hover:text-yellow-500">
            About
          </NavLink>
          <NavLink to="/products" className="hover:text-yellow-500">
            Products
          </NavLink>
          <NavLink to="/gallery" className="hover:text-yellow-500">
            Gallery
          </NavLink>
          <NavLink to="/contact" className="hover:text-yellow-500">
            Contact Us
          </NavLink>
          {isLoggedIn && (
            <NavLink to="/admin" className="hover:text-yellow-500">
              Admin
            </NavLink>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <FiShoppingCart
              className="text-2xl cursor-pointer hover:text-yellow-500 transition"
              onClick={navigateToCart}
            />
            {cartItems > 0 && (
              <span className="absolute top-[-10px] right-[-10px] bg-red-600 text-white text-xs font-bold rounded-full px-2 py-[1px]">
                {cartItems}
              </span>
            )}
          </div>

          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <span className="hidden md:block">{user?.name || "User"}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600 transition"
            >
              Login
            </button>
          )}
          <button
            onClick={toggleSidebar}
            className="md:hidden text-2xl focus:outline-none text-black"
          >
            ☰
          </button>
        </div>
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
            to="/products"
            className="block py-2 px-4 hover:bg-gray-700"
            onClick={toggleSidebar}
          >
            Products
          </NavLink>
          <NavLink
            to="/gallery"
            className="block py-2 px-4 hover:bg-gray-700"
            onClick={toggleSidebar}
          >
            Gallery
          </NavLink>
          <NavLink
            to="/contact"
            className="block py-2 px-4 hover:bg-gray-700"
            onClick={toggleSidebar}
          >
            Contact Us
          </NavLink>
          {isLoggedIn && (
            <NavLink
              to="/admin"
              className="block py-2 px-4 hover:bg-gray-700"
              onClick={toggleSidebar}
            >
              Admin
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
