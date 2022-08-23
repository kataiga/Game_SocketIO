const { initPlayer, getConnectedPlayers, disconnectPlayer } = require('../controllers/playerController')

module.exports = (io, socket) => {

    const users = [];

    const addUser = ({id, name, room}) => {
        name = name.trim().toLowerCase();
        room = [room.trim().toLowerCase()];


        const user = {id,name,room};

        users.push(user);
        
        return {user};

    }

    const removeUser = (id) => {
        const index = users.findIndex((user) => {
            user.id === id
        });

        if(index !== -1) {
            return users.splice(index,1)[0];
        }
    }

    const getUser = (id) => users.find((user) => user.id === id);


    socket.on('join', ({ name, room }, callback) => {

        const { error, user } = addUser(
            { id: socket.id, name, room });

        if (error) return callback(error);

        // Emit will send message to the user
        // who had joined
        socket.emit('message', { user: 'admin', text:
            `${user.name},
            welcome to room ${user.room}.` });

        // Broadcast will send message to everyone
        // in the room except the joined user
        socket.broadcast.to(user.room)
            .emit('message', { user: "admin",
            text: `${user.name}, has joined` });

        socket.join(user.room);

        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        });
        callback();
    })

    socket.on('sendMessage', (message, callback) => {

        const user = getUser(socket.id);
        io.to(user.room).emit('message',
            { user: user.name, text: message });

        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        });
        callback();
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('message',
            { user: 'admin', text:
            `${user.name} had left` });
        }
    })
}