import { Request, response, Response } from 'express';
import { isAuthorized, userIdFromToken } from '../is_authorized';
import { pool } from "../shared";
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

const router = require('express').Router();

const generateToken = (username: string, user_id: Number) => {
    // Generate an access token
    // Normally, you would use access and refresh tokens.
    // For simplicity, I am only using access tokens for now (less secure)
    return jwt.sign(
        {
            username: username,
            user_id: user_id,
        },
        'private-key',
        { expiresIn: '5min' }
    );
}

router.post(`/get_token`, (req: Request, res: Response): void => {
    pool
        // Get hash of the user's password from the database
        .query(
            `SELECT hashed_passwd, user_id
            FROM users
            WHERE username=$1`,
            [req.body.username]
        )
        .then((response): void => {
            // If no user with this name exists
            if (response.rows.length == 0) {
                res.status(401).send({ correct: false });
                return;
            }

            // User exists, check password against hash
            let hash = response.rows[0]['hashed_passwd'];
            bcrypt.compare(req.body.password, hash, function (err, matches_hash) {
                if (matches_hash) {
                    let token = generateToken(req.body.username, response.rows[0]['user_id']);
                    res.cookie('access-token', token, { httpOnly: true });
                    res.status(200).send();
                }
                else {
                    res.status(401).send({ correct: false });
                }
            });
        })
        .catch(err => console.error('Error executing query', err.stack));
});

router.post(`/create_account`, (req: Request, res: Response): void => {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash: string) {
        pool
            // Attempt to insert new account into database
            .query(
                `INSERT INTO users(username, hashed_passwd, created_on, last_login)
                 VALUES($1, $2, NOW(), NOW())
                 RETURNING *`,
                [req.body.username, hash]
            )
            .then((response): void => {
                console.log(response);
                let user_id = response.rows[0].user_id;
                let token = generateToken(req.body.username, user_id);
                res.cookie('access-token', token, { httpOnly: true });
                res.status(201).send();
            })
            .catch(err => {
                console.error("Could not create account");
                console.error(err);
                res.status(409).send();
            });
    });
});

router.get(`/check_token_valid`, function (req: Request, res: Response): void {
    isAuthorized(req.cookies['access-token']) ? res.status(200) : res.status(401);
    res.send();
});

module.exports = router;