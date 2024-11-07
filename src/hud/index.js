const latLngDisplay = document.getElementById('latlng-display');
const povDisplay = document.getElementById('pov-display');
const hud = document.getElementById('hud');

const setupDialog = ({ toggle, close, dialog }) => {
  toggle?.addEventListener('click', () => {
    if (dialog.open) {
      dialog.close();
    } else {
      dialog.show();
    }
  });

  console.log(close);
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

export default () => {
  hud.hidden = false;

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
