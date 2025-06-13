const User = require("../Models/User");

exports.createAndUpdateUser = async(req,res) => {
    try{
        const {rmAssigned = null, email, address, username, mobileNo, status, accountType} = req.body;

        if(!username || !mobileNo || !accountType){
            return res.status(400).json({
                success:false,
                message:`Please provide ${accountType} name, mobile no, and account type`
            })
        }

        if(!username || !mobileNo){
            return res.status(400).json({
                success:false,
                message:`Please provide ${accountType} name and mobile no`
            })
        }

        const fetchUser = await User.findOne({
            username:username,
            mobileNo:mobileNo
        })

        let createUser = null;
        let updateUser = null;
        if(!fetchUser){
            createUser = await User.create({
                rmAssigned: rmAssigned,
                email: email,
                address: address,
                username: username,
                mobileNo: mobileNo,
                status: status,
                accountType: accountType
            });
        }
        else{
            const updatedFields = {};

            if(rmAssigned){
                updatedFields.rmAssigned = rmAssigned;
            }
            if(email){
                updatedFields.email = email;
            }
            if(address){
                updatedFields.address = address;
            }
            if(status){
                updatedFields.status = status
            }

            updateUser = await User.findOneAndUpdate(
                {username:username,mobileNo:mobileNo},
                updatedFields,
                { new: true }
            );
        }

        if(createUser || updateUser){
            if(createUser){
                return res.status(200).json({
                    success: true,
                    message: `${accountType} created successfully`
                });
            }
            else if(updateUser){
                return res.status(200).json({
                    success: true,
                    message: `${accountType} updated successfully`
                });
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

exports.deleteUser = async(req,res) => {
    try{
        const {username,mobileNo} = req.body;
        //console.log(req.body);

        if(!username || !mobileNo){
            return res.status(404).json({
                success:false,
                message:"Please provide agent name and mobile no"
            })
        }

        const userDetails = await User.findOne({
            username: username,
            mobileNo: mobileNo
        });

        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found with details specified"
            })
        }

        await User.findOneAndDelete({
            username: username,
            mobileNo: mobileNo
        });

        //return response
        return res.status(200).json({
            success:true,
            message:"User deleted successfully"
        });
        
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getUserInfo = async(req,res) => {
    try{
        const {accountType} = req.body;
        const userDetails = await User.find({accountType:accountType}).exec();

        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: `${accountType}s fetched successfully`,
            data: userDetails
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}