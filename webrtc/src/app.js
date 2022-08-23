require('dotenv').config()

const fs = require('fs');
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3030


const https = require('https');
const server = https.createServer({key: fs.readFileSync('./privkey.pem'), cert: fs.readFileSync('./fullchain.pem')}, app);
const { Server } = require("socket.io");
const { fstat } = require('fs')
const io = new Server(server, {cors: {origin: '*'}});

//controller
const { createPlayer } = require('./controllers/socketio')



app.use(cors( 
  { origin: '*' }
));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var connectedPlayers = [];
let idCounter = 0;

io.on('connection', (socket) => {
  console.log('a user connected')
  
  const userInfo = createPlayer(socket.handshake.query.jwt, socket.handshake.query.username, socket.handshake.query.model, socket.handshake.query.peerId);
  console.log("Connected user peer id : " + userInfo.peerId)

  socket.emit('connected',{userInfo, connectedPlayers})
  connectedPlayers.push(userInfo)
  socket.broadcast.emit('newPlayer', userInfo)



  socket.on('position', (data) => {
    
    socket.broadcast.emit('position', data)
  })

  socket.on('playerUpdate', (data) => { 
    console.log(data)
    socket.broadcast.emit('playerUpdate', data)
  })

  
  socket.on('disconnect', () => {
    io.emit('playerDisconnected', socket.handshake.query.jwt)
    connectedPlayers = connectedPlayers.filter(data => data.id != socket.handshake.query.jwt)
  })
  

});


server.listen(PORT,() => {
              console.log(`Server is running on port ${PORT}`)
          })


module.exports = app