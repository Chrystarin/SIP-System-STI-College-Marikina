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
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const bcrypt_1 = require("bcrypt");
const generateId_1 = require("../../utilities/generateId");
const cookies_1 = require("../../utilities/cookies");
const errors_1 = require("../../utilities/errors");
const user_model_1 = __importStar(require("../user/user.model"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { employeeId, role, name, email } = req.body;
    const userData = {
        employeeId,
        role,
        name,
        credentials: {
            email,
            password: (0, generateId_1.genPassword)()
        },
        status: user_model_1.UserStatus.Active
    };
    yield user_model_1.default.create(userData);
    res.json({ user: userData, message: 'Registered successfully' });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_model_1.default.findOne({ 'credentials.email': email }, { 'credentials.password': 1, employeeId: 1, role: 1, name: 1 }).exec();
    if (!user || !(0, bcrypt_1.compareSync)(password, user.credentials.password))
        throw new errors_1.Unauthorized('Invalid email or password');
    const requestor = {
        employeeId: user.employeeId,
        role: user.role,
    };
    res.cookie('access-token', (0, cookies_1.signAccess)(requestor), cookies_1.cookieOptions.access)
        .cookie('refresh-token', (0, cookies_1.signRefresh)(requestor), cookies_1.cookieOptions.refresh)
        .json({ message: 'Logged in successfully', user: user });
});
exports.login = login;
const logout = (_req, res) => {
    res.cookie('access-token', '', cookies_1.cookieOptions.default)
        .cookie('refresh-token', '', cookies_1.cookieOptions.default)
        .json('Logged out successfully');
};
exports.logout = logout;
