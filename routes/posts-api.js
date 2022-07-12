"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const shared_1 = require("../shared");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = require('express').Router();
router.get(`${shared_1.apiUrlRoot}/timeline`, function (req, res) {
    // "Do not use pool.query if you need transactional integrity"
    // is it important?
    shared_1.pool
        .query(`SELECT posts.*, users.username
            FROM posts
            JOIN users
            ON author_id=user_id
            ORDER BY created_on DESC;`)
        .then(function (response) {
        res.status(200).send(response.rows);
    })
        .catch(err => console.error('Error executing query', err.stack));
});
router.post(`${shared_1.apiUrlRoot}/newpost`, function (req, res) {
    var content = req.body.content;
    if (!content) {
        console.log(`Received invalid request to ${shared_1.apiUrlRoot}/newpost:`);
        console.log(req);
        res.status(400).send('no');
        return;
    }
    shared_1.pool
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
        .then(function (response) {
        res.status(200).send('ok');
    })
        .catch(err => console.error('Error executing query', err.stack));
});
router.get(`dsfsfdf`, function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
router.post(`${shared_1.apiUrlRoot}/get_token`, function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    shared_1.pool
        .query(`SELECT hashed_passwd
            FROM users
            WHERE username='${username}';`)
        .then(function (response) {
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
