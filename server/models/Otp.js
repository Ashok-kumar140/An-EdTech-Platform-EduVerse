const mongoose = require('mongoose');
const sendMailer = require('../helpers/SendMail');


const OtpSchema = new mongoose.Schema({

    email: {
        type: String,
        require: true,
        trim: true,
    },
    otp: {
        type: String,
        require: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        expires: 5 * 60,
        default: Date.now(),
    }


})



const sendVerificationEmail = async (email, otp) => {

    try {

        const mailResponse = await sendMailer(email, "Verification email from studyNotion", otp);
        console.log("Email send successfully, ", mailResponse);

    } catch (error) {
        console.log("Error while sending verification email")
        console.log(error.message);
    }

}

OtpSchema.pre('save', async function (next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
})

module.exports = mongoose.model("OTP", OtpSchema);
