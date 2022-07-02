import express, { Request, Response } from 'express';
var bodyParser = require('body-parser')

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`running on port ${port}`);
});

// app.get('/timeline', function getPosts(req: Request, res: Response): void {
//     const posts = [
//         { id: 0, author: "Me", content: "Hello this is a post" },
//         { id: 0, author: "Obama", content: "Hello this is also a post" },
//     ]

//     res.status(200).json(posts);
// });

app.get('/timeline', function (req: Request, res: Response): void {
    pool
        .query('SELECT * FROM posts;')
        .then(function (response): void {
            res.status(200).send(response.rows);
        })
        .catch(err => console.error('Error executing query', err.stack));
});

app.post('/newpost', function (req: Request, res: Response): void {
    var author: string = req.body.author;
    var content: string = req.body.content;
    
    if (!author || !content) {
        console.log('Received invalid request to /newpost');
        res.status(400).send('no');
        return;
    }

    console.log();
    
    
    pool
        .query(`INSERT INTO posts (author, content) values ('${author}', '${content}');`)
        .then(function (response): void {
            console.log('Ran query: --');
            console.log(`INSERT INTO posts (author, content) values ('${author}', '${content}');`);
            res.status(200).send('ok');
        })
        .catch(err => console.error('Error executing query', err.stack));
});

app.post('/', function (req: Request, res: Response): void {
    console.log('POST');
    res.send('POST request to homepage')
})
