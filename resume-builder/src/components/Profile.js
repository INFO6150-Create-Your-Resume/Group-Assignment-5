import React, { useEffect, useState } from "react";
import Footer from "./Footer";

const Profile = ({ isLoggedIn }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from localStorage
    const userData = localStorage.getItem("user");

    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  if (!isLoggedIn || !user) {
    return (
      <div className="text-center mt-5">
        <h2>User information not available. Please log in.</h2>
      </div>
    );
  }

  return (
    <>
      <div className="container py-5">
        <h1
          className="text-center"
          style={{ color: "#664C33", fontWeight: "bold" }}
        >
          My Profile
        </h1>
        <div
          className="card shadow mt-4"
          style={{ backgroundColor: "#E8D3C8" }}
        >
          <div className="card-body">
            <h4 className="card-title" style={{ color: "#664C33" }}>
              Personal Information
            </h4>
            <ul className="list-group list-group-flush">
              <li
                className="list-group-item"
                style={{ backgroundColor: "#E8D3C8" }}
              >
                <strong>Full Name:</strong> {user.fullName || "N/A"}
              </li>
              <li
                className="list-group-item"
                style={{ backgroundColor: "#E8D3C8" }}
              >
                <strong>Email:</strong> {user.email || "N/A"}
              </li>
              <li
                className="list-group-item"
                style={{ backgroundColor: "#E8D3C8" }}
              >
                <strong>Contact:</strong> {user.contact || "N/A"}
              </li>
              <li
                className="list-group-item"
                style={{ backgroundColor: "#E8D3C8" }}
              >
                <strong>Address:</strong> {user.address || "N/A"}
              </li>
              <li
                className="list-group-item"
                style={{ backgroundColor: "#E8D3C8" }}
              >
                <strong>LinkedIn:</strong> {user.linkedin || "N/A"}
              </li>
              <li
                className="list-group-item"
                style={{ backgroundColor: "#E8D3C8" }}
              >
                <strong>Portfolio:</strong> {user.portfolio || "N/A"}
              </li>
            </ul>

            <h4 className="card-title mt-4" style={{ color: "#664C33" }}>
              Education
            </h4>
            {user.education?.length > 0 ? (
              user.education.map((edu, index) => (
                <div key={index}>
                  <p>
                    <strong>Institution:</strong> {edu.institution || "N/A"}
                  </p>
                  <p>
                    <strong>Degree:</strong> {edu.degree || "N/A"}
                  </p>
                  <p>
                    <strong>Field of Study:</strong> {edu.fieldOfStudy || "N/A"}
                  </p>
                  <p>
                    <strong>Graduation Year:</strong>{" "}
                    {edu.graduationYear || "N/A"}
                  </p>
                </div>
              ))
            ) : (
              <p>No education details available.</p>
            )}

            <h4 className="card-title mt-4" style={{ color: "#664C33" }}>
              Work Experience
            </h4>
            {user.workExperience?.length > 0 ? (
              user.workExperience.map((exp, index) => (
                <div key={index}>
                  <p>
                    <strong>Company:</strong> {exp.company || "N/A"}
                  </p>
                  <p>
                    <strong>Position:</strong> {exp.position || "N/A"}
                  </p>
                  <p>
                    <strong>Start Date:</strong> {exp.startDate || "N/A"}
                  </p>
                  <p>
                    <strong>End Date:</strong> {exp.endDate || "N/A"}
                  </p>
                  <p>
                    <strong>Responsibilities:</strong>{" "}
                    {exp.responsibilities?.join(", ") || "N/A"}
                  </p>
                  <p>
                    <strong>Achievements:</strong>{" "}
                    {exp.achievements?.join(", ") || "N/A"}
                  </p>
                </div>
              ))
            ) : (
              <p>No work experience details available.</p>
            )}

            <h4 className="card-title mt-4" style={{ color: "#664C33" }}>
              Skills
            </h4>
            {user.skills?.length > 0 ? (
              <ul>
                {user.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            ) : (
              <p>No skills available.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
