import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.clear();
        setUser(null);
        setIsLoggedIn(false);
      }
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  }, []); // Runs once when the component mounts

  useEffect(() => {
    const handleUnload = () => {
      localStorage.clear(); // Clear all local storage data
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.clear(); // Clear localStorage
    setIsLoggedIn(false); // Update state
    setUser(null); // Clear user data
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
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
                    <Link className="nav-link" to="/templates">
                      Library
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/my-templates">
                      My Templates
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-light"
                      onClick={handleSignOut}
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

      {/* Jumbotron */}
      <div className="jumbotron text-center bg-light py-5">
        <div className="container">
          <h1 className="display-4">Craft Your Professional Resume</h1>
          <p className="lead">
            Stand out with a resume that truly represents you.
          </p>
          {isLoggedIn ? (
            <h2 className="text-primary">Hello, {user?.name}</h2>
          ) : (
            <Link className="btn btn-primary btn-lg" to="/login">
              Get Started
            </Link>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="container my-5">
        <div className="row text-center">
          <div className="col-md-4">
            <i className="fas fa-file-alt fa-3x text-primary mb-3"></i>
            <h4>Easy to Use</h4>
            <p>Create a professional resume with our intuitive interface.</p>
          </div>
          <div className="col-md-4">
            <i className="fas fa-palette fa-3x text-primary mb-3"></i>
            <h4>Customizable Templates</h4>
            <p>Select and personalize templates to match your style.</p>
          </div>
          <div className="col-md-4">
            <i className="fas fa-share-alt fa-3x text-primary mb-3"></i>
            <h4>Share & Download</h4>
            <p>Easily share your resume or download it in multiple formats.</p>
          </div>
        </div>
      </div>

      {/* Testimonials Carousel */}
      <div
        id="testimonialsCarousel"
        className="carousel slide bg-light py-5"
        data-bs-ride="carousel"
      >
        <div className="container">
          <div className="carousel-inner">
            <div className="carousel-item active text-center">
              <img
                src="https://i.pravatar.cc/80?img=1"
                alt="John Doe"
                className="rounded-circle mb-3"
              />
              <blockquote className="blockquote">
                <p>"This tool made creating my resume a breeze!"</p>
                <footer className="blockquote-footer">John Doe</footer>
              </blockquote>
            </div>
            <div className="carousel-item text-center">
              <img
                src="https://i.pravatar.cc/80?img=2"
                alt="Jane Smith"
                className="rounded-circle mb-3"
              />
              <blockquote className="blockquote">
                <p>"I landed my dream job thanks to my new resume."</p>
                <footer className="blockquote-footer">Jane Smith</footer>
              </blockquote>
            </div>
            <div className="carousel-item text-center">
              <img
                src="https://i.pravatar.cc/80?img=3"
                alt="Alex Johnson"
                className="rounded-circle mb-3"
              />
              <blockquote className="blockquote">
                <p>
                  "Highly recommend this service to anyone needing a
                  professional resume."
                </p>
                <footer className="blockquote-footer">Alex Johnson</footer>
              </blockquote>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#testimonialsCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#testimonialsCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4">
        <p>&copy; 2024 Resume Builder. All Rights Reserved.</p>
        <a href="https://www.facebook.com" className="text-white mx-2">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://www.twitter.com" className="text-white mx-2">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://www.linkedin.com" className="text-white mx-2">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </footer>
    </>
  );
};

export default HomePage;
