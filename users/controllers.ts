import { Response } from "express"
import bcrypt from 'bcrypt'
import { v4 } from 'uuid'
import {User,ResetCode} from "../config/models/sql/user"
import { SQLQuery } from "../config/services/Queries"
import { RequestSession } from "../interfaces"
import { Refferal } from "../config/models/sql/bots"
import moment from 'moment'
import console from "console"

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
   const query = new SQLQuery(User)
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
   const {username} = req.body
   console.log(username)
   const response:RouteResponse = {
    status:"pending",
    error:"pending process"
   }
   const query = new SQLQuery(User)
   const resetCodQuery = new SQLQuery(ResetCode)
   const queryResponse = await query.find({
    username
   })
   console.log(queryResponse)

   if(queryResponse.success){
    
     const reset_code = v4().slice(0,6)
     const resetResponse = await resetCodQuery.createRecord({
        code:reset_code,
        username,
        expires:moment().add(1,"hour")
     })
     if(resetResponse.success){
        response.status="success"
        response.message = "Reset Code Sent Successfully"
        response.error = ""
        response.reset_code = reset_code
     }
     else{
        response.status="failed"
        response.error = "an error occured in the server"
     }
   }
   else{
    response.status="failed"
    response.error = "user does not exist"
   }
   res.json(response)
}

export async function resetPassword(req:RequestSession,res:Response){
   const response:RouteResponse = {
    status:"pending",
    error:"pending process"
   }
 
   const {new_password,reset_code} = req.body
   const query = new SQLQuery(User)
   const resetQuery = new SQLQuery(ResetCode)
   const resetQueryRes = await resetQuery.find({code:reset_code})

   console.log(resetQueryRes)
   if(resetQueryRes.success){
    const {res:resetDetail} = resetQueryRes
    const currentDate = moment()
    const expiredDate = moment(resetDetail.expires)

    const diff = (currentDate.diff(expiredDate))/(60*60*1000)
   
    if(diff < 1){
      const queryResponse = await query.updateOne({username:resetDetail.username},{password:new_password})
      console.log(queryResponse)
      if(queryResponse.success){
        
       const delRes =   await resetQuery.deleteRecord({
            code:reset_code
          })
          console.log({delRes,reset_code})
          response.status = "success"
          response.message = "password changed successfully"
            
      }else {
            response.status = "500"
            response.error = "an internal server occurred"
      }
    }else{
        response.status = "400"
        response.error = "Sorry This Code has expired"
    }
   }else{
    response.status = "400"
    response.error = "Invalid Reset Code"
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
    console.log(User,Refferal)
    const query = new SQLQuery(User)
    const refQuery = new SQLQuery(Refferal)
    try {
        const salt = await bcrypt.genSalt()
        const refcode = v4().slice(0,6);
        const hashedPassword = await bcrypt.hash(password,salt)
        const res = await query.createRecord({
            name,
            phone_no:phone,
            ref:"",
            username,
            refferred:false,
            password:hashedPassword,
            ref_code:refcode,
        })
        console.log(res)
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
