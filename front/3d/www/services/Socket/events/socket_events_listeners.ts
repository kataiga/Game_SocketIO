// import { THREE } from "enable3d"
// import { Socket } from "socket.io-client";
// import { MainScene } from "../../../scripts/main";
// import Player from "../../../scripts/models/players/player";
// import Utils from "../../../scripts/utils/utils";

// export const addNewPlayerToScene = async ({scene, userInfo}: {scene: MainScene, userInfo: any}) => {
//     if (scene.otherPlayers.filter((player) => player.id == userInfo.id).length > 0) {
//         return;
//     }
//     const object = (await scene.load.gltf(userInfo.model));
//     const playerModel = object.scene;
//     playerModel.traverse((child: any) => {
//         if(child.isMesh) {
//             child.material.metalness = 0;
//         }
//     });
//     console.info('NEW PLAYER ID : ', userInfo.id);
//     playerModel.position.set(userInfo.position.x, userInfo.position.y, userInfo.position.z);
//     const animations = object.animations;
//     console.info('NEW PLAYER ANIMATIONS : ', animations)
//     const newPlayerClass = new Player({model: playerModel, firstPosition: userInfo.position, id: userInfo.id, scene: scene, username: userInfo.username, animations: animations});
//     scene.otherPlayers.push(newPlayerClass);
//     console.info('Added new Player');
//     console.info('GET PLAYER UTILS : ', Utils.getPlayerFromId(scene, userInfo.id));
// }

// export const removePlayerFromScene = async ({scene, id}: {scene: MainScene, id: number}) => {
//     const playerToRemove = scene.otherPlayers.filter((player) => player.id == id)[0];
//     if (playerToRemove != undefined) {
//         playerToRemove.dispose();
//     }
//     scene.otherPlayers = scene.otherPlayers.filter((player) => player.id != id);
//     console.info('Remove other Player')
// }

// export const updatePlayerPosition = async ({scene, position, id, direction}: {scene: MainScene, position: any, id: number, direction: THREE.Vector3}) => {
//     const playerToUpdate = Utils.getPlayerFromId(scene, id);
//     // console.info("INCOMING POSITION : , ", position, direction);
//     if (playerToUpdate != undefined) {
//         playerToUpdate.update({position: position, direction: direction});
//     }
// }

// export const newPlayerListener = (io: Socket, scene: MainScene) => {
//     io.on("newPlayer", (userInfo) => {
//         // console.info("INCOMING PLAYER")
//         addNewPlayerToScene({scene: scene, userInfo: userInfo});
//     });
// }

// export const playerDisconnect = (io: Socket, scene: MainScene) => {
//     io.on("playerDisconnected", (id) => {
//         removePlayerFromScene({scene, id})
//     });
// }

// export const playerMoveListener = (io: Socket, scene: MainScene) => {
//     io.on("position", (infos) => {
//         updatePlayerPosition({scene: scene, position: infos.position, id: infos.id, direction: infos.direction})
//     });
// }