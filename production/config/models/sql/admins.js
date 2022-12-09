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
exports.Exchange = exports.AdminModel = void 0;
var db_1 = require("../../db");
var _a = require("sequelize"), Model = _a.Model, DataTypes = _a.DataTypes;
var AdminModel = /** @class */ (function (_super) {
    __extends(AdminModel, _super);
    function AdminModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AdminModel;
}(Model));
exports.AdminModel = AdminModel;
var Exchange = /** @class */ (function (_super) {
    __extends(Exchange, _super);
    function Exchange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Exchange;
}(Model));
exports.Exchange = Exchange;
AdminModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    admin_id: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    isSuperUser: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, { sequelize: db_1.sequelize, tableName: "admins" });
Exchange.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    rate: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.00
    },
    conversion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rate_type: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { sequelize: db_1.sequelize, tableName: "exchange_rates" });
