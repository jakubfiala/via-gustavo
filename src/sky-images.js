import { scale } from './utils.js';

const HEADING_MIN = 100;
const HEADING_MAX = 250;
const PITCH_MIN = -60;
const PITCH_MAX = 80;
const TRANSLATE_MIN = -100;
const TRANSLATE_MAX = 100;

const skyImages = document.getElementById('sky-images');
const marsSky = document.getElementById('mars-sky-image');

const createUpdater = (map) => () => {
  const { pitch, heading } = map.getPov();
  const tx = scale(heading, HEADING_MIN, HEADING_MAX, TRANSLATE_MAX, TRANSLATE_MIN);
  const ty = scale(pitch, PITCH_MIN, PITCH_MAX, TRANSLATE_MIN, TRANSLATE_MAX);
  marsSky.style.translate = `${tx}vw ${ty}vh`;
};

export const showSkyImages = (G) => {
  skyImages.hidden = false;

  const { google: { event }, map } = G;
  const opacities = Array.from({ length: 30 }).map(() => Math.random() * 0.1 + 0.3);
  const keyframes = opacities.map((o) => ({ opacity: o }));
  marsSky.animate(keyframes, { duration: 2000, easing: 'ease-in-out', iterations: Infinity });

  const update = createUpdater(map);
  update();

  const listener = event.addListener(
    map,
    "pov_changed",
    update,
  );

  G.skyImages = {
    hide: () => {
      () => listener.remove();
      skyImages.hidden = true;
    }
  };
};
