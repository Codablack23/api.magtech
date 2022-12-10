import { NextFunction, Request,Response } from "express";
import { RequestSession } from "../../interfaces";

export const authenticate = async(req:RequestSession,res:Response,next:NextFunction)=>{
  if(req.session.user){
    console.log(req.session.user)
    return next()
  }
  res.json({
    "status":"unauthorized",
    "message":"you are not logged in"
  })
}