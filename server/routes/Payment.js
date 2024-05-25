const express = require("express")
const { Auth,isStudent} = require('../middlewares/Auth');
const {capturePayment,verifyPayment,sendPaymentSuccessEmail} = require('../controllers/Payment');


const router = express.Router()


router.post('/capturePayment', Auth,isStudent, capturePayment)
router.post('/verifyPayment', Auth,isStudent, verifyPayment)
router.post('/sendPaymentSuccessEmail', Auth,isStudent, sendPaymentSuccessEmail)
module.exports = router;