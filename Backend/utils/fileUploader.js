const cloudinary = require("cloudinary").v2;

exports.uploadFileToCloudinary = async(file,folder,height,quality) => {
    try{
        const options = {
            folder,
            resource_type: "auto",
            access_mode: "public",
        };

        if(quality){
            options.quality = quality;
        }

        if(height){
            options.height = height;
        }       

        return await cloudinary.uploader.upload(file.tempFilePath,options);

    } catch(error){
        console.log(error);
    }
}