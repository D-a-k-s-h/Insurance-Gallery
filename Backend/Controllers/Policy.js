const Make = require("../Models/Make");
const Policy = require("../Models/Policy");
const User = require("../Models/User");
const { uploadFileToCloudinary } = require("../utils/fileUploader");
require('dotenv').config();

exports.searchPolicy = async (req, res) => {
    try{
        const {rmName = null, customerName = null, vehicleNo = null, vehicleType} = req.body

        //fetch details from Policy model based on rmName and customerName if any
        if(!rmName && !customerName && !vehicleNo) {
            return res.status(400).json({
                success: false,
                message: "Please provide at least one search parameter (RM Name or Agent Name or Vehicle No)"
            });
        }

        const userDetails = await Policy.find({
            $or:[
                {rmName: rmName ? rmName : null},
                {customerName: customerName ? customerName : null},
                {vehicleNo: vehicleNo ? vehicleNo : null}
            ],
            vehicleType: vehicleType
        }).populate("customerName rmName").exec();

        //check if userDetails is empty
        if(!userDetails || userDetails.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No policies found"
            });
        }

        //return response
        return res.status(200).json({
            success: true,
            message: "Policies fetched successfully",
            data: userDetails
        });

    } catch(error) {
        console.error("An error occurred:", error);
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred. Please check the server logs for more details.",
            error: error.message,
            stack: error.stack
        });
    }
}

