import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Sample2 = () => {
  const [marksData, setMarksData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [vocationalRecommendations, setVocationalRecommendations] = useState(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  const getEducationData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/geteducation",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        // Format the data from the nested marks array
        const formattedData = data.data
          .map((item) => {
            return item.marks.map((mark) => ({
              class: mark.className,
              English: mark.english,
              Maths: mark.maths,
              Science: mark.science,
              SocialScience: mark.socialScience,
            }));
          })
          .flat();

        setMarksData(formattedData);

        // Calculate total marks for each subject across all classes
        const totalMarks = formattedData.reduce(
          (acc, curr) => ({
            English: acc.English + curr.English,
            Maths: acc.Maths + curr.Maths,
            Science: acc.Science + curr.Science,
            SocialScience: acc.SocialScience + curr.SocialScience,
          }),
          { English: 0, Maths: 0, Science: 0, SocialScience: 0 }
        );

        // Generate recommendations based on marks percentage
        const recommendationsList = [];
        if (totalMarks.English / (formattedData.length * 100) > 0.8) {
          recommendationsList.push(
            "Pursue a degree in Literature, Journalism, or Teaching."
          );
        }
        if (totalMarks.Maths / (formattedData.length * 100) > 0.8) {
          recommendationsList.push(
            "Explore Engineering, Data Science, or Actuarial Science."
          );
        }
        if (totalMarks.Science / (formattedData.length * 100) > 0.8) {
          recommendationsList.push(
            "Consider Medicine, Physics, or Environmental Science."
          );
        }
        if (totalMarks.SocialScience / (formattedData.length * 100) > 0.8) {
          recommendationsList.push(
            "Think about Sociology, Psychology, or Political Science."
          );
        }

        setRecommendations(recommendationsList);

        // Vocational recommendations based on user interest
        const userInterest = data.data[0]?.interest || "General"; // Fetch user interest
        const vocationalMap = {
          "Graphic Design": [
            "Web Development",
            "Adobe Creative Suite (Photoshop, Illustrator, InDesign)",
            "UI/UX Design Basics",
          ],
          "Content Writing": [
            "Copywriting",
            "SEO Writing",
            "Technical Writing",
          ],
          "Fashion Designing": [
            "Textile Design",
            "Fashion Technology",
            "Apparel Merchandising",
          ],
          "Fitness and Personal Training": [
            "Kinesiology",
            "Nutrition",
            "Sports Coaching",
          ],
        };

        const vocationalList = vocationalMap[userInterest] || [
          "Explore general vocational courses",
        ];
        setVocationalRecommendations(vocationalList);
      } else {
        console.error("Failed to fetch education details");
      }
    } catch (error) {
      console.error("Error fetching education details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEducationData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recommend-container">
      <h1 className="recommend-page-title">Marks Analysis</h1>

      {/* Chart Section */}
      <div className="recommend-chart-card">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={marksData}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
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
      <div className="recommend-grid">
        {marksData.map((item, index) => (
          <div key={index} className="recommend-card">
            <h3 className="recommend-title">{item.class}</h3>
            <p className="recommend-value">English: {item.English}%</p>
            <p className="recommend-value">Maths: {item.Maths}%</p>
            <p className="recommend-value">Science: {item.Science}%</p>
            <p className="recommend-value">
              SocialScience: {item.SocialScience}%
            </p>
          </div>
        ))}
      </div>

      {/* Recommendations Section */}
      <h2 className="recommend-page-title">Our Recommendations</h2>
      <div className="recommend-grid">
        {recommendations.map((rec, index) => (
          <div key={index} className="recommend-card">
            <p className="recommend-value">{rec}</p>
          </div>
        ))}
      </div>

      {/* Vocational Recommendations Section */}
      <h2 className="recommend-page-title">Vocational Recommendations</h2>
      <div className="recommend-grid">
        {vocationalRecommendations.map((voc, index) => (
          <div key={index} className="recommend-card">
            <p className="recommend-value">{voc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sample2;