const {
  initPlayer,
  getConnectedPlayers,
  disconnectPlayer,
} = require("../controllers/player");

playersPos = [];
var connectedPlayers = [];


const createPlayer = (id, username, model, peerId) => {
  return {
    id: id,
    username: username,
    model: model,
    position: { x: 0, y: 1, z: 0 },
    peerId: peerId,
  };
};

module.exports = async (io, socket) => {
  var updatePos = true;
  var updateAni = true;

  // pos = {
  //     "id": "1",
  //     "position": { "x": 0, "y": 0, "z": 0 },
  //     "direction": { "x": 0, "y": 0, "z": 0 }
  // }


    const userInfo = createPlayer(socket.handshake.query.peerId, socket.handshake.query.username, socket.handshake.query.model, socket.handshake.query.peerId);

  socket.emit('connected',{userInfo, connectedPlayers})
  connectedPlayers.push(userInfo)
  socket.broadcast.emit('newPlayer', userInfo)



  socket.on('position', (data) => {
    
    socket.broadcast.emit('position', data)
  })

  socket.on('playerUpdate', (data) => { 
    socket.broadcast.emit('playerUpdate', data)
  })

  
  socket.on('disconnect', () => {
    io.emit('playerDisconnected', socket.handshake.query.peerId)
    connectedPlayers = connectedPlayers.filter(data => data.id != socket.handshake.query.peerId)
  })
  
};
