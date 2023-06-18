"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authorize_1 = require("../../middlewares/authorize");
const auth_controller_1 = require("./auth.controller");
const express_1 = require("express");
const asyncHandler_1 = __importDefault(require("../../middlewares/asyncHandler"));
const authenticate_1 = __importDefault(require("../../middlewares/authenticate"));
const router = (0, express_1.Router)();
router.post('/login', (0, asyncHandler_1.default)(auth_controller_1.login));
router.use(authenticate_1.default);
router.post('/register', authorize_1.onlyAdmin, (0, asyncHandler_1.default)(auth_controller_1.register));
router.post('/logout', (0, asyncHandler_1.default)(auth_controller_1.logout));
exports.default = router;
