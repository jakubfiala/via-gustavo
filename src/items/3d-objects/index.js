import {
  AmbientLight,
  ACESFilmicToneMapping,
  DirectionalLight,
  EquirectangularReflectionMapping,
  PerspectiveCamera,
  Raycaster,
  Scene,
  SRGBColorSpace,
  TextureLoader,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import { latLngDist } from '../../utils.js';
import { OBJECT_APPEAR_THRESHOLD, OBJECT_LOAD_THRESHOLD } from '../../constants.js';
import { loadGLTF } from './gltf.js';
import { createGenericItemContainer } from '../generic.js';

const DISTANCE_FACTOR = 1e-1;

const CANVAS_SIZE = 300;
const CANVAS_SIZE_BIG = 1000;
const CAMERA_TARGET_INCREMENT_Z = 1e4 * 3.5;

const CAMERA_DEFAULT_X = 0;
const CAMERA_DEFAULT_Y = 2;
const CAMERA_DEFAULT_Z = 1;

const DIRLIGHT_DEFAULT_X = 0.32;
const DIRLIGHT_DEFAULT_Y = 0.39;
const DIRLIGHT_DEFAULT_Z = 0.7;

const MIN_ZOOM = 0.8;
const MIN_DPR = 2;

const HOVER_HELPER_NAME = 'hover-helper';

const dpr = Math.max(MIN_DPR, window.devicePixelRatio);

const createLights = ({ x, y, z }, intensity = 3) => {
  const ambientLight = new AmbientLight(0x7c7c7c, intensity);
  const light = new DirectionalLight(0xFFFFFF, intensity);
  light.position.set(
    x ?? DIRLIGHT_DEFAULT_X,
    y ?? DIRLIGHT_DEFAULT_Y,
    z ?? DIRLIGHT_DEFAULT_Z,
  );

  return [ambientLight, light];
};

const loadEnv = (path, name) => new Promise((resolve, reject) => {
  new TextureLoader().load(path, (texture) => {
    console.info('[3d-objects]', 'loaded env texture for', name);
    texture.mapping = EquirectangularReflectionMapping;
    texture.colorSpace = SRGBColorSpace;
    resolve(texture);
  }, () => {}, reject);
});

export const THREEObjectMaker = (InfoWindow) => async (url, options = {}) => {
  const {
    name,
    displayName,
    cameraPosition,
    scale,
    rotation = {},
    lightPosition = {},
    onGround = false,
    big = false,
    env = null,
    envIntensity = 1,
    objectLoader = loadGLTF,
  } = options;

  const cameraInitX = cameraPosition?.x ?? CAMERA_DEFAULT_X;
  const cameraInitY = cameraPosition?.y ?? CAMERA_DEFAULT_Y;
  const cameraInitZ = cameraPosition?.z ?? CAMERA_DEFAULT_Z;

  const container = createGenericItemContainer();
  if (onGround) {
    container.classList.add('gustavo-item--on-ground');
  }

  const canvas = document.createElement('canvas');
  canvas.classList.add('vg-item');

  if (big) {
    container.classList.add('gustavo-item--big');
    canvas.classList.add('vg-item--big');
  }

  const appearThreshold = big ? OBJECT_APPEAR_THRESHOLD * 2 : OBJECT_APPEAR_THRESHOLD;

  canvas.height = big ? CANVAS_SIZE_BIG : CANVAS_SIZE;
  canvas.width = big ? CANVAS_SIZE_BIG : CANVAS_SIZE;
  canvas.title = displayName || name;
  container.appendChild(canvas);

  const scene = new Scene();

  const lights = createLights(lightPosition, env ? 0.8 : 3);
  lights.forEach((l) => scene.add(l));

  const camera = new PerspectiveCamera(45, 1, 0.1, 1000);
  camera.position.x = cameraInitX;
  camera.position.y = cameraInitY;
  camera.position.z = cameraInitZ;

  let renderer = null;
  let object = null;
  let isBeingHovered = false;
  let debugObject = null;

  const createRenderer = () => {
    renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = ACESFilmicToneMapping;

    if (debugObject) {
      debugObject.renderer = renderer;
    }
  }

  const loadObject = async () => {
    object = await objectLoader(url);

    const hoverHelper = object.getObjectByName(HOVER_HELPER_NAME);
    if (hoverHelper) {
      console.info('[3d-objects]', name, 'has a hover helper');
      hoverHelper.visible = false;
    }

    object.scale.x = scale ?? 1;
    object.scale.y = scale ?? 1;
    object.scale.z = scale ?? 1;

    object.rotation.x = rotation.x ?? 0;
    object.rotation.y = rotation.y ?? 0;
    object.rotation.z = rotation.z ?? 0;
    scene.add(object);

    if (env) {
      scene.environment = await loadEnv(env, name);
      scene.environmentIntensity = envIntensity;
    }

    const raycaster = new Raycaster();
    const pointer = new Vector2();

    const onPointerMove = (event) => {
      pointer.x = (event.offsetX / canvas.width) * dpr * 2 - 1;
      pointer.y = (event.offsetY / canvas.height) * dpr * 2 - 1;
      raycaster.setFromCamera(pointer, camera);
      const intersections = raycaster.intersectObject(hoverHelper ?? object, true).length;
      isBeingHovered = intersections > 0;

      container.classList.toggle('gustavo-item--highlighted', isBeingHovered);
    };

    canvas.addEventListener('pointermove', onPointerMove);

    debugObject = {
      object,
      camera,
      isBeingHovered,
      renderer,
      moveCam: (x, y, z) => {
        camera.position.x = x;
        camera.position.y = y;
        camera.position.z = z;
        camera.lookAt(object.position);
        renderer.render(scene, camera);
      },
      rotateMesh: (x, y, z) => {
        object.rotateX(x ?? 0);
        object.rotateY(y ?? 0);
        object.rotateZ(z ?? 0);
        renderer.render(scene, camera);
      },
      move: null,
    };

    console.info('[3d-objects]', 'loaded', name, debugObject);
  }

  return {
    name, scene, camera, canvas, container, loadObject,
    insert(map, position) {
      this.map = map;

      this.info = new InfoWindow({
        headerDisabled: true,
        position,
        content: container,
      });
    },
    async render() {
      console.info('[3d-objects]', 'rendering', name);

      if (!object) {
        console.info('[3d-objects]', 'no object yet for', name);
        await loadObject();
      }

      if (!renderer) {
        console.info('[3d-objects]', 'no renderer yet for', name);
        createRenderer();
      }

      renderer.clear();
      renderer.render(scene, camera);
    },
    async reset() {
      if (!object) {
        console.info('[3d-objects]', 'no object yet for', name);
        await loadObject();
      }

      object.rotation.x = 0;
      object.rotation.y = 0;
      object.rotation.z = 0;
      object.scale.x = 1;
      object.scale.y = 1;
      object.scale.z = 1;
      lights[1].position.x = DIRLIGHT_DEFAULT_X;
      lights[1].position.y = DIRLIGHT_DEFAULT_Y;
      lights[1].position.z = DIRLIGHT_DEFAULT_Z;
      camera.position.x = 0;
      camera.position.y = 0;
      camera.position.z = 5;
      camera.lookAt(object.position);
      this.render();
    },
    povUpdate() {
      if (this.taken || !this.info.isOpen) {
        return;
      }

      const { zoom } = this.map.getPov();
      container.style.scale = (1/this.dist) * Math.max(MIN_ZOOM, zoom);
    },
    async update() {
      if (this.taken) {
        return;
      }

      const userPosition = this.map.getPosition();
      const objectPosition = this.info.getPosition();
      const dx = userPosition.lat() - objectPosition.lat();
      const dy = userPosition.lng() - objectPosition.lng();

      this.dist = latLngDist(objectPosition, userPosition) * DISTANCE_FACTOR;

      if (!this.info.isOpen) {
        if (this.dist < appearThreshold) {
          this.info.open({ map: this.map });
        } else if (this.dist < OBJECT_LOAD_THRESHOLD && !object) {
          return loadObject();
        } else {
          renderer?.dispose();
          renderer = null;

          return;
        }
      }

      if (!object) {
        console.info('[3d-objects]', 'no object yet for', name);
        await loadObject();
      }

      // rotate the object so it always faces the same direction in the panorama
      object.rotation.y = Math.atan2(dy, dx);
      // camera.position.z = cameraInitZ * 2 + Math.abs(dy * CAMERA_MOVEMENT_INCREMENT_Z);

      const { zoom  } = this.map.getPov();
      container.style.scale = (1/this.dist) * Math.max(MIN_ZOOM, zoom);

      if (!onGround) {
        container.style.translate = `0 ${Math.min(13,this.dist/3*10)}vh`;
      }

      // move the camera target above the object as we move further away from it
      // this ensures the object doesn't follow the InfoWindow as it rises within the panorama.
      const cameraTarget = new Vector3();
      cameraTarget.copy(object.position);
      camera.lookAt(cameraTarget);
      cameraTarget.y += Math.abs(dx * CAMERA_TARGET_INCREMENT_Z);
      camera.updateMatrixWorld();
      this.render();
    },
    addClickHandler(handler) {
      container.addEventListener('click', () => {
        if (isBeingHovered) {
          handler();
        }
      });
    },
  };
};
