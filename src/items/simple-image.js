import { OBJECT_APPEAR_THRESHOLD } from '../constants.js';
import { latLngDist } from '../utils.js';
import { createGenericItemContainer } from './generic.js';

const DISTANCE_FACTOR = 1e-1;
const MIN_ZOOM = 0.8;

export const simpleImageMaker = (InfoWindow) => ({ src, name, id, fade = false, correctZ = true }) => {
  const container = createGenericItemContainer();
  const img = new Image();
  img.loading = 'lazy';
  img.src = src;
  img.title = name;
  if (id) {
    img.id = id;
  }

  img.classList.add('gustavo-image');
  if (fade) {
    img.classList.add('gustavo-image--fade');
  }

  container.appendChild(img);

  return {
    name, id,
    insert(map, position) {
      this.map = map;

      this.info = new InfoWindow({
        headerDisabled: true,
        position,
        content: container,
      });
    },
    povUpdate() {
      if (!this.info?.isOpen) {
        return;
      }

      const { zoom  } = this.map.getPov();
      img.style.scale = (1/this.dist) * Math.max(MIN_ZOOM, zoom);
    },
    update() {
      const userPosition = this.map.getPosition();
      const objectPosition = this.info.getPosition();
      const dist = latLngDist(objectPosition, userPosition) * DISTANCE_FACTOR;

      if (!this.info.isOpen) {
        if (dist < OBJECT_APPEAR_THRESHOLD) {
          this.info.open({ map: this.map });
        } else {
          return;
        }
      }

      img.style.scale = (1/dist);

      if (correctZ) {
        img.style.translate = `0 ${Math.min(20,dist/3*10)}vh`;
      }
    },
  };
}
