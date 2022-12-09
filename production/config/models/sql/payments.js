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
exports.AccountDetails = exports.Withdrawal = exports.Payment = void 0;
var db_1 = require("../../db");
var _a = require("sequelize"), Model = _a.Model, DataTypes = _a.DataTypes;
var Payment = /** @class */ (function (_super) {
    __extends(Payment, _super);
    function Payment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Payment;
}(Model));
exports.Payment = Payment;
var Withdrawal = /** @class */ (function (_super) {
    __extends(Withdrawal, _super);
    function Withdrawal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Withdrawal;
}(Model));
exports.Withdrawal = Withdrawal;
var AccountDetails = /** @class */ (function (_super) {
    __extends(AccountDetails, _super);
    function AccountDetails() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AccountDetails;
}(Model));
exports.AccountDetails = AccountDetails;
Payment.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    payment_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.BIGINT,
        defaultValue: 0.00
    }
}, { sequelize: db_1.sequelize, tableName: "payments" });
Withdrawal.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    withdrawal_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.BIGINT,
        defaultValue: 0
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize: db_1.sequelize, tableName: "withdrawals" });
AccountDetails.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    account_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    account_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    account_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    swift_code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    routing_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    street_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    street_no: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postal_code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bank_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, { sequelize: db_1.sequelize, tableName: "account_details" });
