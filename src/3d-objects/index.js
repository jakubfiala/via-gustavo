import {
  AmbientLight,
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';

const CANVAS_SIZE = 300;;
const CAMERA_MOVEMENT_INCREMENT_Z = 1e4 * 6;
const CAMERA_TARGET_INCREMENT_Z = 1e4 * 3.5;

const createLights = () => {
  const ambientLight = new AmbientLight(0x7c7c7c, 3.0);
  const light = new DirectionalLight(0xFFFFFF, 3.0);
  light.position.set(0.32, 0.39, 0.7);

  return [ambientLight, light];
};

export const THREEObjectMaker = (StreetView) => (mesh, { name, cameraPosition, scale } = {}) => {
  const CAMERA_INIT_X = cameraPosition?.x ?? 0;
  const CAMERA_INIT_Y = cameraPosition?.y ?? 2;
  const CAMERA_INIT_Z = cameraPosition?.z ?? 1;

  console.group(name);
  const canvas = document.createElement('canvas');
  canvas.classList.add('vg-item');
  canvas.height = CANVAS_SIZE;
  canvas.width = CANVAS_SIZE;
  canvas.title = name;

  const scene = new Scene();
  createLights().forEach((l) => scene.add(l));
  scene.add(mesh);

  const camera = new PerspectiveCamera(45, 1, 0.1, 1000);
  camera.position.x = CAMERA_INIT_X;
  camera.position.y = CAMERA_INIT_Y;
  camera.position.z = CAMERA_INIT_Z;
  camera.lookAt(mesh.position);

  mesh.scale.x = scale ?? 1;
  mesh.scale.y = scale ?? 1;
  mesh.scale.z = scale ?? 1;

  const renderer = new WebGLRenderer({ canvas, alpha: true });
  renderer.setClearColor(0x000000, 0);

  console.log({ camera, moveCam: (x, y, z) => {
    camera.position.x = x;
    camera.position.y = y;
    camera.position.z = z;
    camera.lookAt(mesh.position);
    renderer.render(scene, camera);
  } });
  console.groupEnd();

  return {
    scene, camera, renderer, mesh, canvas,
    insert(map, position) {
      this.map = map;

      this.info = new StreetView.InfoWindow({
        headerDisabled: true,
        position,
        content: canvas,
      });

      this.render();
      this.info.open({ map });
    },
    render() {
      renderer.render(scene, camera);
    },
    reset() {
      mesh.rotation.y = 0;
      camera.position.x = 0;
      camera.position.y = 0;
      camera.position.z = 5;
      camera.lookAt(mesh.position);
      this.render();
    },
    update() {
      if (this.isBeingHeld) {
        return;
      }

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
      camera.lookAt(cameraTarget);
      cameraTarget.y += Math.abs(dx * CAMERA_TARGET_INCREMENT_Z);
      this.render();
    },
  };
};
