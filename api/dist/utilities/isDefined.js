"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isDefined(data, error) {
    if (data === null || data === undefined)
        throw error;
}
exports.default = isDefined;
