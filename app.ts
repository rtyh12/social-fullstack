import express, { Request, Response } from 'express';
import path = require('path');
import bodyParser = require('body-parser')
const { Pool } = require('pg');
require('dotenv').config();

// passwords
const bcrypt = require('bcrypt');
const saltRounds = 10;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

let hashed;
bcrypt.hash('hunter2', saltRounds, function(err, hash) {
    hashed = hash;
    bcrypt.compare('hunter2', hashed, function(err, result) {
        console.log(result);
    });
    console.log(hash);
});

pool.connect();

const app = express();
// for the POST requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/public'));
const port = process.env.PORT || 3000;
const apiUrlRoot = "/api";

app.listen(port, () => {
    console.log(`running on port ${port}`);
});

app.get(`${apiUrlRoot}/timeline`, function (req: Request, res: Response): void {
    // "Do not use pool.query if you need transactional integrity"
    // is it important?
    pool
        .query(`SELECT posts.*, users.username
                FROM posts
                JOIN users
                ON author_id=user_id;`)
        .then(function (response): void {
            res.status(200).send(response.rows);
        })
        .catch(err => console.error('Error executing query', err.stack));
});

app.post(`${apiUrlRoot}/newpost`, function (req: Request, res: Response): void {
    var author: string = req.body.author;
    var content: string = req.body.content;

    if (!author || !content) {
        console.log('Received invalid request to /newpost');
        res.status(400).send('no');
        return;
    }

    pool
        .query(`INSERT INTO posts (
                    author_id,
                    content,
                    created_on,
                    last_edit
                ) values (
                    0,
                    '${content}',
                    NOW(),
                    NOW()
                );`)
        .then(function (response): void {
            res.status(200).send('ok');
        })
        .catch(err => console.error('Error executing query', err.stack));
});

app.get('/', function (req: Request, res: Response): void {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})
