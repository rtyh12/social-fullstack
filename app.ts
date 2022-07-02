import express, { Request, Response } from 'express';

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect();

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`running on port ${port}`);
});

app.get('/timeline', function getPosts(req: Request, res: Response): void {
    const posts = [
        { id: 0, author: "Me", content: "Hello this is a post" },
        { id: 0, author: "Obama", content: "Hello this is also a post" },
    ]

    res.status(200).json(posts);
});

app.get('/test', function (req: Request, res: Response): void {
    var r = pool
        .query('SELECT author FROM posts;')
        .then(res => console.log(res.rows))
        .catch(err => console.error('Error executing query', err.stack));

    res.status(200).send('this text is useless. ignore pls');
});

app.post('/', function (req, res) {
    console.log('POST');
    res.send('POST request to homepage')
})
