import React, { useState } from "react";
import "./../styles/register.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
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
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card register-card">
        <h3 className="text-center">Sign Up</h3>
        <div className="progress">
          <div
            className="progress-bar"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
        {step === 1 && (
          <div>
            <h6>Step 1: Personal Information</h6>
            <form>
              <div className="mb-3">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="form-control"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
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
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={nextStep}
              >
                Next <i className="fas fa-arrow-right"></i>
              </button>
            </form>
          </div>
        )}
        {step === 2 && (
          <div>
            <h6>Step 2: Career Goals</h6>
            <textarea
              placeholder="Describe your career goals"
              className="form-control"
            ></textarea>
            <button className="btn btn-secondary w-100" onClick={prevStep}>
              <i className="fas fa-arrow-left"></i> Back
            </button>
            <button className="btn btn-primary w-100" onClick={nextStep}>
              Next <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        )}
        {step === 3 && (
          <div>
            <h6>Step 3: Experience</h6>
            <textarea
              placeholder="Describe your experience"
              className="form-control"
            ></textarea>
            <button className="btn btn-secondary w-100" onClick={prevStep}>
              <i className="fas fa-arrow-left"></i> Back
            </button>
            <button
              type="submit"
              className="btn btn-success w-100"
              onClick={handleRegister}
            >
              Submit <i className="fas fa-check"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
