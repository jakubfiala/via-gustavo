import { OBJECT_APPEAR_THRESHOLD } from '../../constants.js';
import { latLngDist } from '../../utils.js';
import { createGenericItemContainer } from '../generic.js';

const DISTANCE_FACTOR = 1e-1;
const MIN_ZOOM = 0.8;

export const embedMaker = (InfoWindow) => (url) => {
  const container = createGenericItemContainer();
  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.width = window.innerWidth/2;
  iframe.height = window.innerHeight/2;
  container.appendChild(iframe);

  return {
    insert(map, position) {
      this.map = map;

      this.info = new InfoWindow({
        headerDisabled: true,
        position,
        content: container,
      });
    },
    povUpdate() {
      if (!this.info.isOpen) {
        return;
      }

      const { zoom  } = this.map.getPov();
      iframe.style.scale = (1/this.dist) * Math.max(MIN_ZOOM, zoom);
    },
    update() {
      const userPosition = this.map.getPosition();
      const objectPosition = this.info.getPosition();
      this.dist = latLngDist(objectPosition, userPosition) * DISTANCE_FACTOR;

      if (!this.info.isOpen) {
        if (this.dist < OBJECT_APPEAR_THRESHOLD) {
          this.info.open({ map: this.map });
        } else {
          return;
        }
      }

      iframe.style.scale = (1/this.dist);
      iframe.style.translate = `0 ${Math.min(13,this.dist/3*10)}vh`;
    },
  };
}
