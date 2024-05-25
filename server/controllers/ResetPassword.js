const sendMailer = require('../helpers/SendMail');
const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.resetPasswordToken = async (req, res) => {

    try {

        const { email } = req.body;

        if (!email) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User email os not registered"
            })
        }

        const token = crypto.randomUUID();



        const updatedUser = await User.findOneAndUpdate({ email: email }, {
            token: token,
            tokenExpires: Date.now() + 5 * 60 * 1000,
        }, { new: true });

        const url = `http://localhost:3000/update-password/${token}`;

        const mailResponse = sendMailer(email, "For updating your password", `You can update your password in this link: ${url}`);

        return res.status(200).json({
            success: true,
            message: "reset password link send successfully. Please check your email"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while sending reset mail",
        })
    }
}

exports.resetPassword = async (req, res) => {

    try {

        const { password, token, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(403).json({
                success: false,
                message: "password did not match"
            })
        }

        const userDetail = await User.findOne({ token: token });

        if (!userDetail) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            })
        }

        if (userDetail.tokenExpires < Date.now()) {
            return res.status(401).json({
                success: false,
                message: "Link is expired. Please regenerate your link"
            })
        }

        let hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.findOneAndUpdate({ token: token }, { password: hashedPassword }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        })

    } catch (error) {
        console.log("Error while resetting password");
        return res.status(500).json({
            success: false,
            message: ""
        })
    }

}