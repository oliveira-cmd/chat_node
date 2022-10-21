const express = require("express");
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
let messages = [];

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.send('index.html');
});

io.on('connection', socket =>{
    console.log(`socket conectado: ${socket.id}`);
    socket.emit('oldMessages', messages);

    socket.on('sendMessage', data =>{
        messages.push(data);
        socket.broadcast.emit('receivedMessage', data);
    });
});
server.listen(5909);