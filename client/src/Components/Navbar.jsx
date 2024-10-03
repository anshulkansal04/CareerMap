import React from "react";
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-logo-container">
        <img src="/placeholder.svg" alt="Coreplus logo" className="navbar-logo" />
        <span className="navbar-brand-name">coreplus</span>
      </div>
      <nav className="navbar-links">
        <a href="#">FEATURES</a>
        <a href="#">ADD ONS</a>
        <a href="#">PRICING</a>
        <a href="#">RESOURCES</a>
        <a href="#">LOGIN</a>
      </nav>
      <a href="#" className="navbar-cta-button">
        FREE TRIAL
      </a>
    </header>
  );
}
