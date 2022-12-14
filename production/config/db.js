"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv = require("dotenv").config();
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    db: process.env.DB_NAME,
    environment: process.env.ENV
};
console.log(dbConfig);
const db = {
    dialect: "mysql",
    host: "52.49.171.158"
};
exports.sequelize = new sequelize_1.Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, db);
