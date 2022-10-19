import { Response } from "express"
import bcrypt from 'bcrypt'
import uuid, { v4 } from 'uuid'
import { User } from "../config/models/mongo_db/user"
import { MongoQuery } from "../config/services/Queries"
import { RequestSession } from "../interfaces"
import { Refferral } from "../config/models/mongo_db/bots"

//interfaces
interface RouteResponse{
    [key:string]:any
}
interface UserSession{
    username:string,
    phone:string|number,
    [key:string]:any
}


export async function loginHandler(req:RequestSession,res:Response){
   const {phone,password} = req.body
   const response:{[key:string]:any} = {
     status:"pending",
     error:"process is still pending"
   }
   const query = new MongoQuery(User)
   try {
     const userExist = await query.find({phone_no:phone})
     const {res:user} = userExist
     const check = await bcrypt.compare(password,user.password)
     if(check){
        const userData = {
            phone,
            username:user.username,
            name:user.name,
            refcode:user.ref_code
           }
       req.session.user = userData
       response.error = ""
       response.status = "success"
       response.user = userData
       return res.json(response)
     }
     response.status = "not allowed"
     response.error = "password does not match"
     return res.json(response)
     
   } catch (error) {
    console.log(error)
    response.status = "internal error"
    response.error = "an internal server error occured"
   }
   res.json(response)
}


export async function logoutHandler(req:RequestSession,res:Response){
    delete req.session.user
    res.json({
      status:'success',
      message:"you have successfully logged out"
    })
}
export async function forgotPassword(req:RequestSession,res:Response){
    res.json({
        page:"logout"
        })
}
export async function resetPassword(req:RequestSession,res:Response){
   const response:RouteResponse = {
    status:"pending",
    error:"pending process"
   }
   const {username} = req.session.user as UserSession
   const {new_password} = req.body
   const query = new MongoQuery(User)
   try {
    await query.updateOne({username},{password:new_password})
    response.status = "success"
    response.message = "password changed successfully"
    
   } catch (error) {
    console.log(error) 
    response.status = "500"
    response.error = "an internal server occurred"
   }
   res.json(response)
}
export async function registerHandler(req:RequestSession,res:Response){
    const response:{[key:string]:any} = {
        status:"pending",
        error:"process is still pending"
    }
    const {name,phone,password,username} = req.body
    console.log(req.body,"regHandler")
    const query = new MongoQuery(User)
    const refQuery = new MongoQuery(Refferral)
    try {
        const salt = await bcrypt.genSalt()
        console.log(v4)
        const refcode = v4().slice(0,6);
        const hashedPassword = await bcrypt.hash(password,salt)
        await query.createRecord({
            name,
            phone_no:phone,
            ref:"",
            username,
            refferred:false,
            password:hashedPassword,
            ref_code:refcode,
        })
        await refQuery.createRecord({
            ref_code:refcode,
            first_gen:"",
            second_gen:"",
            amount:0
        })
        
        const user = {
            name,
            phone,
            username,
            refcode
        }
        response.status = "success"
        response.error = ""
        response.user = user
        req.session.user = user
        
    } catch (error) {
       console.log(error) 
       response.status = "500"
       response.error = "an internal server occurred"
       return res.json(response)
    }
    res.json(response)
}
export async function sendResetPasswordToken(req:RequestSession,res:Response){
    res.json({
        page:"logout"
        })
}
export async function changePassword(req:RequestSession,res:Response){
    res.json({
        page:"logout"
        })
}
