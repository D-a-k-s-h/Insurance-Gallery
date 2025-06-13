const Modal = require("../Models/Modal");

exports.getModals = async(req,res) => {
    try{
        const modalDetails = await Modal.find({}).exec();
        
        if(!modalDetails){
            return res.status(404).json({
                success:false,
                message:"No Modals Found"
            });
        }

        //return response
        return res.status(200).json({
            success:true,
            message:"Modals fetched successfully",
            data:modalDetails
        });

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.createAndUpdateModals = async(req,res) => {
    try{
        const {make,modal,status} = req.body;

        if(!modal){
            return res.status(404).json({
                success:false,
                message:"Modal field is compulsory"
            })
        }

        const fetchModal = await Modal.findOne({
            make: make,
            modal: modal
        });

        let createModal = null;
        let updateModal = null;

        if(!fetchModal){
            createModal = await Modal.create({
                make: make,
                modal: modal,
                status: status
            });
        }
        else{
            let updateFields = {};

            if(make){
                updateFields.make = make;
            }
            if(modal){
                updateFields.modal = modal;
            }
            if(status){
                updateFields.status = status;
            }

            updateModal = await Modal.findOneAndUpdate(
                {make: make, modal:modal},
                updateFields,
                {new:true}
            )
        }

        if(createModal || updateModal){
            if(createModal){
                return res.status(200).json({
                    success:true,
                    message:`${modal} created successfully`
                });
            }
            else if(updateModal){
                return res.status(200).json({
                    success:true,
                    message:`${modal} updated successfully`
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

exports.deleteModal = async(req,res) => {
    try{
        const {make,modal,status} = req.body;

        if(!make && !modal){
            return res.status(400).json({
                success:false,
                message:"Make and Modal fields are compulsory"
            })
        }

        await Modal.findOneAndDelete(
            {make: make, modal: modal}
        );

        //return response
        return res.status(200).json({
            success:true,
            message:`${modal} deleted successfully`
        })

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}