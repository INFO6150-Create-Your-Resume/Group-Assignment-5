import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import RegisterForm from "./components/RegisterForm";
import HomePage from "./components/HomePage"; // Import the homepage component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />{" "}
        {/* Home page as default */}
        <Route path="/" element={<HomePage />} /> {/* Redirect to home */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
};

export default App;
