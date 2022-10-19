import { NextFunction, Request,Response } from "express";
import { Session } from "express-session";
import { Schema } from "mongoose";

export interface SessionData extends Session{
    user?:{
        username:string,
        phone:string,
        [key:string]:string
    },
    admin?:{
        username:string,
        [key:string]:string
    }
}
export interface RequestSession extends Request{
  session:SessionData
}

