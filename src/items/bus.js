const overlay = document.getElementById('bus-overlay');
const dialog = document.getElementById('bus-dialog');
const form = document.getElementById('bus-dialog-form');
const destination = document.getElementById('bus-dialog-destination');

export const bus = document.getElementById('bus-audio');
export const car = document.getElementById('car-audio');

export const travel = (map, { audio = bus, latLng, pov }) => {
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

export const itemDesc = createBusStopItem({
  position: { lat: -20.43098, lng: -69.56023 },
  destination: {
    locationName: 'La Tirana',
    latLng: {
      lat: -20.3412425,
      lng: -69.6565267,
    },
    pov: { heading: 0, pitch: 0 },
  },
  cameraPosition: { x: -8, y: 3.5 },
  scale: 0.8,
});
