const express = require('express')
const path = require('path')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 3000
const messages = [];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('joined', messages);

  socket.on('message', (message) => {
    messages.push(message);
    console.log('Message received: ', message);
    socket.broadcast.emit('message', message);
  })

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  })
})

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})