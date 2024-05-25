const { ImageUploader } = require("../helpers/ImageUploader");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const Course = require('../models/Course');

exports.createSubSection = async (req, res) => {
    try {

        console.log("SUBSECTION: ",req.body)

        const { sectionId, subSectionTitle, description, courseId } = req.body;
        const video = req.files.videoUrl;

        if (!subSectionTitle || !sectionId || !description || !video || !courseId) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            })

        }

        const uploadedVideo = await ImageUploader(video, process.env.FOLDER_NAME, 500, 80);

        console.log(uploadedVideo);

        const subSection = await SubSection.create({
            subSectionTitle,
            timeDuration: uploadedVideo.duration,
            description,
            videoUrl: uploadedVideo.secure_url,
        });

        const updatedSection = await Section.findByIdAndUpdate(sectionId, { $push: { subSection: subSection._id } }, { new: true }).populate("subSection");

        const updatedCourse = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        }).exec()

        return res.status(200).json({
            success: true,
            message: "Subsection created successfully",
            updatedSection: updatedSection,
            updatedCourse: updatedCourse
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while creating subsection",
            error: error.message
        })
    }
}


exports.updateSubSection = async (req, res) => {
    try {

        const { sectionId, subSectionId, subSectionTitle, description, courseId } = req.body;

        const subSection = await SubSection.findById(subSectionId)

        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            })
        }
        if (subSectionTitle !== undefined) {
            subSection.title = subSectionTitle
        }

        if (description !== undefined) {
            subSection.description = description
        }

        if (req.files && req.files.videoFile !== undefined) {

            const video = req.files.videoFile;
            const uploadedVideo = await ImageUploader(video, process.env.FOLDER_NAME);
            subSection.videoUrl = uploadedVideo.secure_url;
            subSection.timeDuration = uploadedVideo.duration;
        }

        await subSection.save();


        const updatedSection = await Section.findById(sectionId).populate('subSection');
        const updatedCourse = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        }).exec()

        return res.json({
            success: true,
            message: "Section updated successfully",
            updatedSection: updatedSection,
            updatedCourse: updatedCourse
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while updating subsection. Please try again",
            error: error.message
        })
    }
}


exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId } = req.body;

        await Section.findByIdAndUpdate(sectionId, { $pull: { subSection: subSectionId } });

        const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })

        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found"
            })
        }
        const updatedSection = await Section.findById(sectionId).populate(
            "subSection"
        )

        return res.json({
            success: true,
            message: "SubSection deleted successfully",
            updatedSection: updatedSection,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while deleting subsection",
            error: error.message
        })
    }
}