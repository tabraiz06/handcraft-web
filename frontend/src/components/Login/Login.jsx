// src/pages/Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { contexApi } from "../Context/ContexApi";

const Login = () => {
  const navigate = useNavigate();
  // const { setToken } = contexApi();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      const res = await fetch(
        "https://handcraft-web-j6a7.vercel.app/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(login),
        }
      );
      const user = await res.json();
      console.log(user);
      if (res.ok) {
        localStorage.setItem("token", user.token);
        localStorage.setItem("user", user.name);
        localStorage.setItem("admin", user.isAdmin);
        // setToken(user.Token);
        navigate("/");
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
            Email
          </label>
          <input
            type="text"
            name="email"
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
        <div className="text my-4">
          <Link to={"/register"} className="cursor-pointer">
            Dont Have An Account -{" "}
            <span className="text-blue-600 font-sans font-semibold">
              Register Now
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
