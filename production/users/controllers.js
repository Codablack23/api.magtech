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
exports.changePassword = exports.sendResetPasswordToken = exports.registerHandler = exports.resetPassword = exports.forgotPassword = exports.logoutHandler = exports.loginHandler = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var uuid_1 = require("uuid");
var user_1 = require("../config/models/mongo_db/user");
var Queries_1 = require("../config/services/Queries");
var bots_1 = require("../config/models/sql/bots");
function loginHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, phone, password, response, query, userExist, user, check, userData, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, phone = _a.phone, password = _a.password;
                    response = {
                        status: "pending",
                        error: "process is still pending"
                    };
                    query = new Queries_1.SQLQuery(user_1.User);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, query.find({ phone_no: phone })];
                case 2:
                    userExist = _b.sent();
                    user = userExist.res;
                    return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                case 3:
                    check = _b.sent();
                    if (check) {
                        userData = {
                            phone: phone,
                            username: user.username,
                            name: user.name,
                            refcode: user.ref_code
                        };
                        req.session.user = userData;
                        response.error = "";
                        response.status = "success";
                        response.user = userData;
                        return [2 /*return*/, res.json(response)];
                    }
                    response.status = "not allowed";
                    response.error = "password does not match";
                    return [2 /*return*/, res.json(response)];
                case 4:
                    error_1 = _b.sent();
                    console.log(error_1);
                    response.status = "internal error";
                    response.error = "an internal server error occured";
                    return [3 /*break*/, 5];
                case 5:
                    res.json(response);
                    return [2 /*return*/];
            }
        });
    });
}
exports.loginHandler = loginHandler;
function logoutHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            delete req.session.user;
            res.json({
                status: 'success',
                message: "you have successfully logged out"
            });
            return [2 /*return*/];
        });
    });
}
exports.logoutHandler = logoutHandler;
function forgotPassword(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.json({
                page: "logout"
            });
            return [2 /*return*/];
        });
    });
}
exports.forgotPassword = forgotPassword;
function resetPassword(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var response, username, new_password, query, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    response = {
                        status: "pending",
                        error: "pending process"
                    };
                    username = req.session.user.username;
                    new_password = req.body.new_password;
                    query = new Queries_1.SQLQuery(user_1.User);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, query.updateOne({ username: username }, { password: new_password })];
                case 2:
                    _a.sent();
                    response.status = "success";
                    response.message = "password changed successfully";
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.log(error_2);
                    response.status = "500";
                    response.error = "an internal server occurred";
                    return [3 /*break*/, 4];
                case 4:
                    res.json(response);
                    return [2 /*return*/];
            }
        });
    });
}
exports.resetPassword = resetPassword;
function registerHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var response, _a, name, phone, password, username, query, refQuery, salt, refcode, hashedPassword, user, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    response = {
                        status: "pending",
                        error: "process is still pending"
                    };
                    _a = req.body, name = _a.name, phone = _a.phone, password = _a.password, username = _a.username;
                    console.log(req.body, "regHandler");
                    query = new Queries_1.SQLQuery(user_1.User);
                    refQuery = new Queries_1.SQLQuery(bots_1.Refferal);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, bcrypt_1.default.genSalt()];
                case 2:
                    salt = _b.sent();
                    console.log(uuid_1.v4);
                    refcode = (0, uuid_1.v4)().slice(0, 6);
                    return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
                case 3:
                    hashedPassword = _b.sent();
                    return [4 /*yield*/, query.createRecord({
                            name: name,
                            phone_no: phone,
                            ref: "",
                            username: username,
                            refferred: false,
                            password: hashedPassword,
                            ref_code: refcode,
                        })];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, refQuery.createRecord({
                            ref_code: refcode,
                            first_gen: "",
                            second_gen: "",
                            amount: 0
                        })];
                case 5:
                    _b.sent();
                    user = {
                        name: name,
                        phone: phone,
                        username: username,
                        refcode: refcode
                    };
                    response.status = "success";
                    response.error = "";
                    response.user = user;
                    req.session.user = user;
                    return [3 /*break*/, 7];
                case 6:
                    error_3 = _b.sent();
                    console.log(error_3);
                    response.status = "500";
                    response.error = "an internal server occurred";
                    return [2 /*return*/, res.json(response)];
                case 7:
                    res.json(response);
                    return [2 /*return*/];
            }
        });
    });
}
exports.registerHandler = registerHandler;
function sendResetPasswordToken(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.json({
                page: "logout"
            });
            return [2 /*return*/];
        });
    });
}
exports.sendResetPasswordToken = sendResetPasswordToken;
function changePassword(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.json({
                page: "logout"
            });
            return [2 /*return*/];
        });
    });
}
exports.changePassword = changePassword;
