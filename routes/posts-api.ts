import { Request, Response } from 'express';
import path = require('path');
import { pool } from "../shared";
import { isAuthorized } from '../is_authorized';
const bcrypt = require('bcrypt');
const saltRounds = 10;

const router = require('express').Router();

router.get(`/timeline`, function (req: Request, res: Response): void {
    if (!isAuthorized(req.cookies['access-token'], 'timeline')) {
        res.status(401).send();
        return;
    }
    
    console.log(req.cookies);
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

    if (!isAuthorized(req.cookies['access-token'])) {
        res.status(401).send();
        return;
    }

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
            res.status(200).send();
        })
        .catch(err => console.error('Error executing query', err.stack));
});

module.exports = router;