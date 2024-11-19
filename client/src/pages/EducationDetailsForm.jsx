import React, { useState } from "react";
import "./EducationDetailsForm.css";

function EducationDetailsForm() {
  const [formData, setFormData] = useState({
    currentClass: "",
    marks: [],
    jeeRank: "",
    percentage: "",
    interest: "",
  });

  const interests = [
    "Content Writing",
    "Graphic Design",
    "Fashion Designing",
    "Fitness and Personal Training",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generateMarksFields = (currentClass) => {
    const classRange = [];
    for (let i = currentClass - 3; i <= currentClass; i++) {
      classRange.push({
        className: `Class ${i}`,
        english: "",
        maths: "",
        science: "",
        socialScience: "",
      });
    }
    return classRange;
  };

  const handleClassChange = (e) => {
    const selectedClass = e.target.value;
    const newMarks = selectedClass ? generateMarksFields(parseInt(selectedClass)) : [];
    setFormData({
      ...formData,
      currentClass: selectedClass,
      marks: newMarks,
      jeeRank: "",
      percentage: "",
    });
  };

  const handleMarksChange = (className, subject, value) => {
    const updatedMarks = formData.marks.map(mark =>
      mark.className === className
        ? { ...mark, [subject]: value }
        : mark
    );
    setFormData({ ...formData, marks: updatedMarks });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Education Details Submitted: ", formData);
    alert("Education details submitted!");
  };

  const showJeeSection = formData.currentClass === "12";

  return (
    <div className="education-form-container">
      <div className="education-banner">
        <img
          src="/api/placeholder/600/200"
          alt="Education Banner"
          className="education-banner-image"
        />
      </div>

      <div className="education-heading">
        <h2>Educational Details</h2>
      </div>

      <form className="education-form" onSubmit={handleSubmit}>
        <div className="education-form-group">
          <label>Select Current Class</label>
          <select
            name="currentClass"
            value={formData.currentClass}
            onChange={handleClassChange}
            className="education-input"
            required
          >
            <option value="">Select Class</option>
            {[...Array(9)].map((_, i) => (
              <option key={i + 4} value={i + 4}>
                Class {i + 4}
              </option>
            ))}
          </select>
        </div>

        {formData.marks.length > 0 && (
          <div className="marks-section">
            <h3>Enter Marks for Last Four Classes</h3>
            {formData.marks.map((mark) => (
              <div key={mark.className} className="marks-row">
                <h4>{mark.className}</h4>
                <div className="marks-inputs">
                  <input
                    type="number"
                    placeholder="English Marks"
                    value={mark.english}
                    onChange={(e) =>
                      handleMarksChange(mark.className, "english", e.target.value)
                    }
                    className="marks-input"
                    required
                    min="0"
                    max="100"
                  />
                  <input
                    type="number"
                    placeholder="Maths Marks"
                    value={mark.maths}
                    onChange={(e) =>
                      handleMarksChange(mark.className, "maths", e.target.value)
                    }
                    className="marks-input"
                    required
                    min="0"
                    max="100"
                  />
                  <input
                    type="number"
                    placeholder="Science Marks"
                    value={mark.science}
                    onChange={(e) =>
                      handleMarksChange(mark.className, "science", e.target.value)
                    }
                    className="marks-input"
                    required
                    min="0"
                    max="100"
                  />
                  <input
                    type="number"
                    placeholder="Social Science Marks"
                    value={mark.socialScience}
                    onChange={(e) =>
                      handleMarksChange(mark.className, "socialScience", e.target.value)
                    }
                    className="marks-input"
                    required
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {showJeeSection && (
          <div className="additional-details">
            <h3>12th Class Additional Details</h3>
            <div className="education-form-group">
              <label>JEE Rank (if applicable)</label>
              <input
                type="number"
                name="jeeRank"
                placeholder="Enter JEE Rank"
                value={formData.jeeRank}
                onChange={handleInputChange}
                className="education-input"
                min="1"
              />
            </div>
            <div className="education-form-group">
              <label>12th Percentage</label>
              <input
                type="number"
                name="percentage"
                placeholder="Enter Percentage"
                value={formData.percentage}
                onChange={handleInputChange}
                className="education-input"
                required
                min="0"
                max="100"
                step="0.01"
              />
            </div>
          </div>
        )}

        <div className="education-form-group">
          <label>Select Interest</label>
          <select
            name="interest"
            value={formData.interest}
            onChange={handleInputChange}
            className="education-input"
            required
          >
            <option value="">Select Interest</option>
            {interests.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="education-submit-button">
          Next
        </button>
      </form>
    </div>
  );
}

export default EducationDetailsForm;