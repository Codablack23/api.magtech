const {Schema,model} = require("mongoose")


export const AdminModel = model("admins",new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isSuperUser:{
        type:Boolean,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date()
    }
},{timestamps:true}))
export const Exchange = model("exchange_rates",new Schema({
    rate:{
        type:Number,
        required:true
    },
    conversion:{
        type:String,
        required:true
    },
    rate_type:{
        type:String,
        required:true
    }
},{timestamps:true}),"exchange_rates")

