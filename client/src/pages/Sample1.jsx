import React, { useEffect, useState } from "react";

const Sample1 = () => {
  const [personalData, setPersonalData] = useState([]); // Store fetched data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isEditing, setIsEditing] = useState(false); // Editing mode state
  const [editableData, setEditableData] = useState([]); // Editable data state

  // Fields to display
  const selectedFields = [
    "firstName",
    "middleName",
    "lastName",
    "email",
    "phone",
    "gender",
    "state",
    "city",
    "postalCode",
  ];

  // Fetch personal data from the API
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
        setPersonalData(data.data); // Assuming `data.data` is an array of objects
        setEditableData(data.data); // Initialize editable data
      } else {
        console.error("Failed to fetch personal data");
      }
    } catch (error) {
      console.error("Error fetching personal data:", error);
    } finally {
      setIsLoading(false); // Stop loading once API call completes
    }
  };

  useEffect(() => {
    getPersonalData();
  }, []);

  // Handle input changes in edit mode
  const handleInputChange = (index, field, value) => {
    setEditableData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  // Save edited data
  const saveChanges = () => {
    setPersonalData(editableData); // Update main data with edited values
    setIsEditing(false); // Exit edit mode
    console.log("Saved Data:", editableData); // Debug: Log saved data
  };

  if (isLoading) return <p>Loading...</p>; // Show loading state
  if (!personalData || personalData.length === 0)
    return <p>No personal information found.</p>; // Handle no data case

  return (
    <div className="-user-container">
      <h1 className="-page-title">User Information</h1>
      {editableData.map((user, index) => (
        <div key={user._id} className="-user-card">
          <div className="-user-grid">
            {Object.entries(user)
              .filter(([key]) => selectedFields.includes(key)) // Filter by selected fields
              .map(([key, value]) => (
                <div key={key} className="-user-field">
                  <strong className="-field-label">
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </strong>
                  {isEditing ? (
                    <input
                      type="text"
                      name={key}
                      value={value}
                      onChange={(e) =>
                        handleInputChange(index, key, e.target.value)
                      }
                      className="-field-input"
                    />
                  ) : (
                    <span className="-field-value">{value}</span>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}
      <button
        className="-edit-button"
        onClick={isEditing ? saveChanges : () => setIsEditing(true)}
      >
        {isEditing ? "Save Changes" : "Edit Information"}
      </button>
    </div>
  );
};

export default Sample1;