exports.getAgents = async(req,res) => {
    try{
        const agents = await User.find({accountType:"Agent"}).exec();

        if(!agents){
            return res.status(404).json({
                success:false,
                message:"Agents not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Agents fetched successfully",
            data: agents
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getCaseTypes = async(req,res) => {
    try{
        const caseTypes = await Policy.distinct("caseType").exec();

        if(!caseTypes || caseTypes.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No case types found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Case types fetched successfully",
            data: caseTypes
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getMakes = async(req,res) => {
    try{
        const makes = await Make.find({}).exec();

        if(!makes || makes.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No makes found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Makes fetched successfully",
            data: makes
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.createPolicy = async(req,res) => {
    try{
        const {policyType = null, email = null, agentName = null, 
            policyStartDate = null, companyCode = null, policyNo, mobileNo = null, 
            rmName, policyExpiryDate = null, customerName, vehicleNo = null, 
            caseType = null, policyEntryDate = null, companyName = null, odAmount = null, 
            netAmount = null, totalAmount = null, vehicleType = null, model = null, fuelType = null, 
            make = null, typeOfCase = null, vehicleSpecification = null
        } = req.body;

        let uploadPolicy = null;
        if(req.files && req.files.uploadPolicy){
            uploadPolicy = req.files.uploadPolicy;
        }

        let uploadOtherDocs = null;
        if(req.files && req.files.uploadOtherDocs){
            uploadOtherDocs = req.files.uploadOtherDocs;
        }

        let uploadRC = null;
        if(req.files && req.files.uploadRC){
            uploadRC = req.files.uploadRC;
        }

        let uploadPYP = null;
        if(req.files && req.files.uploadPYP){
            uploadPYP = req.files.uploadPYP;
        }

        if(!rmName || !customerName || !policyNo){
            return res.status(404).json({
                success:false,
                message:"Please provide atleat RM Name, Policy No, Customer Name"
            })
        }

        let uploadPYPResponse = null;
        let uploadRCResponse = null;
        let uploadPolicyResponse = null;
        let uploadOtherDocsResponse = null
        if(uploadPYP){
            uploadPYPResponse = await uploadFileToCloudinary(uploadPYP,process.env.FOLDER_NAME);
        }
        if(uploadRC){
            uploadRCResponse = await uploadFileToCloudinary(uploadRC,process.env.FOLDER_NAME);
        }
        if(uploadPolicy){
            uploadPolicyResponse = await uploadFileToCloudinary(uploadPolicy,process.env.FOLDER_NAME);
        }
        if(uploadOtherDocs){
            uploadOtherDocsResponse = await uploadFileToCloudinary(uploadOtherDocs,process.env.FOLDER_NAME);
        }

        const createPolicy = await Policy.create({
            policyType:policyType,
            email:email,
            agentName:agentName,
            policyStartDate:policyStartDate,
            companyCode:companyCode,
            policyNo:policyNo,
            mobileNo:mobileNo,
            rmName:rmName,
            policyExpiryDate:policyExpiryDate,
            customerName:customerName,
            vehicleNo:vehicleNo,
            caseType:caseType,
            policyEntryDate:policyEntryDate,
            companyName:companyName,
            odAmount:odAmount,
            netAmount:netAmount,
            totalAmount:totalAmount,
            vehicleType:vehicleType,
            model:model,
            fuelType:fuelType,
            make:make,
            uploadPolicy:uploadPolicyResponse ? uploadPolicyResponse?.secure_url : null,
            uploadOtherDocs:uploadOtherDocsResponse ? uploadOtherDocsResponse?.secure_url : null,
            uploadRC:uploadRCResponse ? uploadRCResponse?.secure_url : null,
            uploadPYP:uploadPYPResponse ? uploadPYPResponse?.secure_url : null,
            typeOfCase:typeOfCase,
            vehicleSpecification:vehicleSpecification
        });

        if(!createPolicy){
            res.status(400).json({
                success:false,
                message:"Policy cannot be created"
            })
        }

        //return response
        res.status(200).json({
            success:true,
            message:"Entry created successfully"
        });

    } catch(error){
        console.log("Error updating policy:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.updatePolicy = async(req,res) => {
    try{
        const {policyType = null, email = null, agentName = null, 
            policyStartDate = null, companyCode = null, newPolicyNo = null, policyNo, mobileNo = null, 
            rmName, policyExpiryDate = null, customerName, vehicleNo = null, 
            caseType = null, policyEntryDate = null, companyName = null, odAmount = null, 
            netAmount = null, totalAmount = null, vehicleType = null, model = null, fuelType = null, 
            make = null, typeOfCase = null, vehicleSpecification = null
        } = req.body;

        // console.log("policyType -> ",policyType);
        // console.log("policyNo -> ",policyNo);

        let uploadPolicy = null;
        if(req.files && req.files.uploadPolicy){
            uploadPolicy = req.files.uploadPolicy;
        }

        let uploadOtherDocs = null;
        if(req.files && req.files.uploadOtherDocs){
            uploadOtherDocs = req.files.uploadOtherDocs;
        }

        let uploadRC = null;
        if(req.files && req.files.uploadRC){
            uploadRC = req.files.uploadRC;
        }

        let uploadPYP = null;
        if(req.files && req.files.uploadPYP){
            uploadPYP = req.files.uploadPYP;
        }
        
        if(!policyNo){
            return res.status(404).json({
                success:false,
                message:"Please provide Old Policy No and New Policy No"
            })
        }

        let policyDetails = null
        if(policyType){
            policyDetails = await Policy.findOne({policyNo:policyNo,policyType:policyType}).exec();
        }
        else{
            policyDetails = await Policy.findOne({policyNo:policyNo}).exec();
        }

        if(!policyDetails){
            return res.status(404).json({
                success:false,
                message:"No policy found by given policy no"
            })
        }

        const updateFields = {};

        // Policy details
        if (newPolicyNo) updateFields.policyNo = newPolicyNo;
        if (policyStartDate) updateFields.policyStartDate = policyStartDate;
        if (policyExpiryDate) updateFields.policyExpiryDate = policyExpiryDate;
        if (policyEntryDate) updateFields.policyEntryDate = policyEntryDate;
        if (companyCode) updateFields.companyCode = companyCode;
        if (companyName) updateFields.companyName = companyName;
        if (typeOfCase) updateFields.typeOfCase = typeOfCase;
        if (policyType) updateFields.policyType = policyType;
        if (agentName) updateFields.agentName = agentName;
        if (caseType) updateFields.caseType = caseType;

        // Customer details
        if (email) updateFields.email = email;
        if (mobileNo) updateFields.mobileNo = mobileNo;
        if (rmName) updateFields.rmName = rmName;
        if (customerName) updateFields.customerName = customerName;

        // Vehicle details
        if (vehicleNo) updateFields.vehicleNo = vehicleNo;
        if (vehicleType) updateFields.vehicleType = vehicleType;
        if (model) updateFields.model = model;
        if (fuelType) updateFields.fuelType = fuelType;
        if (make) updateFields.make = make;
        if (vehicleSpecification) updateFields.vehicleSpecification = vehicleSpecification

        // Financial details
        if (odAmount) updateFields.odAmount = odAmount;
        if (netAmount) updateFields.netAmount = netAmount;
        if (totalAmount) updateFields.totalAmount = totalAmount;

        // Document uploads
        if(uploadPYP){
            const uploadPYPResponse = await uploadFileToCloudinary(uploadPYP,process.env.FOLDER_NAME);
            updateFields.uploadPYP = uploadPYPResponse?.secure_url;
        }
        if(uploadRC){
            const uploadRCResponse = await uploadFileToCloudinary(uploadRC,process.env.FOLDER_NAME);
            updateFields.uploadRC = uploadRCResponse?.secure_url;
        }
        if(uploadPolicy){
            const uploadPolicyResponse = await uploadFileToCloudinary(uploadPolicy,process.env.FOLDER_NAME);
            updateFields.uploadPolicy = uploadPolicyResponse?.secure_url;
        }
        if(uploadOtherDocs){
            const uploadOtherDocsResponse = await uploadFileToCloudinary(uploadOtherDocs,process.env.FOLDER_NAME);
            updateFields.uploadOtherDocs = uploadOtherDocsResponse?.secure_url;
        }

        await Policy.findOneAndUpdate(
            { policyNo: policyNo }, // Filter object
            updateFields,
            {new:true}
        );

        //return response
        return res.status(200).json({
            success:true,
            message:"Policy updated successfully"
        })

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getRmNames = async(req,res) => {
    try{
        const rmNames = await User.find({accountType: "RM"}).exec();

        if(!rmNames){
            return res.status(404).json({
                success:false,
                message:"RM Names not found"
            })
        }

        //return response
        return res.status(200).json({
            success:true,
            message:"RM Names Fetched",
            data:rmNames
        })

    } catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getPolicyInfo = async(req,res) => {
    try{
        const {vehicleType,startDate,endDate, ...rest} = req.body;

        let query = {};
        if(vehicleType){
            query = {vehicleType};
        }

        Object.keys(rest).forEach((key) => {
            if(rest[key]){
                query[key] = rest[key]
            }
        });

        if(startDate && endDate){
            query.policyStartDate = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }

        //console.log(query);

        const policyDetails = await Policy.find(query).exec();

        if(!policyDetails || policyDetails.length === 0){
            return res.status(404).json({
                success:false,
                message:`No policies ${vehicleType ? `for ${vehicleType}` : "found"}`
            })
        }

        //return response
        return res.status(200).json({
            success:true,
            message:`${vehicleType ? vehicleType : 'All'} policies found`,
            data: policyDetails
        });

    } catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}