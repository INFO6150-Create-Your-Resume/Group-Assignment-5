import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Footer = () => {
  return (
    <footer
      className="text-center py-4"
      style={{ backgroundColor: "#664C33", color: "#F5F5F5" }}
    >
      <p>&copy; 2024 Resume Builder. All Rights Reserved.</p>
      <a href="https://www.facebook.com" className="mx-2">
        <i className="fab fa-facebook-f" style={{ color: "#E8D3C8" }}></i>
      </a>
      <a href="https://www.twitter.com" className="mx-2">
        <i className="fab fa-twitter" style={{ color: "#E8D3C8" }}></i>
      </a>
      <a href="https://www.linkedin.com" className="mx-2">
        <i className="fab fa-linkedin-in" style={{ color: "#E8D3C8" }}></i>
      </a>
    </footer>
  );
};

export default Footer;
