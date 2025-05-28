import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { 
  FaSignInAlt, 
  FaSignOutAlt, 
  FaUser, 
  FaGraduationCap, 
  FaHome,
  FaBrain,
  FaInfoCircle,
  FaBars,
  FaTimes,
  FaUniversity,
  FaAward
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../auth/authslice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "College Predictor", path: "/collegeprediction", icon: <FaUniversity /> },
    { name: "Career Map", path: "/careermap", icon: <FaBrain /> },
    { name: "Scholarships", path: "/scholarship", icon: <FaAward /> },
    { name: "About Us", path: "/who-we-are", icon: <FaInfoCircle /> },
  ];
  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && <div className="mobile-menu-overlay active" onClick={() => setIsMobileMenuOpen(false)} />}
      
      <header className="nep-navbar">
        <div className="nep-navbar-container">
          <div className="nep-navbar-content">
            <div className="nep-navbar-logo">
              <FaGraduationCap className="logo-icon" />
              <div className="logo-text">
                <span className="logo-main">NEP Future Fit</span>
                <span className="logo-subtitle">Education & Career Guidance</span>
              </div>
            </div>

          <nav className={`nep-navbar-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            {navLinks.map((link) => (
              <NavLink
                to={link.path}
                key={link.name}
                className={({ isActive }) =>
                  `nep-navbar-link ${isActive ? "active" : ""}`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="link-icon">{link.icon}</span>
                <span className="link-text">{link.name}</span>
              </NavLink>
            ))}
            
            {/* Mobile Auth Actions */}
            <div className="mobile-auth-actions">
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="nep-navbar-link mobile-auth-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="link-icon"><FaUser /></span>
                    <span className="link-text">Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="nep-navbar-link mobile-auth-link mobile-logout"
                    aria-label="Logout"
                  >
                    <span className="link-icon"><FaSignOutAlt /></span>
                    <span className="link-text">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="nep-navbar-link mobile-auth-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="link-icon"><FaSignInAlt /></span>
                    <span className="link-text">Login</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="nep-navbar-link mobile-auth-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="link-icon"><FaUser /></span>
                    <span className="link-text">Register</span>
                  </Link>
                </>
              )}
            </div>
          </nav>

          <div className="nep-navbar-actions desktop-only">
            {user ? (
              <div className="user-menu">
                <Link to="/dashboard" className="nep-navbar-cta dashboard">
                  <FaUser /> Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="nep-navbar-cta logout"
                  aria-label="Logout"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
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
              </div>
            )}
          </div>          <button 
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
    </>
  );
}
