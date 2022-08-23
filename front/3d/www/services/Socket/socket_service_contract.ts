import Peer from "peerjs";
import { Socket } from "socket.io-client";
import { MainScene } from "../../scripts/main";

interface SocketServiceInterface {
    connect(): Map<String, any>;
    startReceivingPlayersData(scene: MainScene, isTouchDevice: boolean): void;
    dispose(): void;
}

interface SocketServiceConstructor {
    io: Socket
    scene: MainScene
    isTouchDevice: boolean
    peer: Peer
    audioStream: MediaStream
}

export { SocketServiceInterface, SocketServiceConstructor }