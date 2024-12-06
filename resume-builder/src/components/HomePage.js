import React from "react";
import Footer from "./Footer";

const HomePage = ({ isLoggedIn, user }) => {
  return (
    <>
      <div
        className="jumbotron text-center py-5"
        style={{ backgroundColor: "#E8D3C8", color: "#664C33" }}
      >
        <div className="container">
          <h1 className="display-4">Craft Your Professional Resume</h1>
          <p className="lead">
            Stand out with a resume that truly represents you.
          </p>
          {isLoggedIn ? (
            <h2 style={{ color: "#B8860B" }}>Hello, {user?.fullName}</h2>
          ) : (
            <button
              className="btn btn-lg"
              style={{
                backgroundColor: "#B8860B",
                color: "#F5F5F5",
                border: "none",
              }}
            >
              Get Started
            </button>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="container my-5">
        <div className="row text-center">
          <div className="col-md-4">
            <i
              className="fas fa-file-alt fa-3x mb-3"
              style={{ color: "#B8860B" }}
            ></i>
            <h4>Easy to Use</h4>
            <p>Create a professional resume with our intuitive interface.</p>
          </div>
          <div className="col-md-4">
            <i
              className="fas fa-palette fa-3x mb-3"
              style={{ color: "#B8860B" }}
            ></i>
            <h4>Customizable Templates</h4>
            <p>Select and personalize templates to match your style.</p>
          </div>
          <div className="col-md-4">
            <i
              className="fas fa-share-alt fa-3x mb-3"
              style={{ color: "#B8860B" }}
            ></i>
            <h4>Share & Download</h4>
            <p>Easily share your resume or download it in multiple formats.</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
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

      <Footer />
    </>
  );
};

export default HomePage;
