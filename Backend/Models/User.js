const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
    },
    password:{
        type:String
    },
    profilePic:{
        type:String
    },
    status:{
        type:String,
        default:"Active"
    },
    mobileNo:{
        type:Number,
        default:"0000000000"
    },
    address:{
        type:String
    },
    rmAssigned:{
        type:String
    },
    accountType:{
        type:String,
        enum:["Agent","RM","Admin"],
        required:true
    }
})

module.exports = new mongoose.model("User",userSchema);