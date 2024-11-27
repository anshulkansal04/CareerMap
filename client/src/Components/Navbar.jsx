import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../auth/authslice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    // { name: "Rank to College", path: "/CollegePred" },
    { name: "Mind Map", path: "/careermap" },
    { name: "About us", path: "/who-we-are" },
  ];

  return (
    <header className="nep-navbar">
      <div className="container-nav nep-navbar-content">
        <div className="nep-navbar-logo">
            NEP Future Fit
        </div>
        <nav className="nep-navbar-links">
          {navLinks.map((link) => (
            <NavLink
              to={link.path}
              key={link.name}
              className={({ isActive }) =>
                `nep-navbar-link ${isActive ? "active" : ""}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
        <div className="nep-navbar-actions">
          {user ? (
            <button
              onClick={handleLogout}
              className="nep-navbar-cta logout"
              aria-label="Logout"
            >
              <FaSignOutAlt /> Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="nep-navbar-cta login" aria-label="Login">
                <FaSignInAlt /> Login
              </Link>
              <Link
                to="/signup"
                className="nep-navbar-cta register"
                aria-label="Register"
              >
                <FaUser /> Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
