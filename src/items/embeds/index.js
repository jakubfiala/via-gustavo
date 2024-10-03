import { OBJECT_APPEAR_THRESHOLD } from '../../constants.js';
import { latLngDist } from '../../utils.js';

const DISTANCE_FACTOR = 1e-1;

export const embedMaker = (InfoWindow) => (url) => {
  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.width = window.innerWidth/2;
  iframe.height = window.innerHeight/2;

  return {
    insert(map, position) {
      this.map = map;

      this.info = new InfoWindow({
        headerDisabled: true,
        position,
        content: iframe,
      });
    },
    update() {
      const userPosition = this.map.getPosition();
      const objectPosition = this.info.getPosition();
      const dist = latLngDist(objectPosition, userPosition) * DISTANCE_FACTOR;

      if (!this.info.isOpen) {
        if (dist < OBJECT_APPEAR_THRESHOLD) {
          console.log('opening', url);
          this.info.open({ map: this.map });
        } else {
          return;
        }
      }

      iframe.width = window.innerWidth/2 * (1/dist);
      iframe.height = window.innerHeight/2 * (1/dist);
    },
  };
}
