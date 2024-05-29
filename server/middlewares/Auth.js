// const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.Auth = async (req, res, next) => {

    // console.log("Inside Auth");

    try {

        // console.log("Inside Auth1");
        // console.log("token:", req.header("Authorization"));
        const token = req.cookies.token || req.body.token || req.header("Authorization")?.replace("Bearer ", "");
        // console.log("Inside Auth2");
        // console.log("Token:", token)

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing"
            })
        }
        // console.log("Inside Auth3");


        try {
            // Verifying the JWT using the secret key stored in environment variables
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decode);
            // Storing the decoded JWT payload in the request object for further use
            req.user = decode;
        } catch (error) {
            // If JWT verification fails, return 401 Unauthorized response
            return res
                .status(401)
                .json({ success: false, message: "token is invalid" });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something wen wrong while authenticating user"
        })

    }


}


exports.isStudent = async (req, res, next) => {

    try {

        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: "Route is protected for Student only"
            })

        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified try again"
        })
    }

}
exports.isInstructor = async (req, res, next) => {

    try {

        if (req.user.role !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: "Route is protected for Instructor only"
            })

        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified try again"
        })
    }

}
exports.isAdmin = async (req, res, next) => {

    try {

        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "Route is protected for admin only"
            })

        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role cannot be verified try again"
        })
    }

}