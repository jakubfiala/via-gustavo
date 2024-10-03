import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export const loadGLTF = (path) => new Promise((resolve, reject) => {
  const loader = new GLTFLoader().setPath(path);
  loader.load('model.gltf', async (gltf) => resolve(gltf.scene), () => {}, reject);
});
