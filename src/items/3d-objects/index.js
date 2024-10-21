import {
  AmbientLight,
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';
import { latLngDist } from '../../utils.js';
import { OBJECT_APPEAR_THRESHOLD } from '../../constants.js';
import { loadGLTF } from './gltf.js';
import { createGenericItemContainer } from '../generic.js';

const DISTANCE_FACTOR = 1e-1;

const CANVAS_SIZE = 300;
const CAMERA_TARGET_INCREMENT_Z = 1e4 * 3.5;

const CAMERA_DEFAULT_X = 0;
const CAMERA_DEFAULT_Y = 2;
const CAMERA_DEFAULT_Z = 1;

const DIRLIGHT_DEFAULT_X = 0.32;
const DIRLIGHT_DEFAULT_Y = 0.39;
const DIRLIGHT_DEFAULT_Z = 0.7;

const createLights = ({ x, y, z }) => {
  const ambientLight = new AmbientLight(0x7c7c7c, 3.0);
  const light = new DirectionalLight(0xFFFFFF, 3.0);
  light.position.set(
    x ?? DIRLIGHT_DEFAULT_X,
    y ?? DIRLIGHT_DEFAULT_Y,
    z ?? DIRLIGHT_DEFAULT_Z,
  );

  return [ambientLight, light];
};

export const THREEObjectMaker = (InfoWindow) => async (url, { name, cameraPosition, scale, rotation = {}, lightPosition = {}, onGround = false } = {}) => {
  const cameraInitX = cameraPosition?.x ?? CAMERA_DEFAULT_X;
  const cameraInitY = cameraPosition?.y ?? CAMERA_DEFAULT_Y;
  const cameraInitZ = cameraPosition?.z ?? CAMERA_DEFAULT_Z;

  const container = createGenericItemContainer();
  if (onGround) {
    container.classList.add('gustavo-item--on-ground');
  }

  const canvas = document.createElement('canvas');
  canvas.classList.add('vg-item');
  canvas.height = CANVAS_SIZE;
  canvas.width = CANVAS_SIZE;
  canvas.title = name;
  container.appendChild(canvas);

  const scene = new Scene();
  const lights = createLights(lightPosition)
  lights.forEach((l) => scene.add(l));

  const camera = new PerspectiveCamera(45, 1, 0.1, 1000);
  camera.position.x = cameraInitX;
  camera.position.y = cameraInitY;
  camera.position.z = cameraInitZ;

  const renderer = new WebGLRenderer({ canvas, alpha: true });
  renderer.setPixelRatio(Math.max(2, window.devicePixelRatio));
  renderer.setClearColor(0x000000, 0);

  const mesh = await loadGLTF(url);
  mesh.scale.x = scale ?? 1;
  mesh.scale.y = scale ?? 1;
  mesh.scale.z = scale ?? 1;

  mesh.rotation.x = rotation.x ?? 0;
  mesh.rotation.y = rotation.y ?? 0;
  mesh.rotation.z = rotation.z ?? 0;
  scene.add(mesh);

  const debugObject = {
    mesh,
    camera,
    moveCam: (x, y, z) => {
      camera.position.x = x;
      camera.position.y = y;
      camera.position.z = z;
      camera.lookAt(mesh.position);
      renderer.render(scene, camera);
    },
    rotateMesh: (x, y, z) => {
      mesh.rotateX(x ?? 0);
      mesh.rotateY(y ?? 0);
      mesh.rotateZ(z ?? 0);
      renderer.render(scene, camera);
    },
    move: null,
  };

  console.info('[3d-objects]', name, debugObject);

  return {
    name, scene, camera, renderer, mesh, canvas,
    insert(map, position) {
      this.map = map;

      this.info = new InfoWindow({
        headerDisabled: true,
        position,
        content: container,
      });

      debugObject.move = (position) => {
        this.info.setPosition(position);
      };
    },
    render() {
      console.info('[3d-objects]', 'rendering', name);
      renderer.render(scene, camera);
    },
    async reset() {
      mesh.rotation.x = 0;
      mesh.rotation.y = 0;
      mesh.rotation.z = 0;
      lights[1].position.x = DIRLIGHT_DEFAULT_X;
      lights[1].position.y = DIRLIGHT_DEFAULT_Y;
      lights[1].position.z = DIRLIGHT_DEFAULT_Z;
      camera.position.x = 0;
      camera.position.y = 0;
      camera.position.z = 5;
      camera.lookAt(mesh.position);
      this.render();
    },
    async update() {
      if (this.taken) {
        return;
      }

      const userPosition = this.map.getPosition();
      const objectPosition = this.info.getPosition();
      const dx = userPosition.lat() - objectPosition.lat();
      const dy = userPosition.lng() - objectPosition.lng();

      const dist = latLngDist(objectPosition, userPosition) * DISTANCE_FACTOR;
      if (!this.info.isOpen) {
        if (dist < OBJECT_APPEAR_THRESHOLD) {
          this.info.open({ map: this.map });
        } else {
          return;
        }
      }

      // rotate the object so it always faces the same direction in the panorama
      mesh.rotation.y = Math.atan2(dy, dx);
      // camera.position.z = cameraInitZ * 2 + Math.abs(dy * CAMERA_MOVEMENT_INCREMENT_Z);
      container.style.scale = (1/dist);

      if (!onGround) {
        container.style.translate = `0 ${Math.min(13,dist/3*10)}vh`;
      }

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
