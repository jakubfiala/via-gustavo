const overlay = document.getElementById('bus-overlay');
const audio = document.getElementById('bus-audio');
const dialog = document.getElementById('bus-dialog');
const form = document.getElementById('bus-dialog-form');
const destination = document.getElementById('bus-dialog-destination');

const travel = (map, { locationName, latLng, pov }) => {
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

export const takeTheBus = (map, data) => {
  destination.innerText = data.locationName;
  dialog.showModal();
  form.addEventListener('submit', () => travel(map, data), { once: true });
};

export const createBusStopItem = ({ position, destination: { locationName, latLng, pov }, cameraPosition, scale }) => ({
  name: `Take the bus to ${locationName}`,
  collectible: false,
  position,
  async create(makers) {
    return makers.threeObject('/assets/items/bus-stop/',
      { name: this.name, cameraPosition, lightPosition: { x: -0.5, z: -0.7 }, scale });
  },
  onClick: (map, item) => {
    takeTheBus(map, {
      locationName,
      latLng,
      pov,
    });
  },
});
