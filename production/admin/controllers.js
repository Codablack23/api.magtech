"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdmins = exports.getWithdrawals = exports.getExchanges = exports.updateExchange = exports.loginAdmin = exports.addAdmin = exports.getPayments = exports.getInvestments = exports.getUsers = void 0;
var admins_1 = require("../config/models/mongo_db/admins");
var user_1 = require("../config/models/mongo_db/user");
var Queries_1 = require("../config/services/Queries");
var bcrypt_1 = __importDefault(require("bcrypt"));
var uuid_1 = require("uuid");
var payments_1 = require("../config/models/mongo_db/payments");
var bots_1 = require("../config/models/sql/bots");
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var refQuery, query, result, users, refs, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    refQuery = new Queries_1.SQLQuery(bots_1.Refferal);
                    query = new Queries_1.SQLQuery(user_1.User);
                    result = {
                        status: "pending",
                        err: "",
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, query.findAll()];
                case 2:
                    users = (_a.sent()).res;
                    return [4 /*yield*/, refQuery.findAll()];
                case 3:
                    refs = (_a.sent()).res;
                    result.status = "success";
                    result.users = users === null || users === void 0 ? void 0 : users.map(function (user) {
                        return {
                            username: user.username,
                            name: user.name,
                            phone: user.phone_no,
                            createdAt: user.createdAt,
                            ref_code: user.ref_code
                        };
                    });
                    result.refs = refs;
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    result.status = 'Network Error';
                    result.err = "an error occured in the server try again later";
                    return [3 /*break*/, 5];
                case 5:
                    res.json(result);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getUsers = getUsers;
function getInvestments(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var query, result, investments, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = new Queries_1.SQLQuery(bots_1.Investment);
                    result = {
                        status: "pending",
                        err: "",
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, query.findAll()];
                case 2:
                    investments = (_a.sent()).res;
                    result.status = "completed";
                    result.investments = investments;
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    result.status = 'Network Error';
                    result.err = "an error occured in the server try again later";
                    return [3 /*break*/, 4];
                case 4:
                    res.json(result);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getInvestments = getInvestments;
function getPayments(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var query, result, payments, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = new Queries_1.SQLQuery(payments_1.Payment);
                    result = {
                        status: "pending",
                        err: "",
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, query.findAll()];
                case 2:
                    payments = (_a.sent()).res;
                    result.status = "completed";
                    result.payments = payments;
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _a.sent();
                    result.status = 'Network Error';
                    result.err = "an error occured in the server try again later";
                    return [3 /*break*/, 4];
                case 4:
                    res.json(result);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getPayments = getPayments;
function addAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var result, query, username, salt, env_password, hashed, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = {
                        status: "pending",
                        err: "",
                    };
                    query = new Queries_1.SQLQuery(admins_1.AdminModel);
                    username = req.body.username;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, bcrypt_1.default.genSalt()];
                case 2:
                    salt = _a.sent();
                    env_password = username;
                    return [4 /*yield*/, bcrypt_1.default.hash(env_password, salt)];
                case 3:
                    hashed = _a.sent();
                    return [4 /*yield*/, query.createRecord({
                            username: username,
                            password: hashed,
                            admin_id: (0, uuid_1.v4)().toString().slice(0, 5),
                            isSuperUser: false
                        })];
                case 4:
                    _a.sent();
                    result.status = "success";
                    result.message = "admin added successfully";
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    result.status = "failed";
                    result.message = "an error occurred in our server";
                    return [3 /*break*/, 6];
                case 6:
                    res.json(result);
                    return [2 /*return*/];
            }
        });
    });
}
exports.addAdmin = addAdmin;
function loginAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var query, _a, username, password, result, _b, success, user, checkDetail, error_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    query = new Queries_1.SQLQuery(admins_1.AdminModel);
                    _a = req.body, username = _a.username, password = _a.password;
                    result = {
                        status: "",
                        error: ""
                    };
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, query.find({ username: username })];
                case 2:
                    _b = _c.sent(), success = _b.success, user = _b.res;
                    if (!success) return [3 /*break*/, 4];
                    return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                case 3:
                    checkDetail = _c.sent();
                    if (checkDetail) {
                        req.session.admin = { username: username };
                        req.session.admin.admin_id = user.admin_id;
                        result.status = "logged in";
                        result.admin = { username: username, admin_id: user.admin_id };
                    }
                    else {
                        result.status = "Invalid Credentials";
                        result.error = "You are not authorized";
                    }
                    return [3 /*break*/, 5];
                case 4:
                    result.status = "Invalid User";
                    result.error = "You are not authorized ";
                    _c.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_2 = _c.sent();
                    result.status = "Server error";
                    result.error = "They must have been some issue please try again later";
                    return [3 /*break*/, 7];
                case 7:
                    res.json(result);
                    return [2 /*return*/];
            }
        });
    });
}
exports.loginAdmin = loginAdmin;
function updateExchange(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var query, _a, rate, type, conversion, result, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    query = new Queries_1.SQLQuery(admins_1.Exchange);
                    _a = req.body, rate = _a.rate, type = _a.type, conversion = _a.conversion;
                    console.log(req.body);
                    result = {
                        status: "pending",
                        error: "no response yet"
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, query.updateOne({
                            rate_type: type,
                            conversion: conversion
                        }, {
                            rate: rate
                        })];
                case 2:
                    _b.sent();
                    result.status = "success";
                    result.error = "";
                    result.message = "exchange updated successfully";
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _b.sent();
                    result.status = "Server Error";
                    result.error = "we could not get any result due to an internal error please try again later";
                    return [3 /*break*/, 4];
                case 4:
                    res.json(result);
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateExchange = updateExchange;
function getExchanges(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var query, result, res_1, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = new Queries_1.SQLQuery(admins_1.Exchange);
                    result = {
                        status: "pending",
                        error: "no response yet"
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, query.findAll()];
                case 2:
                    res_1 = (_a.sent()).res;
                    result.error = "";
                    result.status = "success";
                    result.exchanges = res_1;
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    result.status = "Server Error";
                    result.error = "we could not get any result due to an internal error please try again later";
                    return [3 /*break*/, 4];
                case 4:
                    res.json(result);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getExchanges = getExchanges;
function getWithdrawals(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var query, result, withdrawals, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = new Queries_1.SQLQuery(payments_1.Withdrawal);
                    result = {
                        status: "pending",
                        err: "",
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, query.findAll()];
                case 2:
                    withdrawals = (_a.sent()).res;
                    result.status = "completed";
                    result.withdrawals = withdrawals;
                    return [3 /*break*/, 4];
                case 3:
                    err_4 = _a.sent();
                    result.status = 'Network Error';
                    result.err = "an error occured in the server try again later";
                    return [3 /*break*/, 4];
                case 4:
                    res.json(result);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getWithdrawals = getWithdrawals;
function getAdmins(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var query, result, admins, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = new Queries_1.SQLQuery(admins_1.AdminModel);
                    result = {
                        status: "pending",
                        err: "",
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, query.findAll({ isSuperUser: false })];
                case 2:
                    admins = (_a.sent()).res;
                    result.status = "completed";
                    result.admins = admins === null || admins === void 0 ? void 0 : admins.map(function (user) {
                        return {
                            username: user.username,
                            admin_id: user.admin_id,
                            createdAt: user.createdAt
                        };
                    });
                    return [3 /*break*/, 4];
                case 3:
                    err_5 = _a.sent();
                    result.status = 'Network Error';
                    result.err = "an error occured in the server try again later";
                    return [3 /*break*/, 4];
                case 4:
                    res.json(result);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getAdmins = getAdmins;
