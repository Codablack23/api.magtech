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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.sendResetPasswordToken = exports.registerHandler = exports.resetPassword = exports.forgotPassword = exports.logoutHandler = exports.loginHandler = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const user_1 = require("../config/models/sql/user");
const Queries_1 = require("../config/services/Queries");
const bots_1 = require("../config/models/sql/bots");
const moment_1 = __importDefault(require("moment"));
const console_1 = __importDefault(require("console"));
function loginHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { phone, password } = req.body;
        const response = {
            status: "pending",
            error: "process is still pending"
        };
        const query = new Queries_1.SQLQuery(user_1.User);
        try {
            const userExist = yield query.find({ phone_no: phone });
            const { res: user } = userExist;
            const check = yield bcrypt_1.default.compare(password, user.password);
            if (check) {
                const userData = {
                    phone,
                    username: user.username,
                    name: user.name,
                    refcode: user.ref_code
                };
                req.session.user = userData;
                response.error = "";
                response.status = "success";
                response.user = userData;
                return res.json(response);
            }
            response.status = "not allowed";
            response.error = "password does not match";
            return res.json(response);
        }
        catch (error) {
            console_1.default.log(error);
            response.status = "internal error";
            response.error = "an internal server error occured";
        }
        res.json(response);
    });
}
exports.loginHandler = loginHandler;
function logoutHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        delete req.session.user;
        res.json({
            status: 'success',
            message: "you have successfully logged out"
        });
    });
}
exports.logoutHandler = logoutHandler;
function forgotPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username } = req.body;
        console_1.default.log(username);
        const response = {
            status: "pending",
            error: "pending process"
        };
        const query = new Queries_1.SQLQuery(user_1.User);
        const resetCodQuery = new Queries_1.SQLQuery(user_1.ResetCode);
        const queryResponse = yield query.find({
            username
        });
        console_1.default.log(queryResponse);
        if (queryResponse.success) {
            const reset_code = (0, uuid_1.v4)().slice(0, 6);
            const resetResponse = yield resetCodQuery.createRecord({
                code: reset_code,
                username,
                expires: (0, moment_1.default)().add(1, "hour")
            });
            if (resetResponse.success) {
                response.status = "success";
                response.message = "Reset Code Sent Successfully";
                response.error = "";
                response.reset_code = reset_code;
            }
            else {
                response.status = "failed";
                response.error = "an error occured in the server";
            }
        }
        else {
            response.status = "failed";
            response.error = "user does not exist";
        }
        res.json(response);
    });
}
exports.forgotPassword = forgotPassword;
function resetPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = {
            status: "pending",
            error: "pending process"
        };
        const { new_password, reset_code } = req.body;
        const query = new Queries_1.SQLQuery(user_1.User);
        const resetQuery = new Queries_1.SQLQuery(user_1.ResetCode);
        const resetQueryRes = yield resetQuery.find({ code: reset_code });
        console_1.default.log(resetQueryRes);
        if (resetQueryRes.success) {
            const { res: resetDetail } = resetQueryRes;
            const currentDate = (0, moment_1.default)();
            const expiredDate = (0, moment_1.default)(resetDetail.expires);
            const diff = (currentDate.diff(expiredDate)) / (60 * 60 * 1000);
            if (diff < 1) {
                const queryResponse = yield query.updateOne({ username: resetDetail.username }, { password: new_password });
                console_1.default.log(queryResponse);
                if (queryResponse.success) {
                    const delRes = yield resetQuery.deleteRecord({
                        code: reset_code
                    });
                    console_1.default.log({ delRes, reset_code });
                    response.status = "success";
                    response.message = "password changed successfully";
                }
                else {
                    response.status = "500";
                    response.error = "an internal server occurred";
                }
            }
            else {
                response.status = "400";
                response.error = "Sorry This Code has expired";
            }
        }
        else {
            response.status = "400";
            response.error = "Invalid Reset Code";
        }
        res.json(response);
    });
}
exports.resetPassword = resetPassword;
function registerHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = {
            status: "pending",
            error: "process is still pending"
        };
        const { name, phone, password, username } = req.body;
        console_1.default.log(req.body, "regHandler");
        console_1.default.log(user_1.User, bots_1.Refferal);
        const query = new Queries_1.SQLQuery(user_1.User);
        const refQuery = new Queries_1.SQLQuery(bots_1.Refferal);
        try {
            const salt = yield bcrypt_1.default.genSalt();
            const refcode = (0, uuid_1.v4)().slice(0, 6);
            const hashedPassword = yield bcrypt_1.default.hash(password, salt);
            const res = yield query.createRecord({
                name,
                phone_no: phone,
                ref: "",
                username,
                refferred: false,
                password: hashedPassword,
                ref_code: refcode,
            });
            console_1.default.log(res);
            yield refQuery.createRecord({
                ref_code: refcode,
                first_gen: "",
                second_gen: "",
                amount: 0
            });
            const user = {
                name,
                phone,
                username,
                refcode
            };
            response.status = "success";
            response.error = "";
            response.user = user;
            req.session.user = user;
        }
        catch (error) {
            console_1.default.log(error);
            response.status = "500";
            response.error = "an internal server occurred";
            return res.json(response);
        }
        res.json(response);
    });
}
exports.registerHandler = registerHandler;
function sendResetPasswordToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.json({
            page: "logout"
        });
    });
}
exports.sendResetPasswordToken = sendResetPasswordToken;
function changePassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.json({
            page: "logout"
        });
    });
}
exports.changePassword = changePassword;
