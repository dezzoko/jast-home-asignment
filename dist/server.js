"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_env_1 = require("./utils/config/validate-env");
(0, validate_env_1.validateEnv)();
const app = (0, express_1.default)();
app.get('/', (request, response) => {
    response.send('Hello world!');
});
console.log('App is Start');
app.listen(5000);
//# sourceMappingURL=server.js.map