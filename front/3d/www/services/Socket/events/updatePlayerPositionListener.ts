import { Socket } from "socket.io-client";
import { MainScene } from "../../../scripts/main";
import Utils from "../../../scripts/utils/utils";

export const updatePlayerPosition = async ({ scene, position, id, direction }: { scene: MainScene, position: any, id: string, direction: any }) => {
    const playerToUpdate = Utils.getPlayerFromId(scene, id);
    if (playerToUpdate != undefined) {
        playerToUpdate.update({ position: position, direction: direction });
    }
}

export const playerMoveListener = (io: Socket, scene: MainScene) => {
    io.on("position", (infos) => {
        updatePlayerPosition({ scene: scene, position: infos.position, id: infos.id, direction: infos.direction })
    });
}