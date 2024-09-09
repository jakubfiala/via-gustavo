import { latLngDist } from '../../../src/utils.js';

const FREQ_DEFAULT = 300;
const FREQ_MIN = 80;
const FREQ_MAX = 5000;
const RANGE_M = 120;

const startSound = (audioContext) => {
  const osc = new OscillatorNode(audioContext, { type: 'square', frequency: 2000 });
  const env = new GainNode(audioContext, { gain: 0 });

  let frequency = FREQ_DEFAULT;

  const playClick = () => {
    setTimeout(playClick, Math.random() * frequency + 50);

    if (frequency >= FREQ_MAX) {
      return;
    }

    console.log('click');
    env.gain.setValueAtTime(Math.random() * 0.2 + 0.2, audioContext.currentTime);
    env.gain.linearRampToValueAtTime(0, audioContext.currentTime + Math.random() * 0.01);
  };

  console.log('playing clicks');
  setTimeout(playClick, 10);

  osc.connect(env);
  env.connect(audioContext.destination);
  osc.start(0);

  return {
    setRadioactivity: (radioactivity) => {
      console.log('setting radioactivity to', radioactivity);
      frequency = FREQ_MIN + (1 / radioactivity) * FREQ_MAX;
    }
  }
}

export const initGeigerCounterDetection = (map, audioContext, targetLatLng) => {
  console.info('detecting radioactivity...');

  const { setRadioactivity } = startSound(audioContext);

  const distance = latLngDist(targetLatLng, map.getPosition());
  setRadioactivity(1 / (distance / RANGE_M));

  google.maps.event.addListener(
    map,
    "position_changed",
    () => {
      const distance = latLngDist(targetLatLng, map.getPosition());
      setRadioactivity(1 / (distance / RANGE_M));
    },
  );
};
