import { NextFunction, Response } from "express"
import { check } from "express-validator"
import bcrypt from 'bcrypt'
import { validationResult, ValidationChain } from 'express-validator';
import { RequestSession } from "../../interfaces";
import { User } from "../models/sql/user";
import { SQLQuery } from "../services/Queries";
import { validateFields } from "../services/validate";

  function validateRequest(validations:ValidationChain[]){
    const validateLogin = async(req:RequestSession,res:Response,next:NextFunction)=>{
       await Promise.all(validations.map(validator=>validator.run(req)))
       const errors = validationResult(req)
       if(errors.isEmpty()){
        return next()
       }

       return res.json({
         status:"field-error",
         error:errors.array().map(err=>({
          field:err.param,
          error:err.msg
         }))
       }) 
    
  };
  return validateLogin
}

export default validateRequest

export const validateLogin = validateRequest([
  check("phone").notEmpty().not().contains(" ").isLength({min:11,max:15}).isNumeric(),
  check("password").notEmpty().not().contains(" ").isLength({min:8})
])
export function validateAdminLogin(){
  return validateRequest([
    check("username").notEmpty().withMessage("Please fill out this field")
    .not().contains(" ").withMessage("username should not contain whitespaces")
    .isLength({min:2}).withMessage("username should atleast be 2 characters long")
    ,
    check("password").notEmpty().withMessage("Please fill out this field")
    .not().contains(" ").withMessage("Password should not contain whitespaces")
    .isLength({min:8}).withMessage("Password should atleast be 8 characters long")
  ])
}

export function validateRegister(){
  const phoneCheck = check("phone").notEmpty().withMessage("cannot be empty")
  .not().contains(" ").withMessage("should not contain spaces")
  .isLength({min:11,max:15}).withMessage("should be between 11 and 15 characters long")
  .isNumeric().withMessage("should contain only Numbers")

  const usernameCheck = 
  check('username')
  .notEmpty().withMessage("cannot be empty")
  .not().contains(" ").withMessage("should not contain spaces")
  .isAlphanumeric().withMessage("should not contain spaces")
  .isLength({min:2}).withMessage("should not contain spaces")

  const nameCheck = check("name")
  .notEmpty().withMessage("should not contain spaces")
  .isLength({min:3}).withMessage("should atleast be 3 characters long")

  const passwordCheck = check("password")
  .notEmpty().withMessage("should not be empty")
  .not().contains(" ").withMessage("should not contain spaces")
  .isLength({min:8}).withMessage("should atleast be 8 characters long")

  const refcode = check("refcode")
  .optional()
  .notEmpty().withMessage("should not be empty")
  .not().contains(" ").withMessage("should not contain spaces")
  .isLength({min:6,max:6}).withMessage("should be 6 characters long")



  console.log("validation")
  return validateRequest([
    phoneCheck,
    usernameCheck,
    nameCheck,
    passwordCheck,
    refcode
  ])
}

export function validatePasswordChange(){
  const passwordCheck = check("password").notEmpty().not().contains(" ").isLength({min:8})
  const newPasswordCheck = check("new_password").notEmpty().not().contains(" ").isLength({min:8})

  return validateRequest([
    passwordCheck,
    newPasswordCheck
  ])
}

export async function checkExistingPassword(req:RequestSession,res:Response,next:NextFunction){
  const username = req.session.user?.username;
  const {password} = req.body
  const query = new SQLQuery(User)

  try {
    const {res} = await query.find({username})
    const doesPasswordMatch = await bcrypt.compare(password,res.password)
    if(doesPasswordMatch){
      return next()
    }
    res.json({
      status:"password error",
      error:"password provided does not match current password"
    })
  } catch (error) {
    return res.json({
      status:"server error",
      error:"an internal server error occurred please try again later"
    })
  }


}

export function validateUpdateExchange(){
  const rate = check("rate").notEmpty().not().contains(" ").isNumeric()
  const type = check("type").notEmpty().not().contains(" ")
  const conversion = check("conversion").notEmpty().not().contains(" ")
  return validateRequest([
    rate,
    type,
    conversion
  ])
}

export function validateBuyBot(){
  const profit = check('percent_profit').notEmpty().withMessage("Please fill out this field")
  .not().contains(" ").withMessage("Please remove any whitespaces from this field")
  .isNumeric().withMessage("This field should contain only numbers")

  const price = check('bot_price').notEmpty().withMessage("Please fill out this field")
  .not().contains(" ").withMessage("Please remove any whitespaces from this field")
  .isNumeric().withMessage("This field should contain only numbers")

  const name = check('bot_name').notEmpty().withMessage("Please fill out this field")

  return validateRequest([
    profit,
    price,
    name
  ])
}

export function validateStartPayment(){
    const desc = check('description').notEmpty().withMessage("Please fill out this field")
  
    const amount = check('amount').notEmpty().withMessage("Please fill out this field")
    .not().contains(" ").withMessage("Please remove any whitespaces from this field")

    return validateRequest([
      desc,
      amount
    ])
}

export function validateInvest(){
  const bot_id = check('bot_id').notEmpty().withMessage("Please fill out this field")
  .isAlphanumeric().withMessage("This field should contain only numbers and alphabets")

  const amount = check('amount').notEmpty().withMessage("Please fill out this field")
  .not().contains(" ").withMessage("Please remove any whitespaces from this field")

  return validateRequest([
    bot_id,
    amount
  ])
}
