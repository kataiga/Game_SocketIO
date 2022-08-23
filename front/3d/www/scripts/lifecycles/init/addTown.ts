import { ExtendedObject3D, THREE } from "enable3d";
import { MainScene } from "../../main";

const addTown = async ({config}: {config: MainScene}) => {
    const ambientLight = new THREE.AmbientLight(0x404040);
    config.scene.add(ambientLight);
    const object = await config.load.gltf("town");
    const scene = object.scenes[0];
    const town = new ExtendedObject3D();
    town.name = "scene";
    town.add(scene);
    config.add.existing(town);
    town.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = child.receiveShadow = true;
        (child as any).material.metalness = 0;
        // (child as any).material.roughness = 1;
        // if (/mesh/i.test(child.name)) {
        config.physics.add.existing(child, {
          shape: "concave",
          mass: 0,
          collisionFlags: 1,
          autoCenter: false,
        });
        child.body.setAngularFactor(0, 0, 0);
        child.body.setLinearFactor(0, 0, 0);
        // }
      }
    });
  };

  export default addTown;