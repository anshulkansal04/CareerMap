import React from "react";
import Card from "./Card"; // Import the Card component

const CardContainer = () => {
  // Define card data with links
  const cardsData = [
    { subheading1: "Rank-to-College", subheading2: "Enter Your Rank and Branch, and Let AI Guide You to Your Ideal College.", link: "/collegeprediction" },
    { subheading1: "Future Scholars Fund", subheading2: "Explore a Range of Scholarships to Support Your Educational Journey.", link: "/scholarship" },
    { subheading1: "Flexible Scheduling", subheading2: "Learn at your own pace and time.", link: "/" },
    { subheading1: "Expert Guidance", subheading2: "Learn from the best in the industry.", link: "/" },
    { subheading1: "Innovative Tools", subheading2: "Interactive tools for active engagement.", link: "/" },
    { subheading1: "Career Readiness", subheading2: "Skills and knowledge for the real world.", link: "/" },
  ];

  return (
    <div className="nep-cards" id="our-offerings">
      <div className="container">
        <h2 className="nep-carousel-title">Our Offerings</h2>
        <div className="nep-cards-grid">
          {cardsData.map((card, index) => (
            <Card
              key={index}
              subheading1={card.subheading1}
              subheading2={card.subheading2}
              link={card.link} // Passing link to the Card component
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardContainer;
