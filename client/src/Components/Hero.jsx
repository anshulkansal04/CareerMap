import React from 'react';
import imgg from "../assets/1.png";
export default function Component() {
  return (
    <div className="hero-container">
      <header className="hero-header">
        <div className="hero-logo-container">
          <img src="/placeholder.svg" alt="Coreplus logo" className="hero-logo" />
          <span className="hero-brand-name">coreplus</span>
        </div>
        <nav className="hero-nav">
          <a href="#">FEATURES</a>
          <a href="#">ADD ONS</a>
          <a href="#">PRICING</a>
          <a href="#">RESOURCES</a>
          <a href="#">LOGIN</a>
        </nav>
        <a href="#" className="hero-cta-button">
          FREE TRIAL
        </a>
      </header>

      <main className="hero-main">
        <div className="hero-content">
          <h1>Digital health practice management</h1>
          <p>
            Healthcare practice management software that helps you acquire new
            clients and retain existing ones.
          </p>
          <a href="#" className="hero-start-button">
            GET STARTED
          </a>
        </div>
        <div className="hero-image-container">
          <img src={imgg} alt="Digital health practice management illustration" />
        </div>
      </main>
    </div>
  );
}
