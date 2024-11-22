const ExtraDetails = require('../models/ExtraDetailsModel'); // Import the model

exports.createExtraDetails = async (req, res) => {
  try {
    console.log("Received request to create extra details");

    const { familyIncome, sportInterest, otherSport, preferredState } = req.body;

    // Log the request body for debugging purposes
    console.log(req.body);

    // Create new extra details entry
    console.log("Creating extra details entry");
    const newExtraDetails = await ExtraDetails.create({
      familyIncome,
      sportInterest,
      otherSport,
      preferredState,
          // Assuming you're getting user id from some auth middleware
    });
    
    console.log("Extra details created successfully");
    
    return res.status(201).json({
      success: true,
      message: "Extra details submitted successfully!",
      data: newExtraDetails,
    });
  } catch (error) {
    console.error("Error during extra details creation:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create extra details, please try again later.",
    });
  }
};
