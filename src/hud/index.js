const latLngDisplay = document.getElementById('latlng-display');
const povDisplay = document.getElementById('pov-display');
const hud = document.getElementById('hud');

const setupDialog = ({ toggle, close, dialog }) => {
  toggle.addEventListener('click', () => {
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

export const setLatLngDisplay = ({ lat, lng }) => latLngDisplay.innerText = `lat: ${lat.toFixed(15)} lng: ${lng.toFixed(15)}`;
export const setPovDisplay = ({ heading, pitch }) => povDisplay.innerText = `heading: ${heading.toFixed(15)} pitch: ${pitch.toFixed(15)}`;

export default () => {
  hud.hidden = false;

  [
    {
      dialog: document.getElementById('chapters-dialog'),
      toggle: document.getElementById('chapters-button'),
      close: document.getElementById('chapters-close'),
    },
    {
      dialog: document.getElementById('inventory-dialog'),
      toggle: document.getElementById('inventory-button'),
      close: document.getElementById('inventory-close'),
    },
    {
      dialog: document.getElementById('about-dialog'),
      toggle: document.getElementById('about-button'),
      close: document.getElementById('about-close'),
    },
    {
      dialog: document.getElementById('settings-dialog'),
      toggle: document.getElementById('settings-button'),
      close: document.getElementById('settings-close'),
    },
  ].forEach((dialogSettings) => setupDialog(dialogSettings));
};
