import {Request,Response} from 'express'
import { Bot, Investment, Refferal } from '../config/models/sql/bots'
import { Payment } from '../config/models/sql/payments'
import { SQLQuery } from '../config/services/Queries'
import { RequestSession } from '../interfaces'
import {v4, validate} from 'uuid'
import { User } from '../config/models/sql/user'
interface RouteResponse{
    status:string,
    err?:string
    [key:string]:any
}

export async function getInvestments(req:RequestSession,res:Response){
    const query = new SQLQuery(Investment)
    const {user} = req.session
    const result:{[key:string]:any} = {
        status:"pending",
        err:"",
    }
    try {
       const {res:investments} =  await query.findAll({username:user?.username})
       result.status = "success"
       result.investments = investments
        
    } catch (error) {
        result.status = 'Network Error'
        result.err = "an error occured in the server try again later"
    }
    res.json(result)
}
export async function getBots(req:RequestSession,res:Response){
    const query = new SQLQuery(Bot)
    const {user} = req.session
    const result:RouteResponse = {
        status:"pending",
        err:""
    }
    try {
        const {res:bots} = await query.findAll({username:user?.username})
        result.status = "success",
        result.bots = bots
    } catch (error) {
        result.status = "Server Error"
        result.error = "An error occured in our server check your network or try again later"
    }
  res.json(result)
}
export async function invest(req:RequestSession,res:Response){

    const investmentQuery = new SQLQuery(Investment)
    const refQuery = new SQLQuery(Refferal)
    const userQuery = new SQLQuery(User)
    const botQuery = new SQLQuery(Bot)

    const {amount,bot_id} = req.body
    const date = new Date();
    const result:RouteResponse = {
        status:"pending",
        error:""
    }

    try {
        const {res:all_investment} = await investmentQuery.findAll({username:req.session.user?.username})
        const {res:bot} = await botQuery.find({
                username:req.session.user?.username,
                bot_id:bot_id
        })
        const {res:user} = await userQuery.find({username:req.session.user?.username})

        let percent = parseFloat(bot.percentage_profit)
        let duration = parseInt(bot.duration)
        const expires = new Date(date.setDate(date.getDate() + duration)); 

            if(bot.used !== true){
            await Investment.create({
            username:req.session.user?.username,
            bot:bot.bot_name,
            amount,
            percentage_profit:bot.percentage_profit,
            duration,
            returns:(percent * duration) * amount,
            expires:expires.toDateString()
        })
            if(user.reffered && all_investment?.length === 0){
                
                await refQuery.updateOne(
                {first_gen:req.session.user?.username},
                {amount:(parseFloat(amount)/duration) * 0.10},
                )
                await refQuery.updateOne(
                {second_gen:req.session.user?.username},
                {amount:(parseFloat(amount)/duration) * 0.015},
                )
            }
            await botQuery.updateOne({
                    username:req.session.user?.username,
                    bot_id:bot_id},
                    {used:true},
            )
            result.status="Completed"
            result.investment = {
                amount,
                bot_id,
                expires:expires.toDateString(),
                percentage_profit:bot?.percentage_profit,
            }
            
            }else{
            result.status = 'Failed'
            result.error = "You cannot reuse a bot"
            }
        } catch (error) {
            console.log(error)
            result.status = 'Network Error'
            result.error = "an error occured in the server try again later"
        }
    
    res.json(result)
}
export async function paymentHandler(req:RequestSession,res:Response){

    const query = new SQLQuery(Payment)
    const {description,amount} = req.body

    const result:RouteResponse = {
        status:"pending",
        error:""
    }
    try {
        const payment_id = v4()
        await query.createRecord({
            username:req.session.user?.username,
            status:"unpaid",
            payment_id,
            description,
            amount,
        })
        result.status = "Payment initiated"
        result.payment_id = payment_id

    } catch (error) {
        console.log(error)
        result.status ="Network error",
        result.status="an internal error occured"
    }
    res.json(result)
}
export async function updatePayment(req:RequestSession,res:Response){
  const query = new SQLQuery(Payment)
  const result:RouteResponse = {
    status:"pending",
    error:""
   }
   const {id} = req.params
   if(!validate(id)){
     result.status="Field Error"
     result.error = "please provide a valid uuid string"
   }else{
    try {
        const payment = await query.updateOne({payment_id:id},{status:"paid"})
        if(payment){
            result.status = "Success"
            result.error = ""
            result.message = "Payment Completed Successfully"
        }
    } catch (error) {
        result.status ="Server Error",
        result.error = "an error occured in our server please check your network or try again later"
    }
   }  
  res.json(result)
}
export async function buyBot(req:RequestSession,res:Response){

    const query = new SQLQuery(Bot)
    const {percent_profit,bot_name,bot_price} = req.body
    let date = new Date()
    const duration = 90
    const expires = new Date(date.setDate(date.getDate() + duration)); 
    const result:RouteResponse ={
     status:"pending",
     error:""
    }
    try {
        const bot_id = v4().slice(0,4)
        await query.createRecord({
            percentage_profit:percent_profit,
            bot_name,
            bot_price,
            active:true,
            username:req.session.user?.username,
            bot_id,
            expires,
            duration
        })
        result.status ="success"
        result.message = "bot added sucessfully"
        result.bot = {
            bot_name,
            bot_id,
            expires,
            duration
        }
    } catch (error) {
       result.status = "Failed"
       result.error = "an internal error occurred please check your network or try again later"
    }
    res.json(result)
}
export async function getPayments(req:RequestSession,res:Response){
    const result:{[key:string]:any}= {
        status:"pending",
        err:"",
    }
    try {
      const query = new SQLQuery(Payment)
      const response =  await query.findAll({username:req.session.user?.username})
        result.status = "completed"
        result.payments = response.res

       console.log(response)

    } catch (err) {
        result.status = 'Network Error'
        result.err = "an error occured in the server try again later"
    }

    res.json(result)
}
export async function getRefs(req:RequestSession,res:Response){
    const query = new SQLQuery(Refferal)
    const result:RouteResponse = {
        status:"pending",
        err:""
       }
       try {
         const {res:referrals} = await query.findAll({ref_code:req.session.user?.refcode})
         result.status = "completed"
         result.refs = referrals
       } catch (error) {
        console.log(error)
        result.status = 'Network Error'
        result.err = "an error occured in the server try again later"
       }
       res.json(result)
}
export async function deletePayment(req:RequestSession,res:Response){
    const query = new SQLQuery(Payment)
    const response:RouteResponse = {
        status:"pending",
        err:"pending"
       }
       const {id} = req.params
       try {
        await query.deleteRecord(id)
        response.status ="deleted"
        response.err = ""
        response.message = "payment deleted successfully"
       } catch (error) {
        response.status = 'Network Error'
        response.err = "an error occured in the server try again later"
       }
       res.json(response)
}