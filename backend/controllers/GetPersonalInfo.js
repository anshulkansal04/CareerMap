const PersonalInfo = require("../models/PersonalModel");

exports.getPersonalInfo = async (req, res) => {
    try {
        // Fetch all personal information from the database
        const personalInfoData = await PersonalInfo.find({});
        
        // Return success response with fetched data
        res.json({ success: true, data: personalInfoData });
    } catch (error) {
        // Log the error and return a failure response
        res.status(500).json({ success: false, error: error });
        }
    };

