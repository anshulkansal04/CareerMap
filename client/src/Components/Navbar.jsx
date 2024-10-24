import React from "react";

export default function Navbar() {
  return (
    <header className="nep-navbar">
      <div className="container nep-navbar-content">
        <div className="nep-navbar-logo">
          <img src="/placeholder.svg" alt="Coreplus logo" />
          <span className="nep-navbar-brand">coreplus</span>
        </div>
        <nav className="nep-navbar-links">
          <a href="#" className="nep-navbar-link">Features</a>
          <a href="#" className="nep-navbar-link">Add Ons</a>
          <a href="#" className="nep-navbar-link">Pricing</a>
          <a href="#" className="nep-navbar-link">Resources</a>
          <a href="#" className="nep-navbar-link">Login</a>
        </nav>
        <a href="#" className="nep-navbar-cta">
          Free Trial
        </a>
      </div>
    </header>
  );
}