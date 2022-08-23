import { Socket } from "socket.io-client";
import { WamInitSecond } from "../../scripts/lifecycles/init/init";
import { MainScene } from "../../scripts/main";
import { userInfo } from "../../scripts/playerInfos/playerInfos";
import {
  SocketServiceConstructor,
  SocketServiceInterface,
} from "./socket_service_contract";
import { playerUpdateListener } from "./events/playerUpdateListener";
import {
  addNewPlayerToScene,
  connectAudioToNewUser,
} from "./events/addNewPlayerListener";
import { newPlayerListener } from "./events/addNewPlayerListener";
import { playerDisconnect } from "./events/removePlayerListener";
import { playerMoveListener } from "./events/updatePlayerPositionListener";
import { Peer } from "peerjs";

export default class SocketService implements SocketServiceInterface {
  io: Socket;
  scene: MainScene;
  peer: Peer;
  localStream: MediaStream;

  constructor(config: SocketServiceConstructor) {
    this.io = config.io;
    this.scene = config.scene;
    this.peer = config.peer;
    this.localStream = config.audioStream;
    this.startReceivingPlayersData(config.scene, config.isTouchDevice);
  }

  connect(): Map<String, any> {
    throw new Error("Method not implemented.");
  }
  async startReceivingPlayersData(
    scene: MainScene,
    isTouchDevice: boolean
  ): Promise<void> {
    console.info("Started receiving user Infos");

    this.io.on("connected", async (receivedUserInfo) => {
      try {
        console.info("Received connection informations");
        const newInfo = receivedUserInfo.userInfo;
        userInfo.model = newInfo.model;
        userInfo.firstPosition = newInfo.position;
        userInfo.username = newInfo.username;
        WamInitSecond({
          config: {
            resultSocket: this,
            scene: scene,
            isTouchDevice: isTouchDevice,
            id: newInfo.id,
          },
        });
        console.info(receivedUserInfo.connectedPlayers);
        for (const otherPlayer of receivedUserInfo.connectedPlayers) {
          addNewPlayerToScene({
            scene: scene,
            userInfo: otherPlayer,
            audioId: otherPlayer.peerId,
            peer: this.peer,
            localStream: this.localStream
          });
          connectAudioToNewUser(
            otherPlayer.peerId,
            this.localStream,
            this.peer,
            scene.renderer.domElement,
            this.scene
          );
        }
      } catch (e) {
        throw e;
      }
      console.warn(userInfo);
    });
    this.io.on("test", (test) => {
      console.warn(test);
    });
    this.peer.on("call", (call) => {
      call.answer(this.localStream);
    });
    // const audio = document.createElement('audio');
    // audio.autoplay = true;
    // audio.loop = true;
    // audio.srcObject = localStream;
    // document.appendChild(audio);

    newPlayerListener(this.io, this.scene, this.localStream, this.peer);
    playerDisconnect(this.io, this.scene);
    playerMoveListener(this.io, this.scene);
    playerUpdateListener(this.io, this.scene);
  }

  sendPosition({
    position,
    id,
    direction,
  }: {
    position: any;
    id: string;
    direction: any;
  }) {
    this.io.emit("position", {
      position: position,
      id: id,
      direction: direction,
    });
  }

  sendAnimUpdate({ id, anim }: { id: string; anim: string }) {
    this.io.emit("playerUpdate", { type: "animation", id: id, animation: anim });
  }

  dispose(): void {
    throw new Error("Method not implemented.");
  }
}
