import { NextFunction, Request,Response } from "express";
import { RequestSession } from "../../interfaces";
import bcrypt from 'bcrypt'
import {v4} from 'uuid'
import { MongoQuery } from "../services/Queries";
import { AdminModel } from "../models/mongo_db/admins";

export const authenticateAdmin = async(req:RequestSession,res:Response,next:NextFunction)=>{
  if(req.session.admin){
    return next()
  }
  res.json({
    "status":"unauthorized",
    "message":"you are not logged in"
  })
}

export async function addSuperUser(){
  const query = new MongoQuery(AdminModel)
  const {res} = await query.findAll()

  
  if(res.length !== 0 ){
    return "Superuser exists"
  }
  const admin = {
    username:process.env.ADMIN_USERNAME,
    password:process.env.ADMIN_PASSWORD
  }
      try{
      const salt = await bcrypt.genSalt()
      const env_password = admin.password as string
      const hashed = await bcrypt.hash(env_password,salt)
      await query.createRecord({
        username:admin.username,
        password:hashed,
        admin_id:v4().toString().slice(0,5),
        isSuperUser:true
        
     })
   
     return "Admin Created"
      } catch (error) {
        return error
      }
  
  }
