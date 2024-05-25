// const RatingAndReviews = require('../models/RatingAndReview');
const { default: mongoose } = require("mongoose");
const Course = require("../models/Course");
const RatingAndReviews = require('../models/RatingAndReview');



exports.createRatingAndReviews = async (req, res) => {

    try {

        const userId = req.user.id;
        const { rating, review, courseId } = req.body;

        console.log("rating", rating);
        console.log("review", review);

        const courseDetails = await Course.findOne({
            _id: courseId,
            studentEnrolled: { $elemMatch: { $eq: userId } },
        });
        // console.log(courseDetails)
        if (!courseDetails?.studentEnrolled.includes(userId)) {

            return res.status(404).json({
                success: false,
                message: "Student not registered to course"
            });
        }


        const alreadyReview = await RatingAndReviews.findOne({ user: userId, course: courseId });
        if (alreadyReview) {
            return res.status(403).json({
                success: false,
                message: "course is already reviewed by the user"
            })
        }


        console.log("HI 2")
        const ratingReview = new RatingAndReviews(
            {
                rating: rating,
                review: review,
                course: courseId,
                user: userId
            }
        );
        ratingReview.save();
        console.log("HI 3")

        await Course.findByIdAndUpdate(courseId, { $push: { courseRatingAndReviews: ratingReview._id } }, { new: true });

        return res.status(200).json({
            success: true,
            message: `rating and review added successfully`,
            ratingReview,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error while creating rating and review`,
        })
    }
}


exports.getAverageRating = async (req, res) => {
    try {

        const { courseId } = req.body;

        const course = await Course.findById(courseId);

        const result = await RatingAndReviews.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" }
                }
            }
        ]);

        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            });
        }
        else {
            return res.status(200).json({
                success: true,
                message: "Average rating is 0",
                averageRating: 0
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Unable to find average rating of course. Please try again`,
        })
    }
};

exports.getAllRatingReview = async (req, res) => {

    try {

        const allReviews = await RatingAndReviews.find({}).sort({ rating: "desc" })
            .populate({
                path: "user",
                select: "firstName lastName image email"
            })
            .populate({
                path: "course",
                select: "name"
            });


        return res.status(200).json({
            success: true,
            message: "All message fetched successfully",
            allReviews,
        });


    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Unable to fetched reviews. Please try again"
        })

    }
}

