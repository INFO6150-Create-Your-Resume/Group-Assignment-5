import React from "react";
import "./../styles/login.css";

const Login = () => {
  return (
    <div className="container login-container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card login-card">
            <h3 className="card-title text-center">Login</h3>
            <form>
              <div className="mb-3 position-relative">
                <label>Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  required
                />
                <span className="input-icon">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
              <div className="mb-3 position-relative">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  required
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
