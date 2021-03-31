"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConstants = exports.BLOCKCHAIN_REPOSITORY = exports.TOKEN_REPOSITORY = exports.USER_REPOSITORY = exports.PRODUCTION = exports.TEST = exports.DEVELOPMENT = exports.SEQUELIZE = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.SEQUELIZE = 'SEQUELIZE';
exports.DEVELOPMENT = 'development';
exports.TEST = 'test';
exports.PRODUCTION = 'production';
exports.USER_REPOSITORY = 'USER_REPOSITORY';
exports.TOKEN_REPOSITORY = 'TOKEN_REPOSITORY';
exports.BLOCKCHAIN_REPOSITORY = 'BLOCKCHAIN_REPOSITORY';
exports.jwtConstants = {
    secret: process.env.JWTKEY,
};
//# sourceMappingURL=index.js.map