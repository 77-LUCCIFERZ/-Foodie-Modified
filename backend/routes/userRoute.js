import express from "express"
import { loginUser,registerUser } from "../models/user/userController.js"
import authController from "../models/user/auth.controller.js";


const userRouter =express.Router();

userRouter.post("/register",registerUser)
userRouter.get('/activate/:token',authController.activateUser)
userRouter.get('/resend-token/:token', authController.resendActivationToken)
userRouter.post("/login",loginUser)



export default userRouter ;

