"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_controller_1 = require("./student.controller");
const asyncHandler_1 = __importDefault(require("../../middlewares/asyncHandler"));
const router = (0, express_1.Router)();
router.get('/', (0, asyncHandler_1.default)(student_controller_1.getStudents));
router.post('/', (0, asyncHandler_1.default)(student_controller_1.addStudent));
exports.default = router;
