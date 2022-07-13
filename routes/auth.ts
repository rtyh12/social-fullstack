import { Request, Response } from 'express';
import { pool } from "../shared";
const bcrypt = require('bcrypt');
const saltRounds = 10;

const router = require('express').Router();

router.post(`/get_token`, function (req: Request, res: Response): void {
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

router.get(`/hi`, function (req: Request, res: Response): void {
    res.status(200).send('auth');
});

module.exports = router;