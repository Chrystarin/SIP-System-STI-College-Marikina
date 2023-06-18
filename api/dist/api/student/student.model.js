"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const { String } = mongoose_1.Schema.Types;
const studentSchema = new mongoose_1.Schema({
    studentId: {
        type: String,
        required: [true, 'Student ID is required'],
        unique: true,
    },
    name: {
        first: {
            type: String,
            required: [true, 'First name is required'],
        },
        middle: String,
        last: {
            type: String,
            required: [true, 'Last name is required'],
        },
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Student', studentSchema);
