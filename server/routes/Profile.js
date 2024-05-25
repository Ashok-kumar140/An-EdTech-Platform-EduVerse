const express = require("express");
const { Auth, isStudent, isInstructor } = require("../middlewares/Auth");
const { deleteAccount, updateProfile, updateProfilePic, getUserDetails, getEnrolledCourses,instructorDashboard } = require("../controllers/Profile");
const { resetPasswordToken, resetPassword } = require("../controllers/ResetPassword");
const router = express.Router()


router.delete('/deleteProfile', Auth, deleteAccount);
router.put('/updateProfile', Auth, updateProfile);
router.put('/updateProfilePicture', Auth, updateProfilePic);
router.get("/getUserDetails", Auth, getUserDetails);
router.post('/reset-password-token', resetPasswordToken);
router.post('/reset-password', resetPassword);

router.get('/getEnrolledCourses', Auth, isStudent, getEnrolledCourses);
router.get('/instructorDashboard', Auth, isInstructor, instructorDashboard);






module.exports = router;