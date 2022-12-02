import { response, Response } from "express"
import { AdminModel, Exchange } from "../config/models/mongo_db/admins"
import { User } from "../config/models/mongo_db/user"
import { SQLQuery } from "../config/services/Queries"
import { RequestSession } from "../interfaces"
import bcrypt from 'bcrypt'
import uuid, { v4 } from 'uuid'
import { Payment, Withdrawal } from "../config/models/mongo_db/payments"
import { Investment, Refferal } from "../config/models/sql/bots"

interface UsersData{
    username:string,
    name:string,
    phone:string|number,
    createdAt:Date | string,
    [key:string]:any
}
interface RouteResponse{
    status:string,
    err?:string
    [key:string]:any
}

export async function getUsers(req:RequestSession,res:Response){
    const refQuery = new SQLQuery(Refferal)
    const query = new SQLQuery(User)
    const result:RouteResponse = {
        status:"pending",
        err:"",
    }
    try {
      const {res:users} =  await query.findAll()
      const {res:refs} = await refQuery.findAll()
        result.status = "success"
        result.users = users?.map((user:any)=>{
            return {
                username:user.username,
                name:user.name,
                phone:user.phone_no,
                createdAt:user.createdAt,
                ref_code:user.ref_code
            }
        })
        result.refs = refs
    } catch (err) {
        result.status = 'Network Error'
        result.err = "an error occured in the server try again later"
    }

    res.json(result)
}
export async function getInvestments(req:RequestSession,res:Response){
    const query = new SQLQuery(Investment)
    const result:RouteResponse = {
        status:"pending",
        err:"",
    }
    try {
      const {res:investments} =  await query.findAll()
        result.status = "completed"
        result.investments = investments
    } catch (err) {
        result.status = 'Network Error'
        result.err = "an error occured in the server try again later"
    }

    res.json(result)
}
export async function getPayments(req:RequestSession,res:Response){
    const query = new SQLQuery(Payment)
    const result:RouteResponse = {
        status:"pending",
        err:"",
    }
    try {
      const {res:payments} =  await query.findAll()
        result.status = "completed"
        result.payments = payments
    } catch (err) {
        result.status = 'Network Error'
        result.err = "an error occured in the server try again later"
    }

    res.json(result)
}
export async function addAdmin(req:RequestSession,res:Response){
  const result:RouteResponse = {
    status:"pending",
    err:"",
}
  const query = new SQLQuery(AdminModel)
  const {username} = req.body
      try{
      const salt = await bcrypt.genSalt()
      const env_password = username as string
      const hashed = await bcrypt.hash(env_password,salt)
      await query.createRecord({
        username,
        password:hashed,
        admin_id:v4().toString().slice(0,5),
        isSuperUser:false
     })
       result.status = "success"
       result.message = "admin added successfully"
      } catch (error) {
        result.status = "failed"
        result.message = "an error occurred in our server"
      }
      res.json(result)
}
export async function loginAdmin(req:RequestSession,res:Response){
    const query = new SQLQuery(AdminModel)
    const {username,password} = req.body
    let result:RouteResponse = {
        status:"",
        error:""
    }
      try {
        const {success,res:user} = await query.find({username:username})
        if(success){
          const checkDetail = await bcrypt.compare(password,user.password)
          if(checkDetail){
            req.session.admin = {username}
            req.session.admin.admin_id= user.admin_id
            result.status = "logged in"
            result.admin = {username,admin_id:user.admin_id}
          }
          else{
            result.status = "Invalid Credentials"
            result.error = "You are not authorized"
          }
        }
       else {
        result.status = "Invalid User"
        result.error = "You are not authorized " 
      }
    } catch (error) {
        result.status = "Server error"
        result.error = "They must have been some issue please try again later"
      }
    res.json(result)
}
export async function updateExchange(req:RequestSession,res:Response){
    const query = new SQLQuery(Exchange)
    const {rate,type,conversion} = req.body
    console.log(req.body)
    const result:RouteResponse ={
      status:"pending",
      error:"no response yet"
    }     
    try {
       await query.updateOne({
        rate_type:type,
        conversion:conversion
        
      },{      
        rate:rate
        }
      )
        result.status ="success"
        result.error = ""
        result.message = "exchange updated successfully"
    } catch (error) {
      result.status ="Server Error"
      result.error = "we could not get any result due to an internal error please try again later"
    }
    res.json(result)
}

export async function getExchanges(req:RequestSession,res:Response){
    const query = new SQLQuery(Exchange)
    const result:RouteResponse ={
        status:"pending",
        error:"no response yet"
      }
      try {
         const {res} = await query.findAll()
         result.error =""
         result.status ="success"
         result.exchanges = res
      } catch (error) {
        result.status ="Server Error"
        result.error = "we could not get any result due to an internal error please try again later"
      }
      res.json(result)
}
export async function getWithdrawals(req:RequestSession,res:Response){
    const query = new SQLQuery(Withdrawal)
    const result:RouteResponse = {
        status:"pending",
        err:"",
    }
    try {
        const {res:withdrawals} = await query.findAll()
        result.status = "completed"
        result.withdrawals = withdrawals
    } catch (err) {
        result.status = 'Network Error'
        result.err = "an error occured in the server try again later"
    }
    
    res.json(result)
}
export async function getAdmins(req:RequestSession,res:Response){
    const query = new SQLQuery(AdminModel)

    const result:RouteResponse = {
        status:"pending",
        err:"",
    }
    try {
      const {res:admins} =  await query.findAll({isSuperUser:false})
        result.status = "completed"
        result.admins =  admins?.map((user:any)=>{
          return {
              username:user.username,
              admin_id:user.admin_id,
              createdAt:user.createdAt
          }
      })
    } catch (err) {
        result.status = 'Network Error'
        result.err = "an error occured in the server try again later"
    }
    
    res.json(result)
}
