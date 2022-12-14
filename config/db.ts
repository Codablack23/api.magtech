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
    host:"localhost"
};

export const sequelize = new Sequelize('magtech',
                            dbConfig.user as string,
                            dbConfig.password,
                            db
                            )

