import { ExtendedObject3D, ThirdPersonControls, THREE } from "enable3d";
import SocketService from "../../../services/Socket/socket_service_impl";
import { MainScene } from "../../main";
import { ClientConstructor, PlayerInterface } from "./player_contract";
const audioLoader = new THREE.AudioLoader();

export default class PlayerClient {
  canJump: boolean = true;
  move!: false;
  moveTop!: number;
  moveRight!: number;
  scene: MainScene;
  player: ExtendedObject3D;
  controls: ThirdPersonControls;
  io: SocketService;
  id: string;
  v3 = new THREE.Vector3();
  username: string;
  lastAnim: string;
  musicElement: THREE.PositionalAudio;
  dance!: { dancing: boolean; danceName: string };
  keys = {
    w: { isDown: false },
    a: { isDown: false },
    s: { isDown: false },
    d: { isDown: false },
    space: { isDown: false },
  };
  consoleData = {
    isOpen: false,
    text: "",
  }

  constructor(config: ClientConstructor) {
    console.info("player constructed");
    this.username = config.username;
    this.scene = config.scene;
    this.player = config.player;
    this.controls = config.controls;
    this.io = config.io;
    this.id = config.id;
    this.lastAnim = "idle";
    const listener = new THREE.AudioListener();
    config.scene.camera.add(listener);
    const sound = new THREE.PositionalAudio(listener);
    sound.loop = true;
    this.musicElement = sound;
    this.musicElement.setVolume(0.4)
    this.player.add(this.musicElement);
    this.dance = { dancing: false, danceName: "samba" };
    this.create();
  }

  private press(e: KeyboardEvent, isDown: boolean) {
    e.preventDefault();
    const { key } = e;
    switch (key) {
      case "z":
        this.keys.w.isDown = isDown;
        break;
      case "q":
        this.keys.a.isDown = isDown;
        break;
      case "s":
        this.keys.s.isDown = isDown;
        break;
      case "d":
        this.keys.d.isDown = isDown;
        break;
      case "ArrowUp":
        this.keys.w.isDown = isDown;
        break;
      case " ":
        this.keys.space.isDown = isDown;
        break;
    }
  }

  private jump() {
    if (!this.player || !this.canJump) return;
    this.canJump = false;
    this.player.body.setVelocity(this.player.body.velocity.x, 6, this.player.body.velocity.z)
    setTimeout(() => {
      this.canJump = true;
      this.player.anims.play("idle");
    }, 650);
  }

  public update({ delta }: { delta: number }): void {
    if (this.player && this.player.body && !this.consoleData.isOpen) {
      const directionOffset = this.directionOffset(this.keys);
      this.controls.update(this.moveRight * 2, -this.moveTop * 2);
      const speed = 8;
      let rotation = this.scene.camera.getWorldDirection(this.v3);
      // console.info('PLAYER ROATION IN WORLD', rotation)
      let theta = Math.atan2(rotation.x, rotation.z);
      theta = theta + directionOffset;
      const rotationPlayer = this.player.getWorldDirection(this.v3);
      let thetaPlayer = Math.atan2(rotationPlayer.x, rotationPlayer.z);
      thetaPlayer = thetaPlayer + directionOffset;
      this.player.body.setAngularVelocityY(0);
      let l = Math.abs(theta - thetaPlayer);
      let rotationSpeed = 4;
      const d = Math.PI / 24;
      if (l > d) {
        if (l > Math.PI - d) rotationSpeed *= -4;
        if (theta < thetaPlayer) rotationSpeed *= -4;
        if (Object.values(this.keys).some((key) => key.isDown == true)) {
          this.player.body.setAngularVelocityY(rotationSpeed);
        }
      }

      if (
        Object.values(this.keys).some((key) => key.isDown == true) ||
        this.move
      ) {
        if (
          this.player.anims.current === "idle" ||
          (this.player.anims.current !== "running" && this.canJump)
        ) {
          if (this.player.anims.current === "samba" && this.canJump) {
            this.stopAnimationMusic();
          }
          this.player.anims.play("running", 200);
        }


        const x = Math.sin(theta) * speed,
          y = this.player.body.velocity.y,
          z = Math.cos(theta) * speed;
        this.player.body.setVelocity(x, y, z);
      } else {
        if (this.player.anims.current === "running" && this.canJump) {
          if (this.dance.dancing) {
            this.player.anims.play("samba", 200);
          } else {
            this.player.anims.play("idle", 200);
          }
        }
      }
      if (this.keys.space.isDown && this.canJump) {
        console.warn('jump')
        this.jump();
      }
      if (this.player.anims.current != this.lastAnim) {
        this.io.sendAnimUpdate({
          id: this.id,
          anim: this.player.anims.current,
        });
      }
      this.lastAnim = this.player.anims.current;
      this.io.sendPosition({
        position: this.player.position,
        id: this.id,
        direction: this.player.rotation,
      });
      if (this.player.position.y < -10) {
        console.info('Client left the map');
        this.teleport(0, 1, 0);
      }
      for (const player of this.scene.otherPlayers) {
        const distance = player.model.position.distanceTo(this.scene.camera.position);
        player.updateVolume(100 + (10 * Math.log10(1e-6 / (4 * Math.PI * Math.pow(distance, 2)))));
      }
    }
  }

