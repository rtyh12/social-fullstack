import express from 'express';
import bodyParser = require('body-parser')
require('dotenv').config();

const app = express();
// for the POST requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/public'));
const port = process.env.PORT || 3000;

// const 
var router = require('./routes/posts-api')
app.use(router);
// routes.use('')

app.listen(port, () => {
    console.log(`running on port ${port}`);
});