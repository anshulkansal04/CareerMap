const mongoose = require("mongoose");

const educationDetailsSchema = mongoose.Schema(
  {
    currentClass: {
      type: String, 
      trim: true,
    },
    marks: [
      {
        className: {
          type: String, 
          trim: true,
        },
        english: {
          type: Number, 
        },
        maths: {
          type: Number, 
        },
        science: {
          type: Number, 
        },
        socialScience: {
          type: Number, 
        },
      },
    ],
    jeeRank: {
      type: Number, 
    },
    percentage: {
      type: Number, 
    },
    interest: {
      type: String, 
      trim: true,
    },
 
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("EducationDetails", educationDetailsSchema);
