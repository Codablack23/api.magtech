import { RequestSession } from "../interfaces";
import express,{Response} from 'express'
import { authenticateAdmin } from "../config/middlewares/adminAuth";

import  {
getUsers,
getInvestments,
getPayments,
addAdmin,
loginAdmin,
updateExchange,
getExchanges,
getWithdrawals,
getAdmins
} from './controllers'
import { validateAdminLogin, validateUpdateExchange } from "../config/middlewares/validate";


const adminApp = express.Router()

adminApp.post("/update-exchange",authenticateAdmin,validateUpdateExchange(),updateExchange);
adminApp.post("/exchanges", getExchanges)
adminApp.post("/",authenticateAdmin,(req:RequestSession,res:Response)=>{
    res.json({...req.session.admin,status:"Authorized"})
})
adminApp.post("/admin/withdrawals",getWithdrawals)
adminApp.post("/admin",validateAdminLogin(),loginAdmin)
adminApp.post("/admin/investments",authenticateAdmin,getInvestments)
adminApp.post("/admin/all",authenticateAdmin,getAdmins)
adminApp.post("/admin/payments",authenticateAdmin,getPayments)
adminApp.post("/admin/users",authenticateAdmin,getUsers)
adminApp.post("/admin/add",addAdmin)

adminApp.get("/support/",(req,res)=>{
    res.send("/")
})
export default adminApp