import { scale } from './utils.js';

const HEADING_MIN = 200;
const HEADING_MAX = 350;
const PITCH_MIN = -60;
const PITCH_MAX = 80;
const TRANSLATE_MIN = -100;
const TRANSLATE_MAX = 100;

const skyImages = document.getElementById('sky-images');

export const showSkyImages = (event, map) => {
  skyImages.hidden = false;

  const marsSky = document.getElementById('mars-sky-image');
  const listener = event.addListener(
    map,
    "pov_changed",
    () => {
      const { pitch, heading } = map.getPov();
      const tx = scale(heading, HEADING_MIN, HEADING_MAX, TRANSLATE_MAX, TRANSLATE_MIN);
      const ty = scale(pitch, PITCH_MIN, PITCH_MAX, TRANSLATE_MIN, TRANSLATE_MAX);
      marsSky.style.translate = `${tx}vw ${ty}vh`;
    },
  );

  return {
    hide: () => {
      () => listener.remove();
      skyImages.hidden = true;
    }
  };
};
