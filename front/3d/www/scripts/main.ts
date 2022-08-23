import {
  THREE,
  Scene3D,
  PhysicsLoader,
  Project,
  ExtendedObject3D,
  ThirdPersonControls,
  PointerLock,
  PointerDrag,
} from "enable3d";
import { GRAVITY } from "../const/constants";
import addLoader from "./lifecycles/init/addLoader";
import { WamInitFirst } from "./lifecycles/init/init";
import PlayerClient from "./models/players/client";
import Player from "./models/players/player";

const isTouchDevice = "ontouchstart" in window;

const clock = new THREE.Clock();

class MainScene extends Scene3D {
  player!: PlayerClient;
  otherPlayers: Player[] = [];
  controls!: ThirdPersonControls;
  keys!: any;
  audios!: Map<string, AudioBuffer>;
  constructor() {
    super({ key: "MainScene" });
  }

  init() {
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.camera.matrixAutoUpdate = true;
    this.physics.setGravity(0, GRAVITY, 0);
    document.addEventListener(
      "resize",
      () => {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.updateProjectionMatrix();
      },
      false
    );
  }

  async preload() {
    const text = document.createElement('span');
    text.innerHTML = 'Now loading...';
    // text.style.marginTop = '25%';
    text.style.fontSize = '60px'
    text.style.color = 'white';
    const loader = document.getElementById('loader')!;
    loader.style.width = `${window.innerWidth}px`
    loader.style.height = `${window.innerHeight}px`
    loader.style.textAlign = 'center';
    loader.style.display = 'flex';
    loader.style.justifyContent = 'center';
    loader.style.alignItems = 'center';
    loader.style.backgroundColor = '#2F2F2F';
    loader.appendChild(text);
    const town = this.load.preload("town", "assets/maps/town5.glb");
    // const backrooms = this.load.preload(
    //   "backrooms",
    //   "assets/maps/backrooms.glb"
    // );
    const lara = this.load.preload("lara", "assets/models/lara2.glb");
    const yakuza = this.load.preload("yakuza", "assets/models/yakuza2.glb");
    // const revy = this.load.preload("revy", "assets/models/revy.glb");
    const vegas = this.load.preload("vegas", "assets/models/vegas.glb");
    const futaba = this.load.preload("futaba", "assets/models/futaba.glb");
    const kakashi = this.load.preload("kakashi", "assets/models/kakashi.glb");
    await Promise.all([
      town,
      // backrooms,
      lara,
      yakuza,
      vegas,
      // revy,
      futaba,
      kakashi,
    ]);
    loader.style.width = '0';
    loader.style.height = '0';
    loader.removeChild(text);

  }

  async create() {
    // this.physics.debug?.enable();
    await this.warpSpeed("-ground", "-orbitControls");
    WamInitFirst({ config: { scene: this, isTouchDevice: isTouchDevice } });
  }

  update(time, delta) {
    const newDelta = clock.getDelta();
    if (this.player) {
      this.player.update({ delta: newDelta });
    }
  }
}

const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;

PhysicsLoader("/ammo", () => {
  const project = new Project({
    maxSubSteps: 10,
    fixedTimeStep: 1 / 120,
    antialias: true,
    scenes: [MainScene],
  });
  const destination = document.getElementById("game")!;
  destination.appendChild(project.canvas);
  project.canvas.style.marginTop = "0px !important";
  const resize = () => {
    const newWidth = window.innerWidth;
    const newHeight = (HEIGHT / WIDTH) * newWidth;

    destination.style.width = `${newWidth}px`;
    destination.style.height = `${newHeight}px`;

    project.renderer.setSize(newWidth, newHeight);
    (project.camera as any).aspect = newWidth / newHeight;
    project.camera.updateProjectionMatrix();
  };
  window.onresize = resize;
  resize();
  window.addEventListener('beforeunload', () => {
    document.getElementById('emote')!.innerHTML = '';
    destination.innerHTML = '';
    document.getElementById('playerConnect')!.innerHTML = '';
    document.getElementById('consoleDiv')!.innerHTML = '';
  });
});

export { MainScene };
