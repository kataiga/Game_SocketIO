import { ICESERVERSRTCCONFIGURATION } from "../../const/constants";
import { MainScene } from "../../scripts/main";
import {
  WebRTCServiceConstructor,
  WebRTCServiceInterface,
} from "./webrtc_service_contract";

export default class WebRTCService implements WebRTCServiceInterface {
  rtc: WebSocket;
  connection!: RTCPeerConnection;
  connected!: boolean;
  scene: MainScene;

  constructor(config: WebRTCServiceConstructor) {
    this.rtc = config.rtc;
    this.scene = config.scene;
    let audio = document.createElement("audio");
    audio.style.display = "none";
    audio.autoplay = true;
    config.scene.renderer.domElement.appendChild(audio);
    this.created();
    this.connect();
    console.log("created WebRTCService class");
  }

  created(): void {
    this.rtc.onopen = function () {
      console.log("Connected to the WebRTC server");
    };
    this.rtc.onerror = () => {
      console.error("Failed to connect to WebRTC server");
    };
  }

  async connect(): Promise<RTCPeerConnection> {
    let pc = new RTCPeerConnection({
      iceServers: [ICESERVERSRTCCONFIGURATION],
    });
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    });
    const remoteStream = new MediaStream();
    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });
    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };
    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);
    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };
    
    return pc;
  }

  send(message: any) {
    if (this.connected) {
      message.username = this.scene.player.username;
    }
    this.rtc.send(message);
  }

  dispose(): void {}
}
