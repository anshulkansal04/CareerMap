const ExtraDetails = require('../models/ExtraDetailsModel'); // Import the model

exports.getExtraDetails = async (req, res) => {
  try {
    console.log("Received request to fetch extra details");

    // Fetch all extra details from the database
    const extraDetailsData = await ExtraDetails.find({});

    console.log("Extra details fetched successfully");

    // Return the fetched data in the response
    res.json({ success: true, data: extraDetailsData });
} catch (error) {
    // Log the error and return a failure response
    res.status(500).json({ success: false, error: error });
    }
};
