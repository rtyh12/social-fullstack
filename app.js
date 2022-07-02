"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { Client } = require('pg');
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
client.connect();
client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
    if (err)
        throw err;
    for (let row of res.rows) {
        console.log(JSON.stringify(row));
    }
    client.end();
});
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`running on port ${port}`);
});
function getPosts(request, response) {
    const posts = [
        { id: 0, author: "Me", content: "Hello this is a post" },
        { id: 0, author: "Obama", content: "Hello this is also a post" },
    ];
    response.status(200).json(posts);
}
app.get('/timeline', getPosts);
