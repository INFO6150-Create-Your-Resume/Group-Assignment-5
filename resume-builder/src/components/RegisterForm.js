import React, { useState } from "react";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    contact: "",
    email: "",
    address: "",
    linkedin: "",
    portfolio: "",
    password: "",
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <div
        className="card register-card"
        style={{ backgroundColor: "#E8D3C8", color: "#664C33", width: "500px" }}
      >
        <h3 className="text-center" style={{ color: "#B8860B" }}>
          Build Your Resume
        </h3>
        <div className="progress">
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
                  required
                  style={{ borderColor: "#D2B48C" }}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="contact"
                  placeholder="Contact Number"
                  className="form-control"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                  style={{ borderColor: "#D2B48C" }}
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{ borderColor: "#D2B48C" }}
                />
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
              </div>
              <button
                type="button"
                className="btn w-100"
                onClick={nextStep}
                style={{ backgroundColor: "#B8860B", color: "#F5F5F5" }}
              >
                Next <i className="fas fa-arrow-right"></i>
              </button>
            </form>
          </div>
        )}
        {step === 2 && (
          <div>
            <h6>Step 2: Career Objective</h6>
            <form>
              <div className="mb-3">
                <textarea
                  name="objective"
                  placeholder="Your career objective"
                  className="form-control"
                  value={formData.objective}
                  onChange={handleInputChange}
                  required
                  style={{ borderColor: "#D2B48C" }}
                ></textarea>
              </div>
              <button
                type="button"
                className="btn w-100"
                onClick={prevStep}
                style={{ backgroundColor: "#B8860B", color: "#F5F5F5" }}
              >
                <i className="fas fa-arrow-left"></i> Back
              </button>
              <button
                type="button"
                className="btn w-100"
                onClick={nextStep}
                style={{ backgroundColor: "#B8860B", color: "#F5F5F5" }}
              >
                Next <i className="fas fa-arrow-right"></i>
              </button>
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
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      education: [
                        {
                          ...formData.education[0],
                          institution: e.target.value,
                        },
                      ],
                    })
                  }
                  required
                  style={{ borderColor: "#D2B48C" }}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="degree"
                  placeholder="Degree"
                  className="form-control"
                  value={formData.education[0].degree}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      education: [
                        {
                          ...formData.education[0],
                          degree: e.target.value,
                        },
                      ],
                    })
                  }
                  required
                  style={{ borderColor: "#D2B48C" }}
                />
              </div>
              <button
                type="button"
                className="btn w-100"
                onClick={prevStep}
                style={{ backgroundColor: "#B8860B", color: "#F5F5F5" }}
              >
                <i className="fas fa-arrow-left"></i> Back
              </button>
              <button
                type="submit"
                className="btn w-100"
                onClick={handleRegister}
                style={{ backgroundColor: "#B8860B", color: "#F5F5F5" }}
              >
                Register <i className="fas fa-check"></i>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
