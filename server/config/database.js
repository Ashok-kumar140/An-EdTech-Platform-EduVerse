const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = () => {

    mongoose.connect(process.env.DB_URL).then(() => {
        console.log("DB Connection successful")
    }).catch((error) => {
        console.log("Error in DB connection, ", error);
    })

}

module.exports = dbConnect;