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
exports.Refferal = exports.Bot = exports.Investment = void 0;
var db_1 = require("../../db");
var _a = require("sequelize"), Model = _a.Model, DataTypes = _a.DataTypes;
var Investment = /** @class */ (function (_super) {
    __extends(Investment, _super);
    function Investment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Investment;
}(Model));
exports.Investment = Investment;
var Bot = /** @class */ (function (_super) {
    __extends(Bot, _super);
    function Bot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Bot;
}(Model));
exports.Bot = Bot;
var Refferal = /** @class */ (function (_super) {
    __extends(Refferal, _super);
    function Refferal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Refferal;
}(Model));
exports.Refferal = Refferal;
Investment.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    duration: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 90,
    },
    percentage_profit: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    returns: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    expires: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    bot: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { sequelize: db_1.sequelize, tableName: "investments" });
Bot.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    bot_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bot_price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bot_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    used: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    duration: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 90,
    },
    percentage_profit: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    expires: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, { sequelize: db_1.sequelize, tableName: "bots" });
Refferal.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT
    },
    ref_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    first_gen: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    second_gen: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0
    },
}, { sequelize: db_1.sequelize, tableName: "refferals" });
