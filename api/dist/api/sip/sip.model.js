"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const issuerSchema = new mongoose_1.Schema({
    issuer: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: [true, 'Issuer is required']
    },
    term: {
        type: String,
        required: [true, 'Term is required'],
        enum: {
            values: [
                'Senior High School - Quarter 1',
                'Senior High School - Quarter 2',
                'Senior High School - Quarter 3',
                'Senior High School - Quarter 4',
                'Tertiary - Semester 1 - Prelims',
                'Tertiary - Semester 1 - Midterms',
                'Tertiary - Semester 1 - Pre-Finals',
                'Tertiary - Semester 1 - Finals',
                'Tertiary - Semester 2 - Prelims',
                'Tertiary - Semester 2 - Midterms',
                'Tertiary - Semester 2 - Pre-Finals',
                'Tertiary - Semester 2 - Finals',
                'Tertiary - Summer'
            ],
            message: '{VALUE} is not supported term'
        }
    },
    issuedAt: {
        type: Date,
        required: [true, 'Issued at is required']
    }
});
const sipSchema = new mongoose_1.Schema({
    sipId: {
        type: String,
        required: [true, 'SIP ID is required'],
        unique: true
    },
    schoolYear: {
        type: mongoose_1.Types.ObjectId,
        ref: 'School Year',
        required: [true, 'School Year is required']
    },
    student: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Student',
        required: [true, 'Student is required']
    },
    cases: {
        ETA: { type: [issuerSchema], default: [] },
        DCP: { type: [issuerSchema], default: [] },
        UoaS: { type: [issuerSchema], default: [] },
        AEC: { type: [issuerSchema], default: [] },
        LD: { type: [issuerSchema], default: [] }
    },
    status: {
        type: String,
        default: 'pending',
        enum: {
            values: ['pending', 'resolved', 'no response'],
            message: '{VALUE} is not supported status'
        }
    },
    closed: {
        at: Date,
        by: {
            type: mongoose_1.Types.ObjectId,
            ref: 'User'
        }
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('SIP', sipSchema);
