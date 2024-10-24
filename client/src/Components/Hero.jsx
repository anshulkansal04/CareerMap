import React from "react";
import imgg from "../assets/1.png";
import "./styles.css";

export default function Hero() {
  return (
    <div className="nep-hero">
      <div className="container nep-hero-content">
        <div className="nep-hero-text">
          <h1 className="nep-hero-title">Welcome to Future Fit</h1>
          <p className="nep-hero-description">
            Revolutionize your healthcare practice with our cutting-edge management software. Acquire new clients, retain existing ones, and streamline your operations effortlessly.
          </p>
          <a href="#" className="nep-hero-cta">
            Get Started
          </a>
        </div>
        <div className="nep-hero-image">
          <img src={imgg} alt="Digital health practice management illustration" />
        </div>
      </div>
    </div>
  );
}