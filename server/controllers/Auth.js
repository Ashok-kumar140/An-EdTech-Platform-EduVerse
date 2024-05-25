const User = require('../models/User');
const OTP = require('../models/Otp');
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const Profile = require("../models/Profile");
const sendMailer = require('../helpers/SendMail');
const { passwordUpdated } = require('../helpers/EmailTemplates/UpdatePasswordTemplate');

exports.sendOtp = async (req, res) => {
    try {

        const { email } = req.body;

        const checkUser = await User.findOne({ email: email })

        if (checkUser) {
            return res.status(401).json({
                success: false,
                message: "USer already registered."
            })
        }

        let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });

        let existingOtp = await OTP.findOne({ otp: otp });

        while (existingOtp) {
            otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
            existingOtp = await OTP.findOne({ otp: otp });

        }

        const otpResponse = await OTP.create({ email, otp });


        res.status(200).json({
            success: true,
            message: "Otp sent successfully",
            otp
        })



    } catch (error) {

        console.log("Error in sendOtp controller", error.message);
        res.status(500).json({
            success: false,
            message: "Unable to send otp"
        })


    }
}


exports.signUp = async (req, res) => {
    try {

        const { firstName, lastName, email, password, confirmPassword, role, otp } = req.body;

        if (!firstName || !lastName || !email || !confirmPassword || !password || !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "password did not match"
            })
        }

        const userExists = await User.findOne({ email: email });
        if (userExists) {

            return res.status(401).json({
                success: false,
                message: "Email is already registered"
            })
        }

        const mostRecentOtp = await OTP.find({ email: email }).sort({ createdAt: -1 }).limit(1).exec();

        if (mostRecentOtp.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Otp not found"
            })
        }

        if (mostRecentOtp[0].otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid otp",
            })

        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const ProfileDetail = await Profile.create({
            gender: null,
            about: null,
            profession: null,
            contactNumber: null,
            DOB: null,
            address: null

        });
        const userResponse = await User.create({
            firstName, lastName, email, password: hashedPassword, role, moreInfo: ProfileDetail._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} &${lastName}`,
        })

        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            userResponse
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Unable to register. Please try again"
        })

    }
}

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not Registered"
            })
        }

        if (!await bcrypt.compare(password, user.password)) {
            return res.status(401).json({
                success: false,
                message: "password is wrong"
            })
        }

        const payload = {
            email: email,
            role: user.role,
            id: user._id
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" })

        // user = user.toObject();

        user.token = token;
        user.password = undefined;
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true

        }
        return res.cookie("token", token, options).status(200).json({
            success: true,
            message: "user logged in successfully",
            user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Login failure try again"
        })

    }
}

exports.changePassword = async (req, res) => {

    try {
        const { oldPassword, newPassword } = req.body;
        const userDetails = await User.findById(req.user.id);

        const isPasswordMatch = await bcrypt.compare(oldPassword, userDetails.password);


        if (!isPasswordMatch) {
            // return res.status(403).json({ success: false, error: "The password is incorrect" })
            return res.json({
                error: "Old password is wrong",
                success:false,
                status:403
            });
        }


        const encryptedPassword = await bcrypt.hash(newPassword, 10)
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            { password: encryptedPassword },
            { new: true }
        );
        try {
            const emailResponse = await sendMailer(
                updatedUserDetails.email,
                "Password for your account has been updated",
                passwordUpdated(
                    updatedUserDetails.email,
                    `${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )
            );
            console.log("Email sent successfully:", emailResponse.response)
        } catch (error) {

            console.error("Error occurred while sending email:", error)
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email",
                error: error.message,
            })
        }

        return res
            .status(200)
            .json({ success: true, message: "Password updated successfully" });

    } catch (error) {

        console.error("Error occurred while updating password:", error)
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating password",
            error: error.message,
        })
    }

}