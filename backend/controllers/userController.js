import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


//login user
const loginUser=async(req,res)=>{
const {email,password}=req.body;
try {
    const user = await userModel.findOne({email});
if(!user){
    return res.json({success:false,message:"user Doesn't exist (sorry la) "})
}

const isMatch =await bcrypt.compare(password,user.password);

if(!isMatch){
    return res.json({success:false,message:"Invalid password (sorry la) "})
}

const token=createToken(user._id);
res.json({success:true,message:"logged in successfully",token})

} catch (error) {
    console.log(error);
    res.json({success:false,message:"error logging in  bhayo usercontroller file hernus"})
}
}
const createToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"4h"})
}

// register user
const registerUser=async(req,res)=>{

const {name,password,email}=req.body ;
try {
    //checing is user already exists
    const exists=await userModel.findOne({email});
    if(exists){
        return res.status(400).json({success:false,msg:"User already exists"})
    }

    // validating email format and stong password 
    if(!validator.isEmail(email)){
        return res.json({success:false,message:"please Enter the valid Email"})
    }
    if(password.length<8){
        return res.json({success:false,message:"password must be at least 8 characters long"})
    }
    // now encrypt the password hashing it
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt);

    const newUser =new userModel({
        name:name,
        email:email,
        password:hashedPassword
    })

    const user=await newUser.save();
const token=createToken(user._id)
res.json({success:true,msg:"user created successfully",token});

} catch (error) {
    console.log(error)
    res.json({success:false,message:'Error aayo laa ==>userController file ma herr'})
}


}



export  {loginUser,registerUser}