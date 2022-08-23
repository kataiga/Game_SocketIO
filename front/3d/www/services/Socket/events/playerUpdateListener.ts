import { Socket } from "socket.io-client";
import { MainScene } from "../../../scripts/main";
import Utils from "../../../scripts/utils/utils";

const updatePlayerAnimation = ({scene, animation, id}: {scene: MainScene, animation: string, id: string}) => {
    const playerToUpdate = Utils.getPlayerFromId(scene, id);
    if (playerToUpdate != undefined) {
        playerToUpdate.updateAnimation(animation);
    } else {
        console.error('Can\'t set player with id ' + id + ' animation. Player with id ' + id + ' is undefined')
    }
}

const updatePlayerModel = ({scene, model, id}: {scene: MainScene, model: string, id: string}) => {
    
}

export const playerUpdateListener = (io: Socket, scene: MainScene) => {
    io.on("playerUpdate", (infos) => {
        if (infos.type == "animation") {
            updatePlayerAnimation({scene: scene, animation: infos.animation, id: infos.id});
        }
        if (infos.type == "model") {
            updatePlayerModel({scene: scene, model: infos.model, id: infos.id});
        }
    })
}