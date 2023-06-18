"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
const validators_1 = require("envalid/dist/validators");
exports.default = (0, envalid_1.cleanEnv)(process.env, {
    PORT: (0, validators_1.port)({ default: 3000 }),
    MONGO_URI: (0, validators_1.str)(),
    JWT_ACCESS: (0, validators_1.str)(),
    JWT_REFRESH: (0, validators_1.str)(),
    CORS_ORIGIN: (0, validators_1.str)()
});
