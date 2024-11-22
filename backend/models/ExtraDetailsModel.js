const mongoose = require("mongoose");

const extraDetailsSchema = mongoose.Schema(
  {
   
    familyIncome: {
      type: String,
      required: [true, "Family Income is required"],
    },
    sportInterest: {
      type: String,
      required: [true, "Sport interest is required"],
    },
    otherSport: {
      type: String, 
      default: null,
    },
    preferredState: {      type: String,
      required: [true, "Preferred state is required"],
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("ExtraDetails", extraDetailsSchema);
