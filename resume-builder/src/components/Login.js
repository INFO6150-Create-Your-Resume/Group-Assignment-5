import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = ({ setUser, setIsLoggedIn }) => {
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
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Save user data and token to localStorage
        localStorage.setItem("user", JSON.stringify(data.user)); // Store full user object
        localStorage.setItem("token", data.token);

        setUser(data.user); // Pass all user data to state
        setIsLoggedIn(true);
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
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
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
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
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
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
