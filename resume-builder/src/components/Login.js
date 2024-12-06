import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./../styles/login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // Initialize useNavigate

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
        alert("Login successful");
        localStorage.setItem("token", data.token); // Save token
        navigate("/home"); // Navigate to homepage
      } else {
        alert(data.message); // Show error message
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container login-container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card login-card">
            <h3 className="card-title text-center">Login</h3>
            <form onSubmit={handleLogin}>
              <div className="mb-3 position-relative">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <span className="input-icon">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
              <div className="mb-3 position-relative">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <span className="input-icon">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                <i className="fas fa-sign-in-alt"></i> Login
              </button>
            </form>
            <p className="text-center mt-3">
              <a href="/forgot-password">Forgot Password?</a>
            </p>
            <p className="text-center">
              New here? <a href="/register">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
