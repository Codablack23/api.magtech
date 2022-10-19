import { Response } from "express"
import { v4 } from "uuid"
import { Withdrawal } from "../config/models/mongo_db/payments"
import { MongoQuery } from "../config/services/Queries"
import { generateWithdrawDetails, getBalance, transfer } from "../config/services/withdraw"
import { RequestSession } from "../interfaces"

export async function getWithdrawals(req:RequestSession,res:Response){
    const query = new MongoQuery(Withdrawal)
    const username = req.session.user?.username
    const result:{[key:string]:any} = {
     status:"pending",
     error:""
    }
    try {
     const {res:withdrawals} = await query.findAll({username})
     result.status = "success"
     result.withdrawals = withdrawals
 
    } catch (error) {
     result.status = "Server Error"
     result.error = "An error occured in the server please try again later"
     throw error
    }
    res.json(result)
}
export async function makeWithdrawal(req:RequestSession,res:Response){
    const query = new MongoQuery(Withdrawal)
    const {amount} = req.body
    const username = req.session.user?.username as string
    const result:{[key:string]:any} = {
        status:"pending",
        error:""
    }
    const transfer_details = generateWithdrawDetails({...req.body,email:"codablack24@gmail.com"})
    if(parseFloat(amount) >= 10) {
        if(transfer_details.generated){   
            const balance = await getBalance(username)
            if(amount <= balance){
                try {
                    const withdrawal_id = v4()
                    await query.createRecord({
                        username,
                        status:"unpaid",
                        withdrawal_id,
                        amount,
                    })
                       
                        const transfer_res = await transfer(transfer_details?.details)
                        // console.log(transfer_res)
                        if(transfer_res.status === "success"){
            
                           await query.updateOne({
                            withdrawal_id:withdrawal_id,
                           },{status:"paid"})
            
                           result.status = "success"
                           result.message = `your withdrawal was successful and $${amount} sent to your bank account`,
                           result.details = {
                            ...transfer_details.details,
                            reference:transfer_res.data.reference
                           }
                        }
                        else{
                            result.error=transfer_res.data.complete_message
                            result.status=transfer_res.message
                        }
                  } catch (error) {
                    console.log(error)
                    result.status = "Server Error"
                    result.error = "An Error occured within our server please check your internet or try again"
                  }
            }else{
                result.status = "Amount Error"
                result.error = "Insufficient Balance"
            }
          }else{
              result.status = "Field Error"
              result.error = transfer_details.errors
          }

    }else{
      result.status = "Amount Error"
      result.error = "withdrawal amount must start from $10"
    }

    res.json(result)
}
