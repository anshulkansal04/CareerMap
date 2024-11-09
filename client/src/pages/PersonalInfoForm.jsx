import React, { useState } from "react";
import "./PersonalInfoForm.css";

function PersonalInfoForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    state: "",
    city: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.middleName.trim()) newErrors.middleName = "Middle name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) newErrors.email = "Valid email is required";
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = "Phone number must be 10 digits";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.postalCode.match(/^\d{5}$/)) newErrors.postalCode = "Postal code must be 5 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="personal-form-container">
      <div className="personal-banner">
        <img
          src="https://via.placeholder.com/600x200"
          alt="Banner"
          className="personal-banner-image"
        />
        <div className="personal-logo">Logo</div>
      </div>

      <h2 className="personal-heading">Personal Details</h2>

      <form className="personal-form" onSubmit={handleSubmit}>
        <div className="personal-form-group personal-name-group">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            className="personal-input"
          />
          <input
            type="text"
            name="middleName"
            placeholder="Middle Name"
            value={formData.middleName}
            onChange={handleInputChange}
            className="personal-input"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            className="personal-input"
          />
          {errors.firstName && <span className="personal-error">{errors.firstName}</span>}
          {errors.middleName && <span className="personal-error">{errors.middleName}</span>}
          {errors.lastName && <span className="personal-error">{errors.lastName}</span>}
        </div>

        <div className="personal-form-group">
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="personal-input"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <span className="personal-error">{errors.gender}</span>}
        </div>

        <div className="personal-form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="personal-input"
          />
          {errors.email && <span className="personal-error">{errors.email}</span>}
        </div>

        <div className="personal-form-group">
          <input
            type="text"
            name="phone"
            placeholder="Contact Number"
            value={formData.phone}
            onChange={handleInputChange}
            className="personal-input"
          />
          {errors.phone && <span className="personal-error">{errors.phone}</span>}
        </div>

        <div className="personal-form-group personal-location-group">
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleInputChange}
            className="personal-input"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
            className="personal-input"
          />
          {errors.state && <span className="personal-error">{errors.state}</span>}
          {errors.city && <span className="personal-error">{errors.city}</span>}
        </div>

        <div className="personal-form-group">
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleInputChange}
            className="personal-input"
          />
          {errors.postalCode && <span className="personal-error">{errors.postalCode}</span>}
        </div>

        <button type="submit" className="personal-next-button">Next</button>
      </form>
    </div>
  );
}

export default PersonalInfoForm;
