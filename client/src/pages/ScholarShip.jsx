import React, { useState } from "react";
import { Search, BookOpen, Calendar, Award, Users, ExternalLink } from "lucide-react";
import "./Scholar.css";

const scholarshipsData = [
  {
    "Name": "FREE BOOKS SCHEME FOR SC STUDENTS, HARYANA 2024-25",
    "Last Date to Apply": "31 December 2024",
    "Award": "A monthly stipend of ₹1,000 & ₹2,000 per student for the purchase of books",
    "Eligibility": "Scheduled Caste (SC) students of Haryana",
    "Link": "https://harchhatravratti.highereduhry.ac.in/"
  },
  {
    "Name": "HARYANA STATE MERITORIOUS INCENTIVE SCHEME 2024-25",
    "Last Date to Apply": "31 December 2024",
    "Award": "Up to ₹5,000 per annum",
    "Eligibility": "Undergraduate & Postgraduate students from General & Scheduled Caste (SC) category",
    "Link": "https://harchhatravratti.highereduhry.ac.in/"
  },
  {
    "Name": "AAPKI BETI HAMARI BETI SCHEME, HARYANA",
    "Last Date to Apply": "Not Available",
    "Award": "A one-time of ₹21,000 and other benefits",
    "Eligibility": "Families with two or more daughters who are studying in govt. recognised institutions",
    "Link": "https://wcdhry.gov.in/schemes-for-children/abhb/"
  },
  {
    "Name": "COLLEGE BOARD 90% FEE WAIVER PROGRAM",
    "Last Date to Apply": "Not Available",
    "Award": "Up to 100% tuition fee waiver",
    "Eligibility": "Class 12",
    "Link": "https://satsuite.collegeboard.org/sat/registration/fee-waivers"
  },
  {
    "Name": "CONSOLIDATED STIPEND SCHEME FOR SC STUDENTS, HARYANA 2024-25",
    "Last Date to Apply": "31 December 2024",
    "Award": "A monthly stipend of ₹1,000 and a book allowance of ₹2,000 per student",
    "Eligibility": "SC students of Haryana studying in Government Colleges",
    "Link": "https://harchhatravratti.highereduhry.ac.in/"
  }
];

function ScholarshipCard({ scholarship }) {
  return (
    <div className="scholarship-card-container">
      <div className="scholarship-card-header">
        <BookOpen className="scholarship-card-icon" />
        <h2>{scholarship.Name}</h2>
      </div>
      <div className="scholarship-card-body">
        <div className="scholarship-info-row">
          <Calendar className="scholarship-info-icon" />
          <div>
            <strong>Last Date to Apply:</strong>
            <p>{scholarship["Last Date to Apply"]}</p>
          </div>
        </div>
        <div className="scholarship-info-row">
          <Award className="scholarship-info-icon" />
          <div>
            <strong>Award:</strong>
            <p>{scholarship.Award}</p>
          </div>
        </div>
        <div className="scholarship-info-row">
          <Users className="scholarship-info-icon" />
          <div>
            <strong>Eligibility:</strong>
            <p>{scholarship.Eligibility}</p>
          </div>
        </div>
        <a href={scholarship.Link} target="_blank" rel="noopener noreferrer" className="scholarship-apply-button">
          Apply Now <ExternalLink className="scholarship-button-icon" />
        </a>
      </div>
    </div>
  );
}

export default function Scholarpage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [scholarships, setScholarships] = useState(scholarshipsData);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredScholarships = scholarshipsData.filter(scholarship =>
      scholarship.Name.toLowerCase().includes(term) ||
      scholarship.Eligibility.toLowerCase().includes(term)
    );
    setScholarships(filteredScholarships);
  };

  return (
    <div className="scholarship-page-container">
      <header className="scholarship-header">
        <h1>Scholarship Opportunities</h1>
        <p>Empowering Education, Enabling Dreams</p>
      </header>
      <div className="scholarship-search-container">
        <input
          type="text"
          placeholder="Search scholarships..."
          value={searchTerm}
          onChange={handleSearch}
          className="scholarship-search-input"
        />
        <Search className="scholarship-search-icon" />
      </div>
      <div className="scholarship-grid-container">
        {scholarships.map((scholarship, index) => (
          <ScholarshipCard key={index} scholarship={scholarship} />
        ))}
      </div>
    </div>
  );
}


// import React, { useState } from "react";
// import { Search, BookOpen, Calendar, Award, Users, ExternalLink } from "lucide-react";
// import "./scholar.css";

// function ScholarshipCard({ scholarship }) {
//   return (
//     <div className="scholarship-card">
//       <div className="card-header">
//         <BookOpen className="card-icon" />
//         <h2>{scholarship.Name}</h2>
//       </div>
//       <div className="card-body">
//         <div className="info-row">
//           <Calendar className="info-icon" />
//           <div>
//             <strong>Last Date to Apply:</strong>
//             <p>{scholarship["Last Date to Apply"]}</p>
//           </div>
//         </div>
//         <div className="info-row">
//           <Award className="info-icon" />
//           <div>
//             <strong>Award:</strong>
//             <p>{scholarship.Award}</p>
//           </div>
//         </div>
//         <div className="info-row">
//           <Users className="info-icon" />
//           <div>
//             <strong>Eligibility:</strong>
//             <p>{scholarship.Eligibility}</p>
//           </div>
//         </div>
//         <a href={scholarship.Link} target="_blank" rel="noopener noreferrer" className="apply-button">
//           Apply Now <ExternalLink className="button-icon" />
//         </a>
//       </div>
//     </div>
//   );
// }

// export default function EducationalScholarshipPage() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [scholarships, setScholarships] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSearch = async (event) => {
//     if (event.key === 'Enter') {
//       setIsLoading(true);
//       setError(null);
      
//       try {
//         // First, trigger the scraping and JSON file creation
//         const scrapeResponse = await fetch('http://localhost:5000/api/scholarships', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ query: searchTerm }),
//         });

//         if (!scrapeResponse.ok) {
//           throw new Error('Failed to initiate scholarship search');
//         }

//         // Then, fetch the JSON file data
//         const dataResponse = await fetch('http://localhost:5000/api/scholarships-data');
//         if (!dataResponse.ok) {
//           throw new Error('Failed to fetch scholarship data');
//         }

//         const data = await dataResponse.json();
//         setScholarships(data);
//       } catch (err) {
//         setError(err.message);
//         console.error('Error:', err);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   return (
//     <div className="scholarship-page">
//       <header className="header">
//         <h1>Scholarship Opportunities</h1>
//         <p>Empowering Education, Enabling Dreams</p>
//       </header>
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search scholarships and press Enter..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           onKeyPress={handleSearch}
//           className="search-input"
//         />
//         <Search className="search-icon" />
//       </div>
      
//       {error && (
//         <div className="error-message">{error}</div>
//       )}
      
//       {isLoading ? (
//         <div className="loading-message">Searching for scholarships...</div>
//       ) : (
//         <div className="scholarship-grid">
//           {scholarships.map((scholarship, index) => (
//             <ScholarshipCard key={index} scholarship={scholarship} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }