import { Options, Sequelize } from "sequelize";

const dotenv = require("dotenv").config()

const dbConfig = {
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    db:process.env.DB_NAME,
    host:process.env.DB_HOST,
    environment:process.env.ENV,
    port:process.env.DB_PORT
}

console.log(dbConfig)
const db:Options = {
    dialect:"mysql",
    host:dbConfig.host || "52.49.171.158",
    port:dbConfig.port ? parseInt(dbConfig.port) : undefined
};

console.log({db,Options})

export const sequelize = new Sequelize(dbConfig.db as string,
                            dbConfig.user as string,
                            dbConfig.password,
                            db
                          )

