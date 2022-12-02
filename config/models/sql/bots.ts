import { ModelStatic } from "sequelize"
import { sequelize } from "../../db"
const {Model,DataTypes} = require("sequelize")

export class Investment extends Model  {}
export class Bot extends Model{}
export class Refferal extends Model{}


Investment.init({
    id:{
    type:DataTypes.BIGINT,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true,
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    amount:{
        type:DataTypes.BIGINT,
        allowNull:false,

    },
    duration:{
        type:DataTypes.BIGINT,
        allowNull:false,
        defaultValue:90,
    },
    percentage_profit:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    returns:{
        type:DataTypes.BIGINT,
        allowNull:false,
    },
    expires:{
        type:DataTypes.DATE,
        allowNull:false,
    }, 
    bot:{
        type:DataTypes.STRING,
        allowNull:false,
    }

},{sequelize,tableName:"investments"})

Bot.init({
    id:{
        type:DataTypes.BIGINT,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    bot_id:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    bot_price:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    bot_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
    used:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false,
    },
    duration:{
        type:DataTypes.BIGINT,
        allowNull:false,
        defaultValue:90,
    },
    percentage_profit:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    expires:{
        type:DataTypes.DATE,
        allowNull:false,
    }, 
},{sequelize,tableName:"bots"})



Refferal.init({
    id:{
        autoIncrement:true,
        primaryKey:true,
        type:DataTypes.BIGINT
    },
    ref_code:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    first_gen:{
       type:DataTypes.STRING,
       allowNull:false,
    },
    second_gen:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    amount:{
        type:DataTypes.BIGINT,
        allowNull:false,
        defaultValue:0
    },
},{sequelize,tableName:"refferals"})

