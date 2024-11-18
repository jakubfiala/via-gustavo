import { initCruiseControl } from '../cruise-control';

const latLngDisplay = document.getElementById('latlng-display');
const povDisplay = document.getElementById('pov-display');
const hud = document.getElementById('hud');

const fullscreenButton = document.getElementById('fullscreen-button');
const fullscreenIconEnter = document.getElementById('fullscreen-button-icon-enter');
const fullscreenIconExit = document.getElementById('fullscreen-button-icon-exit');

const setupDialog = ({ toggle, close, dialog }) => {
  toggle?.addEventListener('click', () => {
    if (dialog.open) {
      dialog.close();
    } else {
      dialog.show();
    }
  });

  close.addEventListener('click', () => {
    dialog.close();
  })
};

const LATLNG_PRECISION = 5;
const POV_PRECISION = 2;

export const setLatLngDisplay = ({ lat, lng }) => latLngDisplay.innerText = `lat: ${lat.toFixed(LATLNG_PRECISION)}, lng: ${lng.toFixed(LATLNG_PRECISION)},`;
export const setPovDisplay = ({ heading, pitch }) => povDisplay.innerText = `heading: ${heading.toFixed(POV_PRECISION)}, pitch: ${pitch.toFixed(POV_PRECISION)}`;

export const hideHud = () => hud.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 3_000, fill: 'both' });
export const showHud = () => hud.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 3_000, fill: 'both' });

export const enterFullscreen = async () => {
  try {
    fullscreenButton.title = 'Exit Fullscreen';
    fullscreenButton.ariaLabel = 'Exit Fullscreen';
    fullscreenIconEnter.setAttribute('hidden', 'true');
    fullscreenIconExit.setAttribute('hidden', 'false');

    if (document.body.webkitRequestFullscreen) {
      await document.body.webkitRequestFullscreen();
    } else {
      await document.body.requestFullscreen();
    }
  } catch (err) {
    console.warn('Fullscreen not available', err);
  }
};

export const exitFullscreen = async () => {
  fullscreenButton.title = 'Enter Fullscreen';
  fullscreenButton.ariaLabel = 'Enter Fullscreen';
  fullscreenIconEnter.setAttribute('hidden', 'false');
  fullscreenIconExit.setAttribute('hidden', 'true');
  await document.exitFullscreen?.();
}

export const initFullscreenButton = () => {
  fullscreenButton.addEventListener('click', () => {
    if (document.fullscreenElement) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  });
};

export default (G) => {
  hud.hidden = false;

  initFullscreenButton();
  initCruiseControl(G);

  [
    {
      dialog: document.getElementById('journal-dialog'),
      toggle: document.getElementById('journal-button'),
      close: document.getElementById('journal-close'),
    },
    {
      dialog: document.getElementById('about-dialog'),
      toggle: document.getElementById('about-button'),
      close: document.getElementById('about-close'),
    },
    {
      dialog: document.getElementById('bus-dialog'),
      close: document.getElementById('bus-dialog-close'),
    },
  ].forEach((dialogSettings) => setupDialog(dialogSettings));
};
