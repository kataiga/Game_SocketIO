import Peer from "peerjs";
import { io } from "socket.io-client";
import SocketService from "../../../services/Socket/socket_service_impl";
import { MainScene } from "../../main";

const addSocketService = async ({host, scene, isTouchDevice, peer, audioStream}: {host: string, scene: MainScene, isTouchDevice: boolean, peer: Peer, audioStream: MediaStream}): Promise<SocketService> => {
    console.info('socket connected')
    const socket = io(host);
    const socketService = new SocketService({io: socket, scene: scene, isTouchDevice: isTouchDevice, peer: peer, audioStream: audioStream});
    return socketService;
}

export default addSocketService;