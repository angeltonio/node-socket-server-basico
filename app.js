'use strict';

// const express = require('express');
// const { Server, WebSocket } = require('ws');

// const PORT = process.env.PORT || 3000;
// const INDEX = '/index.html';

// const server = express()
//     .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
//     .listen(PORT, () => console.log(`Listening on ${PORT}`));

// const wss = new Server({ server });

// wss.on('connection', (ws, req) => {
//     // ws.id = wss.getUniqueID();
//     const ip = req.socket.remoteAddress;
//     console.log('Client connected with ip: ', ip);

//     let clientsQuantity = 0;
//     wss.clients.forEach(client => {
//         if (client.OPEN === 1) {
//             clientsQuantity++;
//         }
//         // console.log('Client.ID: ' + client.id)
//     });
//     console.log('Cantidad de clientes: ', clientsQuantity);

//     ws.on('close', () => {
//         clientsQuantity = 0;
//         console.log('Client disconnected:', ip)
//     });

//     ws.on('message', function message(data, isBinary) {
//         console.log('received: %s', data);
//         wss.clients.forEach(function each(client) {
//             if (client.readyState === WebSocket.OPEN) {
//                 client.send(data, { binary: isBinary });
//             }
//         });
//     });
// });


const { WebSocketServer } = require('ws');

function heartbeat() {
    this.isAlive = true;
}

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws, req) {
    const ip = req.socket.remoteAddress;
    console.log('Client connected with ip: ', ip);
    ws.isAlive = true;
    ws.on('pong', heartbeat);


    ws.on('close', function close() {
        // clearInterval(interval);
        console.log('Client disconnected:', ip);
    });

    ws.on('message', function message(data) {
        // const msg = data.toString();

        // const msg = JSON.parse(data.toString());

        console.log('received: %s', data);

        wss.clients.forEach(client => {
            client.send(data.toString());
        })

    });
});


const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
        if (ws.isAlive === false) {
            console.log('se desconecto: ');
            return ws.terminate();
        }

        ws.isAlive = false;
        ws.ping();
    });
}, 2000);



    // ws.on('message', function message(data) {
    //     // const msg = data.toString();

    //     // const msg = JSON.parse(data.toString());

    //     // console.log('received: %s', data);

    //     // wss.clients.forEach(client => {
    //     //     client.send(data.toString());
    //     // })


    //     wss.clients.forEach(function each(client) {
    //         if (client.readyState === WebSocket.OPEN) {
    //             client.send(data, { binary: isBinary });
    //         }
    //     });
    // });

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