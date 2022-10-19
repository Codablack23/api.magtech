import express,{Express} from 'express'
const passport = require('passport')
import * as mongoose from 'mongoose'
import session from 'express-session'
const dotenv = require("dotenv").config()
import MongoStore from 'connect-mongo'
import cors from 'cors'
import adminApp from "./admin"
import botApp from "./bots"
import paymentApp from "./payments"
import userApp from "./users"
import { RequestSession } from './interfaces'
import { addSuperUser } from './config/middlewares/adminAuth'
import { MongoQuery } from './config/services/Queries'
import { Exchange } from './config/models/mongo_db/admins'

async function addExchangeRate(){
  const query = new MongoQuery(Exchange)
  
  try {
    const {res:allExchange} = await query.findAll()
    if(!allExchange){
      const exchanges = [
        { rate:620,rate_type:"payment",conversion:"USD_NGN"},
        { rate:600,rate_type:"withdrawal",conversion:"USD_NGN"},
        { rate:0.8,rate_type:"payment",conversion:"USD_EUR"},
        { rate:0.95,rate_type:"payment",conversion:"USD_EUR"}
      ]
      exchanges.forEach(async({rate,rate_type,conversion})=>{
        await query.createRecord({
          rate,
          rate_type,
          conversion
        })
      })
      console.log("exchanges added")
    }
    
  } catch (error) {
    console.log(error)
  }
}

   const dbURI = process.env.MONGO_DB_URI2 as string
    mongoose.connect(dbURI).then((err)=>{
      console.log("connection established")
      addExchangeRate()
      addSuperUser().then(data=>{
        console.log(data)
      }).catch(err=>{
        console.log(err)
      })
    }).catch(err=>{
      console.log(err)
    })
    
    

const app:Express = express()
const PORT = process.env.PORT
const MONGO_SESSION_STORE = MongoStore.create({
  mongoUrl:process.env.MONGO_DB_URI
})
//
app.use(express.json())

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

//CORS config
app.use(cors({
    credentials:true,
    origin:process.env.ENV == "dev"?"http://localhost:3005":process.env.FRONT_END
 }))

 const oneMonth = 1000 * 60 * 60 * 24 * 30
//session config
app.use(session({
    secret:process.env.SESSION_SECRET??"",
    // store:MONGO_SESSION_STORE,
    saveUninitialized:false,
    proxy:true,
    name:"api-magtech",
    resave:false,
    cookie:{
      httpOnly:true,
      secure:true,
      maxAge:oneMonth,
      sameSite:"none",
}
}))

//passport auth 
// app.use(passport.initialize())
// app.use(passport.session())

//routers and handlers

app.use("/bots",botApp)
app.use("/users",userApp)
app.use("/superusers",adminApp)
app.use('/withdrawals',paymentApp)
app.get("/",(req:RequestSession,res)=>{
  res.json({
    message:"the magtech api"
  })
})
//start server
app.listen(PORT || 5000,()=>{
 console.log(`Running at PORT ${PORT|| 5000}`)
},)