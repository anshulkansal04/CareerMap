import React from "react";
import { Link, useNavigate } from "react-router-dom";
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

  return (
    <header className="nep-navbar">
      <div className="container-nav nep-navbar-content">
        <div className="nep-navbar-logo">
          <span className="nep-navbar-brand">Future Fit</span>
        </div>
        <nav className="nep-navbar-links">
          {["Home", "Info of NEP", "Features", "Testimonials", "About Us"].map((item) => (
            <a href={`#${item.toLowerCase().replace(/\s+/g, "-")}`} key={item} className="nep-navbar-link">
              {item}
            </a>
          ))}
        </nav>
        <div className="nep-navbar-actions">
          {user ? (
            <button onClick={handleLogout} className="nep-navbar-cta logout">
              <FaSignOutAlt /> Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="nep-navbar-cta login">
                <FaSignInAlt /> Login
              </Link>
              <Link to="/signup" className="nep-navbar-cta register">
                <FaUser /> Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
