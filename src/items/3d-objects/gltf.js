import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const memoized = new Map();

export const loadGLTF = (path) => new Promise((resolve, reject) => {
  if (memoized.has(path)) {
    return resolve(memoized.get(path).clone(true));
  }

  const loader = new GLTFLoader().setPath(path);

  const onLoad = async ({ scene }) => {
    memoized.set(path, scene);
    resolve(scene);
  };

  loader.load('model.gltf', onLoad, () => {}, reject);
});
