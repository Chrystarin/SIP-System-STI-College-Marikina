"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStatus = exports.UserRoles = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = require("bcrypt");
const userSchema = new mongoose_1.Schema({
    employeeId: {
        type: String,
        unique: true,
        required: [true, 'Employee ID is required'],
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        enum: {
            values: ['admin', 'moderator', 'teacher'],
            message: '{VALUE} is not supported role',
        },
    },
    name: {
        type: {
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
        required: [true, 'Name is required'],
    },
    credentials: {
        type: {
            email: {
                type: String,
                required: [true, 'Email is required'],
                match: /^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/,
                unique: true,
            },
            password: {
                type: String,
                required: [true, 'Password is required'],
                set: (value) => (0, bcrypt_1.hashSync)(value, 10),
            },
        },
        required: [true, 'Credentials are required'],
    },
    status: {
        type: String,
        default: 'active',
        enum: {
            values: ['active', 'inactive'],
            message: '{VALUE} is not supported status',
        },
    },
}, { timestamps: true });
var UserRoles;
(function (UserRoles) {
    UserRoles["Admin"] = "admin";
    UserRoles["Moderator"] = "moderator";
    UserRoles["Teacher"] = "teacher";
})(UserRoles || (exports.UserRoles = UserRoles = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus["Active"] = "active";
    UserStatus["Inactive"] = "inactive";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
exports.default = (0, mongoose_1.model)('User', userSchema);
