"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const jsonwebtoken_1 = require("jsonwebtoken");
const errorHandler = (err, _req, res, _next) => {
    let { name = 'Internal server error', message = 'Something went wrong', statusCode = 500 } = err;
    console.log("🚀 ~ file: errorHandler.ts:11 ~ err:", err);
    if (err.code && err.code === 11000) {
        const [property, value] = (Object.entries(err.keyValue)[0]);
        name = 'DuplicateError';
        message = `A ${property} of ${value} already exists`;
        statusCode = 409;
    }
    if (err instanceof mongoose_1.Error.ValidationError)
        message = Object.values(err.errors).map(({ path, message }) => ({
            path,
            message
        }));
    if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
        name = 'Token is malformed';
        statusCode = 401;
    }
    if (err instanceof jsonwebtoken_1.TokenExpiredError) {
        name = 'Token is expired';
        statusCode = 401;
    }
    res.status(statusCode).json({ name, message });
};
exports.default = errorHandler;
