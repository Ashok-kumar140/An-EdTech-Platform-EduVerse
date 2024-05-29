const express = require("express")
const router = express.Router()

const { login, signUp, sendOtp, changePassword } = require('../controllers/Auth');
const { resetPasswordToken, resetPassword } = require("../controllers/ResetPassword");
const { contactInfoSender } = require("../controllers/Contact");
const { Auth } = require('../middlewares/Auth');

router.post("/login", login)
router.post("/signup", signUp)
router.post("/sendotp", sendOtp)
router.post("/changepassword", Auth, changePassword)

router.post("/reset-password-token", resetPasswordToken)
router.post("/reset-password", resetPassword)
router.post("/contact-details-submission", contactInfoSender)


module.exports = router;