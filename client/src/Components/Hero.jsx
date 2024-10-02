import React from "react";
import imgg from "../assets/1.png";

export default function Info() {
  return (
    <div className="hero-container">
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
