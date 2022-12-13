import { sequelize } from "../../db"


const {Model,DataTypes} = require("sequelize")

class AdminModel extends Model{}
class Exchange extends Model{}

AdminModel.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    admin_id:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
    },
    username:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
    },
    isSuperUser:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
},{sequelize,tableName:"admins"})

Exchange.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    rate:{
        type:DataTypes.FLOAT,
        allowNull:false,
        defaultValue:0.00
    },
    conversion:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    rate_type:{
       type:DataTypes.STRING,
       allowNull:false,
    }
},{sequelize,tableName:"exchange_rates"})

export {
    AdminModel,
    Exchange
}