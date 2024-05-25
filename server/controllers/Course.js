const User = require("../models/User");
const Course = require("../models/Course");
const { ImageUploader } = require("../helpers/ImageUploader");
const Category = require('../models/Category');
const Section = require('../models/Section')
const SubSection = require('../models/SubSection');
const CourseProgress = require('../models/CourseProgress');
const { convertSecondsToDuration } = require('../helpers/CourseDurationCal');

exports.createCourse = async (req, res) => {

    try {

        let { courseTitle, description, price, tag, WhatYouWillLearn, category, courseLevel, courseLanguage, instructions, status } = req.body;

        const userId = req.user.id;

        const thumbnail = req.files.thumbnail;

        console.log("tag", tag)
        console.log("instructions", instructions)

        const TagArray = JSON.parse(tag);
        const InstructionsArray = JSON.parse(instructions);

        console.log("TagArray", TagArray)
        console.log("instruction", InstructionsArray)



        if (!courseTitle || !description || !price || !TagArray.length || !WhatYouWillLearn || !thumbnail || !category || !courseLevel || !courseLanguage || !InstructionsArray.length || !thumbnail) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            })
        }

        if (!status || status === undefined) {
            status = 'Draft'
        }

        const categoryDetails = await Category.findById({ _id: category });

        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        const instructorDetails = await User.findById({ _id: userId });

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor Details Not Found",
            })
        }

        const image_cloudinary = await ImageUploader(thumbnail, process.env.FOLDER_NAME);

        console.log(image_cloudinary)

        const newCourse = await Course.create({
            courseTitle, description, price,
            instructor: req.user.id,
            WhatYouWillLearn, courseLanguage, courseLevel,
            tag: TagArray, instructions: InstructionsArray, status,

            thumbnail: image_cloudinary.secure_url,
            category: categoryDetails._id
        })
        console.log(newCourse)

        const updatedUser = await User.findByIdAndUpdate({ _id: req.user.id }, { $push: { courses: newCourse._id } }, { new: true });


        const updatedCategory = await Category.findByIdAndUpdate({ _id: category }, { $push: { courses: newCourse._id } }, { new: true })


        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            course: newCourse,
            // updatedUser: updatedUser,
            // updatedCategory: updatedCategory,

        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while creating a course",
            error: error.message
        })
    }
}

exports.editCourse = async (req, res) => {

    try {

        // console.log("ERROR")
        const { courseId } = req.body;
        const updates = req.body;
        // console.log("COURSEID", courseId);

        const course = await Course.findById({ _id: courseId });

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Unable to find the course",
            })
        };

        if (req.files) {
            const thumbnail = req.files.thumbnail;
            const thumbnailImage = await ImageUploader(thumbnail, process.env.FOLDER_NAME);
            course.thumbnail = thumbnailImage.secure_url;
        }

        // console.log("HELOO2")


        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                if (key === "tag" || key === "instructions") {
                    course[key] = JSON.parse(updates[key])
                } else {
                    course[key] = updates[key]
                }
            }
        }
        // console.log("HELOO3")

        await course.save();

        const updatedCourse = await Course.findOne({ _id: courseId }).populate({
            path: "instructor",
            populate: {
                path: "moreInfo",
            },
        }).populate("category")
            // .populate('ratingAndReviews')
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                }
            }).exec();

        console.log("HELOO4")

        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            updatedCourse: updatedCourse
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal server error. Unable to update course. Please try again...",
            error: error.message
        })

    }

}


exports.getAllCourses = async (req, res) => {
    try {

        const courses = await Course.find({ status: "Published" }, {
            courseTitle: true,
            price: true,
            thumbnail: true,
            instructor: true,
            courseRatingAndReviews: true,
            studentEnrolled: true,
        }).populate("instructor").exec();

        return res.status(200).json({
            success: true,
            message: "Courses fetched successfully",
            courses: courses,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error during  fetching courses",
            error: error.message
        })
    }

}


exports.getAllDetailsOfCourse = async (req, res) => {

    try {

        const { courseId } = req.body;
        const { userId } = req.user.id;

        const course = await Course.findById(courseId).populate(
            {
                path: "instructor",
                populate: {
                    path: "moreInfo",
                },
            })
            .populate("category")
            // .populate("courseRatingAndReviews")
            .populate(
                {
                    path: "courseContent",
                    populate: {
                        path: "subSection",
                        // select: 'videoUrl',
                    },
                }).exec();

        if (!course) {
            return res.status(404).json({
                success: false,
                message: `Could not find the course with ${courseId}`,
            })
        }

        let courseProgressCount = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId,
        })

        console.log("courseProgressCount : ", courseProgressCount);



        let totalDurationInSeconds = 0
        course.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })

        // console.log("HELLO")

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        // console.log("HELLO2")

        return res.status(200).json({
            success: true,
            message: `Successful fetched course with ${courseId}`,
            data: {
                course,
                totalDuration,
                completedVideos: courseProgressCount?.completedVideos
                    ? courseProgressCount?.completedVideos
                    : [],
            },
        })

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: `Error while fetching course details`,
            error: error.message
        })

    }
}

exports.getCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body
        const courseDetails = await Course.findOne({
            _id: courseId,
        }).populate({
                path: "instructor",
                populate: {
                    path: "moreInfo",
                },
            })
            .populate("category")
            // .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                    select: "-videoUrl",
                },
            }).exec()

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: `Could not find course with id: ${courseId}`,
            })
        }



        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        return res.status(200).json({
            success: true,
            data: {
                courseDetails,
                totalDuration,
            },
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body
        console.log("CourseId", courseId)
        // Find the course
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }

        // Unenroll students from the course
        const studentsEnrolled = course.studentEnrolled
        for (const studentId of studentsEnrolled) {
            await User.findByIdAndUpdate(studentId, {
                $pull: { courses: courseId },
            })
        }

        // Delete sections and sub-sections
        const courseSections = course.courseContent
        for (const sectionId of courseSections) {
            // Delete sub-sections of the section
            const section = await Section.findById(sectionId)
            if (section) {
                const subSections = section.subSection
                for (const subSectionId of subSections) {
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }

            // Delete the section
            await Section.findByIdAndDelete(sectionId)
        }

        // Delete the course
        await Course.findByIdAndDelete(courseId)

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        })
    }
}

exports.getInstructorCourses = async (req, res) => {
    try {

        const instructorId = req.user.id


        const instructorCourses = await Course.find({
            instructor: instructorId,
        }).sort({ createdAt: -1 })


        res.status(200).json({
            success: true,
            message: "Successfully fetched courses",
            courses: instructorCourses,
        })
    } catch (error) {
        // console.error(error)
        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
        })
    }
}
