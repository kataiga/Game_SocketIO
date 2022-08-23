import Peer from "peerjs";
import { io, Socket } from "socket.io-client";
import SocketService from "../../../services/Socket/socket_service_impl";
import { MainScene } from "../../main";
import PlayerClient from "../../models/players/client";
import WAMTests from "../../tests/WAMTests";
import addClientPlayer from "./addClientPlayer";
import addSocketService from "./addSocketService";
import addTown from "./addTown";
import addWebRTCService from "./addWebRtcService";
import loadMusics from "./loadMusics";
import setHtmlElements from "./setHtmlElements";

interface WamInitConfig {
  scene: MainScene;
  isTouchDevice: boolean;
}

interface WamInitConfigSecond {
  scene: MainScene;
  isTouchDevice: boolean;
  resultSocket: SocketService;
  id: string;
}

const WamInitFirst = async ({ config }: { config: WamInitConfig }) => {
  console.info("WAM INIT");
  addTown({ config: config.scene });
  console.info("Added town");
  config.scene.audios = await loadMusics();
  // WAMTests(config.scene);
  const localStream = await navigator.mediaDevices
    .getUserMedia({
      video: false,
      audio: true,
    })
    .catch((err) => {
      console.log("User didn't accept audio request");
    });
  const peer = new Peer({
    host: "wam.doggo-saloon.net",
    port: 3031,
    secure: true
  });
  peer.on("open", async (peerId) => {
    console.log("Peer id : ", peerId);
    const username = localStorage.getItem("user");
    const id = localStorage.getItem("id");
    const model = localStorage.getItem("model");
    console.log(username, id, model);
    // await addWebRTCService({host: 'wss://wam.doggo-saloon.net:3031', scene: config.scene});
    await addSocketService({
      host:
        "https://wam.doggo-saloon.net:3030?id=" +
        id +
        "&model=" +
        model +
        "&username=" +
        username +
        "&peerId=" +
        peerId,
      scene: config.scene,
      isTouchDevice: config.isTouchDevice,
      peer: peer,
      audioStream: localStream ?? new MediaStream(),
    });
    // await addSocketService({host: 'http://127.0.0.1:3030/?jwt=2&model=lara&username=kataiga', scene: config.scene, isTouchDevice: config.isTouchDevice});
    // WamInitSecond({config: {resultSocket: new SocketService({io: io(), isTouchDevice: config.isTouchDevice, scene: config.scene}), scene: config.scene, isTouchDevice: config.isTouchDevice, id: 1}})
  });
};

const WamInitSecond = async ({ config }: { config: WamInitConfigSecond }) => {
  const resultPlayer = await addClientPlayer({
    config: config.scene,
    isTouchDevice: config.isTouchDevice,
  });
  console.info("Added Player model");
  const playerClient = new PlayerClient({
    scene: config.scene,
    controls: resultPlayer.get("controls"),
    player: resultPlayer.get("player"),
    io: config.resultSocket,
    id: config.id,
    username: "mlem",
  });
  config.scene.player = playerClient;
  setHtmlElements();
  console.info("Added Player Class");
};

export { WamInitFirst, WamInitSecond };
