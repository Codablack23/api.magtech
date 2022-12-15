import { Options, Sequelize } from "sequelize";

const dotenv = require("dotenv").config()

const dbConfig = {
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    db:process.env.DB_NAME,
    environment:process.env.ENV
}

console.log(dbConfig)
const db:Options = {
    dialect:"mysql",
    host:"52.49.171.158"
};

export const sequelize = new Sequelize(dbConfig.db as string,
                            dbConfig.user as string,
                            dbConfig.password,
                            db
                          )

