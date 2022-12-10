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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var passport = require('passport');
var express_session_1 = __importDefault(require("express-session"));
var dotenv = require("dotenv").config();
var cors_1 = __importDefault(require("cors"));
var admin_1 = __importDefault(require("./admin"));
var bots_1 = __importDefault(require("./bots"));
var payments_1 = __importDefault(require("./payments"));
var users_1 = __importDefault(require("./users"));
var adminAuth_1 = require("./config/middlewares/adminAuth");
var Queries_1 = require("./config/services/Queries");
var admins_1 = require("./config/models/sql/admins");
var db_1 = require("./config/db");
var connect_session_sequelize_1 = __importDefault(require("connect-session-sequelize"));
var SequelizeStore = (0, connect_session_sequelize_1.default)(express_session_1.default.Store);
function addExchangeRate() {
    return __awaiter(this, void 0, void 0, function () {
        var query, allExchange, exchanges, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = new Queries_1.SQLQuery(admins_1.Exchange);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, query.findAll()];
                case 2:
                    allExchange = (_a.sent()).res;
                    if (!allExchange) {
                        exchanges = [
                            { rate: 620, rate_type: "payment", conversion: "USD_NGN" },
                            { rate: 600, rate_type: "withdrawal", conversion: "USD_NGN" },
                            { rate: 0.8, rate_type: "payment", conversion: "USD_EUR" },
                            { rate: 0.95, rate_type: "payment", conversion: "USD_EUR" }
                        ];
                        exchanges.forEach(function (_a) {
                            var rate = _a.rate, rate_type = _a.rate_type, conversion = _a.conversion;
                            return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, query.createRecord({
                                                rate: rate,
                                                rate_type: rate_type,
                                                conversion: conversion
                                            })];
                                        case 1:
                                            _b.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        });
                        console.log("exchanges added");
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    return [2 /*return*/, error_1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
db_1.sequelize.sync().then(function () { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("connected to magtech db");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, addExchangeRate()];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, adminAuth_1.addSuperUser)()];
            case 3:
                data = _a.sent();
                console.log(data);
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); }).catch(function (err) { return console.log(err); });
//  const dbURI = process.env.MONGO_DB_URI2 as string
//   mongoose.connect(dbURI).then((err)=>{
//     console.log("connection established")
//     addExchangeRate()
//     addSuperUser().then(data=>{
//       console.log(data)
//     }).catch(err=>{
//       console.log(err)
//     })
//   }).catch(err=>{
//     console.log(err)
//   })
var app = (0, express_1.default)();
var PORT = process.env.PORT;
// const MONGO_SESSION_STORE = MongoStore.create({
//   mongoUrl:process.env.MONGO_DB_URI
// })
//
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.use(express_1.default.urlencoded({ extended: true }));
//CORS config
app.use((0, cors_1.default)({
    credentials: true,
    origin: process.env.ENV == "dev" ? "http://localhost:3005" : process.env.FRONT_END
}));
var oneMonth = 1000 * 60 * 60 * 24 * 30;
//session config
app.use((0, express_session_1.default)({
    secret: (_a = process.env.SESSION_SECRET) !== null && _a !== void 0 ? _a : "",
    store: new SequelizeStore({ db: db_1.sequelize }),
    saveUninitialized: false,
    proxy: true,
    name: "api-magtech",
    resave: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: oneMonth,
        sameSite: "none",
    }
}));
//passport auth 
// app.use(passport.initialize())
// app.use(passport.session())
//routers and handlers
app.use("/bots", bots_1.default);
app.use("/users", users_1.default);
app.use("/superusers", admin_1.default);
app.use('/withdrawals', payments_1.default);
app.get("/", function (req, res) {
    res.json({
        message: "the magtech api"
    });
});
//start server
app.listen(PORT || 5000, function () {
    console.log("Running at PORT ".concat(PORT || 5000));
});
