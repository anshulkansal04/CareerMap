const EducationDetails = require("../models/EducationDetailsModel");

exports.getEducationDetails = async (req, res) => {
  try {
    console.log("Received request to fetch education details");

    // Fetch all education details from the database
    const educationDetailsData = await EducationDetails.find({});

    console.log("Education details fetched successfully");

    // Return the fetched data in the response
 
    res.json({ success: true, data: educationDetailsData });
} catch (error) {
    // Log the error and return a failure response
    res.status(500).json({ success: false, error: error });
    }
};
