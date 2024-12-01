// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { contexApi } from "../Context/ContexApi";

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = contexApi();

  const [login, setLogin] = useState({
    userName: "",
    password: "",
  });

  const handleInput = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      const res = await fetch(
        "https://islamia-school-backend.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(login),
        }
      );
      const user = await res.json();
      if (res.ok) {
        sessionStorage.setItem("token", user.Token);
        setToken(user.Token);
        navigate("/admin");
      } else {
        alert(user.message || "Login failed. Please try again.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12 px-4">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Login
        </h1>
        <div className="mb-4">
          <label htmlFor="userName" className="block text-gray-600 mb-2">
            Username
          </label>
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="Enter your username"
            onChange={handleInput}
            value={login.userName}
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-600 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            onChange={handleInput}
            value={login.password}
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={submit}
          className="w-full bg-blue-600 text-white py-3 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Login;
