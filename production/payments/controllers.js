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
exports.makeWithdrawal = exports.getWithdrawals = void 0;
var uuid_1 = require("uuid");
var payments_1 = require("../config/models/sql/payments");
var Queries_1 = require("../config/services/Queries");
var withdraw_1 = require("../config/services/withdraw");
function getWithdrawals(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var query, username, result, withdrawals, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    query = new Queries_1.SQLQuery(payments_1.Withdrawal);
                    username = (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.username;
                    result = {
                        status: "pending",
                        error: ""
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, query.findAll({ username: username })];
                case 2:
                    withdrawals = (_b.sent()).res;
                    result.status = "success";
                    result.withdrawals = withdrawals;
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    result.status = "Server Error";
                    result.error = "An error occured in the server please try again later";
                    throw error_1;
                case 4:
                    res.json(result);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getWithdrawals = getWithdrawals;
function makeWithdrawal(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var query, amount, username, result, transfer_details, balance, withdrawal_id, transfer_res, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    query = new Queries_1.SQLQuery(payments_1.Withdrawal);
                    amount = req.body.amount;
                    username = (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.username;
                    result = {
                        status: "pending",
                        error: ""
                    };
                    transfer_details = (0, withdraw_1.generateWithdrawDetails)(__assign(__assign({}, req.body), { email: "codablack24@gmail.com" }));
                    if (!(parseFloat(amount) >= 10)) return [3 /*break*/, 14];
                    if (!transfer_details.generated) return [3 /*break*/, 12];
                    return [4 /*yield*/, (0, withdraw_1.getBalance)(username)];
                case 1:
                    balance = _b.sent();
                    if (!(amount <= balance)) return [3 /*break*/, 10];
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 8, , 9]);
                    withdrawal_id = (0, uuid_1.v4)();
                    return [4 /*yield*/, query.createRecord({
                            username: username,
                            status: "unpaid",
                            withdrawal_id: withdrawal_id,
                            amount: amount,
                        })];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, (0, withdraw_1.transfer)(transfer_details === null || transfer_details === void 0 ? void 0 : transfer_details.details)
                        // console.log(transfer_res)
                    ];
                case 4:
                    transfer_res = _b.sent();
                    if (!(transfer_res.status === "success")) return [3 /*break*/, 6];
                    return [4 /*yield*/, query.updateOne({
                            withdrawal_id: withdrawal_id,
                        }, { status: "paid" })];
                case 5:
                    _b.sent();
                    result.status = "success";
                    result.message = "your withdrawal was successful and $".concat(amount, " sent to your bank account"),
                        result.details = __assign(__assign({}, transfer_details.details), { reference: transfer_res.data.reference });
                    return [3 /*break*/, 7];
                case 6:
                    result.error = transfer_res.data.complete_message;
                    result.status = transfer_res.message;
                    _b.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    error_2 = _b.sent();
                    console.log(error_2);
                    result.status = "Server Error";
                    result.error = "An Error occured within our server please check your internet or try again";
                    return [3 /*break*/, 9];
                case 9: return [3 /*break*/, 11];
                case 10:
                    result.status = "Amount Error";
                    result.error = "Insufficient Balance";
                    _b.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    result.status = "Field Error";
                    result.error = transfer_details.errors;
                    _b.label = 13;
                case 13: return [3 /*break*/, 15];
                case 14:
                    result.status = "Amount Error";
                    result.error = "withdrawal amount must start from $10";
                    _b.label = 15;
                case 15:
                    res.json(result);
                    return [2 /*return*/];
            }
        });
    });
}
exports.makeWithdrawal = makeWithdrawal;
