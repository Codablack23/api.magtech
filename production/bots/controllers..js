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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePayment = exports.getRefs = exports.getPayments = exports.buyBot = exports.updatePayment = exports.paymentHandler = exports.invest = exports.getBots = exports.getInvestments = void 0;
var bots_1 = require("../config/models/mongo_db/bots");
var payments_1 = require("../config/models/mongo_db/payments");
var Queries_1 = require("../config/services/Queries");
var uuid_1 = require("uuid");
var user_1 = require("../config/models/sql/user");
function getInvestments(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var query, user, result, investments, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = new Queries_1.SQLQuery(bots_1.Investment);
                    user = req.session.user;
                    result = {
                        status: "pending",
                        err: "",
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, query.findAll({ username: user === null || user === void 0 ? void 0 : user.username })];
                case 2:
                    investments = (_a.sent()).res;
                    result.status = "success";
                    result.investments = investments;
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
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
function getBots(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var query, user, result, bots, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = new Queries_1.SQLQuery(bots_1.Bot);
                    user = req.session.user;
                    result = {
                        status: "pending",
                        err: ""
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, query.findAll({ username: user === null || user === void 0 ? void 0 : user.username })];
                case 2:
                    bots = (_a.sent()).res;
                    result.status = "success",
                        result.bots = bots;
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    result.status = "Server Error";
                    result.error = "An error occured in our server check your network or try again later";
                    return [3 /*break*/, 4];
                case 4:
                    res.json(result);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getBots = getBots;
function invest(req, res) {
    var _a, _b, _c, _d, _e, _f, _g;
    return __awaiter(this, void 0, void 0, function () {
        var investmentQuery, refQuery, userQuery, botQuery, _h, amount, bot_id, date, result, all_investment, bot, user, percent, duration, expires, error_3;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    investmentQuery = new Queries_1.SQLQuery(bots_1.Investment);
                    refQuery = new Queries_1.SQLQuery(bots_1.Refferral);
                    userQuery = new Queries_1.SQLQuery(user_1.User);
                    botQuery = new Queries_1.SQLQuery(bots_1.Bot);
                    _h = req.body, amount = _h.amount, bot_id = _h.bot_id;
                    date = new Date();
                    result = {
                        status: "pending",
                        error: ""
                    };
                    _j.label = 1;
                case 1:
                    _j.trys.push([1, 12, , 13]);
                    return [4 /*yield*/, investmentQuery.findAll({ username: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.username })];
                case 2:
                    all_investment = (_j.sent()).res;
                    return [4 /*yield*/, botQuery.find({
                            username: (_b = req.session.user) === null || _b === void 0 ? void 0 : _b.username,
                            bot_id: bot_id
                        })];
                case 3:
                    bot = (_j.sent()).res;
                    return [4 /*yield*/, userQuery.find({ username: (_c = req.session.user) === null || _c === void 0 ? void 0 : _c.username })];
                case 4:
                    user = (_j.sent()).res;
                    percent = parseFloat(bot.percentage_profit);
                    duration = parseInt(bot.duration);
                    expires = new Date(date.setDate(date.getDate() + duration));
                    if (!(bot.used !== true)) return [3 /*break*/, 10];
                    return [4 /*yield*/, bots_1.Investment.create({
                            username: (_d = req.session.user) === null || _d === void 0 ? void 0 : _d.username,
                            bot: bot.bot_name,
                            amount: amount,
                            percentage_profit: bot.percentage_profit,
                            duration: duration,
                            returns: (percent * duration) * amount,
                            expires: expires.toDateString()
                        })];
                case 5:
                    _j.sent();
                    if (!(user.reffered && (all_investment === null || all_investment === void 0 ? void 0 : all_investment.length) === 0)) return [3 /*break*/, 8];
                    return [4 /*yield*/, refQuery.updateOne({ first_gen: (_e = req.session.user) === null || _e === void 0 ? void 0 : _e.username }, { $inc: { amount: (parseFloat(amount) / duration) * 0.20 } })];
                case 6:
                    _j.sent();
                    return [4 /*yield*/, refQuery.updateOne({ second_gen: (_f = req.session.user) === null || _f === void 0 ? void 0 : _f.username }, { $inc: { amount: (parseFloat(amount) / duration) * 0.03 } })];
                case 7:
                    _j.sent();
                    _j.label = 8;
                case 8: return [4 /*yield*/, botQuery.updateOne({
                        username: (_g = req.session.user) === null || _g === void 0 ? void 0 : _g.username,
                        bot_id: bot_id
                    }, { used: true })];
                case 9:
                    _j.sent();
                    result.status = "Completed";
                    result.investment = {
                        amount: amount,
                        bot_id: bot_id,
                        expires: expires.toDateString(),
                        percentage_profit: bot === null || bot === void 0 ? void 0 : bot.percentage_profit,
                    };
                    return [3 /*break*/, 11];
                case 10:
                    result.status = 'Failed';
                    result.error = "You cannot reuse a bot";
                    _j.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    error_3 = _j.sent();
                    console.log(error_3);
                    result.status = 'Network Error';
                    result.error = "an error occured in the server try again later";
                    return [3 /*break*/, 13];
                case 13:
                    res.json(result);
                    return [2 /*return*/];
            }
        });
    });
}
exports.invest = invest;
function paymentHandler(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var query, _b, description, amount, result, payment_id, error_4;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    query = new Queries_1.SQLQuery(payments_1.Payment);
                    _b = req.body, description = _b.description, amount = _b.amount;
                    result = {
                        status: "pending",
                        error: ""
                    };
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    payment_id = (0, uuid_1.v4)();
                    return [4 /*yield*/, query.createRecord({
                            username: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.username,
                            status: "unpaid",
                            payment_id: payment_id,
                            description: description,
                            amount: amount,
                        })];
                case 2:
                    _c.sent();
                    result.status = "Payment initiated";
                    result.payment_id = payment_id;
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _c.sent();
                    console.log(error_4);
                    result.status = "Network error",
                        result.status = "an internal error occured";
                    return [3 /*break*/, 4];
                case 4:
                    res.json(result);
                    return [2 /*return*/];
            }
        });
    });
}
exports.paymentHandler = paymentHandler;
function updatePayment(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var query, result, id, payment, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = new Queries_1.SQLQuery(payments_1.Payment);
                    result = {
                        status: "pending",
                        error: ""
                    };
                    id = req.params.id;
                    if (!!(0, uuid_1.validate)(id)) return [3 /*break*/, 1];
                    result.status = "Field Error";
                    result.error = "please provide a valid uuid string";
                    return [3 /*break*/, 4];
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, query.updateOne({ payment_id: id }, { status: "paid" })];
                case 2:
                    payment = _a.sent();
                    if (payment) {
                        result.status = "Success";
                        result.error = "";
                        result.message = "Payment Completed Successfully";
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _a.sent();
                    result.status = "Server Error",
                        result.error = "an error occured in our server please check your network or try again later";
                    return [3 /*break*/, 4];
                case 4:
                    res.json(result);
                    return [2 /*return*/];
            }
        });
    });
}
exports.updatePayment = updatePayment;
function buyBot(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var query, _b, percent_profit, bot_name, bot_price, date, duration, expires, result, bot_id, error_6;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    query = new Queries_1.SQLQuery(bots_1.Bot);
                    _b = req.body, percent_profit = _b.percent_profit, bot_name = _b.bot_name, bot_price = _b.bot_price;
                    date = new Date();
                    duration = 90;
                    expires = new Date(date.setDate(date.getDate() + duration));
                    result = {
                        status: "pending",
                        error: ""
                    };
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    bot_id = (0, uuid_1.v4)().slice(0, 4);
                    return [4 /*yield*/, query.createRecord({
                            percentage_profit: percent_profit,
                            bot_name: bot_name,
                            bot_price: bot_price,
                            active: true,
                            username: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.username,
                            bot_id: bot_id,
                            expires: expires,
                            duration: duration
                        })];
                case 2:
                    _c.sent();
                    result.status = "success";
                    result.message = "bot added sucessfully";
                    result.bot = {
                        bot_name: bot_name,
                        bot_id: bot_id,
                        expires: expires,
                        duration: duration
                    };
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _c.sent();
                    result.status = "Failed";
                    result.error = "an internal error occurred please check your network or try again later";
                    return [3 /*break*/, 4];
                case 4:
                    res.json(result);
                    return [2 /*return*/];
            }
        });
    });
}
exports.buyBot = buyBot;
function getPayments(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var result, query, payments, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    result = {
                        status: "pending",
                        err: "",
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    query = new Queries_1.SQLQuery(payments_1.Payment);
                    return [4 /*yield*/, query.findAll({ username: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.username })];
                case 2:
                    payments = (_b.sent()).res;
                    result.status = "completed";
                    result.payments = payments;
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _b.sent();
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
function getRefs(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var query, result, referrals, error_7;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    query = new Queries_1.SQLQuery(bots_1.Refferral);
                    result = {
                        status: "pending",
                        err: ""
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, query.findAll({ ref_code: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.refcode })];
                case 2:
                    referrals = (_b.sent()).res;
                    result.status = "completed";
                    result.refs = referrals;
                    return [3 /*break*/, 4];
                case 3:
                    error_7 = _b.sent();
                    console.log(error_7);
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
exports.getRefs = getRefs;
function deletePayment(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var query, response, id, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = new Queries_1.SQLQuery(payments_1.Payment);
                    response = {
                        status: "pending",
                        err: "pending"
                    };
                    id = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, query.deleteRecord(id)];
                case 2:
                    _a.sent();
                    response.status = "deleted";
                    response.err = "";
                    response.message = "payment deleted successfully";
                    return [3 /*break*/, 4];
                case 3:
                    error_8 = _a.sent();
                    response.status = 'Network Error';
                    response.err = "an error occured in the server try again later";
                    return [3 /*break*/, 4];
                case 4:
                    res.json(response);
                    return [2 /*return*/];
            }
        });
    });
}
exports.deletePayment = deletePayment;
