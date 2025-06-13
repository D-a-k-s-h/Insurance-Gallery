const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
    caseType:{
        type:String
    },
    customerName:{
        type:String,
        required:true,
        ref: "User"
    },
    agentName:{
        type:String,
        ref: "User"
    },
    policyType:{
        type:String,
        enum:["New","Renewal","RollOver","Port","Fresh"],
    },
    email:{
        type:String
    },
    vehicleType:{
        type:String,
        enum:["Motor","Non-Motor"]
    },
    vehicleSpecification:{
        type:String,
        enum:["Goods Carrying","Passenger Carrying","Motor Bike","PVT Car","Commercial Vehicle","Scooter","Trailer"]
    },
    rmName:{
        type:String,
        ref: "User"
    },
    policyExpiryDate:{
        type:Date,
        expires:3 * 365 * 24 * 60 * 60
    },
    policyEntryDate:{
        type:Date,
        default:Date.now()
    },
    make:{
        type:String,
        ref: "Make"
    },
    fuelType:{
        type:String
    },
    netAmount:{
        type:Number
    },
    companyName:{
        type:String,
        ref: "Company"
    },
    policyNo:{
        type:String
    },
    mobileNo:{
        type:Number
    },
    vehicleNo:{
        type:String
    },
    policyStartDate:{
        type:Date,
        default:Date.now()
    },
    typeOfCase:{
        type:String,
        enum:["COMP","SAOD","STP"],
    },
    companyCode:{
        type:String
    },
    model:{
        type:String
    },
    odAmount:{
        type:Number
    },
    premium:{
        type:String,
        default:"₹7313"
    },
    totalAmount:{
        type:Number
    },
    companyId:{
        type:String
    },
    uploadPYP:{
        type:String
    },
    uploadPolicy:{
        type:String
    },
    uploadRC:{
        type:String
    },
    uploadOtherDocs:{
        type:String
    }
})

module.exports = new mongoose.model("Policy",policySchema);