import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./ExtraDetailsForm.css"; // Add your CSS for styling

const ExtraDetailsForm = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submitExtraDetails = async (data) => {
    try {
      console.log("Extra Details Submitted: ", data);

      const response = await fetch("http://localhost:5000/api/users/extraDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(data);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Form submission successful!", await response.json());
      navigate("/dashboard"); 
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Extra Details Form</h2>
      <form onSubmit={handleSubmit(submitExtraDetails)} className="form">
        <div className="form-group">
          <label htmlFor="familyIncome">Family Income</label>
          <input
            type="text"
            placeholder="Enter Family Income"
            {...register("familyIncome")}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="sportInterest">Sport Interest</label>
          <select {...register("sportInterest")} required>
            <option value="">Select Sport Interest</option>
            <option value="football">Football</option>
            <option value="basketball">Basketball</option>
            <option value="cricket">Cricket</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="otherSport">Other Sport (if applicable)</label>
          <input
            type="text"
            placeholder="Enter Other Sport"
            {...register("otherSport")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="preferredState">Preferred State</label>
          <input
            type="text"
            placeholder="Enter Preferred State"
            {...register("preferredState")}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ExtraDetailsForm;
