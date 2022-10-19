import { Bot, Investment, Refferral } from "../models/mongo_db/bots"
import { Payment, Withdrawal } from "../models/mongo_db/payments"
import { User } from "../models/mongo_db/user"
import { MongoQuery } from "./Queries"
import { validateFields } from "./validate"

const Flutterwave = require("flutterwave-node-v3")
const dotenv = require('dotenv').config()

const fw_keys = {
  public:process.env.FW_PUBLIC,
  private:process.env.FW_SECRET
}
interface WithdrawDetails{ 
    account_name?:string | number,
    account_type?:string | number,
    account_number?:string | number,
    bank?:string|number,
    currency?:string|number,
    firstname?:string|number,
    lastname?:string|number,
    email?:string|number,
    country?:string|number,
    routing_number?:string|number,
    swift_code?:string|number,
    address?:"",
    street_name?:string|number,
    street_no?:string|number,
    postal_code?:string|number,
    city?:string|number,
    amount?:string|number,
    [key:string]:any
}
export async function transfer(details:WithdrawDetails|undefined){
   const flutterwave = new Flutterwave(fw_keys.public,fw_keys.private)
   console.log(details)
   return await flutterwave.Transfer.initiate(details)
}
const init:WithdrawDetails = { 
    account_name:"",
    account_type:"",
    account_number:"",
    bank:"",
    currency:"",
    firstname:"",
    lastname:"",
    email:"",
    country:"",
    routing_number:"",
    swift_code:"",
    address:"",
    street_name:"",
    street_no:"",
    postal_code:"",
    city:"",
    amount:""
}
export function generateWithdrawDetails(acc_details:WithdrawDetails = {...init}){
    
    const { 
        account_name,
        account_type,
        account_number,
        bank,
        currency,
        firstname,
        lastname,
        email,
        country,
        routing_number,
        swift_code,
        address,
        street_name,
        street_no,
        postal_code,
        city,
        amount} = acc_details

        console.log(account_type)
    const details:WithdrawDetails = {
        debit_currency:"USD",
        narration:"withdrawal Payment",
        meta:{}
    }
    let errors = []
    
    if(account_type){
        switch (account_type) {
            case "NGN":
                errors = validateFields([
                    {inputField:account_name,inputType:"text",inputName:"Account_Name"},
                    {inputField:account_number,inputType:"number",inputName:"Account_Number"},
                    {inputField:bank,inputType:"username",inputName:"Bank Name"},
                    {inputField:amount,inputType:"number",inputName:"Amount"},
                    {inputField:currency,inputType:"word",inputName:"Currency"},
                ])
                details.account_name = account_name
                details.account_bank = bank
                details.account_number = account_number
                details.amount = amount
                details.currency = currency
                
                return errors.length === 0
                ?{details,generated:true}
                :{errors,generated:false}

            case "NGN_USD":
                errors = validateFields([
                    {inputField:account_name,inputType:"text",inputName:"Account_Name"},
                    {inputField:firstname,inputType:"word",inputName:"First_Name"},
                    {inputField:lastname,inputType:"word",inputName:"Last_Name"},
                    {inputField:account_number,inputType:"number",inputName:"Account_Number"},
                    {inputField:bank,inputType:"username",inputName:"Bank Name"},
                    {inputField:amount,inputType:"number",inputName:"Amount"},
                    {inputField:currency,inputType:"word",inputName:"Currency"},
                    {inputField:country,inputType:"word",inputName:"Country"},
                ])
                details.account_bank = bank
                details.account_number = account_number
                details.amount = amount
                details.currency = currency
                details.meta ={
                    first_name:firstname,
                    last_name:lastname,
                    sender:"Magtech Inc",
                    merchant:"Magtech Inc",
                    email,
                    country,

                } 
                
                
                return errors.length === 0
                ?{details,generated:true}
                :{errors,generated:false}

            case "USD":
                errors = validateFields([
                    {inputField:account_name,inputType:"text",inputName:"Account_Name"},
                    {inputField:account_number,inputType:"username",inputName:"Account_Number"},
                    {inputField:bank,inputType:"text",inputName:"Bank_Name"},
                    {inputField:amount,inputType:"number",inputName:"Amount"},
                    {inputField:currency,inputType:"word",inputName:"Currency"},
                    {inputField:country,inputType:"word",inputName:"Country"},
                    {inputField:routing_number,inputType:"number",inputName:"Routing_Number"},
                    {inputField:swift_code,inputType:"username",inputName:"Swift_Code"},
                    {inputField:address,inputType:"address",inputName:"Address"},
                ])
                details.amount = amount
                details.currency = currency
                details.beneficiary_name = account_name
                details.meta ={
                    AccountNumber:account_number,
                    RoutingNumber: routing_number,
                    SwiftCode: swift_code,
                    BankName: bank,
                    BeneficiaryName:account_name,
                    BeneficiaryAddress: address,
                    BeneficiaryCountry:country

                } 
                
                
                return errors.length === 0
                ?{details,generated:true}
                :{errors,generated:false}

            case "EUR":
                errors = validateFields([
                    {inputField:account_name,inputType:"text",inputName:"Account_Name"},
                    {inputField:account_number,inputType:"username",inputName:"Account_Number"},
                    {inputField:bank,inputType:"text",inputName:"Bank_Name"},
                    {inputField:amount,inputType:"number",inputName:"Amount"},
                    {inputField:currency,inputType:"word",inputName:"Currency"},
                    {inputField:country,inputType:"word",inputName:"Country"},
                    {inputField:routing_number,inputType:"number",inputName:"Routing_Number"},
                    {inputField:swift_code,inputType:"username",inputName:"Swift_Code"},
                    {inputField:postal_code,inputType:"number",inputName:"Postal_Code"},
                    {inputField:street_name,inputType:"address",inputName:"Street_Name"},
                    {inputField:street_no,inputType:"number",inputName:"Street_Number"},
                    {inputField:city,inputType:"word",inputName:"City"},
                    
                ])
                details.amount = amount
                details.currency = currency
                details.beneficiary_name = account_name
                details.meta ={
                    AccountNumber:account_number,
                    RoutingNumber: routing_number,
                    SwiftCode: swift_code,
                    BankName: bank,
                    BeneficiaryName:account_name,
                    PostalCode: postal_code,
                    StreetNumber:street_no,
                    StreetName: street_name,
                    City:city,
                    BeneficiaryCountry:country

                } 
                
                
                return errors.length === 0
                ?{details,generated:true}
                :{errors,generated:false}

            default:
             errors =[{message: "invalid account type only EUR, USD, NGN, NGN_USD types supported"}]
             return {errors,generated:false}
        
        }
    } else { 
     errors = [{message:"account type is required"}] 
     return {errors,generated:false} 
    }
}
export async function getBalance(username:string){
    const date:any = new Date()
    const withdrawQuery = new MongoQuery(Withdrawal)
    const paymentQuery = new MongoQuery(Payment)
    const botQuery = new MongoQuery(Bot)
    const userQuery = new MongoQuery(User)
    const investmentQuery = new MongoQuery(Investment)
    const refQuery = new MongoQuery(Refferral)
 

    const {res:withdrawals} = await withdrawQuery.findAll({username})
    const {res:payments} = await paymentQuery.findAll({username})
    const {res:bots} = await botQuery.findAll({username})
    const {res:user} = await userQuery.find({username})
    const {res:refs} = await refQuery.findAll({ref_code:user.ref_code})
    const {res:investments} = await investmentQuery.findAll({username})

    const p_total:any = payments.filter((p:{[key:string]:any})=>p.status === "paid").reduce((total:any,p:any)=>(total +p.amount),0)
    const i_total = investments.filter((i:{[key:string]:any})=>{
            const expires:any = new Date(i.expires) 
            const timeLeft = (expires - date) /(1000 * 60 * 60 * 24 )
            return timeLeft > 0
    }).reduce((a:any,b:any)=>(a + b.amount),0)
    const w_total =  withdrawals.filter((p:any)=>p.status === "paid").reduce((a:any,b:any)=>(a + b.amount),0)
    const ref_total =  refs.reduce((a:any,b:any)=>(a + b.amount),0)
    const b_total = bots.reduce((a:any,b:any)=>(a + b.bot_price),0)
    const funds = p_total - i_total - w_total - ref_total - b_total
    const iTotal = investments.reduce((a:any,b:any)=>{ 
        const expires:any = new Date(b.expires)
        let timeLeft = (expires - date) /(1000 * 60 * 60 * 24 )
        timeLeft = timeLeft < 0?1:timeLeft
        return a + ((b.amount * b.percentage_profit)/timeLeft)
    },0)
    return funds + iTotal;
}


