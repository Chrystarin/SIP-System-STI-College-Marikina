"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieOptions = exports.signRefresh = exports.signAccess = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const envs_1 = __importDefault(require("./envs"));
const duration = {
    access: 60 * 1000,
    refresh: 7 * 24 * 60 * 60 * 1000
};
const options = {
    httpOnly: true,
    sameSite: 'none',
    maxAge: 0,
    secure: true
};
const cookieOptions = {
    access: Object.assign(Object.assign({}, options), { maxAge: duration.access }),
    refresh: Object.assign(Object.assign({}, options), { maxAge: duration.refresh }),
    default: options
};
exports.cookieOptions = cookieOptions;
const signCookie = (payload, secret, expiresIn) => (0, jsonwebtoken_1.sign)(Object.assign(Object.assign({}, payload), { createdAt: new Date() }), secret, { expiresIn });
const signAccess = (payload) => signCookie(payload, envs_1.default.JWT_ACCESS, duration.access);
exports.signAccess = signAccess;
const signRefresh = (payload) => signCookie(payload, envs_1.default.JWT_REFRESH, duration.refresh);
exports.signRefresh = signRefresh;
