import React from 'react';
import './Card.css'; 

// Card Component
const Card = ({ subheading1, subheading2, onClick }) => {
  return (
    <div className="cards-tile">
      <h2 className="cards-heading-primary">{subheading1}</h2>
      <h4 className="cards-heading-secondary">{subheading2}</h4>
      <button className="cards-button" onClick={onClick}>Click On</button>
    </div>
  );
};

// CardContainer Component to render 6 tiles
const CardContainer = () => {
  const handleClick = (index) => {
    alert(`Card ${index + 1} clicked`);
  };

  const cardsData = [
    { subheading1: 'Title 1', subheading2: 'Description 1' },
    { subheading1: 'Title 2', subheading2: 'Description 2' },
    { subheading1: 'Title 3', subheading2: 'Description 3' },
    { subheading1: 'Title 4', subheading2: 'Description 4' },
    { subheading1: 'Title 5', subheading2: 'Description 5' },
    { subheading1: 'Title 6', subheading2: 'Description 6' },
  ];

  return (
    <div className="cards-grid-container">
      {cardsData.map((card, index) => (
        <Card
          key={index}
          subheading1={card.subheading1}
          subheading2={card.subheading2}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default CardContainer;
