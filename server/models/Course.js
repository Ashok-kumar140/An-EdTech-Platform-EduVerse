const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({

    courseTitle: {
        type: String,
        trim: true,
        require: true
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    description: {
        type: String,
        trim: true,
        require: true
    },
    tag: {
        type: [String],
        required: true,
    },
    WhatYouWillLearn: {
        type: String,
        trim: true,
        require: true
    },
    courseContent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
        require: true
    }],
    courseRatingAndReviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReviews"

    }],
    price: {
        type: Number,

    },
    thumbnail: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    studentEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    instructions: {
        type: [String],
    },
    status: {
        type: String,
        enum: ["Draft", "Published"],
    },
    courseLanguage: {
        type: String,
        enum: ["English", "Hindi"],
    },
    courseLevel: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advance"],
    },
    createdAt: { type: Date, default: Date.now },

})


module.exports = mongoose.model("Course", courseSchema);
