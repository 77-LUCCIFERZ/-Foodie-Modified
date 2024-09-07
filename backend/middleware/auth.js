import jwt from "jsonwebtoken";


const authMiddleware=async(req,res,next)=>{

const  {token}=req.headers;
if (!token) {
    return res.json({success:false,message:"Not Authorized login again "})
}
 
try {
    const token_decode=jwt.verify(token,process.env.JWT_SECRET) //when generating token in usercontoller file we have passed user id also so we can use it 
    req.body.userId=token_decode.id;
    next();
} catch (error) {
    console.log("Error ayon auth.js file ma",error)
    res.json({success:false,message:"Error ayon"})
}

}


export default authMiddleware;