const EducationDetails = require("../models/EducationDetailsModel");

exports.createEducationDetails = async (req, res) => {
  try {
    console.log("jbvj1");
    const {
      currentClass,
      marks,
      jeeRank,
      percentage,
      interest,
     
    } = req.body;

    console.log(req.body);

  

   
    console.log("create entry");
    const educationDetails = await EducationDetails.create({
      currentClass,
      marks,
      jeeRank,
      percentage,
      interest,
      
    });
    console.log("create entry success");
    return res.status(201).json({
      success: true,
      message: "Education details created successfully",
      data: educationDetails,
    });
  } catch (error) {
    console.error("Education details creation error:", error);
    return res.status(500).json({
      success: false,
      message:
        "Failed to create education details, please try again later",
    });
  }
};

