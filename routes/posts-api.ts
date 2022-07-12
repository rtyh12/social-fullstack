import { Request, Response } from 'express';
import path = require('path');
import { apiUrlRoot, pool } from "../shared";
const bcrypt = require('bcrypt');
const saltRounds = 10;

const router = require('express').Router();

router.get(`${apiUrlRoot}/timeline`, function (req: Request, res: Response): void {
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

router.post(`${apiUrlRoot}/newpost`, function (req: Request, res: Response): void {
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

router.get(`dsfsfdf`, function (req: Request, res: Response): void {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

router.post(`${apiUrlRoot}/get_token`, function (req: Request, res: Response): void {
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

module.exports = router;