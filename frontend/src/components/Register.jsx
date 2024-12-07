import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://handcraft-web-j6a7.vercel.app/api/users/register", // Replace with your backend endpoint
        formData
      );
      setMessage("Registration successful!");
      setFormData({ name: "", email: "", phone: "", password: "" });
      if (data) {
        navigate("/");
        localStorage.setItem("user", data.name);
        localStorage.setItem("token", data.token);
      }
    } catch (error) {
      setMessage("Error during registration. Please try again.");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          {message && (
            <p className="text-center text-sm font-semibold text-red-500">
              {message}
            </p>
          )}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-gray-700 font-semibold mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Register
          </button>
        </form>
        <div className="text my-4">
          <Link to={"/login"} className="cursor-pointer">
            Have An Account -{" "}
            <span className="text-blue-600 font-sans font-semibold">
              Login Now
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
