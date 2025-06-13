const Make = require("../Models/Make");

exports.createAndUpdateMake = async(req,res) => {
    try{
        const {make,status} = req.body;

        if(!make){
            return res.status(404).json({
                success: false,
                message: "Please provide make"
            });
        }

        const fetchMake = await Make.findOne({make});

        let createMake = null;
        let updateMake = null;

        if(!fetchMake){
            createMake = await Make.create({
                make: make,
                status: status
            });
        }
        else{
            const updateFields = {};

            if(make){
                updateFields.make = make;
            }
            if(status){
                updateFields.status = status;
            }

            updateMake = await Make.findOneAndUpdate(
                {make: make},
                updateFields,
                {new:true}
            );
        }

        if(createMake || updateMake){
            if(createMake){
                return res.status(200).json({
                    success: true,
                    message: `${make} created successfully`
                });
            }
            else if(updateMake){
                return res.status(200).json({
                    success: true,
                    message: `${make} updated successfully`
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

exports.deleteMake = async(req,res) => {
    try{
        const {make,status} = req.body;

        if(!make){
            return res.status(404).json({
                success:false,
                message:"Make is required"
            })
        }

        const makeDetails = await Make.findOne({make});

        if(!makeDetails){
            return res.status(400).json({
                success:false,
                message:"Make doesn't exist"
            })
        }

        await Make.findOneAndDelete({make:make});

        //return response
        return res.status(200).json({
            success:true,
            message:`${make} deleted successfully`
        })

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}