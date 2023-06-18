"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sip_controller_1 = require("./sip.controller");
const authorize_1 = require("../../middlewares/authorize");
const asyncHandler_1 = __importDefault(require("../../middlewares/asyncHandler"));
const router = (0, express_1.Router)();
router.get('/', (0, asyncHandler_1.default)(sip_controller_1.getSIPs));
router.post('/', (0, asyncHandler_1.default)(sip_controller_1.addCase));
router.patch('/', authorize_1.onlyModerator, (0, asyncHandler_1.default)(sip_controller_1.updateStatus));
exports.default = router;
