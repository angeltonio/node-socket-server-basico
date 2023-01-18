'use strict';

const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
    .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('close', () => console.log('Client disconnected'));

    ws.on('message', function message(data) {
        // const msg = data.toString();

        // const msg = JSON.parse(data.toString());

        console.log('received: %s', data);

        wss.clients.forEach(client => {
            client.send(data.toString());
        })
        // console.log(msg)
    });
});


// let on_off = true;

// setInterval(() => {
//     wss.clients.forEach((client) => {
//         // client.send(new Date().toTimeString());

//         on_off = !on_off;

//         const data = {
//             on_off: on_off,
//             power: true,
//             temp: true,
//             timer: true,
//             mas: true,
//             menos: true
//         };

//         client.send(JSON.stringify(data));
//     });

// }, 1000);