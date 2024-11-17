import React from "react";
import { Link } from "react-router-dom";

// Card Component
const Card = ({ subheading1, subheading2, link }) => {
  return (
    <div className="nep-card">
      <h2 className="nep-card-title">{subheading1}</h2>
      <h4 className="nep-card-subtitle">{subheading2}</h4>
      <Link to={link} className="nep-card-button-link">
        <button className="nep-card-button">Learn More</button>
      </Link>
    </div>
  );
};

export default Card;
