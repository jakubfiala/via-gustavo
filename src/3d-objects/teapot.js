import {
  Mesh,
  MeshPhongMaterial,
} from 'three';
import { TeapotGeometry } from 'three/addons/geometries/TeapotGeometry.js';

export default () => {
  const geometry = new TeapotGeometry(1, 6);
  const material = new MeshPhongMaterial();
  return new Mesh( geometry, material );
}
