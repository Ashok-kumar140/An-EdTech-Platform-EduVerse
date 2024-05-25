const Profile = require('../models/Profile');
const User = require('../models/User');
const { ImageUploader } = require("../helpers/ImageUploader");
require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('../models/Course');
const CourseProgress = require('../models/CourseProgress');
const { convertSecondsToDuration } = require('../helpers/CourseDurationCal');


exports.updateProfile = async (req, res) => {

    try {

        const { gender, DOB, about, profession, contactNumber, address } = req.body;

        const userId = req.user.id;

        const userDetails = await User.findById(userId);

        const profileId = userDetails.moreInfo;

        const profileDetail = await Profile.findById(profileId);
        profileDetail.gender = gender;
        profileDetail.DOB = DOB;
        profileDetail.about = about;
        profileDetail.profession = profession;
        profileDetail.contactNumber = contactNumber;
        profileDetail.address = address;



        const updatedProfile = await profileDetail.save();

        const updatedUserDetails = await User.findById(userId)
            .populate("moreInfo")
            .exec()


        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            updatedUserDetails,
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while updating Profile. Please try again"
        })
    }

}

exports.deleteAccount = async (req, res) => {
    try {

        const id = req.user.id;

        const userDetails = await User.findById(id);

        await Profile.findByIdAndDelete({ _id: new mongoose.Types.ObjectId(userDetails.moreInfo) });

        for (const courseId of userDetails.courses) {
            await Course.findByIdAndUpdate(
                courseId,
                { $pull: { studentEnrolled: id } },
                { new: true }
            )
        }
        await User.findByIdAndDelete({ _id: id })
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        })
        await CourseProgress.deleteMany({ userId: id })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while deleting account. Please try again"
        })
    }
};

exports.getUserDetails = async (req, res) => {
    try {

        const id = req.user.id;

        const user = await User.findById(id).populate('moreInfo').exec();

        return res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            user: user,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal error while fetching user details. Please try again"
        })
    }
};

exports.updateProfilePic = async (req, res) => {

    // console.log(' inside updateprofilepic func');

    try {

        const userId = req.user.id;

        const imageFile = req.files.imageFile;
        console.log("IMagefile", imageFile);

        const cloud_image = await ImageUploader(imageFile, process.env.FOLDER_NAME, 1000, 100);
        console.log("Inside function")

        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: cloud_image.secure_url },
            { new: true }
        )

        return res.status(200).json({
            success: true,
            message: "Profile picture updated successfully",
            updatedProfile,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Unable to update profile picture. Please try again",

        });

    }

}

exports.getEnrolledCourses = async (req, res) => {

    try {
        const userId = req.user.id
        let userDetails = await User.findOne({
            _id: userId,
        }).populate({
            path: "courses",
            populate: {
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            },
        }).exec();

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userDetails}`,
            })
        }

        userDetails = userDetails.toObject()

        //calculating total duration of each course

        //iterating each course
        // for (let i = 0; i < userDetails.courses.length; i++) {

        //     let totalDuration = 0;
        //     let totalSubsection = 0;

        //     //iterating each section
        //     for (let j = 0; j < userDetails.courses[i].courseContent.length; j++) {

        //         //iterating each subsection

        //         totalDuration += userDetails.courses[i].courseContent[j].subSection.reduce(
        //             (acc, curr) => acc + parseInt(curr.timeDuration), 0)
        //         totalSubsection += userDetails.courses[i].courseContent[j].length;
        //     }
        //     userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDuration);

        //     let courseProgressCount = await CourseProgress.findOne({
        //         courseID: userDetails.courses[i]._id,
        //         userId: userId,
        //     })

        //     courseProgressCount = courseProgressCount?.completedVideos.length
        //     if (totalSubsection === 0) {
        //         userDetails.courses[i].progressPercentage = 100
        //     } else {
        //         // To make it up to 2 decimal point
        //         const multiplier = Math.pow(10, 2)
        //         userDetails.courses[i].progressPercentage =
        //             Math.round(
        //                 (courseProgressCount / totalSubsection) * 100 * multiplier
        //             ) / multiplier
        //     }


        // }
        var SubsectionLength = 0
        for (var i = 0; i < userDetails.courses.length; i++) {
          let totalDurationInSeconds = 0
          SubsectionLength = 0
          for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
            totalDurationInSeconds += userDetails.courses[i].courseContent[
              j
            ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
            userDetails.courses[i].totalDuration = convertSecondsToDuration(
              totalDurationInSeconds
            )
            SubsectionLength +=
              userDetails.courses[i].courseContent[j].subSection.length
          }
          let courseProgressCount = await CourseProgress.findOne({
            courseId: userDetails.courses[i]._id,
            userId: userId,
          })
          courseProgressCount = courseProgressCount?.completedVideos.length
          if (SubsectionLength === 0) {
            userDetails.courses[i].progressPercentage = 100
          } else {
            // To make it up to 2 decimal point
            const multiplier = Math.pow(10, 2)
            console.log("CourseprogressLength",courseProgressCount)
            console.log("SubsectionLength",SubsectionLength)
            userDetails.courses[i].progressPercentage =
              Math.round(
                (courseProgressCount / SubsectionLength) * 100 * multiplier
              ) / multiplier
          }
        }
    
        if (!userDetails) {
          return res.status(400).json({
            success: false,
            message: `Could not find user with id: ${userDetails}`,
          })
        }
        return res.status(200).json({
          success: true,
          data: userDetails.courses,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.instructorDashboard = async (req, res) => {

    try {

        const courseDetails = await Course.find({ instructor: req.user.id });

        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentEnrolled.length;
            const totalAmountGenerated = totalStudentsEnrolled * course.price;


            const courseDataWithStats = {
                _id: course._id,
                courseName: course.courseTitle,
                courseDescription: course.description,
                thumbnail: course.thumbnail,
                totalStudentsEnrolled,
                totalAmountGenerated,
            }

            return courseDataWithStats;
        })

        return res.status(200).json({
            success: true,
            message: "Instructor dashboard details fetched",
            coursesData: courseData,
            courseDetails: courseDetails,
            user: req.user.id
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error in instructorDashboard controller ",
            success: false,
            error: error
        });
    }
}



