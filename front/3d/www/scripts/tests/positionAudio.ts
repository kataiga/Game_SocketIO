import { MainScene } from "../main";
import { THREE } from "enable3d";

export default (scene: MainScene) => {
    const box = scene.add.box({height: 3, z: 8, collisionFlags: 0}, {lambert: {color: 'red'}})
    const music = scene.audios.get('flair.wav')!;
    const listener = new THREE.AudioListener();
    scene.camera.add(listener);
    const posAud = new THREE.PositionalAudio(listener);
    posAud.setBuffer(music);
    posAud.loop = true;
    posAud.play();
    posAud.setRefDistance(6)
    posAud.setMaxDistance(10);

    
    box.add(posAud);
}