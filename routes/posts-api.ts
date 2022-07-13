import { Request, Response } from 'express';
import path = require('path');
import { pool } from "../shared";
const bcrypt = require('bcrypt');
const saltRounds = 10;

const router = require('express').Router();

router.get(`/hi`, function (req: Request, res: Response): void {
    res.status(200).send('posts');
});

router.get(`/timeline`, function (req: Request, res: Response): void {
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

router.post(`/newpost`, function (req: Request, res: Response): void {
    var content: string = req.body.content;

    if (!content) {
        console.log(`Received invalid request to $/newpost:`);
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

module.exports = router;