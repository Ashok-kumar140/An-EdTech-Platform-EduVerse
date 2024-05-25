const mongoose = require('mongoose');


const ProfileSchema = new mongoose.Schema({

    gender:{
        type:String,
        trim:true,
    },
    about:{
        type:String,
        trim:true
    },
    contactNumber:{
        type:Number,
        trim:true,
    },
    profession:{
        type:String,
        trim:true,
    },
    address:{
        type:String,
        trim:true,
    },
    DOB:{
        type:String,
        trim:true
    },
    

})


module.exports = mongoose.model("Profile", ProfileSchema);
