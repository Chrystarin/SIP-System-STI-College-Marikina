"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schoolYearSchema = new mongoose_1.Schema({
    start: {
        type: Number,
        unique: true,
        required: [true, 'Start date is required'],
    },
    end: {
        type: Number,
        index: { unique: true, sparse: true },
    },
    admin: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: [true, 'Admin is required'],
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('School Year', schoolYearSchema);
