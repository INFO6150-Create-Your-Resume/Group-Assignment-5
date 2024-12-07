// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Login from "./components/Login";
// import RegisterForm from "./components/RegisterForm";
// import HomePage from "./components/HomePage";
// import Library from "./components/Library";
// import Profile from "./components/Profile";

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);

//   // Check for user and token in localStorage on load
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const userData = localStorage.getItem("user");

//     if (token && userData) {
//       try {
//         const parsedUser = JSON.parse(userData); // Parse the user data
//         console.log("Retrieved User from LocalStorage:", parsedUser);
//         setUser(parsedUser); // Set the user state
//         setIsLoggedIn(true); // Set logged-in state
//       } catch (error) {
//         console.error("Error parsing user data:", error);
//         localStorage.clear(); // Clear corrupted data
//         setUser(null); // Reset state
//         setIsLoggedIn(false);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     const handleBeforeUnload = () => {
//       localStorage.clear(); // Clear user data from localStorage
//       setIsLoggedIn(false); // Reset state
//       setUser(null);
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);
//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, []);

//   // Handle logout and clear state
//   const handleSignOut = () => {
//     localStorage.clear();
//     setIsLoggedIn(false);
//     setUser(null);
//   };

//   return (
//     <Router>
//       <Navbar
//         isLoggedIn={isLoggedIn}
//         user={user}
//         handleSignOut={handleSignOut}
//       />
//       <Routes>
//         {/* Logged-in Home Route */}
//         <Route
//           path="/home"
//           element={
//             isLoggedIn ? (
//               <HomePage isLoggedIn={isLoggedIn} user={user} />
//             ) : (
//               <Navigate to="/" replace />
//             )
//           }
//         />

//         {/* Non-logged-in Home Route */}
//         <Route
//           path="/"
//           element={
//             !isLoggedIn ? (
//               <HomePage isLoggedIn={isLoggedIn} user={user} />
//             ) : (
//               <Navigate to="/home" replace />
//             )
//           }
//         />

//         {/* Login Route */}
//         <Route
//           path="/login"
//           element={<Login setUser={setUser} setIsLoggedIn={setIsLoggedIn} />}
//         />

//         {/* Register Route */}
//         <Route
//           path="/register"
//           element={
//             <RegisterForm setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
//           }
//         />

//         {/* Protected Library Route */}
//         <Route
//           path="/library"
//           element={
//             isLoggedIn ? (
//               <Library
//                 isLoggedIn={isLoggedIn}
//                 user={user}
//                 handleSignOut={handleSignOut}
//               />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />

//         {/* Protected Profile Route */}
//         <Route
//           path="/profile"
//           element={
//             isLoggedIn ? (
//               <Profile
//                 isLoggedIn={isLoggedIn}
//                 user={user}
//                 handleSignOut={handleSignOut}
//               />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import RegisterForm from "./components/RegisterForm";
import HomePage from "./components/HomePage";
import Library from "./components/Library";
import Profile from "./components/Profile";
import AdminPage from "./components/AdminPage";

const App = () => {
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
    }
  }, []);

  const handleSignOut = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <Router>
      {/* Navbar is always visible */}
      <Navbar
        isLoggedIn={isLoggedIn}
        user={user}
        handleSignOut={handleSignOut}
      />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<Login setUser={setUser} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/register"
          element={
            <RegisterForm setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route path="/library" element={<Library />} />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/admin"
          element={
            isLoggedIn && user?.role === "admin" ? (
              <AdminPage />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
