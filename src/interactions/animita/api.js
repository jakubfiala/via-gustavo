import { ANIMITAS_ENDPOINT } from '../../constants.js';
import { LIMBO_LNG_STEP } from '../../custom-panorama/limbo.js';
import { getItemNamesForMask, getMaskForItemNames } from './item-masks.js';
import { makeAnimita } from './item.js';

export const loadedAnimitas = new Set();
export const requestedAnimitas = new Set();

const EX_VOTO_MAX = 64;
const initialLoadOffsets = [-3,-2,2,3];
const subsequentLoadOffsets = [-5,-4,4,5];

const headers = {
  'Content-Type': 'application/json',
};

export const saveAnimita = async (animita) => {
  const position = animita.position.lng() * LIMBO_LNG_STEP;

  const url = new URL(ANIMITAS_ENDPOINT);
  url.searchParams.set('pos', Math.round(position));

  const body = JSON.stringify({
    exVoto: animita.exVoto.slice(0, EX_VOTO_MAX),
    items: getMaskForItemNames(animita.items),
  });

  const response = await fetch(url, { method: 'PUT', headers, body });
  if (!response.ok) {
    throw new Error('API returned non-200');
  }
};

export const loadAnimitas = async (G, initial = false) => {
  const latLng = G.map.getPosition();
  if (latLng.lat() !== 0) {
    return;
  }

  const position = latLng.lng() * LIMBO_LNG_STEP;

  const url = new URL(ANIMITAS_ENDPOINT);

  const offsets = initial ? initialLoadOffsets : subsequentLoadOffsets;
  const positions = offsets
    .map((o) => Math.round(position + o))
    .filter((p) => !requestedAnimitas.has(p));

  if (positions.length < 1) {
    console.info('[animitas]', 'all requested animitas have been loaded already');
    return;
  }

  positions.forEach((p) => {
    url.searchParams.append('pos', p);
    requestedAnimitas.add(p);
  });

  const response = await fetch(url);
  const animitas = await response.json();
  console.info('[animitas]', 'loading nearby animitas', animitas);

  animitas.forEach(({ exVoto, items, position }) => {
    if (loadedAnimitas.has(position)) {
      return;
    }

    console.info('[animitas]', 'loaded', position);
    loadedAnimitas.add(position);

    makeAnimita(G, {
      exVoto,
      items: getItemNamesForMask(items),
      position: new G.google.LatLng(0, position / LIMBO_LNG_STEP),
    });
  });
};
