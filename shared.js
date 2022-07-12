"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiUrlRoot = exports.pool = void 0;
const { Pool } = require('pg');
exports.pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
exports.pool.connect();
exports.apiUrlRoot = "/api";
