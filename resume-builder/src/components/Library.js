import React from "react";
import Footer from "./Footer";

const Library = ({ isLoggedIn, user }) => {
  return (
    <>
      <div className="container py-5">
        <header className="text-center mb-5">
          <h1 style={{ color: "#664C33", fontWeight: "bold" }}>
            Select a Resume Template
          </h1>
        </header>

        <main className="row text-center">
          <div className="col-md-4 mb-4">
            <div
              className="card shadow"
              style={{ border: "none", backgroundColor: "#E8D3C8" }}
            >
              <img
                src="/template1-thumbnail.png"
                alt="Template 1"
                className="card-img-top"
                style={{ borderRadius: "8px" }}
              />
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div
              className="card shadow"
              style={{ border: "none", backgroundColor: "#E8D3C8" }}
            >
              <img
                src="/template2-thumbnail.png"
                alt="Template 2"
                className="card-img-top"
                style={{ borderRadius: "8px" }}
              />
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div
              className="card shadow"
              style={{ border: "none", backgroundColor: "#E8D3C8" }}
            >
              <img
                src="/template3-thumbnail.png"
                alt="Template 3"
                className="card-img-top"
                style={{ borderRadius: "8px" }}
              />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Library;
