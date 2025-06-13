const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
    companyCode:{
        type:String,
        required:true
    },
    remarks:{
        type:String
    },
    status:{
        type:String,
        enum:["Active","Inactive"]
    }
});

module.exports = new mongoose.model("Company",companySchema);