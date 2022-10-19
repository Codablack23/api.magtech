import express, { Request, Response } from "express"
import { addUserWithRefCode, checkRef } from "../config/middlewares/checkRef"
import { findUser } from "../config/middlewares/findUser"

import { authenticate } from "../config/middlewares/userAuth"
import validateRequest, { validateLogin, validateRegister } from "../config/middlewares/validate"
import { RequestSession } from "../interfaces"

import  {
    loginHandler,
    logoutHandler,
    forgotPassword,
    resetPassword,
    registerHandler, 
    sendResetPasswordToken, 
    changePassword
} from "./controllers"




const userApp = express.Router()


//user routes and their handlers
userApp.get("/",(req:Request,res:Response)=>res.send("auth"))
userApp.post("/forgot-password",forgotPassword)
userApp.post("/reset-password",resetPassword)
userApp.post("/change-password",authenticate,sendResetPasswordToken)
userApp.post("/change-password/:id",authenticate,changePassword)
userApp.post("/",authenticate,(req:RequestSession,res:Response<any>)=>{
    res.json({user:{...req.session.user},status:"Authorized"})} )
userApp.post("/login",validateLogin,findUser("login"),loginHandler)
userApp.post("/logout",authenticate,logoutHandler)
userApp.post("/signup",validateRegister(),findUser("signup"),checkRef,addUserWithRefCode,registerHandler)
userApp.get("/forgot-password/",(req,res)=>{res.send("/")})

export default userApp