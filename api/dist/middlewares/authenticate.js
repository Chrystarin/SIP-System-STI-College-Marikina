"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookies_1 = require("../utilities/cookies");
const errors_1 = require("../utilities/errors");
const jsonwebtoken_1 = require("jsonwebtoken");
const envs_1 = __importDefault(require("../utilities/envs"));
const user_model_1 = __importStar(require("../api/user/user.model"));
const { JWT_ACCESS, JWT_REFRESH } = envs_1.default;
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { 'access-token': accessToken, 'refresh-token': refreshToken } = req.cookies;
    if (!refreshToken)
        return next(new errors_1.Unauthorized('This action requires logging in first'));
    let user;
    try {
        user = (0, jsonwebtoken_1.verify)(accessToken, JWT_ACCESS);
    }
    catch (error) { }
    if (!user) {
        try {
            const { role, employeeId, exp = Date.now(), } = (0, jsonwebtoken_1.verify)(refreshToken, JWT_REFRESH);
            user = { role, employeeId };
            res.cookie('access-token', (0, cookies_1.signAccess)(user), cookies_1.cookieOptions.access);
            if (Date.now() - new Date(exp).getTime() > 5 * 24 * 60 * 60 * 1000)
                res.cookie('refresh-token', (0, cookies_1.signRefresh)(user), cookies_1.cookieOptions.refresh);
        }
        catch (error) {
            res.cookie('access-token', '', cookies_1.cookieOptions.default)
                .cookie('refresh-token', '', cookies_1.cookieOptions.default);
            next(error);
        }
    }
    if (user) {
        const userFound = yield user_model_1.default.findOne({
            employeeId: user.employeeId,
            role: user.role,
            status: user_model_1.UserStatus.Active,
        });
        if (!userFound)
            return next(new errors_1.NotFound('User not found'));
        if (userFound.status === user_model_1.UserStatus.Inactive)
            return next(new errors_1.Forbidden('User is not active'));
        req.user = userFound;
        return next();
    }
    next(new errors_1.Unauthorized('This action requires logging in first'));
});
exports.default = authenticate;
