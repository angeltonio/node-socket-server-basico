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