import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const memoized = new Map();

const load = (path) => new Promise((resolve, reject) => {
  const loader = new GLTFLoader().setPath(path);
  const onLoad = async ({ scene }) => {
    resolve(scene);
  };

  loader.load('model.gltf', onLoad, () => {}, reject);
});

export const loadGLTF = async (path) => {
  if (memoized.has(path)) {
    console.info('[3d-objects]', 'memoized GLTF for', path);
    const scene = await memoized.get(path);
    return scene.clone(true);
  }

  // memoize the promise, so that in case multiple objects
  // with the same GLTF load at once, they all wait for the single
  // request to fullfill, rather than all sending their individual requests
  // (because the initial GLTF hasn't been memoized yet).
  const promise = load(path);
  memoized.set(path, promise);

  return promise;
};
