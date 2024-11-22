const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getme,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

// Auth routes
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getme);

// Personal Information Routes
const { createPersonalInfo } = require("../controllers/PersonalController");
const { getPersonalInfo } = require("../controllers/GetPersonalInfo");
router.post('/personal', createPersonalInfo);
router.get("/getpersonal", getPersonalInfo);

// Education Details Routes
const { createEducationDetails } = require("../controllers/EducationDetailsController");
const { getEducationDetails } = require("../controllers/GetEducationDetailsController");
router.post("/education", createEducationDetails);
router.get("/geteducation", getEducationDetails);

// Extra Details Routes
const { createExtraDetails } = require("../controllers/ExtraDetailsController");
const { getExtraDetails } = require("../controllers/GetExtraDetailsInfo");
router.post('/extraDetails', createExtraDetails);
router.get("/getextradetails", getExtraDetails);



module.exports = router;
// const express = require("express");
// const router = express.Router();

// const {
//   registerUser,
//   loginUser,
//   getme,
// } = require("../controllers/userController");

// const { protect } = require("../middleware/authMiddleware");

// // Personal Information Routes
// const { createPersonalInfo, getPersonalInfo } = require("../controllers/PersonalController");

// // Education Details Routes
// const { createEducationDetails, getEducationDetails } = require("../controllers/EducationDetailsController");

// // Extra Details Routes
// const { createExtraDetails, getExtraDetails } = require("../controllers/ExtraDetailsController");

// // Combined Data Route
// router.get("/getAllDashboardData", async (req, res) => {
//   try {
//     const personalDetails = await getPersonalInfo();
//     const educationDetails = await getEducationDetails();
//     const extraDetails = await getExtraDetails();

//     res.status(200).json({
//       success: true,
//       data: {
//         personalDetails,
//         educationDetails,
//         extraDetails,
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching all dashboard data:", error.message);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // Routes for CRUD Operations
// router.post("/personal", createPersonalInfo);
// router.get("/getpersonal", getPersonalInfo);

// router.post("/education", createEducationDetails);
// router.get("/geteducation", getEducationDetails);

// router.post("/extraDetails", createExtraDetails);
// router.get("/getextradetails", getExtraDetails);

// module.exports = router;
