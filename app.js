// require('dotenv').config();

// const Server = require('./src/models/server');


// const server = new Server();


// server.listen();





var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
const path = require('path');

app.use(express.static('public'))

app.use(function (req, res, next) {
    console.log('middleware');
    req.testing = 'testing';
    return next();
});

app.get('/', function (req, res, next) {
    console.log('get route', req.testing);
    res.sendFile('index.html', { root: path.join(__dirname, 'public') });
    res.end();
});

app.ws('/msg', function (ws, req) {
    ws.on('message', function (msg) {
        console.log(msg);
    });
    console.log('socket', req.testing);
});

app.listen(3000);


// const express = require('express');
// const app = express();
// const path = require('path');

// // app.use(express.static('public'))

// // app.get('/', (req, res) => {
// //     res.sendFile('index.html', {root: path.join(__dirname, 'public')});
// // })

// app.listen(process.env.PORT || 3000);

// module.exports = app;