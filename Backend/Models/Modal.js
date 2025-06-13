const mongoose = require("mongoose");

const modalSchema = new mongoose.Schema({
    make:{
        type:String,
        ref:"Make"
    },
    modal:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Active","Inactive"],
        default:"Active"
    }
});

module.exports = new mongoose.model("Modal",modalSchema);