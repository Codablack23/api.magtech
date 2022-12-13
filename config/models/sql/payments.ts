import { sequelize } from "../../db"
const {Model,DataTypes} = require("sequelize")

class Payment extends Model{}
class Withdrawal extends Model{}
class AccountDetails extends Model{}

Payment.init({
    id:{
     type:DataTypes.BIGINT,
     autoIncrement:true,
     primaryKey:true
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    payment_id:{
       type:DataTypes.STRING,
       allowNull:false
    },
    status:{
       type:DataTypes.STRING,
       allowNull:false,
    },
    amount:{
        type:DataTypes.BIGINT,
        defaultValue:0.00
    }
},{sequelize,tableName:"payments"})

Withdrawal.init({
    id:{
        type:DataTypes.BIGINT,
        autoIncrement:true,
        primaryKey:true,
    },
    withdrawal_id:{
       type:DataTypes.STRING,
       allowNull:false,
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    amount:{
        type:DataTypes.BIGINT,
        defaultValue:0
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{sequelize,tableName:"withdrawals"})

AccountDetails.init({
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
    account_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    account_number:{
        type:DataTypes.STRING,
        allowNull:false
    },
    account_type:{
        type:DataTypes.STRING,
        allowNull:false
    },
    swift_code:{
        type:DataTypes.STRING,
        allowNull:false
    },
    routing_number:{
        type:DataTypes.STRING,
        allowNull:false
    },
    address:{
         type:DataTypes.STRING,
        allowNull:false
    },
    country:{
        type:DataTypes.STRING,
        allowNull:false
    },
    street_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    street_no:{
        type:DataTypes.STRING,
        allowNull:false
    },
    postal_code:{
        type:DataTypes.STRING,
        allowNull:false
    },
    city:{
        type:DataTypes.STRING,
        allowNull:false
    },
    bank_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    firstname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastname:{
        type:DataTypes.STRING,
        allowNull:false
    },
},{sequelize,tableName:"account_details"})


export {
    Payment,
    Withdrawal,
    AccountDetails
}