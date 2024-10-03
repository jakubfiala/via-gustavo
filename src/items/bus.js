import { loadGLTF } from './3d-objects/gltf.js';

export const takeTheBus = (map, { locationName, latLng, pov }) => {
  const agree = confirm(`Are you ready to take the bus to ${locationName}?`)
  if (agree) {
    const overlay = document.getElementById('bus-overlay');
    const audio = document.getElementById('bus-audio');

    overlay.hidden = false;
    audio.play();

    overlay.addEventListener('transitionend', () => {
      map.setPosition(latLng);
      map.setPov(pov);
    }, { once: true });

    audio.addEventListener('ended', () => {
      overlay.hidden = true;
    }, { once: true });
  }
};

export const createBusStopItem = ({ position, destination: { locationName, latLng, pov }, cameraPosition, scale }) => ({
  name: `Bus Stop to ${locationName}`,
  collectible: false,
  position,
  async create(makers) {
    return makers.threeObject(await loadGLTF('/assets/items/bus-stop/'), { name: this.name, cameraPosition, scale });
  },
  onClick: (map, item) => {
    takeTheBus(map, {
      locationName,
      latLng,
      pov,
    });
  },
});
