import React, { useState } from "react";
import "./ExtraDetailsForm.css";

function ExtraDetailsForm() {
  const [formData, setFormData] = useState({
    familyIncome: "",
    sportInterest: "",
    preferredState: "",
    otherSport: "",
  });

  const sportsOptions = [
    "Cricket", "Football", "Basketball", "Badminton", "Tennis", "Swimming", 
    "Athletics", "Hockey", "Table Tennis", "Volleyball"
  ];

  const statesOptions = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", 
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Extra details submitted successfully!");
  };

  return (
    <div className="extra-details-form-container">
      <div className="personal-banner">
        <img
          src="https://via.placeholder.com/600x200"
          alt="Banner"
          className="personal-banner-image"
        />
        <div className="personal-logo">Logo</div>
      </div>

      <h2 className="extra-details-heading">Extra Details</h2>

      <form className="extra-details-form" onSubmit={handleSubmit}>
        <div className="extra-details-form-group">
          <label className="extra-details-label">Family Income</label>
          <input
            type="text"
            name="familyIncome"
            placeholder="Enter Family Income"
            value={formData.familyIncome}
            onChange={handleInputChange}
            className="extra-details-input"
            required
          />
        </div>

        <div className="extra-details-form-group">
          <label className="extra-details-label">Sports Interested In</label>
          <select
            name="sportInterest"
            value={formData.sportInterest}
            onChange={handleInputChange}
            className="extra-details-input"
            required
          >
            <option value="">Select a Sport</option>
            {sportsOptions.map((sport, index) => (
              <option key={index} value={sport}>
                {sport}
              </option>
            ))}
          </select>
        </div>

        <div className="extra-details-form-group">
          <label className="extra-details-label">Others (if any)</label>
          <input
            type="text"
            name="otherSport"
            placeholder="Enter Other Sport"
            value={formData.otherSport}
            onChange={handleInputChange}
            className="extra-details-input"
          />
        </div>

        <div className="extra-details-form-group">
          <label className="extra-details-label">Preferred State</label>
          <select
            name="preferredState"
            value={formData.preferredState}
            onChange={handleInputChange}
            className="extra-details-input"
            required
          >
            <option value="">Select a State</option>
            {statesOptions.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="extra-details-submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ExtraDetailsForm;
