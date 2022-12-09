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
exports.validateInvest = exports.validateStartPayment = exports.validateBuyBot = exports.validateUpdateExchange = exports.checkExistingPassword = exports.validatePasswordChange = exports.validateRegister = exports.validateAdminLogin = exports.validateLogin = void 0;
var express_validator_1 = require("express-validator");
var bcrypt_1 = __importDefault(require("bcrypt"));
var express_validator_2 = require("express-validator");
var user_1 = require("../models/sql/user");
var Queries_1 = require("../services/Queries");
function validateRequest(validations) {
    var _this = this;
    var validateLogin = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
        var errors;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all(validations.map(function (validator) { return validator.run(req); }))];
                case 1:
                    _a.sent();
                    errors = (0, express_validator_2.validationResult)(req);
                    if (errors.isEmpty()) {
                        return [2 /*return*/, next()];
                    }
                    return [2 /*return*/, res.json({
                            status: "field-error",
                            error: errors.array().map(function (err) { return ({
                                field: err.param,
                                error: err.msg
                            }); })
                        })];
            }
        });
    }); };
    return validateLogin;
}
exports.default = validateRequest;
exports.validateLogin = validateRequest([
    (0, express_validator_1.check)("phone").notEmpty().not().contains(" ").isLength({ min: 11, max: 15 }).isNumeric(),
    (0, express_validator_1.check)("password").notEmpty().not().contains(" ").isLength({ min: 8 })
]);
function validateAdminLogin() {
    return validateRequest([
        (0, express_validator_1.check)("username").notEmpty().withMessage("Please fill out this field")
            .not().contains(" ").withMessage("username should not contain whitespaces")
            .isLength({ min: 2 }).withMessage("username should atleast be 2 characters long"),
        (0, express_validator_1.check)("password").notEmpty().withMessage("Please fill out this field")
            .not().contains(" ").withMessage("Password should not contain whitespaces")
            .isLength({ min: 8 }).withMessage("Password should atleast be 8 characters long")
    ]);
}
exports.validateAdminLogin = validateAdminLogin;
function validateRegister() {
    var phoneCheck = (0, express_validator_1.check)("phone").notEmpty().withMessage("cannot be empty")
        .not().contains(" ").withMessage("should not contain spaces")
        .isLength({ min: 11, max: 15 }).withMessage("should be between 11 and 15 characters long")
        .isNumeric().withMessage("should contain only Numbers");
    var usernameCheck = (0, express_validator_1.check)('username')
        .notEmpty().withMessage("cannot be empty")
        .not().contains(" ").withMessage("should not contain spaces")
        .isAlphanumeric().withMessage("should not contain spaces")
        .isLength({ min: 2 }).withMessage("should not contain spaces");
    var nameCheck = (0, express_validator_1.check)("name")
        .notEmpty().withMessage("should not contain spaces")
        .isLength({ min: 3 }).withMessage("should atleast be 3 characters long");
    var passwordCheck = (0, express_validator_1.check)("password")
        .notEmpty().withMessage("should not be empty")
        .not().contains(" ").withMessage("should not contain spaces")
        .isLength({ min: 8 }).withMessage("should atleast be 8 characters long");
    var refcode = (0, express_validator_1.check)("refcode")
        .optional()
        .notEmpty().withMessage("should not be empty")
        .not().contains(" ").withMessage("should not contain spaces")
        .isLength({ min: 6, max: 6 }).withMessage("should be 6 characters long");
    console.log("validation");
    return validateRequest([
        phoneCheck,
        usernameCheck,
        nameCheck,
        passwordCheck,
        refcode
    ]);
}
exports.validateRegister = validateRegister;
function validatePasswordChange() {
    var passwordCheck = (0, express_validator_1.check)("password").notEmpty().not().contains(" ").isLength({ min: 8 });
    var newPasswordCheck = (0, express_validator_1.check)("new_password").notEmpty().not().contains(" ").isLength({ min: 8 });
    return validateRequest([
        passwordCheck,
        newPasswordCheck
    ]);
}
exports.validatePasswordChange = validatePasswordChange;
function checkExistingPassword(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var username, password, query, res_1, doesPasswordMatch, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    username = (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.username;
                    password = req.body.password;
                    query = new Queries_1.SQLQuery(user_1.User);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, query.find({ username: username })];
                case 2:
                    res_1 = (_b.sent()).res;
                    return [4 /*yield*/, bcrypt_1.default.compare(password, res_1.password)];
                case 3:
                    doesPasswordMatch = _b.sent();
                    if (doesPasswordMatch) {
                        return [2 /*return*/, next()];
                    }
                    res_1.json({
                        status: "password error",
                        error: "password provided does not match current password"
                    });
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _b.sent();
                    return [2 /*return*/, res.json({
                            status: "server error",
                            error: "an internal server error occurred please try again later"
                        })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.checkExistingPassword = checkExistingPassword;
function validateUpdateExchange() {
    var rate = (0, express_validator_1.check)("rate").notEmpty().not().contains(" ").isNumeric();
    var type = (0, express_validator_1.check)("type").notEmpty().not().contains(" ");
    var conversion = (0, express_validator_1.check)("conversion").notEmpty().not().contains(" ");
    return validateRequest([
        rate,
        type,
        conversion
    ]);
}
exports.validateUpdateExchange = validateUpdateExchange;
function validateBuyBot() {
    var profit = (0, express_validator_1.check)('percent_profit').notEmpty().withMessage("Please fill out this field")
        .not().contains(" ").withMessage("Please remove any whitespaces from this field")
        .isNumeric().withMessage("This field should contain only numbers");
    var price = (0, express_validator_1.check)('bot_price').notEmpty().withMessage("Please fill out this field")
        .not().contains(" ").withMessage("Please remove any whitespaces from this field")
        .isNumeric().withMessage("This field should contain only numbers");
    var name = (0, express_validator_1.check)('bot_name').notEmpty().withMessage("Please fill out this field");
    return validateRequest([
        profit,
        price,
        name
    ]);
}
exports.validateBuyBot = validateBuyBot;
function validateStartPayment() {
    var desc = (0, express_validator_1.check)('description').notEmpty().withMessage("Please fill out this field");
    var amount = (0, express_validator_1.check)('amount').notEmpty().withMessage("Please fill out this field")
        .not().contains(" ").withMessage("Please remove any whitespaces from this field");
    return validateRequest([
        desc,
        amount
    ]);
}
exports.validateStartPayment = validateStartPayment;
function validateInvest() {
    var bot_id = (0, express_validator_1.check)('bot_id').notEmpty().withMessage("Please fill out this field")
        .isAlphanumeric().withMessage("This field should contain only numbers and alphabets");
    var amount = (0, express_validator_1.check)('amount').notEmpty().withMessage("Please fill out this field")
        .not().contains(" ").withMessage("Please remove any whitespaces from this field");
    return validateRequest([
        bot_id,
        amount
    ]);
}
exports.validateInvest = validateInvest;
