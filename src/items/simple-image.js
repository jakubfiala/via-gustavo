import { OBJECT_APPEAR_THRESHOLD } from '../constants.js';
import { latLngDist } from '../utils.js';
import { createGenericItemContainer } from './generic.js';

const DISTANCE_FACTOR = 1e-1;

export const simpleImageMaker = (InfoWindow) => ({ src, name, id }) => {
  const container = createGenericItemContainer();
  const img = new Image();
  img.loading = 'lazy';
  img.src = src;
  img.title = name;
  if (id) {
    img.id = id;
  }

  img.classList.add('gustavo-image');
  container.appendChild(img);

  return {
    insert(map, position) {
      this.map = map;

      this.info = new InfoWindow({
        headerDisabled: true,
        position,
        content: container,
      });
    },
    update() {
      const userPosition = this.map.getPosition();
      const objectPosition = this.info.getPosition();
      const dist = latLngDist(objectPosition, userPosition) * DISTANCE_FACTOR;

      if (!this.info.isOpen) {
        if (dist < OBJECT_APPEAR_THRESHOLD) {
          console.log('opening', src);
          this.info.open({ map: this.map });
        } else {
          return;
        }
      }

      img.style.scale = (1/dist);
    },
  };
}
