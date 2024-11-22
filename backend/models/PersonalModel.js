const mongoose = require("mongoose");

const personalInfoSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add a first name"],
      trim: true,
    },
    middleName: {
      type: String,
      required: [true, "Please add a middle name"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Please add a last name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please enter a valid email"],
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number"],
      match: [/^\d{10}$/, "Phone number must be 10 digits"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Please select a gender"],
    },
    state: {
      type: String,
      required: [true, "Please add a state"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "Please add a city"],
      trim: true,
    },
    postalCode: {
      type: String,
      required: [true, "Please add a postal code"],
      match: [/^\d{5}$/, "Postal code must be 5 digits"],
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PersonalInfo", personalInfoSchema);