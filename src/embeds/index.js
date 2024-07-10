import { latLngDist } from '../utils.js';

const DISTANCE_FACTOR = 1e-1;

export const embedMaker = (StreetView) => (url) => {
  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.width = window.innerWidth/2;
  iframe.height = window.innerHeight/2;

  return {
    insert(map, position) {
      this.map = map;

      this.info = new StreetView.InfoWindow({
        headerDisabled: true,
        position,
        content: iframe,
      });

      this.info.open({ map });
    },
    update() {
      const userPosition = this.map.getPosition();
      const objectPosition = this.info.getPosition();
      const dist = latLngDist(objectPosition, userPosition) * DISTANCE_FACTOR;

      iframe.width = window.innerWidth/2 * (1/dist);
      iframe.height = window.innerHeight/2 * (1/dist);
    },
  };
}
