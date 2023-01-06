// require('dotenv').config();

// const Server = require('./src/models/server');


// const server = new Server();


// server.listen();





// var express = require('express');
// var app = express();
// var expressWs = require('express-ws')(app);
// const path = require('path');
// const cors = require('cors');

// app.use( cors() );
// app.use(express.static('public'))

// app.use(function (req, res, next) {
//     console.log('middleware');
//     req.testing = 'testing';
//     return next();
// });

// app.get('/', function (req, res, next) {
//     console.log('get route', req.testing);
//     res.sendFile('index.html', { root: path.join(__dirname, 'public') });
//     res.end();
// });

// app.ws('/', function (ws, req) {
//     ws.on('message', function (msg) {
//         console.log(msg);
//     });
//     console.log('socket', req.testing);
// });

// const port = process.env.PORT || 3000;

// app.listen(process.env.PORT || 3000, () => {
//     console.log('Servidor corriendo en puerto', port);
// });


//--------------------------------------------------------------

// const express = require('express');
// const app = express();
// const path = require('path');

// // app.use(express.static('public'))

// // app.get('/', (req, res) => {
// //     res.sendFile('index.html', {root: path.join(__dirname, 'public')});
// // })

// app.listen(process.env.PORT || 3000);

// module.exports = app;

//----------------------------------------------------


const express = require('express')
const enableWs = require('express-ws')

const app = express()
enableWs(app)

app.ws('/echo', (ws, req) => {
    ws.on('message', msg => {
        // ws.send(msg);
        console.log(msg);
    })

    // ws.on('close', () => {
    //     console.log('WebSocket was closed')
    // })
})

const port = process.env.PORT || 3000;

app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor corriendo en puerto', port);
});
