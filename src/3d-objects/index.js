import {
  AmbientLight,
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';

const CANVAS_SIZE = 300;
const CAMERA_INIT_Z = 1;
const CAMERA_INIT_Y = 4;
const CAMERA_MOVEMENT_INCREMENT_Z = 1e4 * 6;
const CAMERA_TARGET_INCREMENT_Z = 1e4 * 3.5;

const createLights = () => {
  const ambientLight = new AmbientLight(0x7c7c7c, 3.0);
  const light = new DirectionalLight(0xFFFFFF, 3.0);
  light.position.set(0.32, 0.39, 0.7);

  return [ambientLight, light];
};

export const THREEObjectMaker = (StreetView) => (mesh, position) => {
  const canvas = document.createElement('canvas');
  canvas.height = CANVAS_SIZE;
  canvas.width = CANVAS_SIZE;

  const scene = new Scene();
  createLights().forEach((l) => scene.add(l));
  scene.add(mesh);

  const camera = new PerspectiveCamera(45, 1, 0.1, 1000);
  camera.position.z = CAMERA_INIT_Z;
  camera.position.y = CAMERA_INIT_Y;
  camera.lookAt(mesh.position);

  const renderer = new WebGLRenderer({ canvas, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(CANVAS_SIZE, CANVAS_SIZE);
  renderer.setPixelRatio(window.devicePixelRatio);

  return {
    scene, camera, renderer, mesh,
    insert(map) {
      this.map = map;

      this.info = new StreetView.InfoWindow({
        headerDisabled: true,
        position,
        content: canvas,
      });

      renderer.render(scene, camera);
      this.info.open({ map });
    },
    update() {
      const userPosition = this.map.getPosition();
      const objectPosition = this.info.getPosition();
      const dx = userPosition.lat() - objectPosition.lat();
      const dy = userPosition.lng() - objectPosition.lng();
      // rotate the object so it always faces the same direction in the panorama
      mesh.rotation.y = Math.atan2(dy, dx);
      camera.position.z = CAMERA_INIT_Z * 2 + Math.abs(dy * CAMERA_MOVEMENT_INCREMENT_Z);
      // move the camera target above the object as we move further away from it
      // this ensures the object doesn't follow the InfoWindow as it rises within the panorama.
      const cameraTarget = new Vector3();
      cameraTarget.copy(mesh.position);
      cameraTarget.y += Math.abs(dx * CAMERA_TARGET_INCREMENT_Z);
      camera.lookAt(cameraTarget);

      renderer.render( scene, camera );
    },
  };
};
