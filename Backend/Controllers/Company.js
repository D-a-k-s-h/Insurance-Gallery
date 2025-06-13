const Company = require("../Models/Company");

exports.getCompany = async (req, res) => {
    try{
        const companyDetails = await Company.find({}).exec();

        if(!companyDetails || companyDetails.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No companies found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Companies fetched successfully",
            data: companyDetails
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.createAndUpdateCompanies = async(req,res) => {
    try{
        const {companyName,companyCode,remarks,status} = req.body;

        if(!companyName && !companyCode){
            return res.status(400).json({
                success:false,
                message:"Company name and company code is a must to add data"
            })
        }

        const fetchCompanies = await Company.findOne({
            companyName:companyName,
            companyCode:companyCode
        });

        let createCompanies = null;
        let updateCompanies = null;

        if(!fetchCompanies){
            createCompanies = await Company.create({
                companyName:companyName,
                companyCode:companyCode,
                remarks:remarks,
                status:status
            });
        }
        else{
            const updatedFiels = {};

            if(remarks){
                updatedFiels.remarks = remarks;
            }
            if(status){
                updatedFiels.status = status;
            }

            updateCompanies = await Company.findOneAndUpdate(
                {companyName:companyName, companyCode:companyCode},
                updatedFiels,
                {new:true}
            );
        }

        if(createCompanies || updateCompanies){
            if(createCompanies){
                return res.status(200).json({
                    success:true,
                    message:`Company ${companyName} created successfully`
                })
            }
            else if(updateCompanies){
                return res.status(200).json({
                    success:true,
                    message:`${companyName} updated successfully`
                })
            }
        }

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.deleteCompany = async(req,res) => {
    try{
        const {companyName,companyCode} = req.body;

        if(!companyName && !companyCode){
            return res.status(404).json({
                success:false,
                message:"Company name and company code is required to delete company"
            })
        }

        const companyDetails = await Company.findOne(
            {companyName:companyName,companyCode:companyCode}
        );

        if(!companyDetails){
            return res.status(404).json({
                success:false,
                message:`${companyName} is not registered`
            })
        }

        await Company.findOneAndDelete(
            {companyName:companyName,companyCode:companyCode},
        );

        //return response
        return res.status(200).json({
            success:true,
            message:`${companyName} deleted successfully`
        })

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}