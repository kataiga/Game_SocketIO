import { THREE } from "enable3d";
import Peer from "peerjs";
import { Socket } from "socket.io-client";
import { MainScene } from "../../../scripts/main";
import Player from "../../../scripts/models/players/player";
import Utils from "../../../scripts/utils/utils";

export const addNewPlayerToScene = async ({
  scene,
  userInfo,
  audioId,
  peer,
  localStream
}: {
  scene: MainScene;
  userInfo: any;
  audioId: string;
  peer: Peer,
  localStream: MediaStream
}) => {
  if (
    scene.otherPlayers.filter((player) => player.id == userInfo.id).length > 0
  ) {
    return;
  }
  const object = await scene.load.gltf(userInfo.model);
  const playerModel = object.scene;
  playerModel.traverse((child: any) => {
    if (child.isMesh) {
      child.material.metalness = 0;
    }
  });
  const animations = object.animations;
  console.log("PEER OBJECT : " + peer)
  const call = peer.call(audioId.toString(), localStream);
  
  const newPlayerClass = new Player({
    model: playerModel,
    firstPosition: userInfo.position,
    id: userInfo.id,
    scene: scene,
    username: userInfo.username,
    animations: animations,
    peerId: audioId,
  });
  call.on("stream", (audioStream) => {
    newPlayerClass.setVoiceStream(audioStream);
  })
  scene.otherPlayers.push(newPlayerClass);
  console.info("Added new Player");
};

function announceIncomingPlayer(username: string) {
  const connectDiv = document.getElementById('playerConnect')!;
  let newPlayerAnnounce = document.createElement('div');
  newPlayerAnnounce.style.display = "block";
  newPlayerAnnounce.style.backgroundColor = "#E1E1E1";
  newPlayerAnnounce.style.padding = "12px";
  newPlayerAnnounce.style.position = "relative";
  newPlayerAnnounce.style.width = "max-content";
  newPlayerAnnounce.style.height = "max-content";
  newPlayerAnnounce.innerHTML = username + " joined the room.";
  connectDiv.appendChild(newPlayerAnnounce);
  setTimeout(() => {connectDiv.removeChild(newPlayerAnnounce)}, 3000)
}

export const newPlayerListener = (
  io: Socket,
  scene: MainScene,
  localStream: MediaStream,
  peer: Peer
) => {
  io.on("newPlayer", (userInfo) => {
    console.info("INCOMING PLAYER");
    console.info("INCOMING PLAYER INFOS", userInfo);
    addNewPlayerToScene({
      scene: scene,
      userInfo: userInfo,
      audioId: userInfo.peerId,
      peer: peer,
      localStream: localStream
    });
  announceIncomingPlayer(userInfo.username);
    // connectAudioToNewUser(
    //   userInfo.peerId,
    //   localStream,
    //   peer,
    //   scene.renderer.domElement,
    //   scene
    // );
  });
};

export function connectAudioToNewUser(
  id: string,
  localStream: MediaStream,
  peer: Peer,
  domElement: HTMLCanvasElement,
  scene: MainScene
) {
  console.info("CALLING USER " + id);
  const call = peer.call(id.toString(), localStream);
  const audio = document.createElement("audio");
  audio.autoplay = true;
  audio.loop = true;
  console.log("PEER BEFORE ADDING ID", id);
  audio.addEventListener("loadedmetadata", () => {
    audio.play();
  });
  const player = scene.otherPlayers.filter(
    (playerToFind) => playerToFind.peerId == id
  )[0];
  function volumeListener() {
    if (audio.volume > 0) {
      player.showSpeaker = true;
    } else {
      player.showSpeaker = false;
    }
  }
  call.on("stream", (userAudioStream) => {
    audio.srcObject = userAudioStream;
    domElement.appendChild(audio);
    audio.addEventListener("volumechange", volumeListener);
  });
  call.on("close", () => {
    audio.removeEventListener("volumechange", volumeListener), audio.remove();
  });
}
