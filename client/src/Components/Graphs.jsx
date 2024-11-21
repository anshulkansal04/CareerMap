import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MarksChart = ({ subject, data }) => {
  // Prepare the chart data and options
  const chartData = {
    labels: ["Class 9", "Class 10", "Class 11", "Class 12"], // Classes as labels
    datasets: data.map((marks, index) => ({
      label: `Term ${index + 1}`, // Line for each term
      data: marks,
      borderColor: `rgba(${50 + index * 50}, ${100 + index * 50}, 200, 1)`,
      backgroundColor: `rgba(${50 + index * 50}, ${100 + index * 50}, 200, 0.2)`,
      tension: 0.4, // Smooth lines
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Marks Trend for ${subject}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Marks",
        },
      },
      x: {
        title: {
          display: true,
          text: "Classes",
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

const Dashboard = () => {
  // Example marks data for each subject
  const marksData = {
    Math: [
      [75, 80, 85, 90], // Marks for Term 1
      [70, 75, 80, 85], // Marks for Term 2
      [65, 70, 75, 80], // Marks for Term 3
      [60, 65, 70, 75], // Marks for Term 4
    ],
    Science: [
      [78, 82, 88, 92],
      [72, 78, 84, 90],
      [68, 74, 80, 86],
      [65, 70, 75, 80],
    ],
    English: [
      [85, 87, 89, 91],
      [82, 85, 88, 90],
      [80, 82, 84, 86],
      [78, 80, 82, 85],
    ],
    History: [
      [70, 72, 74, 76],
      [68, 70, 72, 75],
      [65, 68, 70, 73],
      [63, 65, 67, 70],
    ],
  };

  return (
    <div>
      <h1>Student Marks Dashboard</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {Object.entries(marksData).map(([subject, data]) => (
          <MarksChart key={subject} subject={subject} data={data} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
