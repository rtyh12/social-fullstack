import express, { Request, Response, NextFunction } from 'express';
import { getHeapCodeStatistics } from 'v8';

const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//     if (err) throw err;
//     for (let row of res.rows) {
//         console.log(JSON.stringify(row));
//     }
//     client.end();
// });


const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`running on port ${port}`);
});

function getPosts(request: Request, response: Response): void {
    const posts = [
        { id: 0, author: "Me", content: "Hello this is a post" },
        { id: 0, author: "Obama", content: "Hello this is also a post" },
    ]

    response.status(200).json(posts);
}

function test(): void {
    console.log(process.env.DATABASE_URL)
    // console.log(pool.query('SELECT table_schema,table_name FROM information_schema.tables;'))
}

app.get('/timeline', getPosts);
app.get('/test', test);
