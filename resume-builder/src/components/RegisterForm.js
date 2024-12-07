import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    contact: "",
    email: "",
    password: "",
    address: "",
    linkedin: "",
    portfolio: "",
    objective: "",
    education: [
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        graduationYear: "",
        relevantCoursework: "",
      },
    ],
    workExperience: [
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        responsibilities: "",
        achievements: "",
      },
    ],
    skills: "",
    achievements: "",
  });

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize navigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (e, field, index) => {
    const updatedArray = [...formData[field]];
    updatedArray[index][e.target.name] = e.target.value;
    setFormData({ ...formData, [field]: updatedArray });
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required.";
      }
      if (!formData.contact.trim()) {
        newErrors.contact = "Contact number is required.";
      } else if (!/^\d+$/.test(formData.contact)) {
        newErrors.contact = "Contact number must be numeric.";
      } else if (formData.contact.length < 10 || formData.contact.length > 15) {
        newErrors.contact = "Contact number must be between 10 and 15 digits.";
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email format.";
      }
      if (!formData.password.trim()) {
        newErrors.password = "Password is required.";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters.";
      }
      if (formData.linkedin && !/^https?:\/\//.test(formData.linkedin)) {
        newErrors.linkedin = "LinkedIn profile must start with http or https.";
      }
      if (formData.portfolio && !/^https?:\/\//.test(formData.portfolio)) {
        newErrors.portfolio = "Portfolio link must start with http or https.";
      }
    } else if (step === 2) {
      if (!formData.objective.trim()) {
        newErrors.objective = "Career objective is required.";
      } else if (
        formData.objective.length < 50 ||
        formData.objective.length > 300
      ) {
        newErrors.objective =
          "Career objective must be between 50 and 300 characters.";
      }
      if (!formData.skills.trim()) {
        newErrors.skills = "Skills field is required.";
      } else if (!/^[a-zA-Z0-9, ]+$/.test(formData.skills)) {
        newErrors.skills =
          "Skills must be comma-separated (e.g., 'JavaScript, React').";
      }
    } else if (step === 3) {
      const edu = formData.education[0];
      if (!edu.institution.trim()) {
        newErrors.institution = "Institution is required.";
      }
      if (!edu.degree.trim()) {
        newErrors.degree = "Degree is required.";
      }
      if (!edu.graduationYear.trim()) {
        newErrors.graduationYear = "Graduation year is required.";
      } else if (!/^\d{4}$/.test(edu.graduationYear)) {
        newErrors.graduationYear =
          "Graduation year must be a valid 4-digit year.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful");
        navigate("/"); // Navigate to the homepage after registration
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage:
          "url('https://static-cse.canva.com/blob/566484/modernresumes.jpg')", // Replace with your image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="card register-card p-4"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Slight transparency for the card
          color: "#664C33",
          width: "500px",
          borderRadius: "10px",
        }}
      >
        <div
          className="d-flex justify-content-center align-items-center vh-100"
          style={{ backgroundColor: "#F5F5F5" }}
        >
          <div
            className="card register-card p-4"
            style={{
              backgroundColor: "#E8D3C8",
              color: "#664C33",
              width: "500px",
            }}
          >
            <h3 className="text-center mb-4" style={{ color: "#B8860B" }}>
              Build Your Resume
            </h3>
            <div className="progress mb-4">
              <div
                className="progress-bar"
                style={{
                  backgroundColor: "#B8860B",
                  width: `${(step / 4) * 100}%`,
                }}
              ></div>
            </div>
            {step === 1 && (
              <div>
                <h6>Step 1: Personal Information</h6>
                <form>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      className="form-control"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      style={{ borderColor: "#D2B48C" }}
                    />
                    {errors.fullName && (
                      <p className="text-danger">{errors.fullName}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="contact"
                      placeholder="Contact Number"
                      className="form-control"
                      value={formData.contact}
                      onChange={handleInputChange}
                      style={{ borderColor: "#D2B48C" }}
                    />
                    {errors.contact && (
                      <p className="text-danger">{errors.contact}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleInputChange}
                      style={{ borderColor: "#D2B48C" }}
                    />
                    {errors.email && (
                      <p className="text-danger">{errors.email}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleInputChange}
                      style={{ borderColor: "#D2B48C" }}
                    />
                    {errors.password && (
                      <p className="text-danger">{errors.password}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="linkedin"
                      placeholder="LinkedIn Profile URL"
                      className="form-control"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      style={{ borderColor: "#D2B48C" }}
                    />
                    {errors.linkedin && (
                      <p className="text-danger">{errors.linkedin}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="portfolio"
                      placeholder="Portfolio URL"
                      className="form-control"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      style={{ borderColor: "#D2B48C" }}
                    />
                    {errors.portfolio && (
                      <p className="text-danger">{errors.portfolio}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    className="btn w-100"
                    onClick={handleNextStep}
                    style={{ backgroundColor: "#B8860B", color: "#F5F5F5" }}
                  >
                    Next <i className="fas fa-arrow-right"></i>
                  </button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div>
                <h6>Step 2: Career Objective and Skills</h6>
                <form>
                  <div className="mb-3">
                    <textarea
                      name="objective"
                      placeholder="Your career objective"
                      className="form-control"
                      value={formData.objective}
                      onChange={handleInputChange}
                      style={{ borderColor: "#D2B48C" }}
                    ></textarea>
                    {errors.objective && (
                      <p className="text-danger">{errors.objective}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="skills"
                      placeholder="Skills (comma-separated)"
                      className="form-control"
                      value={formData.skills}
                      onChange={handleInputChange}
                      style={{ borderColor: "#D2B48C" }}
                    />
                    {errors.skills && (
                      <p className="text-danger">{errors.skills}</p>
                    )}
                  </div>
                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => setStep(step - 1)}
                      style={{
                        backgroundColor: "#B8860B",
                        color: "#F5F5F5",
                        marginRight: "10px",
                      }}
                    >
                      <i className="fas fa-arrow-left"></i> Back
                    </button>
                    <button
                      type="button"
                      className="btn"
                      onClick={handleNextStep}
                      style={{
                        backgroundColor: "#B8860B",
                        color: "#F5F5F5",
                      }}
                    >
                      Next <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </form>
              </div>
            )}
            {step === 3 && (
              <div>
                <h6>Step 3: Education</h6>
                <form>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="institution"
                      placeholder="Institution"
                      className="form-control"
                      value={formData.education[0].institution}
                      onChange={(e) => handleArrayChange(e, "education", 0)}
                      style={{ borderColor: "#D2B48C" }}
                    />
                    {errors.institution && (
                      <p className="text-danger">{errors.institution}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="degree"
                      placeholder="Degree"
                      className="form-control"
                      value={formData.education[0].degree}
                      onChange={(e) => handleArrayChange(e, "education", 0)}
                      style={{ borderColor: "#D2B48C" }}
                    />
                    {errors.degree && (
                      <p className="text-danger">{errors.degree}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="graduationYear"
                      placeholder="Graduation Year"
                      className="form-control"
                      value={formData.education[0].graduationYear}
                      onChange={(e) => handleArrayChange(e, "education", 0)}
                      style={{ borderColor: "#D2B48C" }}
                    />
                    {errors.graduationYear && (
                      <p className="text-danger">{errors.graduationYear}</p>
                    )}
                  </div>
                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => setStep(step - 1)}
                      style={{
                        backgroundColor: "#B8860B",
                        color: "#F5F5F5",
                        marginRight: "10px",
                      }}
                    >
                      <i className="fas fa-arrow-left"></i> Back
                    </button>
                    <button
                      type="submit"
                      className="btn"
                      onClick={handleRegister}
                      style={{
                        backgroundColor: "#B8860B",
                        color: "#F5F5F5",
                      }}
                    >
                      Register <i className="fas fa-check"></i>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
