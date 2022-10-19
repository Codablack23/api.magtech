import { NextFunction, Response } from "express";
import { RequestSession } from "../../interfaces";
import { User } from "../models/mongo_db/user";
import { MongoQuery } from "../services/Queries";
import bcrypt from 'bcrypt'
import {v4} from 'uuid'
import { Refferral } from "../models/mongo_db/bots";

export async function checkRef(req:RequestSession,res:Response,next:NextFunction){
    const {refcode} = req.body
    if(!refcode){return next();}
    const query = new MongoQuery(User)
    const {success} = await query.find({ref_code:refcode})
    if(success){
        return next()
    }
    res.json({
        status:"404",
        error:"the refcode is invalid"
    })

}


export async function addUserWithRefCode(req:RequestSession,res:Response,next:NextFunction){

    //default response object
    const response:{[key:string]:any} = {
        status:"pending",
        error:"process is still pending",
    }
    const {name,phone,password,username,refcode:ref} = req.body

    const query = new MongoQuery(User)
    const refQuery = new MongoQuery(Refferral)

    if(!ref){return next()}
    try {
        const salt = await bcrypt.genSalt()
        const refcode = v4().slice(0,6);
        await query.createRecord({
            name,
            phone_no:phone,
            username,
            password:await bcrypt.hash(password,salt),
            ref_code:refcode,
            ref
        })
        //add user as first_gen to the one who reffered him 
        await refQuery.createRecord({
            ref_code:ref,
            first_gen:username,
            second_gen:"",
            amount:0
        }) 
        
        const user = {
            name,
            phone,
            username,
            refcode
        }
        
        //find user that refferred the user that reffered the current user about to register
        const {res:secondGen} = await query.find({ref_code:ref})
        const {res:reff} = await refQuery.find({ref_code:secondGen.ref})

        //check if the user that reffered the current user was refferred
        if(secondGen && (reff.second_gen === "" || reff.second_gen === ' ')){          
          
           //update the refferral tables/document to add user as the second_gen to who refferred the one that reffered the user 
            await refQuery.updateOne(
                {ref_code:secondGen.ref},
                {second_gen:username}
            )
        }

        response.status = "success"
        response.error = ""
        response.user = user
        req.session.user = user

    } catch (error) {
       console.log(error) 
       response.status = "500"
       response.error = "an internal server occurred"
    }
    res.json(response)
}