import { MainScene } from "../main";
import Player from "../models/players/player";

export default class Utils {
    static getPlayerFromId(scene: MainScene, id: string): Player {
        return scene.otherPlayers.filter((player) => player.id == id)[0];
    }
}