const PersonalInfo = require("../models/PersonalModel");
exports.createPersonalInfo = async (req, res) => {
   
  try {
    console.log("jbvj");
      const { 
          firstName, 
          middleName, 
          lastName, 
          email, 
          phone, 
          gender, 
          state, 
          city, 
          postalCode 

      } = req.body;
console.log(req.body);

      // Validate all required fields
      const requiredFields = { firstName, middleName, lastName, email, phone, gender, state, city, postalCode };
      const missingFields = Object.entries(requiredFields)
          .filter(([_, value]) => !value)
          .map(([key]) => key);

   
      console.log("jbvj");
      // Validate email format
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(email)) {
          return res.status(400).json({
              success: false,
              message: 'Invalid email format'
          });
      }

      // Validate phone number
      if (!/^\d{10}$/.test(phone)) {
          return res.status(400).json({
              success: false,
              message: 'Phone number must be 10 digits'
          });
      }

      // Validate postal code
      if (!/^\d{5}$/.test(postalCode)) {
          return res.status(400).json({
              success: false,
              message: 'Postal code must be 5 digits'
          });
      }
     
      // Check if email already exists in personal info
      const existingInfo = await PersonalInfo.findOne({ email });
      if (existingInfo) {
          return res.status(400).json({
              success: false,
              message: 'Personal information with this email already exists'
          });
      }

      // Create personal info
      console.log("jbvj");
      const personalInfo = await PersonalInfo.create({
      
          firstName,
          middleName,
          lastName,
          email,
          phone,
          gender,
          state,
          city,
          postalCode
      });

      return res.status(201).json({
          success: true,
          message: 'Personal information created successfully',
          data: personalInfo
      });

  } catch (error) {
      console.error("Personal info creation error:", error);
      return res.status(500).json({
          success: false,
          message: 'Failed to create personal information, please try again later'
      });
  }
};
