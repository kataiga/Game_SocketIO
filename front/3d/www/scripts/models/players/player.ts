import { MainScene } from "../../main";
import { ExtendedObject3D, THREE } from "enable3d";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { PlayerConstructor, PlayerInterface } from "./player_contract";

const loader = new FontLoader();
const noMusicAnims = ["idle", "running", "wave", "samba", "rumba"];


class Player implements PlayerInterface {
  model: ExtendedObject3D;
  username: string;
  firstPosition: any;
  scene: MainScene;
  id: string;
  textMesh!: THREE.Mesh;
  peerId: string;
  showSpeaker: boolean;
  speakerMesh!: THREE.Sprite;
  musicElement: THREE.PositionalAudio
  voice: THREE.Audio

  constructor(config: PlayerConstructor) {
    this.scene = config.scene;
    this.username = config.username;
    this.firstPosition = config.firstPosition;
    this.id = config.id;
    this.peerId = config.peerId;
    this.showSpeaker = false;
    const listener = new THREE.AudioListener();
    config.scene.camera.add(listener);
    const sound = new THREE.PositionalAudio(listener);
    sound.loop = true;
    this.musicElement = sound;
    const voice = new THREE.Audio(listener);
    voice.hasPlaybackControl = true;
    voice.play();
    this.voice = voice;
    const obj = new ExtendedObject3D();
    obj.add(config.model);
    obj.position.set(
      config.firstPosition.x,
      config.firstPosition.y,
      config.firstPosition.z
    );
    this.scene.animationMixers.add(obj.anims.mixer);
    config.animations.forEach((animation) => {
      obj.anims.add(animation.name, animation);
    });
    this.model = obj;
    this.model.add(this.musicElement);
    this.model.add(this.voice);
    this.create();
  }

  public update({ position, direction }: { position: any; direction: any }): void {
    this.model.position.set(position.x, position.y, position.z);
    this.model.setRotationFromEuler(direction);
    if (this.showSpeaker && this.model.children.filter(child => (child as any) == this.speakerMesh).length == 0) {
      this.model.add(this.speakerMesh);
    } else {
      this.model.remove(this.speakerMesh);
    }
    // this.textMesh.lookAt(this.scene.player.player.position);
  }

  public updateAnimation(animation: string) {
    this.handleAnimationMusic(animation);
    this.model.anims.play(animation, 200);
  }

  public updateVolume(volume: number) {
    const playing = this.voice.isPlaying;
    if (volume < 0 && playing) {
      this.voice.pause();
      
    } else {
      if (!playing) {
        this.voice.play();
      }
        this.voice.setVolume(volume / 14);
    }
  }


  public setVoiceStream(stream: MediaStream) {
    this.voice.setMediaStreamSource(stream);
    
  }

  private handleAnimationMusic(animation: string) {
    if (noMusicAnims.includes(animation) && noMusicAnims.includes(this.model.anims.current)) return;
    if (!noMusicAnims.includes(animation) && noMusicAnims.includes(this.model.anims.current)) this.playAnimationMusic(animation);
    if (noMusicAnims.includes(animation) && !noMusicAnims.includes(this.model.anims.current)) this.stopAnimationMusic();
  }

  private playAnimationMusic(animation: string) {
    if (animation == "flair") {
      console.log("User with id " + this.id + " played flair.wav")
      this.musicElement.setBuffer(this.scene.audios.get('flair.wav')!);
      this.musicElement.play();
    }
  }

  private stopAnimationMusic() {
    if (this.musicElement != null || this.musicElement != undefined) {
      this.musicElement.stop();
    }
  }

  async create() {
    const font = await loader.loadAsync(
      "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_bold.typeface.json"
    );
    const textGeometry = new TextGeometry(this.username, {
      font: font,
      size: 0.15,
      height: 0.1,
      bevelThickness: 0.5,
      bevelEnabled: false,
    });
    const textMesh = new THREE.Mesh(
      textGeometry,
      new THREE.MeshBasicMaterial({ color: "white" })
    );
    this.textMesh = textMesh;
    this.textMesh.position.set(
      this.firstPosition.x - 0.15,
      this.firstPosition.y + 0.8,
      this.firstPosition.z
    );
    this.model.add(this.textMesh);

    const map = new THREE.TextureLoader().load('assets/speaker.png');
    const speakerMesh = new THREE.Sprite(new THREE.SpriteMaterial({ map: map, color: 'white' }));
    this.speakerMesh = speakerMesh;

    this.scene.add.existing(this.model);
    this.model.anims.play("idle", 200, true);
  }

  dispose(): void {
    if (this.musicElement.isPlaying) {
      this.stopAnimationMusic();
    }
    this.scene.scene.remove(this.model);
    console.info('player disposed')
  }

}

export default Player;
