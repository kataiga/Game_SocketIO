import { MainScene } from "../../main";
import WebRTCService from "../../../services/webRtc/webrtc_service_impl";

const addWebRTCService = async ({scene, host}: {scene: MainScene, host: string}): Promise<WebRTCService> => {
    console.info('creating webrtc connection');
    const webSocketConnection = new WebSocket(host);
    const webRtcService = new WebRTCService({rtc: webSocketConnection, scene: scene});
    return webRtcService;
}

export default addWebRTCService;