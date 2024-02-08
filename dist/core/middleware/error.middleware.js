"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
function errorMiddleware(error, request, response, next) {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    response.status(status).send({
        message,
        status,
    });
}
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map