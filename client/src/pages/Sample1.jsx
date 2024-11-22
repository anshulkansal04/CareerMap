// import React, { useEffect, useState } from "react";

// const Sampl1 = () => {
//   const [personalInfo, setPersonalInfo] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchPersonalInfo = async () => {
//       try {
//         const response = await fetch("/api/getPersonalInfo");

//         if (!response.ok) {
//           throw new Error("Failed to fetch personal information");
//         }

//         const data = await response.json();
//         console.log("Fetched Personal Info:", data); // Log the fetched data
//         setPersonalInfo(data.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error:", err);
//         setError("Error fetching data");
//         setLoading(false);
//       }
//     };

//     fetchPersonalInfo();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       <h2>Personal Information</h2>
//       <pre>{JSON.stringify(personalInfo, null, 2)}</pre>
//     </div>
//   );
// };

// export default Sampl1;
import React, { useEffect, useState } from "react";

// Sample1 Component to fetch and display personal info
const Sample1 = () => {
  const [personalData, setPersonalData] = useState([]);

  const getPersonalData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/getpersonal`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      
      if (data.success) {
        setPersonalData(data.data);
      } else {
        console.error("Failed to fetch personal data");
      }
    } catch (error) {
      console.error("Error fetching personal data:", error);
    }
  };

  useEffect(() => {
    getPersonalData();
  }, []);

  console.log("Personal Data:", personalData);
  console.log(personalData); // This will log the fetched data for debugging

  return (
    <div className="personal-info-container">
      <h2>Personal Information</h2>
      {personalData && personalData.length > 0 ? (
        <div>
          {personalData.map((item, index) => (
            <div key={index} className="personal-info-card">
              <h3>{`${item.firstName} ${item.middleName} ${item.lastName}`}</h3>
              <p>Email: {item.email}</p>
              <p>Phone: {item.phone}</p>
              <p>Gender: {item.gender}</p>
              <p>Location: {item.city}, {item.state}</p>
              <p>Postal Code: {item.postalCode}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No personal information found.</p>
      )}
    </div>
  );
};

export default Sample1;
