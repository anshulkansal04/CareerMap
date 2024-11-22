import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Sample2 = () => {
  const [marksData, setMarksData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetching the education data
  const getEducationData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/geteducation", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        // Format the data from the nested marks array
        const formattedData = data.data.map((item) => {
          return item.marks.map((mark) => ({
            class: mark.className,
            English: mark.english,
            Maths: mark.maths,
            Science: mark.science,
            SocialScience: mark.socialScience,
          }));
        }).flat(); // Flatten the array to get a single-level array of marks data

        setMarksData(formattedData); // Set the formatted marks data
      } else {
        console.error("Failed to fetch education details");
      }
    } catch (error) {
      console.error("Error fetching education details:", error);
    } finally {
      setIsLoading(false); // Stop loading after fetching
    }
  };

  useEffect(() => {
    getEducationData(); // Fetch data when component mounts
  }, []);

  // Show the loading spinner while data is fetching
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="-marks-container">
      <h1 className="-page-title">Marks Analysis</h1>
      
      {/* Chart Section */}
      <div className="-chart-card">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={marksData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="class" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="English"
              stroke="#3498db"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="Maths"
              stroke="#2ecc71"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="Science"
              stroke="#e74c3c"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="SocialScience"
              stroke="#f1c40f"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Marks Grid Section */}
      <div className="-marks-grid">
        {marksData.map((item, index) => (
          <div key={index} className="-marks-card">
            <h3 className="-marks-title">{item.class}</h3>
            <p className="-marks-value">English: {item.English}%</p>
            <p className="-marks-value">Maths: {item.Maths}%</p>
            <p className="-marks-value">Science: {item.Science}%</p>
            <p className="-marks-value">SocialScience: {item.SocialScience}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sample2;
