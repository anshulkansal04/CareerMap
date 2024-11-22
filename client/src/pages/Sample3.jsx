import React, { useEffect, useState } from "react";

const Sample3 = () => {
  const [extraDetailsData, setExtraDetailsData] = useState([]);

  const getExtraDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/getExtraDetails`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        setExtraDetailsData(data.data);
      } else {
        console.error("Failed to fetch extra details");
      }
    } catch (error) {
      console.error("Error fetching extra details:", error);
    }
  };

  useEffect(() => {
    getExtraDetails();
  }, []);

  console.log("Extra Details Data:", extraDetailsData);

  return (
    <div className="extra-details-container">
      <h2>Extra Details</h2>
      {extraDetailsData && extraDetailsData.length > 0 ? (
        <div>
          {extraDetailsData.map((item, index) => (
            <div key={index} className="extra-details-card">
              <p>Family Income: {item.familyIncome}</p>
              <p>Sport Interest: {item.sportInterest}</p>
              <p>Other Sport: {item.otherSport || "None"}</p>
              <p>Preferred State: {item.preferredState}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No extra details found.</p>
      )}
    </div>
  );
};

export default Sample3;
