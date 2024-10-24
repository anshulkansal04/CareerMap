import React from 'react';

// Card Component
const Card = ({ subheading1, subheading2, onClick }) => {
  return (
    <div className="nep-card">
      <h2 className="nep-card-title">{subheading1}</h2>
      <h4 className="nep-card-subtitle">{subheading2}</h4>
      <button className="nep-card-button" onClick={onClick}>Learn More</button>
    </div>
  );
};

// CardContainer Component to render 6 tiles
const CardContainer = () => {
  const handleClick = (index) => {
    alert(`Card ${index + 1} clicked`);
  };

  const cardsData = [
    { subheading1: 'Feature 1', subheading2: 'Description 1' },
    { subheading1: 'Feature 2', subheading2: 'Description 2' },
    { subheading1: 'Feature 3', subheading2: 'Description 3' },
    { subheading1: 'Feature 4', subheading2: 'Description 4' },
    { subheading1: 'Feature 5', subheading2: 'Description 5' },
    { subheading1: 'Feature 6', subheading2: 'Description 6' },
  ];

  return (
    <div className="nep-cards">
      <div className="container">
      <h2 className="nep-carousel-title">Features</h2>
        <div className="nep-cards-grid">
          {cardsData.map((card, index) => (
            <Card
              key={index}
              subheading1={card.subheading1}
              subheading2={card.subheading2}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardContainer;