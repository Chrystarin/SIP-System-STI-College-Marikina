"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("./user.controller");
const authorize_1 = require("../../middlewares/authorize");
const express_1 = require("express");
const asyncHandler_1 = __importDefault(require("../../middlewares/asyncHandler"));
const router = (0, express_1.Router)();
router.get('/', (0, asyncHandler_1.default)(user_controller_1.getUsers));
router.patch('/updatePassword', (0, asyncHandler_1.default)(user_controller_1.updatePassword));
router.patch('/updateStatus', authorize_1.onlyAdmin, (0, asyncHandler_1.default)(user_controller_1.updateStatus));
router.patch('/reset', authorize_1.onlyAdmin, (0, asyncHandler_1.default)(user_controller_1.resetPassword));
exports.default = router;
