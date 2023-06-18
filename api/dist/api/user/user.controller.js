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
exports.updateStatus = exports.updatePassword = exports.resetPassword = exports.getUsers = void 0;
const errors_1 = require("../../utilities/errors");
const user_model_1 = __importDefault(require("./user.model"));
const generateId_1 = require("../../utilities/generateId");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { employeeId, role } = req.query;
    const modelQuery = {};
    if (employeeId)
        modelQuery.employeeId = employeeId;
    if (role)
        modelQuery.role = role;
    const users = yield user_model_1.default.find(modelQuery, { credentials: 0 }).exec();
    res.json(users);
});
exports.getUsers = getUsers;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { employeeId, password = (0, generateId_1.genPassword)() } = req.body;
    const { modifiedCount } = yield user_model_1.default.updateOne({ employeeId }, {
        $set: {
            'credentials.password': password
        }
    });
    if (modifiedCount === 0)
        throw new errors_1.NotFound('User not found');
    res.json({ password, message: 'Password reset successfully' });
});
exports.resetPassword = resetPassword;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body;
    const user = req.user;
    if (user === undefined)
        throw new errors_1.Unauthorized();
    user.credentials.password = password;
    yield user.save();
    res.json({ message: 'Password updated successfully' });
});
exports.updatePassword = updatePassword;
const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { employeeId, status } = req.body;
    const user = req.user;
    if (user === undefined)
        throw new errors_1.Unauthorized();
    if (user.employeeId === employeeId)
        throw new errors_1.Forbidden();
    const { modifiedCount } = yield user_model_1.default.updateOne({ employeeId }, { $set: { status } }).exec();
    if (modifiedCount === 0)
        throw new errors_1.NotFound('Employee not found');
    res.json({ message: 'Status updated successfully' });
});
exports.updateStatus = updateStatus;
