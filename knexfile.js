"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    development: {
        client: 'postgresql',
        connection: {
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432'),
            database: process.env.DB_NAME || 'taskdb',
            user: process.env.DB_USER || 'user',
            password: process.env.DB_PASSWORD || 'password',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: './src/database/migrations',
            extension: 'ts',
        },
        seeds: {
            directory: './src/database/seeds',
            extension: 'ts',
        },
    },
    production: {
        client: 'postgresql',
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: './dist/database/migrations',
            extension: 'js',
        },
        seeds: {
            directory: './dist/database/seeds',
            extension: 'js',
        },
    },
    test: {
        client: 'postgresql',
        connection: {
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432'),
            database: process.env.DB_NAME ? `${process.env.DB_NAME}_test` : 'taskdb_test',
            user: process.env.DB_USER || 'user',
            password: process.env.DB_PASSWORD || 'password',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: './src/database/migrations',
            extension: 'ts',
        },
        seeds: {
            directory: './src/database/seeds',
            extension: 'ts',
        },
    },
};
exports.default = config;
//# sourceMappingURL=knexfile.js.map