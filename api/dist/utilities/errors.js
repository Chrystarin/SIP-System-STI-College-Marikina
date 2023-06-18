"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnprocessableEntity = exports.Unauthorized = exports.NotFound = exports.Forbidden = exports.Conflict = void 0;
class Conflict extends Error {
    constructor(message = 'Duplicate resource found') {
        super(message);
        this.name = 'Duplicate';
        this.statusCode = 409;
    }
}
exports.Conflict = Conflict;
class Forbidden extends Error {
    constructor(message = 'Invalid action') {
        super(message);
        this.name = 'Forbidden';
        this.statusCode = 403;
    }
}
exports.Forbidden = Forbidden;
class NotFound extends Error {
    constructor(message = 'Resource not existing') {
        super(message);
        this.name = 'Not Found';
        this.statusCode = 404;
    }
}
exports.NotFound = NotFound;
class Unauthorized extends Error {
    constructor(message = 'Invalid credentials') {
        super(message);
        this.name = 'Unauthorized';
        this.statusCode = 401;
    }
}
exports.Unauthorized = Unauthorized;
class UnprocessableEntity extends Error {
    constructor(message = 'Invalid input data') {
        super(message);
        this.name = 'Unprocessable Entity';
        this.statusCode = 422;
    }
}
exports.UnprocessableEntity = UnprocessableEntity;
