"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schoolYear_controller_1 = require("./schoolYear.controller");
const authorize_1 = require("../../middlewares/authorize");
const asyncHandler_1 = __importDefault(require("../../middlewares/asyncHandler"));
const router = (0, express_1.Router)();
router.get('/', (0, asyncHandler_1.default)(schoolYear_controller_1.getSchoolYears));
router.post('/', authorize_1.onlyAdmin, (0, asyncHandler_1.default)(schoolYear_controller_1.startSchoolYear));
router.patch('/', authorize_1.onlyAdmin, (0, asyncHandler_1.default)(schoolYear_controller_1.endSchoolYear));
exports.default = router;
