"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exchange = exports.AdminModel = void 0;
var _a = require("mongoose"), Schema = _a.Schema, model = _a.model;
exports.AdminModel = model("admins", new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isSuperUser: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date()
    }
}, { timestamps: true }));
exports.Exchange = model("exchange_rates", new Schema({
    rate: {
        type: Number,
        required: true
    },
    conversion: {
        type: String,
        required: true
    },
    rate_type: {
        type: String,
        required: true
    }
}, { timestamps: true }), "exchange_rates");
