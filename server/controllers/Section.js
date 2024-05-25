const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");

exports.createSection = async (req, res) => {

    try {

        const { sectionName, courseId } = req.body;

        if (!sectionName || !courseId) {
            return res.status(403).json({
                success: false,
                message: "All field are required"
            })
        }

        const section = await Section.create({
            sectionName
        });
        const updatedCourse = await Course.findByIdAndUpdate({ _id: courseId }, { $push: { courseContent: section._id } }, { new: true }).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        }).exec();

        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourse: updatedCourse,
            section: section,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to create section. Please try again",
            error: error.message,
        })
    }

}


exports.updateSection = async (req, res) => {

    try {

        const { sectionName, sectionId, courseId } = req.body;
        console.log("Section", sectionName, sectionId, courseId)

        // if (!sectionName || !sectionId) {
        //     return res.status(403).json({
        //         success: false,
        //         message: "All field are required"
        //     })
        // }

        const updatedSection = await Section.findByIdAndUpdate({ _id: sectionId }, { sectionName }, { new: true });


        const updatedCourse = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            }).exec()

        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            updatedSection: updatedSection,
            updatedCourse: updatedCourse
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update section. Please try again",
            error: error.message,
        })
    }

}

exports.deleteSection = async (req, res) => {

    try {

        // console.log("sectionId",req.body);
        const { sectionId, courseId } = req.body;


        if (!sectionId || !courseId) {
            return res.status(403).json({
                success: false,
                message: "sectionId is missing"
            })
        }

        await Course.findByIdAndUpdate(courseId, {
            $pull: {
                courseContent: sectionId,
            },
        });

        const section = await Section.findById({ _id: sectionId });
        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            })
        }

        await SubSection.deleteMany({ _id: { $in: section.subSection } })

        await Section.findByIdAndDelete(sectionId);

        const course = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            }).exec()

        return res.status(200).json({
            success: true,
            message: "Section deleted successfully",
            updatedCourse: course
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to delete section. Please try again",
            error: error.message,
        })
    }

}