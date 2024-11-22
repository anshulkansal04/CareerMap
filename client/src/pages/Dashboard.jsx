import React, { useState } from "react";
import {
  Home,
  BarChart2,
  User,
  Menu,
  XCircle,
  FileText,
  Edit,
} from "lucide-react";
import "./Dash.css";
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
import jsPDF from "jspdf";
import "jspdf-autotable";

// Mock Data
const userData = {
  name: "Emily Johnson",
  gender: "Female",
  email: "emily.johnson@example.com",
  contactNumber: "+1 (555) 123-4567",
  state: "California",
  city: "San Francisco",
  postalCode: "94105",
  familyIncome: "$50,000",
  sportsInterested: "Basketball, Chess",
};

const marksData = [
  { class: "9th", English: 65, Maths: 45, Science: 34, SocialScience: 34 },
  { class: "10th", English: 56, Maths: 75, Science: 78, SocialScience: 34 },
  { class: "11th", English: 34, Maths: 67, Science: 89, SocialScience: 86 },
  { class: "12th", English: 85, Maths: 88, Science: 90, SocialScience: 92 },
];

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <HomePage />;
      case "userInfo":
        return <UserInformationPage />;
      case "marks":
        return <MarksAnalysisPage />;
      case "quickActions":
        return <QuickActionsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="-app-container">
      <div
        className={`-sidebar ${
          isSidebarOpen ? "-sidebar-open" : "-sidebar-closed"
        }`}
      >
        <button
          className="-sidebar-toggle"
          onClick={toggleSidebar}
          aria-label={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        >
          {isSidebarOpen ? <XCircle /> : <Menu />}
        </button>
        <nav className="-nav">
          <button
            className={`-nav-item ${activePage === "home" ? "-active" : ""}`}
            onClick={() => setActivePage("home")}
          >
            <Home className="-nav-icon" />
            {isSidebarOpen && <span className="-nav-text">Dashboard</span>}
          </button>
          <button
            className={`-nav-item ${
              activePage === "userInfo" ? "-active" : ""
            }`}
            onClick={() => setActivePage("userInfo")}
          >
            <User className="-nav-icon" />
            {isSidebarOpen && (
              <span className="-nav-text">User Information</span>
            )}
          </button>
          <button
            className={`-nav-item ${activePage === "marks" ? "-active" : ""}`}
            onClick={() => setActivePage("marks")}
          >
            <BarChart2 className="-nav-icon" />
            {isSidebarOpen && <span className="-nav-text">Marks Analysis</span>}
          </button>
          <button
            className={`-nav-item ${
              activePage === "quickActions" ? "-active" : ""
            }`}
            onClick={() => setActivePage("quickActions")}
          >
            <FileText className="-nav-icon" />
            {isSidebarOpen && <span className="-nav-text">Quick Actions</span>}
          </button>
        </nav>
      </div>
      <main className={`-main-content ${isSidebarOpen ? "-with-sidebar" : ""}`}>
        {renderPage()}
      </main>
    </div>
  );
}

function HomePage() {
  return (
    <div className="-page-container">
      <h1 className="-welcome-title">Welcome, {userData.name}</h1>
      <div className="-home-grid">
        <div className="-info-card">
          <h3 className="-card-title">Current Location</h3>
          <p className="-card-text">
            {userData.city}, {userData.state}
          </p>
        </div>
      </div>
    </div>
  );
}

function UserInformationPage() {
  const [userDetails, setUserDetails] = useState(userData);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="-user-container">
      <h1 className="-page-title">User Information</h1>
      <div className="-user-card">
        <div className="-user-grid">
          {Object.entries(userDetails).map(([key, value]) => (
            <div key={key} className="-user-field">
              <strong className="-field-label">
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </strong>
              {isEditing ? (
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleInputChange}
                  className="-field-input"
                />
              ) : (
                <span className="-field-value">{value}</span>
              )}
            </div>
          ))}
        </div>
        <button
          className="-edit-button"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Save Changes" : "Edit Information"}
        </button>
      </div>
    </div>
  );
}

function MarksAnalysisPage() {
  return (
    <div className="-marks-container">
      <h1 className="-page-title">Marks Analysis</h1>
      <div className="-chart-card">
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
}

function QuickActionsPage() {
  const generatePDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    // Title
    doc.setFontSize(20);
    doc.setTextColor("#2c3e50");
    doc.setFont("helvetica", "bold");
    doc.text("Student Report", 105, 15, { align: "center" });

    // Section 1: Personal Information
    doc.setFontSize(14);
    doc.setTextColor("#000");
    doc.text("Personal Information", 10, 30);

    let y = 40; // Start vertical position
    const lineHeight = 7; // Spacing between lines

    doc.text(`Name: ${userData.name}`, 10, y);
    y += lineHeight; // Move to the next line
    doc.text(`Gender: ${userData.gender}`, 10, y);
    y += lineHeight;
    doc.text(`Email: ${userData.email}`, 10, y);
    y += lineHeight;
    doc.text(`Contact Number: ${userData.contactNumber}`, 10, y);
    y += lineHeight;
    doc.text(`Location: ${userData.city}, ${userData.state}`, 10, y);
    y += lineHeight;
    doc.text(`Family Income: ${userData.familyIncome}`, 10, y);
    y += lineHeight;
    doc.text(`Sports Interested: ${userData.sportsInterested}`, 10, y);

    // Section 2: Educational Information
    const tableData = marksData.map((row) => [
      row.class,
      row.English,
      row.Maths,
      row.Science,
      row.SocialScience,
    ]);

    doc.autoTable({
      startY: 100,
      head: [["Class", "English", "Maths", "Science", "Social Science"]],
      body: tableData,
    });

    doc.save("Report.pdf");
  };

  return (
    <div className="-quick-container">
      <h1 className="-page-title">Quick Actions</h1>
      <div className="-actions-group">
        <button className="-action-button -generate" onClick={generatePDF}>
          <FileText className="-action-icon" />
          Generate PDF
        </button>
      </div>
    </div>
  );
}





export default App;



