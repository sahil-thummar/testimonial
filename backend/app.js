const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');
const multer = require('multer');

require('dotenv').config()

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(multer({ dest: __dirname + '/uploads/' }).any());
app.use(express.static(path.join(__dirname, 'uploads')));

require('./app/routes')(app)

module.exports = app;