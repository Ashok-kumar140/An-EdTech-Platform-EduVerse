const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        trim: true
    },
    lastName: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    role: {
        type: String,
        enum: ["Admin", "Instructor", "Student"],
        require: true,
    },
    password: {
        type: String,
        require: true,

    },
    image: {
        type: String,
        trim: true
    },
    moreInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
        require: true,
    },
    contactNumber: {
        type: Number,
        require: true,
    },
    token:{
        type:String
    },
    tokenExpires:{
        type:Date,
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        }
    ],
    courseProgress: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CourseProgress",
        }

    ]

});

module.exports = mongoose.model("User", UserSchema);