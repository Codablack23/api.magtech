import { Router } from "express"
import adminApp from "../admin"
import botApp from "../bots"
import paymentApp from "../payments"
import userApp from "../users"

export function getRoutes(){
    return{
      bots:botApp,
      users:userApp,
      admin:adminApp,
      payments:paymentApp
    }
  }

