import React, { useState, useEffect } from "react";
import {
  Home,
  BarChart2,
  User,
  Menu,
  XCircle,
  FileText,
  // Edit,
  ChevronRight ,
} from "lucide-react";
import Sample1 from "./Sample1";
import Sample2 from "./Sample2";
import "./Dash.css";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
import jsPDF from "jspdf";
import "jspdf-autotable";
import CollegePredictor from './CollegePred';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [marksData, setMarksData] = useState([]);
  const [personalData, setPersonalData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Marks Data from Backend
  const getMarksData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/geteducation", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        const formattedData = data.data
          .map((item) => {
            return item.marks.map((mark) => ({
              class: mark.className,
              English: mark.english,
              Maths: mark.maths,
              Science: mark.science,
              SocialScience: mark.socialScience,
              ...(mark.className === "Class 12" && {
                JEE_Rank: item.jeeRank,
                Percentage: item.percentage,
              }),
            }));
          })
          .flat();
        setMarksData(formattedData);
      } else {
        console.error("Failed to fetch education details");
      }
    } catch (error) {
      console.error("Error fetching education details:", error);
    }
  };

  // Fetch Personal Data from Backend
  const getPersonalData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/getpersonal", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        // Assuming the API returns a single user object
        setPersonalData(data.data[0]); // Update with the first user
      } else {
        console.error("Failed to fetch personal data");
      }
    } catch (error) {
      console.error("Error fetching personal data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMarksData();
    getPersonalData();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <HomePage marksData={marksData} personalData={personalData} />;
      case "userInfo":
        return <Sample1 />;
      case "marks":
        return <Sample2 />;
      case "quickActions":
        return <QuickActionsPage marksData={marksData} personalData={personalData} />;
      default:
        return <HomePage personalData={personalData} />;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="-app-container">
      <div
        className={`-sidebar ${isSidebarOpen ? "-sidebar-open" : "-sidebar-closed"
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
            className={`-nav-item ${activePage === "userInfo" ? "-active" : ""
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
            className={`-nav-item ${activePage === "quickActions" ? "-active" : ""
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

function HomePage({ marksData,personalData }) {
  
  const class12Data = marksData.find((item) => item.class === "Class 12");
  const JEE_Rank = class12Data ? class12Data.JEE_Rank : null;
  return (
    <div className="-page-container">
      <h1 className="-welcome-title">
        Welcome, {personalData ? `${personalData.firstName} ${personalData.lastName}` : "User"} to the College Recommendor
      </h1>
      <CollegePredictor initialRank={JEE_Rank} />
    </div>
    
    // <div>
    //   <h1>Welcome to the College Predictor</h1>
    //   <CollegePredictor initialRank={JEE_Rank} />
    // </div>
  );
}


function QuickActionsPage({ marksData, personalData }) {
  const generateEducationalPDF = () => {
    // Initialize PDF
    const doc = new jsPDF("p", "mm", "a4");

    // Add school-themed header
    doc.setFillColor(41, 128, 185); // Educational blue color
    doc.rect(0, 0, 210, 25, "F");

    // Add decorative elements
    doc.setDrawColor(52, 152, 219);
    doc.setLineWidth(0.5);
    doc.line(10, 27, 200, 27);

    // Title styling
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text("Academic Progress Report", 105, 15, { align: "center" });

    // Add small subtitle
    doc.setFontSize(12);
    doc.text("Academic Year 2023-2024", 105, 22, { align: "center" });

    // Student Information Section
    doc.setTextColor(44, 62, 80);
    doc.setFontSize(18);
    doc.text("Student Profile", 10, 40);

    // Personal Information Styling
    doc.setFontSize(11);
    doc.setTextColor(52, 73, 94);
    let y = 50;
    const lineHeight = 7;

    // Create information grid
    const personalInfo = [
      { label: "Name", value: `${personalData.firstName} ${personalData.middleName} ${personalData.lastName}` },
      { label: "Gender", value: personalData.gender },
      { label: "Email", value: personalData.email },
      { label: "Phone", value: personalData.phone },
      { label: "Location", value: `${personalData.city}, ${personalData.state}` },
      { label: "Postal Code", value: personalData.postalCode },
    ];

    personalInfo.forEach(info => {
      doc.setFont("helvetica", "bold");
      doc.text(`${info.label}:`, 10, y);
      doc.setFont("helvetica", "normal");
      doc.text(`${info.value}`, 45, y);
      y += lineHeight;
    });

    // Academic Performance Section
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(41, 128, 185);
    doc.text("Academic Performance", 10, 105);

    // Custom styling for the marks table
    // Custom styling for the marks table
    doc.autoTable({
      startY: 110,
      head: [["Class", "English", "Maths", "Science", "Social Science", "JEE Rank", "Percentage"]],
      body: marksData.map((row) => [
        row.class,
        row.English,
        row.Maths,
        row.Science,
        row.SocialScience,
        row.JEE_Rank ? row.JEE_Rank : "N/A",
        row.Percentage ? `${row.Percentage}%` : "N/A",
      ]),
      styles: {
        fontSize: 11,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: [255, 255, 255],
        fontSize: 12,
        fontStyle: "bold",
        halign: "center",
      },
      columnStyles: {
        0: { fontStyle: "bold", fillColor: [236, 240, 241] },
        1: { halign: "center" },
        2: { halign: "center" },
        3: { halign: "center" },
        4: { halign: "center" },
        5: { halign: "center", fontStyle: "bold", fillColor: [241, 196, 15] }, // JEE Rank column alignment
        6: { halign: "center", fontStyle: "bold", fillColor: [39, 174, 96] }, // Percentage column alignment
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },      
    });


    // Add performance summary
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(41, 128, 185);
    doc.text("Performance Summary", 10, finalY);

    // Calculate and add averages
    doc.setFontSize(11);
    doc.setTextColor(52, 73, 94);
    const averages = {
      English: marksData.reduce((acc, curr) => acc + curr.English, 0) / marksData.length,
      Maths: marksData.reduce((acc, curr) => acc + curr.Maths, 0) / marksData.length,
      Science: marksData.reduce((acc, curr) => acc + curr.Science, 0) / marksData.length,
      SocialScience: marksData.reduce((acc, curr) => acc + curr.SocialScience, 0) / marksData.length
    };

    let summaryY = finalY + 10;
    Object.entries(averages).forEach(([subject, avg]) => {
      doc.text(`Average ${subject} Score: ${avg.toFixed(1)}%`, 15, summaryY);
      summaryY += 7;
    });

    // Add footer
    doc.setFontSize(8);
    doc.setTextColor(127, 140, 141);
    doc.text(new Date().toLocaleDateString(), 185, 285, { align: "left" });
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(10);
    doc.text(
      "Generated by Future Fit",
      105,
      pageHeight - 12,
      { align: "center" }
    );
    // Add page numbers
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: "center" });
    }

    doc.save("Academic_Report.pdf");
  };


  return (
    <div className="-quick-container">
      <h1 className="-page-title">Quick Actions</h1>
      <div className="-actions-group">
        <button className="-action-button -generate" onClick={generateEducationalPDF}>
          <FileText className="-action-icon" />
          Generate PDF
        </button>
      </div>
    </div>
  );

  // const generatePDF = () => {
  //   const doc = new jsPDF("p", "mm", "a4");

  //   // Title
  //   doc.setFontSize(20);
  //   doc.setTextColor("#2c3e50");
  //   doc.setFont("helvetica", "bold");
  //   doc.text("Student Report", 105, 15, { align: "center" });

  //   // Section 1: Personal Information
  //   doc.setFontSize(14);
  //   doc.setTextColor("#000");
  //   doc.text("Personal Information", 10, 30);

  //   let y = 40; // Start vertical position
  //   const lineHeight = 7; // Spacing between lines

  //   doc.text(`Name: ${userData.name}`, 10, y);
  //   y += lineHeight; // Move to the next line
  //   doc.text(`Gender: ${userData.gender}`, 10, y);
  //   y += lineHeight;
  //   doc.text(`Email: ${userData.email}`, 10, y);
  //   y += lineHeight;
  //   doc.text(`Contact Number: ${userData.contactNumber}`, 10, y);
  //   y += lineHeight;
  //   doc.text(`Location: ${userData.city}, ${userData.state}`, 10, y);
  //   y += lineHeight;
  //   doc.text(`Family Income: ${userData.familyIncome}`, 10, y);
  //   y += lineHeight;
  //   doc.text(`Sports Interested: ${userData.sportsInterested}`, 10, y);

  //   // Section 2: Educational Information
  //   const tableData = marksData.map((row) => [
  //     row.class,
  //     row.English,
  //     row.Maths,
  //     row.Science,
  //     row.SocialScience,
  //   ]);

  //   doc.autoTable({
  //     startY: 100,
  //     head: [["Class", "English", "Maths", "Science", "Social Science"]],
  //     body: tableData,
  //   });

  //   doc.save("Report.pdf");
  // };

  // return (
  //   <div className="-quick-container">
  //     <h1 className="-page-title">Quick Actions</h1>
  //     <div className="-actions-group">
  //       <button className="-action-button -generate" onClick={generatePDF}>
  //         <FileText className="-action-icon" />
  //         Generate PDF
  //       </button>
  //     </div>
  //   </div>
  // );
}

export default App;