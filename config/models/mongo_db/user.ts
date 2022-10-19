import { Schema,model } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    phone_no:{
        type:String,
        required:true
    },
    ref_code:String,
    password:{
        type:String,
        required:true
    },
    reffered:Boolean,
    ref:{
        type:String,       
    }
},{timestamps:true})

export const User = model("user",userSchema)