  private create(): void {
    console.info("player created");
    this.canJump = true;
    this.move = false;
    this.moveTop = 0;
    this.moveRight = 0;
    document.addEventListener("keydown", (e) => this.press(e, true));
    document.addEventListener("keyup", (e) => this.press(e, false));
    this.emoteCircleListener();
    this.consoleListener();
    document.addEventListener("keydown", (event) => {
      const key = event.key || event.keyCode;
      const play = (anim: string) => {
        if (!(this.player.anims.current == anim)) {
          this.playAnimationMusic(anim);
          this.player.anims.play(anim, 200);
        } else {
          this.stopAnimationMusic();
          this.player.anims.play("idle", 200);
        }
      }
      if (key == "&" || key == 49) {
        play("samba");
      }
      if (key == "é" || key == 50) {
        play("flair");
      }
      if (key == "\"" || key == 51) {
        play("rumba");
      }
      if (key == "\'" || key == 52) {
        play("wave");
      }
    });
  }

  private emoteCircleListener() {
    const r = 100;
    const RadiansToDegrees = (radians: number): number => { return (radians * 180) / Math.PI };
    const emoteDiv = document.getElementById('emote')!;
    emoteDiv.style.width = "100px";
    emoteDiv.style.height = "100px";
    emoteDiv.style.backgroundColor = "#ff0000";
    emoteDiv.style.position = "absolute";
    emoteDiv.style.display = "none";
    emoteDiv.style.top = "50%";
    emoteDiv.style.left = "50%";
    emoteDiv.style.transform = "translate(-50%, -50%)";
    const test = document.createElement('div');
    test.style.backgroundColor = "blue";
    test.style.width = "12%";
    test.style.height = "12%";
    console.log('left : ' + emoteDiv.getBoundingClientRect().left);
    console.log('bottom : ' + emoteDiv.getBoundingClientRect().bottom);
    test.style.left = (0 + (r * Math.cos(0))).toString();
    test.style.bottom = (0 + (r * Math.sin(Math.PI))).toString();
    console.log('left : ' + test.getBoundingClientRect().left);
    console.log('bottom : ' + test.getBoundingClientRect().bottom);
    emoteDiv.appendChild(test)
    document.addEventListener("keydown", (e) => {
      if (e.key == "b") {
        this.showEmoteCircle();
      }
    });
    document.addEventListener("keyup", (e) => {
      if (e.key == "b") {
        this.hideEmoteCircle();
      }
    })
  }

  private showEmoteCircle() {
    const emoteDiv = document.getElementById('emote')!;
    emoteDiv.style.display = "block";
  }

  private hideEmoteCircle() {
    document.getElementById('emote')!.style.display = "none";
  }

  private consoleListener() {
    const consoleDiv = document.getElementById('consoleDiv')!;
    document.addEventListener('keydown', (e) => {
      if (e.key == "Enter") {
        if (this.consoleData.isOpen) {
          this.consoleData.isOpen = false;
          consoleDiv.style.opacity = "0.2";
          this.controls.sensitivity = new THREE.Vector2(0.25, 0.25)
        } else {
          this.consoleData.isOpen = true;
          consoleDiv.style.opacity = "0.4";
          this.controls.sensitivity = new THREE.Vector2(0, 0);
        }
      }

    })
  }

  private directionOffset(keys: typeof this.keys) {
    var directionOffset = 0; // z

    if (keys.w.isDown) {
      if (keys.a.isDown) {
        directionOffset = Math.PI / 4; // z + q
      } else if (keys.d.isDown) {
        directionOffset = -Math.PI / 4; // z + d
      }
    } else if (keys.s.isDown) {
      if (keys.a.isDown) {
        directionOffset = Math.PI / 4 + Math.PI / 2; // s + q
      } else if (keys.d.isDown) {
        directionOffset = -Math.PI / 4 - Math.PI / 2; // s + d
      } else {
        directionOffset = Math.PI; // s
      }
    } else if (keys.a.isDown) {
      directionOffset = Math.PI / 2; // q
    } else if (keys.d.isDown) {
      directionOffset = -Math.PI / 2; // d
    }

    return directionOffset;
  }

  private playAnimationMusic(animation: string) {
    console.log("playing music");
    console.log(this.scene.audios)

    if (animation == "samba") {
      this.musicElement.setBuffer(this.scene.audios.get("samba.wav")!);
      this.musicElement.setRefDistance(20);
      this.musicElement.play();
    }
  }

  private stopAnimationMusic() {
    this.musicElement.stop();
  }

  private teleport(x: number, y: number, z: number) {
    this.player.body.setCollisionFlags(2);
    this.player.position.set(x, y, z);
    this.player.body.needUpdate = true;
    this.player.body.once.update(() => {
      this.player.body.setCollisionFlags(0);
      this.player.body.setVelocity(0, 0, 0);
      this.player.body.setAngularVelocity(0, 0, 0);
    })
  }
}
