import express,{Router}  from "express"
import { authenticate } from "../config/middlewares/userAuth"
import {getWithdrawals,makeWithdrawal} from "./controllers"

const paymentApp = express.Router()

paymentApp.post("/",authenticate,getWithdrawals)
paymentApp.post("/withdraw",authenticate,makeWithdrawal)

export default paymentApp;