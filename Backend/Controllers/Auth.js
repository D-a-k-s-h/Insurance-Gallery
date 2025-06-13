const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.login = async(req,res) => {
    try{
        const {username,password} = req.body;

        if(!username || !password){
            return res.status(404).json({
                success:false,
                message:"Please provide all data"
            })
        }

        const existingUser = await User.findOne({
            username:username
        });

        if(!existingUser){
            return res.status(404).json({
                success:false,
                message:"User Not Found"
            })
        }

        const payload = {
            username: existingUser.username,
            userId: existingUser._id
        }

        //match password
        if(await bcrypt.compare(password,existingUser?.password)){
            //if matched, then generate JWT
            const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1d"});

            existingUser.toObject();
            existingUser.password = undefined;
            existingUser.token = token;

            //create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }

            res.cookie("token",token,options).status(200).json({
                success:true,
                token:token,
                user:existingUser,
                message:"User logged in successfully"
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Password is incorrect, Please try again"
            })
        }

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.signup = async(req,res) => {
    try{
        //retrieve data from req.body
        const {username,email,password,confirmPassword,accountType} = req.body;

        if(!username || !email || !accountType){
            return res.status(404).json({
                success:false,
                message:"Please provide all information"
            })
        }

        if(password !== confirmPassword){
            return res.status(404).json({
                success:false,
                message:"Passwords do not match"
            })
        }

        const existingUser = await User.findOne({
            username:username,
            email:email
        })

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const userDetails = await User.create({
            username:username,
            password:hashedPassword,
            email:email,
            profilePic:`https://api.dicebear.com/5.x/initials/svg?seed=${username}`,
            accountType:accountType
        })

        return res.status(200).json({
            success:true,
            message:"User created successfully",
            data:userDetails
        })

    } catch(error){
        return res.status(400).json({
            success:false,
            message:"Something went wrong, Please try again"
        })
    }
}