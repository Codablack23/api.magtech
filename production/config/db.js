"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
var sequelize_1 = require("sequelize");
var dotenv = require("dotenv").config();
var dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    db: process.env.DB_NAME,
    environment: process.env.ENV
};
var db = {
    dialect: "mysql",
    host: "localhost"
};
exports.sequelize = new sequelize_1.Sequelize('magtech', dbConfig.user, dbConfig.password, db);
