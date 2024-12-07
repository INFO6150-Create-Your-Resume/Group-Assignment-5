import React, { useEffect, useState } from "react";
import Footer from "./Footer";

const Profile = ({ isLoggedIn }) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleArrayChange = (e, field, index) => {
    const updatedArray = [...user[field]];
    updatedArray[index][e.target.name] = e.target.value;
    setUser((prevUser) => ({
      ...prevUser,
      [field]: updatedArray,
    }));
  };

  const addNewEntry = (field) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: [...(prevUser[field] || []), {}],
    }));
  };

  const saveChanges = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setIsEditing(false);
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("An error occurred. Please try again.");
    }
  };

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
            <button
              className="btn btn-primary mb-3"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>

            {isEditing && (
              <button
                className="btn btn-success mb-3 ms-2"
                onClick={saveChanges}
              >
                Save Changes
              </button>
            )}

            <h4 className="card-title" style={{ color: "#664C33" }}>
              Personal Information
            </h4>
            <ul className="list-group list-group-flush">
              {[
                { label: "Full Name", field: "fullName" },
                { label: "Email", field: "email" },
                { label: "Contact", field: "contact" },
                { label: "Address", field: "address" },
                { label: "LinkedIn", field: "linkedin" },
                { label: "Portfolio", field: "portfolio" },
                { label: "Objective", field: "objective" },
              ].map(({ label, field }) => (
                <li
                  key={field}
                  className="list-group-item"
                  style={{ backgroundColor: "#E8D3C8" }}
                >
                  <strong>{label}:</strong>{" "}
                  {isEditing ? (
                    <input
                      type="text"
                      name={field}
                      value={user[field] || ""}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  ) : (
                    user[field] || "N/A"
                  )}
                </li>
              ))}
            </ul>

            <h4 className="card-title mt-4" style={{ color: "#664C33" }}>
              Education
            </h4>
            {user.education?.length > 0 ? (
              user.education.map((edu, index) => (
                <div key={index}>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        name="institution"
                        value={edu.institution || ""}
                        onChange={(e) =>
                          handleArrayChange(e, "education", index)
                        }
                        className="form-control mb-2"
                        placeholder="Institution"
                      />
                      <input
                        type="text"
                        name="degree"
                        value={edu.degree || ""}
                        onChange={(e) =>
                          handleArrayChange(e, "education", index)
                        }
                        className="form-control mb-2"
                        placeholder="Degree"
                      />
                      <input
                        type="text"
                        name="fieldOfStudy"
                        value={edu.fieldOfStudy || ""}
                        onChange={(e) =>
                          handleArrayChange(e, "education", index)
                        }
                        className="form-control mb-2"
                        placeholder="Field of Study"
                      />
                      <input
                        type="text"
                        name="graduationYear"
                        value={edu.graduationYear || ""}
                        onChange={(e) =>
                          handleArrayChange(e, "education", index)
                        }
                        className="form-control mb-2"
                        placeholder="Graduation Year"
                      />
                    </>
                  ) : (
                    <p>
                      <strong>Institution:</strong> {edu.institution || "N/A"}
                      <br />
                      <strong>Degree:</strong> {edu.degree || "N/A"}
                      <br />
                      <strong>Field of Study:</strong>{" "}
                      {edu.fieldOfStudy || "N/A"}
                      <br />
                      <strong>Graduation Year:</strong>{" "}
                      {edu.graduationYear || "N/A"}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p>No education details available.</p>
            )}
            {isEditing && (
              <button
                className="btn btn-secondary"
                onClick={() => addNewEntry("education")}
              >
                Add Education
              </button>
            )}

            <h4 className="card-title mt-4" style={{ color: "#664C33" }}>
              Work Experience
            </h4>
            {user.workExperience?.length > 0 ? (
              user.workExperience.map((exp, index) => (
                <div key={index}>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        name="company"
                        value={exp.company || ""}
                        onChange={(e) =>
                          handleArrayChange(e, "workExperience", index)
                        }
                        className="form-control mb-2"
                        placeholder="Company"
                      />
                      <input
                        type="text"
                        name="position"
                        value={exp.position || ""}
                        onChange={(e) =>
                          handleArrayChange(e, "workExperience", index)
                        }
                        className="form-control mb-2"
                        placeholder="Position"
                      />
                      <input
                        type="text"
                        name="startDate"
                        value={exp.startDate || ""}
                        onChange={(e) =>
                          handleArrayChange(e, "workExperience", index)
                        }
                        className="form-control mb-2"
                        placeholder="Start Date"
                      />
                      <input
                        type="text"
                        name="endDate"
                        value={exp.endDate || ""}
                        onChange={(e) =>
                          handleArrayChange(e, "workExperience", index)
                        }
                        className="form-control mb-2"
                        placeholder="End Date"
                      />
                      <textarea
                        name="responsibilities"
                        value={exp.responsibilities || ""}
                        onChange={(e) =>
                          handleArrayChange(e, "workExperience", index)
                        }
                        className="form-control mb-2"
                        placeholder="Responsibilities"
                      ></textarea>
                    </>
                  ) : (
                    <p>
                      <strong>Company:</strong> {exp.company || "N/A"}
                      <br />
                      <strong>Position:</strong> {exp.position || "N/A"}
                      <br />
                      <strong>Start Date:</strong> {exp.startDate || "N/A"}
                      <br />
                      <strong>End Date:</strong> {exp.endDate || "N/A"}
                      <br />
                      <strong>Responsibilities:</strong>{" "}
                      {exp.responsibilities || "N/A"}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p>No work experience details available.</p>
            )}
            {isEditing && (
              <button
                className="btn btn-secondary"
                onClick={() => addNewEntry("workExperience")}
              >
                Add Work Experience
              </button>
            )}

            <h4 className="card-title mt-4" style={{ color: "#664C33" }}>
              Skills
            </h4>
            {isEditing ? (
              <textarea
                name="skills"
                value={user.skills || ""}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Skills (comma-separated)"
              ></textarea>
            ) : (
              <p>{user.skills || "No skills available."}</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
