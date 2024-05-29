const { contactResponseAdmin } = require("../helpers/EmailTemplates/ContactResponseAdmin");
const { ContactResponseUser } = require("../helpers/EmailTemplates/ContactResponseUser");
const sendMailer = require("../helpers/SendMail");
require('dotenv').config();
exports.contactInfoSender = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNo, message } = req.body;
        // console.log(firstName,lastName,email,phoneNo,message)

        if (!firstName || !email || !phoneNo || !message) {
            return res.status(404).json({
                success: false,
                message: "All fields are required"
            })
        }
        await sendMailer(email, "Eduverse has received your message.", ContactResponseUser(firstName, lastName, email, phoneNo, message));
        console.log("EMAIL", process.env.MAIL_USER)
        const email1 = process.env.MAIL_USER;
        await sendMailer(email1, "user contact you via Eduverse Contact form", contactResponseAdmin(firstName, lastName, email, phoneNo, message));
        console.log("EMAIL", process.env.MAIL_USER)

        return res.status(200).json({
            success: true,
            message: "User message received"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while sending user info",
            error: error
        })
    }


}