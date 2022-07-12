const { Pool } = require('pg');

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
pool.connect();

export const apiUrlRoot = "/api";