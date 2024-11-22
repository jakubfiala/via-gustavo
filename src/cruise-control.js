import { rad } from './utils.js';

const ACCEL_VELOCITY = 2e-4;
const MOVE_INTERVAL = 1_000;
const BUTTON_ON_CLASS = 'hud__button--on';

export const button = document.getElementById('cruise-control-button');

let enabled = false;
let timeout = null;
let listener = null;

const move = (G) => {
  if (G.map.getLinks()?.length > 2) {
    disableCruiseControl(G);
  }

  const { heading } = G.map.getPov();
  const position = G.map.getPosition();

  const radians = rad(heading);
  const newPosition = {
    lat: position.lat() + ACCEL_VELOCITY * Math.cos(radians),
    lng: position.lng() + ACCEL_VELOCITY * Math.sin(radians),
  };

  G.map.setPosition(newPosition);
}

export const enableCruiseControl = (G) => {
  console.info('[cruise-control]', 'enabling');
  clearTimeout(timeout);

  listener = G.map.addListener('pano_changed', () => {
    timeout = setTimeout(() => move(G), MOVE_INTERVAL);
  });

  move(G);

  button.classList.add(BUTTON_ON_CLASS);
  button.title = 'Disable Cruise Control';
  enabled = true;
};

export const disableCruiseControl = (G) => {
  console.info('[cruise-control]', 'disabling');
  clearTimeout(timeout);
  listener?.remove();

  button.classList.remove(BUTTON_ON_CLASS);
  button.title = 'Enable Cruise Control';
  timeout = null;
  enabled = false;
};

export const initCruiseControl = (G) => {
  console.info('[cruise-control]', 'initialising');

  const toggle = () => {
    console.info('[cruise-control]', 'toggling');
    if (enabled) {
      disableCruiseControl(G);
    } else {
      enableCruiseControl(G);
    }
  };

  document.addEventListener('keypress', (event) => {
    if (event.key === ' ') {
      toggle();
    }
  });

  button.addEventListener('click', toggle);
};
