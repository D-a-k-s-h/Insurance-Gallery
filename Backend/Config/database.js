const mongoose = require("mongoose");
require("dotenv").config();

exports.dBConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => {console.log("Connected to Database")})
    .catch((error) => {
        console.log(error);
        console.log("Database couldn't be connected");
        process.exit(1);
    })
}