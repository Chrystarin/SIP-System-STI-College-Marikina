"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlyModerator = exports.onlyAdmin = void 0;
const errors_1 = require("../utilities/errors");
const user_model_1 = require("../api/user/user.model");
const onlyAdmin = (req, _res, next) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === user_model_1.UserRoles.Admin)
        return next();
    next(new errors_1.Unauthorized('This action requires admin privileges'));
};
exports.onlyAdmin = onlyAdmin;
const onlyModerator = (req, _res, next) => {
    var _a;
    switch ((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) {
        case user_model_1.UserRoles.Admin:
        case user_model_1.UserRoles.Moderator:
            return next();
    }
    next(new errors_1.Unauthorized(`This action requires moderator privileges`));
};
exports.onlyModerator = onlyModerator;
