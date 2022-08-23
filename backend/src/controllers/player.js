const db = require('../models')
const { Op } = require("sequelize");

exports.initPlayer = async (data) => {
    const playerInfo = data
    const player = await db.player_state.findOne({where: {userId: playerInfo.id}})
    if(!player) {
        console.log('player not found init one')
        let pos = '{"x": 0, "y": 0, "z": 0}'
        const player = await db.player_state.create({
            id: playerInfo.id,
            pos,
            username: playerInfo.username,
            userId: playerInfo.id,
            model: playerInfo.model,
            connected: 1,
            peerId: playerInfo.peerId,
        })
        return {
            "id": player.userId,
            "username": player.username,
            "model": player.model,
            "position": JSON.parse(player.pos),
            "peerId": player.peerId,
        }
    } else {
        player.connected = 1
        player.save()
        return {
            "id": player.userId,
            "username": player.username,
            "model": playerInfo.model,
            "position": JSON.parse(player.pos),
            "peerId": player.peerId,
        }
    }
}


exports.getConnectedPlayers = async (id) => {
    const allPlayer = await db.player_state.findAll({
        where: { connected: 1, userId: {[Op.not]: id} },
        attributes: ['id', 'username', 'model', 'pos', 'peerId'],
    })
    return allPlayer;
}

exports.disconnectPlayer = async (id) => {
    const player = await db.player_state.findOne({where: {userId: id}})
    player.connected = 0
    player.save()
    return id;
}

