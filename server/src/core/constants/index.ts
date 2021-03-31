import * as dotenv from 'dotenv';
dotenv.config()
export const SEQUELIZE = 'SEQUELIZE';
export const DEVELOPMENT = 'development';
export const TEST = 'test';
export const PRODUCTION = 'production';
export const USER_REPOSITORY = 'USER_REPOSITORY';
export const TOKEN_REPOSITORY = 'TOKEN_REPOSITORY';
export const BLOCKCHAIN_REPOSITORY = 'BLOCKCHAIN_REPOSITORY';
export const jwtConstants = {
  secret: process.env.JWTKEY,
};