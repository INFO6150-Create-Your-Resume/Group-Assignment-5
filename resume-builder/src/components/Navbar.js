// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = ({ isLoggedIn, user, handleSignOut }) => {
//   return (
//     <nav
//       className="navbar navbar-expand-lg"
//       style={{ backgroundColor: "#B8860B" }}
//     >
//       <div className="container">
//         <Link
//           className="navbar-brand"
//           to="/"
//           style={{ color: "#F5F5F5", fontWeight: "bold" }}
//         >
//           Resume Builder
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto">
//             {isLoggedIn ? (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/library">
//                     Library
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/my-templates">
//                     My Templates
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/profile">
//                     Profile
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <button
//                     className="btn btn-light"
//                     onClick={handleSignOut}
//                     style={{
//                       backgroundColor: "#E8D3C8",
//                       color: "#664C33",
//                       border: "none",
//                     }}
//                   >
//                     Sign Out
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/templates">
//                     Templates
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/login">
//                     Sign In
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/register">
//                     Sign Up
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ isLoggedIn, user, handleSignOut }) => {
  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{ backgroundColor: "#B8860B" }}
    >
      <div className="container">
        <NavLink
          className="navbar-brand"
          to="/"
          style={{ color: "#F5F5F5", fontWeight: "bold" }}
        >
          Resume Builder
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Always Visible Links */}
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/templates"
                style={{ color: "#F5F5F5" }}
                activeStyle={{ fontWeight: "bold", color: "#E8D3C8" }}
              >
                Templates
              </NavLink>
            </li>
            {/* Conditional Links Based on Login State */}
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/library"
                    style={{ color: "#F5F5F5" }}
                    activeStyle={{ fontWeight: "bold", color: "#E8D3C8" }}
                  >
                    Library
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/my-templates"
                    style={{ color: "#F5F5F5" }}
                    activeStyle={{ fontWeight: "bold", color: "#E8D3C8" }}
                  >
                    My Templates
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/profile"
                    style={{ color: "#F5F5F5" }}
                    activeStyle={{ fontWeight: "bold", color: "#E8D3C8" }}
                  >
                    Profile
                  </NavLink>
                </li>
                {/* Admin Dropdown for Admin Role */}
                {user?.role === "admin" && (
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="adminDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ color: "#F5F5F5" }}
                    >
                      Admin
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="adminDropdown"
                      style={{ backgroundColor: "#E8D3C8" }}
                    >
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/admin-dashboard"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/manage-templates"
                        >
                          Manage Templates
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                )}
                <li className="nav-item">
                  <button
                    className="btn btn-light"
                    onClick={handleSignOut}
                    style={{
                      backgroundColor: "#E8D3C8",
                      color: "#664C33",
                      border: "none",
                      marginLeft: "10px",
                    }}
                    aria-label="Sign Out"
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/login"
                    style={{ color: "#F5F5F5" }}
                    activeStyle={{ fontWeight: "bold", color: "#E8D3C8" }}
                  >
                    Sign In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/register"
                    style={{ color: "#F5F5F5" }}
                    activeStyle={{ fontWeight: "bold", color: "#E8D3C8" }}
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
