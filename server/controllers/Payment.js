// const { instance } = require("../config/razorpay")
const Razorpay = require('razorpay');
const Course = require("../models/Course")
const crypto = require("crypto")
const User = require("../models/User")
const mongoose = require("mongoose")
const sendMailer = require('../helpers/SendMail');
const CourseProgress = require("../models/CourseProgress")
const { courseConfirmation } = require('../helpers/EmailTemplates/CourseConfirmation');
const { paymentSuccessful } = require('../helpers/EmailTemplates/PaymentSuccessful');

exports.capturePayment = async (req, res) => {

    const userId = req.user.id;
    const { courses } = req.body;


    if (courses.length === 0) {
        return res.status(403).json({
            success: false,
            message: "There is no course selected"
        })
    }
    let price = 0;
    for (let courseId of courses) {
        console.log("PAYMENT CAPTURE COURSE ID:", courseId)
        try {

            const course = await Course.findById(courseId);
            console.log("course:", course);

            if (!course) {
                return res.status(403).json({
                    success: false,
                    message: "No course found"
                })
            }
            const uid = new mongoose.Types.ObjectId(userId);
            console.log("UID", uid);
            console.log("UID TYPE", typeof (uid));
            console.log("USER TYPE ", typeof (userId));
            console.log("COURSE TYPE ", course.studentEnrolled)
            console.log("COURSE TYPE ", course.studentEnrolled[0])
            if (course.studentEnrolled.includes(uid)) {

                return res.status(200).json({
                    success: false,
                    message: "Student is already enrolled"
                })

            }

            price = price + course.price;

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }

    var options = {
        amount: price * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),

    };

    try {

        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });


        const paymentResponse = await instance.orders.create(options)
        return res.status(200).json({
            success: true,
            data: paymentResponse,
            message: "Payment captured successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Could not initiate payment",
            error: error.message
        })
    }

}


exports.verifyPayment = async (req, res) => {

    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses

    const userId = req.user.id;


    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
        res.status(200).json({
            success: false,
            message: "Payment failed"
        })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex")

    if (expectedSignature === razorpay_signature) {
        await enrollStudents(courses, userId, res)
        return res.status(200).json({ success: true, message: "Payment Verified" })
    }

    return res.status(200).json({ success: false, message: "Payment Failed" })
}


const enrollStudents = async (courses, userId, res) => {
    if (!courses || !userId) {
        return res
            .status(400)
            .json({ success: false, message: "Please Provide Course ID and User ID" })
    }

    for (const courseId of courses) {
        try {

            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentEnrolled: userId } },
                { new: true }
            )

            if (!enrolledCourse) {
                return res.status(500).json({
                    success: false, error: "Course not found"
                })
            }
            console.log("Updated course: ", enrolledCourse)

            const courseProgress = await CourseProgress.create({
                courseId: courseId,
                userId: userId,
                completedVideos: [],
            })

            const enrolledStudent = await User.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        courses: courseId,
                        courseProgress: courseProgress._id,
                    },
                },
                { new: true }
            )

            console.log("Enrolled student: ", enrolledStudent)

            const emailResponse = await sendMailer(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseTitle}`,
                courseConfirmation(
                    `${enrolledStudent.firstName} ${enrolledStudent.lastName}`, enrolledCourse.courseName
                )
            )

            console.log("Email sent successfully: ", emailResponse.response)
        } catch (error) {
            console.log(error)
            return res.status(400).json({ success: false, error: error.message })
        }
    }
}

exports.sendPaymentSuccessEmail = async (req, res) => {

    const { order_id, paymentId, amount } = req.body;

    const userId = req.user.id;

    if (!order_id || !paymentId || !amount || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please provide all fields",
        })
    }



    try {

        const enrolledStudent = await User.findById(userId);

        const emailResponse = await sendMailer(
            enrolledStudent.email,
            'Payment Received',
            paymentSuccessful(`${enrolledStudent.firstName}${enrolledStudent.firstName}`, amount / 100, paymentId, order_id)
        )





    } catch (error) {

        console.log("Error in sending payment success email", error);
        return res.status(500).json({
            success: false,
            message: "Could not send email"
        })

    }
}
