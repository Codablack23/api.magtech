import { model, Schema } from "mongoose";

export const Payment = model("payments",new Schema({
    username:{
        type:String,
        required:true  
      },
    description:{
        type:String,
        required:true  
      },
    payment_id:{
        type:String,
        required:true 
       },
    status:{
        type:String,
        required:true  
      },
    amount:{
        type:Number,
        required:true  
      }
},{timestamps:true}),"payments") 

export const Withdrawal = model("withdrawals",new Schema({

    withdrawal_id:{
       type:String,
       required:true,
    },
    status:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        defaultValue:0
    },
    username:{
        type:String,
        required:true
    }
},{timestamps:true}),"withdrawals")

// account_name,
// account_type,
// account_number,
// bank,
// currency,
// firstname,
// lastname,
// email,
// country,
// routing_number,
// swift_code,
// address,
// street_name,
// street_no,
// postal_code,
// city,

export const AccountDetails = model("account_details",new Schema({
    account_name:{
        type:String,
        required:true
    },
    account_number:{
        type:String,
        required:true
    },
    account_type:{
        type:String,
        required:true
    },
    swift_code:{
        type:String,
        required:true
    },
    routing_number:{
        type:String,
        required:true
    },
    address:{
         type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    street_name:{
        type:String,
        required:true
    },
    street_no:{
        type:String,
        required:true
    },
    postal_code:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    bank_name:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
},{timestamps:true}),"account_details")