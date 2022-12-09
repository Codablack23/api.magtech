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
exports.addUserWithRefCode = exports.checkRef = void 0;
var user_1 = require("../models/mongo_db/user");
var Queries_1 = require("../services/Queries");
var bcrypt_1 = __importDefault(require("bcrypt"));
var uuid_1 = require("uuid");
var bots_1 = require("../models/sql/bots");
function checkRef(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var refcode, query, success;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    refcode = req.body.refcode;
                    if (!refcode) {
                        return [2 /*return*/, next()];
                    }
                    query = new Queries_1.SQLQuery(user_1.User);
                    return [4 /*yield*/, query.find({ ref_code: refcode })];
                case 1:
                    success = (_a.sent()).success;
                    if (success) {
                        return [2 /*return*/, next()];
                    }
                    res.json({
                        status: "404",
                        error: "the refcode is invalid"
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.checkRef = checkRef;
function addUserWithRefCode(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var response, _a, name, phone, password, username, ref, query, refQuery, salt, refcode, _b, _c, user, secondGen, reff, error_1;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    response = {
                        status: "pending",
                        error: "process is still pending",
                    };
                    _a = req.body, name = _a.name, phone = _a.phone, password = _a.password, username = _a.username, ref = _a.refcode;
                    query = new Queries_1.SQLQuery(user_1.User);
                    refQuery = new Queries_1.SQLQuery(bots_1.Refferal);
                    if (!ref) {
                        return [2 /*return*/, next()];
                    }
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 10, , 11]);
                    return [4 /*yield*/, bcrypt_1.default.genSalt()];
                case 2:
                    salt = _e.sent();
                    refcode = (0, uuid_1.v4)().slice(0, 6);
                    _c = (_b = query).createRecord;
                    _d = {
                        name: name,
                        phone_no: phone,
                        username: username
                    };
                    return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
                case 3: return [4 /*yield*/, _c.apply(_b, [(_d.password = _e.sent(),
                            _d.ref_code = refcode,
                            _d.ref = ref,
                            _d)])
                    //add user as first_gen to the one who reffered him 
                ];
                case 4:
                    _e.sent();
                    //add user as first_gen to the one who reffered him 
                    return [4 /*yield*/, refQuery.createRecord({
                            ref_code: ref,
                            first_gen: username,
                            second_gen: "",
                            amount: 0
                        })];
                case 5:
                    //add user as first_gen to the one who reffered him 
                    _e.sent();
                    user = {
                        name: name,
                        phone: phone,
                        username: username,
                        refcode: refcode
                    };
                    return [4 /*yield*/, query.find({ ref_code: ref })];
                case 6:
                    secondGen = (_e.sent()).res;
                    return [4 /*yield*/, refQuery.find({ ref_code: secondGen.ref })
                        //check if the user that reffered the current user was refferred
                    ];
                case 7:
                    reff = (_e.sent()).res;
                    if (!(secondGen && (reff.second_gen === "" || reff.second_gen === ' '))) return [3 /*break*/, 9];
                    //update the refferral tables/document to add user as the second_gen to who refferred the one that reffered the user 
                    return [4 /*yield*/, refQuery.updateOne({ ref_code: secondGen.ref }, { second_gen: username })];
                case 8:
                    //update the refferral tables/document to add user as the second_gen to who refferred the one that reffered the user 
                    _e.sent();
                    _e.label = 9;
                case 9:
                    response.status = "success";
                    response.error = "";
                    response.user = user;
                    req.session.user = user;
                    return [3 /*break*/, 11];
                case 10:
                    error_1 = _e.sent();
                    console.log(error_1);
                    response.status = "500";
                    response.error = "an internal server occurred";
                    return [3 /*break*/, 11];
                case 11:
                    res.json(response);
                    return [2 /*return*/];
            }
        });
    });
}
exports.addUserWithRefCode = addUserWithRefCode;
