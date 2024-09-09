
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from 'dotenv';
import UserService from "../user/user.service.js";

dotenv.config();



//login user
const loginUser=async(req,res)=>{
const {email,password}=req.body;
try {
    const user = await UserService.getSingleUserByFilter({ email });

if(!user){
    return res.json({success:false,message:"user Doesn't exist (sorry la) "})
}

if (user && user.status === GeneralStatus.ACTIVE){


    const isMatch =await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.json({success:false,message:"Invalid password (sorry la) "})
    }
    
    const token=createToken(user._id);
    res.json({success:true,message:"logged in successfully",token})
    


}


} catch (error) {
    console.log(error);
    res.json({success:false,message:"error logging in  bhayo usercontroller file hernus"})
}
}
const createToken =(id)=>{
    return jwt.sign({id,type:"bearer"},process.env.JWT_SECRET,{expiresIn:"12d"}) // if user visits website after 12day of login re loggin is required 
}


// register user
const registerUser=async(req,res)=>{
    try{
    
        const data= await UserService.transformUserCreate(req)        // here it sends the request to the user.service.js  it moodifies the rrequet
        // after this line we have activefor,satus,hash-password
        const user=await UserService.storeUser(data)                      // 3rd step i.e calling the user.service code
  
      // Sending email of day16 i.e notification
      await UserService.sendActivationEMail({to:user.email, name: user.name, token: user.activationToken}) //   // It is sending data to the user service file for processing and the output will be created here 
  
  res.json({
        result: {                 // 4th step
          _id:user._id,          
          name:user.name,
          email:user.email,
          activationToken:user.activationToken,   // It should be of user.model
          token:user.activationToken,
          activefor:user.activeFor,
          phone:user.phone
        },
        message: "User created Successfully",
        meta: null,
      });
    }catch(exception){
         next(exception)
      }
  }






export  {loginUser,registerUser}


// const exists=await userModel.findOne({email});
// if(exists){
//     return res.status(400).json({success:false,msg:"User already exists"}) // one acccount per email
// }

// // validating email format and stong password 
// if(!validator.isEmail(email)){
//     return res.json({success:false,message:"please Enter the valid Email"})
// }
// if(password.length<8){
//     return res.json({success:false,message:"password must be at least 8 characters long"})
// }