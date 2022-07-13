import { Request, Response } from 'express';
import { pool } from "../shared";
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

const router = require('express').Router();

router.post(`/get_token`, (req: Request, res: Response): void => {
    pool
        // Get hash of the user's password from the database
        .query(
            `SELECT hashed_passwd
            FROM users
            WHERE username='${req.body.username}';`
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
                    // Send an access token
                    // Normally, you would use access and refresh tokens.
                    // For simplicity, I am only using access tokens for now (less secure)
                    var token = jwt.sign(
                        { user: req.body.username },
                        'private-key',
                        { expiresIn: '30s' }
                    );
                    console.log(token);
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

router.get(`/hi`, function (req: Request, res: Response): void {
    res.status(200).send('auth');
});

module.exports = router;