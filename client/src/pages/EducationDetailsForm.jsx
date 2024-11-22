import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./EducationDetailsForm.css";

function EducationDetailsForm() {
  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      currentClass: "",
      marks: [],
      jeeRank: "",
      percentage: "",
      interest: "",
    },
  });

  const navigate = useNavigate();

  const interests = [
    "Content Writing",
    "Graphic Design",
    "Fashion Designing",
    "Fitness and Personal Training",
    "Other",
  ];

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
    const selectedClass = parseInt(e.target.value);
    if (selectedClass) {
      const newMarks = generateMarksFields(selectedClass);
      setValue("marks", newMarks);
    } else {
      reset({ currentClass: "", marks: [], jeeRank: "", percentage: "", interest: "" });
    }
  };

  const handleMarksChange = (className, subject, value) => {
    const currentMarks = watch("marks");
    const updatedMarks = currentMarks.map((mark) =>
      mark.className === className
        ? { ...mark, [subject]: value }
        : mark
    );
    setValue("marks", updatedMarks);
  };

  const onSubmit = async (data) => {

    try {
      const response = await fetch("http://localhost:5000/api/users/education", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(data);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Form submission successful!", await response.json());
      navigate("/extraInfo"); // Redirect after form submission
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  const showJeeSection = watch("currentClass") === "12";

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

      <form className="education-form" onSubmit={handleSubmit(onSubmit)}>
        {/* Select Current Class */}
        <div className="education-form-group">
          <label htmlFor="currentClass">Select Current Class</label>
          <select
            id="currentClass"
            {...register("currentClass", { required: "Please select your current class" })}
            onChange={handleClassChange}
            className="education-input"
          >
            <option value="">Select Class</option>
            {[...Array(9)].map((_, i) => (
              <option key={i + 4} value={i + 4}>
                Class {i + 4}
              </option>
            ))}
          </select>
        </div>

        {/* Marks Section */}
        {watch("marks").length > 0 && (
          <div className="marks-section">
            <h3>Enter Marks for Last Four Classes</h3>
            {watch("marks").map((mark) => (
              <div key={mark.className} className="marks-row">
                <h4>{mark.className}</h4>
                <div className="marks-inputs">
                  {["english", "maths", "science", "socialScience"].map((subject) => (
                    <input
                      key={subject}
                      type="number"
                      placeholder={`${subject.charAt(0).toUpperCase() + subject.slice(1)} Marks`}
                      value={mark[subject]}
                      onChange={(e) =>
                        handleMarksChange(mark.className, subject, e.target.value)
                      }
                      className="marks-input"
                      required
                      min="0"
                      max="100"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Additional Details for 12th Class */}
        {showJeeSection && (
          <div className="additional-details">
            <h3>12th Class Additional Details</h3>
            <div className="education-form-group">
              <label htmlFor="jeeRank">JEE Rank (if applicable)</label>
              <input
                id="jeeRank"
                type="number"
                {...register("jeeRank")}
                placeholder="Enter JEE Rank"
                className="education-input"
                min="1"
              />
            </div>
            <div className="education-form-group">
              <label htmlFor="percentage">12th Percentage</label>
              <input
                id="percentage"
                type="number"
                {...register("percentage", {
                  required: "Please enter your 12th percentage",
                  min: { value: 0, message: "Percentage cannot be less than 0" },
                  max: { value: 100, message: "Percentage cannot exceed 100" },
                })}
                placeholder="Enter Percentage"
                className="education-input"
                step="0.01"
              />
            </div>
          </div>
        )}

        {/* Select Interest */}
        <div className="education-form-group">
          <label htmlFor="interest">Select Interest</label>
          <select
            id="interest"
            {...register("interest", { required: "Please select your interest" })}
            className="education-input"
          >
            <option value="">Select Interest</option>
            {interests.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="education-submit-button">
          Next
        </button>
      </form>
    </div>
  );
}

export default EducationDetailsForm;
