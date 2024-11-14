import { OBJECT_APPEAR_THRESHOLD } from '../constants.js';
import { latLngDist } from '../utils.js';
import { createGenericItemContainer } from './generic.js';

const DISTANCE_FACTOR = 1e-1;
const CARD_WIDTH = 250;

export const cardMaker = (InfoWindow) => ({ src, name }) => {
  const container = createGenericItemContainer();
  const img = document.createElement('img');
  img.loading = 'lazy';
  img.src = src;
  img.width = CARD_WIDTH;
  img.classList.add('gustavo-card');
  img.title = name;
  container.appendChild(img);

  return {
    insert(map, position) {
      this.map = map;

      this.info = new InfoWindow({
        headerDisabled: true,
        position,
        content: container,
      });

      console.info('[card]', name, { position, move: (p) => this.info.setPosition(p) });
    },
    update() {
      const userPosition = this.map.getPosition();
      const objectPosition = this.info.getPosition();
      const dist = latLngDist(objectPosition, userPosition) * DISTANCE_FACTOR;

      if (!this.info.isOpen) {
        if (dist < OBJECT_APPEAR_THRESHOLD) {
          console.log('opening', img.src);
          this.info.open({ map: this.map });
        } else {
          return;
        }
      }

      img.width = CARD_WIDTH * (1/dist);
    },
  };
}
