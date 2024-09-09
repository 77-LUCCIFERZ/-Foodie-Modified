import express from "express"
import { loginUser,registerUser } from "../models/user/userController.js"
import authController from "../models/user/auth.controller.js";


const userRouter =express.Router();

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.use('/activate/:token',authController.activateUser)


export default userRouter ;

