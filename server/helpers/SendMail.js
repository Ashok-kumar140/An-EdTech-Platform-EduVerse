const nodemailer = require('nodemailer');
require('dotenv').config();


const sendMailer = async (email, title, body) => {

    try {

        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        let mailResponse = await transporter.sendMail({
            from: 'EduVerse',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`
        })

        console.log(mailResponse);
        return mailResponse

    } catch (error) {
        console.log("Error wile sending mail: ", error);
    }

}

module.exports = sendMailer;