import { ExtendedObject3D, PointerDrag, PointerLock, ThirdPersonControls, THREE } from "enable3d";
import { MainScene } from "../../main";
import { userInfo } from "../../playerInfos/playerInfos";



const addClientPlayer = async ({ config, isTouchDevice }: { config: MainScene, isTouchDevice: boolean }): Promise<Map<String, any>> => {
  console.info('userInfo: Model: ', userInfo);
  const object = await config.load.gltf(userInfo.model);
  const lara = object.scene.children[0];
  const player = new ExtendedObject3D();
  player.name = userInfo.username;
  player.rotateY(Math.PI + 0.1);
  player.add(lara);
  if (userInfo.model == "futaba") {
    player.scale.set(1.4, 1.4, 1.4)
  }
  if (userInfo.model == "vegas") {
    player.scale.set(0.9, 0.9, 0.9)
  }
  player.position.set(0, 1, 0);
  player.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = child.receiveShadow = true;
      (child as any).material.metalness = 0;
      // (child as any).material.roughness = 1;
    }
  });
  config.animationMixers.add(player.anims.mixer);
  console.info('Model : ' + userInfo.model, 'Animations : ', object.animations)
  object.animations.forEach((animation) => {
    if (animation.name) {
      player.anims.add(animation.name, animation);
    }
  });
  player.anims.play("idle");
  config.add.existing(player);
  config.physics.add.existing(player, {
    shape: "sphere",
    height: 5,
    radius: 0.25,
    width: 2,
    y: 0,
    collisionFlags: 0,
    offset: { y: -0.25 },
  });
  player.body.setFriction(10);
  player.body.setAngularFactor(0, 0, 0);
  player.body.setCcdMotionThreshold(1e-18);
  player.body.setCcdSweptSphereRadius(0.25);

  const controls = new ThirdPersonControls(config.camera, player, {
    offset: new THREE.Vector3(0, 1, 0),
    targetRadius: 5,
    autoUpdate: true,
    pointerLock: true,
  });
  controls.theta = 90;

  if (!isTouchDevice) {
    let pl = new PointerLock(config.canvas, true);
    let pd = new PointerDrag(config.canvas);
    document.addEventListener('keydown', (e) => {
      if (e.key == "Escape") {
        pl.exit();
      }
    })
    pd.onMove((delta) => {
      if (pl.isLocked()) {
        controls.update(delta.x * 2, delta.y * 2);
      }
    });
  }
  console.info('Done creating model')
  const map = new Map();
  map.set('player', player);
  map.set('controls', controls);
  return map;
};

export default addClientPlayer;