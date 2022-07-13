import { Request, Response } from 'express';
import path = require('path');
import { apiUrlRoot, pool } from "../shared";
const bcrypt = require('bcrypt');
const saltRounds = 10;

const router = require('express').Router();

router.get(`/hi`, function (req: Request, res: Response): void {
    res.status(200).send('auth');
});

module.exports = router;