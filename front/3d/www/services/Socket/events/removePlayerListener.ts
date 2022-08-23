import { Socket } from "socket.io-client";
import { MainScene } from "../../../scripts/main";

export const removePlayerFromScene = async ({ scene, id }: { scene: MainScene, id: string }) => {
    const playerToRemove = scene.otherPlayers.filter((player) => player.id == id)[0];
    console.log("PLAYER TO REMOVE : " + playerToRemove);
    if (playerToRemove != undefined) {
        playerToRemove.dispose();
    }
    scene.otherPlayers = scene.otherPlayers.filter((player) => player.id != id);
    console.info('Remove other Player')
}

export const playerDisconnect = (io: Socket, scene: MainScene) => {
    io.on("playerDisconnected", (id) => {
        removePlayerFromScene({ scene, id })
    });
}