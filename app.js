require('dotenv').config();

const Server = require('./src/models/server');


const server = new Server();


server.listen();


// const express = require('express');
// const app = express();
// const path = require('path');

// app.use(express.static('public'))

// app.get('/', (req, res) => {
//     res.sendFile('index.html', {root: path.join(__dirname, 'public')});
// })

// app.listen(process.env.PORT || 3000);

// module.exports = app;

