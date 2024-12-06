import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify({ name: data.name }));
        navigate("/home");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="card-title text-center mb-4">Login</h3>
        <form onSubmit={handleLogin}>
          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="fas fa-envelope"></i>
              </span>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                required
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-primary w-100">
            <i className="fas fa-sign-in-alt"></i> Login
          </button>
        </form>

        {/* Additional Links */}
        <div className="text-center mt-3">
          <a href="/forgot-password" className="text-decoration-none">
            Forgot Password?
          </a>
        </div>
        <div className="text-center mt-2">
          <span>New here? </span>
          <a href="/register" className="text-decoration-none">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
