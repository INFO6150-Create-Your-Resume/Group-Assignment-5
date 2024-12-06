import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn, user, handleSignOut }) => {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#B8860B" }}
    >
      <div className="container">
        <Link
          className="navbar-brand"
          to="/"
          style={{ color: "#F5F5F5", fontWeight: "bold" }}
        >
          Resume Builder
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/library">
                    Library
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/my-templates">
                    My Templates
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-light"
                    onClick={handleSignOut}
                    style={{
                      backgroundColor: "#E8D3C8",
                      color: "#664C33",
                      border: "none",
                    }}
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/templates">
                    Templates
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
