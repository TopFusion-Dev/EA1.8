const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const cors = require('cors')

//use services
app.use(cors({
    origin: '*'
}));
app.use(express.text());
app.use(express.json());

const port = 9000
let ws = null;

app.use(function (req, res, next) {
    console.log('middleware');
    req.testing = 'testing';
    return next();
});

app.get('/', function (req, res, next) {
    console.log('get route server', req.testing);
    res.send("hello from server")
    // res.end();
});

// //webhook
app.post('/', async (req, res, next) => {
    console.log('received webhook0', req.body);
    let receivedData = await req.body
    receivedData.autoId = String(new Date())
    console.log('receivedData', receivedData)

    if (ws && receivedData?.autoId) ws.send(JSON.stringify(receivedData));
     res.send('ok')
});

app.ws('/', function (socket, req) {
    ws = socket
    console.log('[Server] get connected')
    socket.on('message', function (msg) {
        console.log('ws:// server message received', msg);
    });
    socket.send('Hello world!');
    // console.log('socket', req.testing);
    socket.on('close', function close() {
        // จะทำงานเมื่อปิด Connection ในตัวอย่างคือ ปิด Browser
        console.log('disconnected');
    });
});

app.listen(port);
