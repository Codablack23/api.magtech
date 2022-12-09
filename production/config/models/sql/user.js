"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetCode = exports.User = void 0;
var db_1 = require("../../db");
var _a = require('sequelize'), Model = _a.Model, DataTypes = _a.DataTypes;
var moment = require("moment");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return User;
}(Model));
exports.User = User;
var ResetCode = /** @class */ (function (_super) {
    __extends(ResetCode, _super);
    function ResetCode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ResetCode;
}(Model));
exports.ResetCode = ResetCode;
var current_date = new Date();
var expires = moment(current_date).add(30, "m").toDate();
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.TEXT,
    },
    username: {
        type: DataTypes.STRING,
    },
    phone_no: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    ref_code: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
    },
    reffered: {
        type: DataTypes.BOOLEAN,
    },
    ref: {
        type: DataTypes.TEXT,
        defaultValue: ""
    }
}, { sequelize: db_1.sequelize, tableName: "users" });
ResetCode.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING
    },
    code: {
        type: DataTypes.STRING,
        unique: true
    },
    expires: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: expires
    },
    username: {
        type: DataTypes.STRING,
    },
}, { sequelize: db_1.sequelize, tableName: "reset_codes" });
