import { MainScene } from "../../scripts/main";

interface WebRTCServiceInterface {
    created(): void;
    connect(): void;
    dispose(): void;
}

interface WebRTCServiceConstructor {
    rtc: WebSocket;
    scene: MainScene
}

export { WebRTCServiceConstructor, WebRTCServiceInterface }