import express,{Router} from 'express'
import { authenticate } from '../config/middlewares/userAuth'
import { validateBuyBot, validateInvest, validateStartPayment } from '../config/middlewares/validate'

import  {
    getInvestments,
    invest,
    paymentHandler,
    updatePayment,
    buyBot, 
    getBots, 
    getPayments, 
    getRefs, 
    deletePayment
} from "./controllers."

const botApp = express.Router()


botApp.post("/delete-payment/:id",authenticate,deletePayment)
botApp.post("/",authenticate,getBots)
botApp.post("/refs",authenticate,getRefs)
botApp.post("/buy",authenticate,validateBuyBot(),buyBot)
botApp.post("/payments",authenticate,getPayments)
botApp.post("/investments",authenticate,getInvestments)
botApp.post("/invest",authenticate,validateInvest(),invest)
botApp.post("/add-payment",authenticate,validateStartPayment(),paymentHandler)
botApp.post("/add-payment/:id",authenticate,updatePayment)

export default botApp