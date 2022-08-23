import { ExtendedObject3D, ThirdPersonControls } from "enable3d";
import SocketService from "../../../services/Socket/socket_service_impl";
import { MainScene } from "../../main";

interface PlayerInterface {
    update({position}: {position: any}): void;
}

interface PlayerConstructor {
    model: THREE.Group
    username: string
    firstPosition: any
    scene: MainScene
    id: string
    peerId: string
    animations: THREE.AnimationClip[]
}

interface ClientConstructor {
    username: string
    scene: MainScene,
    player: ExtendedObject3D
    controls: ThirdPersonControls
    io: SocketService
    id: string
}

export { PlayerInterface, PlayerConstructor, ClientConstructor }