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
                ON author_id=user_id
                ORDER BY created_on DESC;`)
        .then(function (response): void {
            res.status(200).send(response.rows);
        })
        .catch(err => console.error('Error executing query', err.stack));
});

app.post(`${apiUrlRoot}/newpost`, function (req: Request, res: Response): void {
    var content: string = req.body.content;

    if (!content) {
        console.log(`Received invalid request to ${apiUrlRoot}/newpost:`);
        console.log(req);
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
});

app.post(`${apiUrlRoot}/get_token`, function (req: Request, res: Response): void {
    var username: String = req.body.username;
    var password: String = req.body.password;

    pool
        .query(
            `SELECT hashed_passwd
             FROM users
             WHERE username='${username}';`
        )
        .then(function (response): void {
            if (response.rows.length == 0) {
                res.status(401).send({
                    correct: false
                });
                return;
            }
            let hash = response.rows[0]['hashed_passwd'];
            console.log(response.rows[0]);

            bcrypt.compare(password, hash, function (err, result) {
                if (result) {
                    res.status(200).send({
                        correct: true
                    });
                }
                else {
                    res.status(401).send({
                        correct: false
                    });
                }
            });
        })
        .catch(err => console.error('Error executing query', err.stack));
});