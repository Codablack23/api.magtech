import { NextFunction, Response } from "express";
import { RequestSession } from "../../interfaces";
import { User } from "../models/mongo_db/user";
import { MongoQuery } from "../services/Queries";

export function findUser(route:string){

  if(route === "login"){
    return async(req:RequestSession,res:Response,next:NextFunction)=>{
        const {phone} = req.body
        const query = new MongoQuery(User)
        try {
         const userExist = await query.find({phone_no:phone})

         if(userExist.res){
             return next()
         }
         res.json({
             status:"404",
             error:"user does not exist"
         })
         
        } catch (error) {
         console.log(error)
         res.json({
             status:"internal server error",
             error:"an internal server error occured"
         })
        }
        
     }
  }
  return async(req:RequestSession,res:Response,next:NextFunction)=>{
    const {phone:phone_no,username} = req.body
    console.log(req.body)
    const query = new MongoQuery(User)
    try {
     const userExist = await query.find({$or:[{phone_no},{username}]})

     if(!userExist.res){
         return next()
     }
     res.json({
         status:"405",
         error:"user already exist try a different phone number or username"
     })
     
    } catch (error) {
     console.log(error)
     res.json({
         status:"internal server error",
         error:"an internal server error occured"
     })
    }
  }
}