"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBalance = exports.generateWithdrawDetails = exports.transfer = void 0;
var bots_1 = require("../models/mongo_db/bots");
var payments_1 = require("../models/mongo_db/payments");
var user_1 = require("../models/mongo_db/user");
var Queries_1 = require("./Queries");
var validate_1 = require("./validate");
var Flutterwave = require("flutterwave-node-v3");
var dotenv = require('dotenv').config();
var fw_keys = {
    public: process.env.FW_PUBLIC,
    private: process.env.FW_SECRET
};
function transfer(details) {
    return __awaiter(this, void 0, void 0, function () {
        var flutterwave;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    flutterwave = new Flutterwave(fw_keys.public, fw_keys.private);
                    console.log(details);
                    return [4 /*yield*/, flutterwave.Transfer.initiate(details)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.transfer = transfer;
var init = {
    account_name: "",
    account_type: "",
    account_number: "",
    bank: "",
    currency: "",
    firstname: "",
    lastname: "",
    email: "",
    country: "",
    routing_number: "",
    swift_code: "",
    address: "",
    street_name: "",
    street_no: "",
    postal_code: "",
    city: "",
    amount: ""
};
function generateWithdrawDetails(acc_details) {
    if (acc_details === void 0) { acc_details = __assign({}, init); }
    var account_name = acc_details.account_name, account_type = acc_details.account_type, account_number = acc_details.account_number, bank = acc_details.bank, currency = acc_details.currency, firstname = acc_details.firstname, lastname = acc_details.lastname, email = acc_details.email, country = acc_details.country, routing_number = acc_details.routing_number, swift_code = acc_details.swift_code, address = acc_details.address, street_name = acc_details.street_name, street_no = acc_details.street_no, postal_code = acc_details.postal_code, city = acc_details.city, amount = acc_details.amount;
    console.log(account_type);
    var details = {
        debit_currency: "USD",
        narration: "withdrawal Payment",
        meta: {}
    };
    var errors = [];
    if (account_type) {
        switch (account_type) {
            case "NGN":
                errors = (0, validate_1.validateFields)([
                    { inputField: account_name, inputType: "text", inputName: "Account_Name" },
                    { inputField: account_number, inputType: "number", inputName: "Account_Number" },
                    { inputField: bank, inputType: "username", inputName: "Bank Name" },
                    { inputField: amount, inputType: "number", inputName: "Amount" },
                    { inputField: currency, inputType: "word", inputName: "Currency" },
                ]);
                details.account_name = account_name;
                details.account_bank = bank;
                details.account_number = account_number;
                details.amount = amount;
                details.currency = currency;
                return errors.length === 0
                    ? { details: details, generated: true }
                    : { errors: errors, generated: false };
            case "NGN_USD":
                errors = (0, validate_1.validateFields)([
                    { inputField: account_name, inputType: "text", inputName: "Account_Name" },
                    { inputField: firstname, inputType: "word", inputName: "First_Name" },
                    { inputField: lastname, inputType: "word", inputName: "Last_Name" },
                    { inputField: account_number, inputType: "number", inputName: "Account_Number" },
                    { inputField: bank, inputType: "username", inputName: "Bank Name" },
                    { inputField: amount, inputType: "number", inputName: "Amount" },
                    { inputField: currency, inputType: "word", inputName: "Currency" },
                    { inputField: country, inputType: "word", inputName: "Country" },
                ]);
                details.account_bank = bank;
                details.account_number = account_number;
                details.amount = amount;
                details.currency = currency;
                details.meta = {
                    first_name: firstname,
                    last_name: lastname,
                    sender: "Magtech Inc",
                    merchant: "Magtech Inc",
                    email: email,
                    country: country,
                };
                return errors.length === 0
                    ? { details: details, generated: true }
                    : { errors: errors, generated: false };
            case "USD":
                errors = (0, validate_1.validateFields)([
                    { inputField: account_name, inputType: "text", inputName: "Account_Name" },
                    { inputField: account_number, inputType: "username", inputName: "Account_Number" },
                    { inputField: bank, inputType: "text", inputName: "Bank_Name" },
                    { inputField: amount, inputType: "number", inputName: "Amount" },
                    { inputField: currency, inputType: "word", inputName: "Currency" },
                    { inputField: country, inputType: "word", inputName: "Country" },
                    { inputField: routing_number, inputType: "number", inputName: "Routing_Number" },
                    { inputField: swift_code, inputType: "username", inputName: "Swift_Code" },
                    { inputField: address, inputType: "address", inputName: "Address" },
                ]);
                details.amount = amount;
                details.currency = currency;
                details.beneficiary_name = account_name;
                details.meta = {
                    AccountNumber: account_number,
                    RoutingNumber: routing_number,
                    SwiftCode: swift_code,
                    BankName: bank,
                    BeneficiaryName: account_name,
                    BeneficiaryAddress: address,
                    BeneficiaryCountry: country
                };
                return errors.length === 0
                    ? { details: details, generated: true }
                    : { errors: errors, generated: false };
            case "EUR":
                errors = (0, validate_1.validateFields)([
                    { inputField: account_name, inputType: "text", inputName: "Account_Name" },
                    { inputField: account_number, inputType: "username", inputName: "Account_Number" },
                    { inputField: bank, inputType: "text", inputName: "Bank_Name" },
                    { inputField: amount, inputType: "number", inputName: "Amount" },
                    { inputField: currency, inputType: "word", inputName: "Currency" },
                    { inputField: country, inputType: "word", inputName: "Country" },
                    { inputField: routing_number, inputType: "number", inputName: "Routing_Number" },
                    { inputField: swift_code, inputType: "username", inputName: "Swift_Code" },
                    { inputField: postal_code, inputType: "number", inputName: "Postal_Code" },
                    { inputField: street_name, inputType: "address", inputName: "Street_Name" },
                    { inputField: street_no, inputType: "number", inputName: "Street_Number" },
                    { inputField: city, inputType: "word", inputName: "City" },
                ]);
                details.amount = amount;
                details.currency = currency;
                details.beneficiary_name = account_name;
                details.meta = {
                    AccountNumber: account_number,
                    RoutingNumber: routing_number,
                    SwiftCode: swift_code,
                    BankName: bank,
                    BeneficiaryName: account_name,
                    PostalCode: postal_code,
                    StreetNumber: street_no,
                    StreetName: street_name,
                    City: city,
                    BeneficiaryCountry: country
                };
                return errors.length === 0
                    ? { details: details, generated: true }
                    : { errors: errors, generated: false };
            default:
                errors = [{ message: "invalid account type only EUR, USD, NGN, NGN_USD types supported" }];
                return { errors: errors, generated: false };
        }
    }
    else {
        errors = [{ message: "account type is required" }];
        return { errors: errors, generated: false };
    }
}
exports.generateWithdrawDetails = generateWithdrawDetails;
function getBalance(username) {
    return __awaiter(this, void 0, void 0, function () {
        var date, withdrawQuery, paymentQuery, botQuery, userQuery, investmentQuery, refQuery, withdrawals, payments, bots, user, refs, investments, p_total, i_total, w_total, ref_total, b_total, funds, iTotal;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    date = new Date();
                    withdrawQuery = new Queries_1.MongoQuery(payments_1.Withdrawal);
                    paymentQuery = new Queries_1.MongoQuery(payments_1.Payment);
                    botQuery = new Queries_1.MongoQuery(bots_1.Bot);
                    userQuery = new Queries_1.MongoQuery(user_1.User);
                    investmentQuery = new Queries_1.MongoQuery(bots_1.Investment);
                    refQuery = new Queries_1.MongoQuery(bots_1.Refferral);
                    return [4 /*yield*/, withdrawQuery.findAll({ username: username })];
                case 1:
                    withdrawals = (_a.sent()).res;
                    return [4 /*yield*/, paymentQuery.findAll({ username: username })];
                case 2:
                    payments = (_a.sent()).res;
                    return [4 /*yield*/, botQuery.findAll({ username: username })];
                case 3:
                    bots = (_a.sent()).res;
                    return [4 /*yield*/, userQuery.find({ username: username })];
                case 4:
                    user = (_a.sent()).res;
                    return [4 /*yield*/, refQuery.findAll({ ref_code: user.ref_code })];
                case 5:
                    refs = (_a.sent()).res;
                    return [4 /*yield*/, investmentQuery.findAll({ username: username })];
                case 6:
                    investments = (_a.sent()).res;
                    p_total = payments.filter(function (p) { return p.status === "paid"; }).reduce(function (total, p) { return (total + p.amount); }, 0);
                    i_total = investments.filter(function (i) {
                        var expires = new Date(i.expires);
                        var timeLeft = (expires - date) / (1000 * 60 * 60 * 24);
                        return timeLeft > 0;
                    }).reduce(function (a, b) { return (a + b.amount); }, 0);
                    w_total = withdrawals.filter(function (p) { return p.status === "paid"; }).reduce(function (a, b) { return (a + b.amount); }, 0);
                    ref_total = refs.reduce(function (a, b) { return (a + b.amount); }, 0);
                    b_total = bots.reduce(function (a, b) { return (a + b.bot_price); }, 0);
                    funds = p_total - i_total - w_total - ref_total - b_total;
                    iTotal = investments.reduce(function (a, b) {
                        var expires = new Date(b.expires);
                        var timeLeft = (expires - date) / (1000 * 60 * 60 * 24);
                        timeLeft = timeLeft < 0 ? 1 : timeLeft;
                        return a + ((b.amount * b.percentage_profit) / timeLeft);
                    }, 0);
                    return [2 /*return*/, funds + iTotal];
            }
        });
    });
}
exports.getBalance = getBalance;
