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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var checkRef_1 = require("../config/middlewares/checkRef");
var findUser_1 = require("../config/middlewares/findUser");
var userAuth_1 = require("../config/middlewares/userAuth");
var validate_1 = require("../config/middlewares/validate");
var controllers_1 = require("./controllers");
var userApp = express_1.default.Router();
//user routes and their handlers
userApp.get("/", function (req, res) { return res.send("auth"); });
userApp.post("/forgot-password", controllers_1.forgotPassword);
userApp.post("/reset-password", controllers_1.resetPassword);
userApp.post("/change-password", userAuth_1.authenticate, controllers_1.sendResetPasswordToken);
userApp.post("/change-password/:id", userAuth_1.authenticate, controllers_1.changePassword);
userApp.post("/", userAuth_1.authenticate, function (req, res) {
    res.json({ user: __assign({}, req.session.user), status: "Authorized" });
});
userApp.post("/login", validate_1.validateLogin, (0, findUser_1.findUser)("login"), controllers_1.loginHandler);
userApp.post("/logout", userAuth_1.authenticate, controllers_1.logoutHandler);
userApp.post("/signup", (0, validate_1.validateRegister)(), (0, findUser_1.findUser)("signup"), checkRef_1.checkRef, checkRef_1.addUserWithRefCode, controllers_1.registerHandler);
userApp.get("/forgot-password/", function (req, res) { res.send("/"); });
exports.default = userApp;
