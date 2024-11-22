import React, { useEffect, useState } from "react";

const Sample2 = () => {
  const [educationData, setEducationData] = useState([]);

  const getEducationData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/geteducation`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        setEducationData(data.data);
      } else {
        console.error("Failed to fetch education details");
      }
    } catch (error) {
      console.error("Error fetching education details:", error);
    }
  };

  useEffect(() => {
    getEducationData();
  }, []);

  console.log("Education Data:", educationData);

  return (
    <div className="education-info-container">
      <h2>Education Details</h2>
      {educationData && educationData.length > 0 ? (
        <div>
          {educationData.map((item, index) => (
            <div key={index} className="education-info-card">
              <h3>Current Class: {item.currentClass || "N/A"}</h3>
              <p>JEE Rank: {item.jeeRank || "N/A"}</p>
              <p>Percentage: {item.percentage || "N/A"}%</p>
              <p>Interest: {item.interest || "N/A"}</p>
              <h4>Marks:</h4>
              {item.marks && item.marks.length > 0 ? (
                item.marks.map((mark, i) => (
                  <div key={i} className="marks-info">
                    <p>Class: {mark.className || "N/A"}</p>
                    <p>English: {mark.english || "N/A"}</p>
                    <p>Maths: {mark.maths || "N/A"}</p>
                    <p>Science: {mark.science || "N/A"}</p>
                    <p>Social Science: {mark.socialScience || "N/A"}</p>
                  </div>
                ))
              ) : (
                <p>No marks available.</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No education details found.</p>
      )}
    </div>
  );
};

export default Sample2;
