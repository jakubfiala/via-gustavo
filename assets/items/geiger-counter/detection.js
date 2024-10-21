import { MeshBasicMaterial, CanvasTexture, MeshStandardMaterial } from 'three';
import { latLngDist, scale } from '../../../src/utils.js';

const FREQ_DEFAULT = 300;
const FREQ_MIN = 80;
const FREQ_MAX = 5000;
const RANGE_M = 180;

const GAUGE_NAME = 'moveable-gauge';

const startSound = (audioContext) => {
  const osc = new OscillatorNode(audioContext, { type: 'square', frequency: 2000 });
  const env = new GainNode(audioContext, { gain: 0 });

  let frequency = FREQ_DEFAULT;

  const playClick = () => {
    setTimeout(playClick, Math.random() * frequency + 50);

    if (frequency >= FREQ_MAX) {
      return;
    }

    env.gain.setValueAtTime(Math.random() * 0.2 + 0.2, audioContext.currentTime);
    env.gain.linearRampToValueAtTime(0, audioContext.currentTime + Math.random() * 0.01);
  };

  setTimeout(playClick, 10);

  osc.connect(env);
  env.connect(audioContext.destination);
  osc.start(0);

  return {
    setRadioactivity: (radioactivity) => {
      console.log('[geiger-counter]', 'setting radioactivity to', radioactivity);
      frequency = FREQ_MIN + (1 / radioactivity) * FREQ_MAX;
    }
  }
};

const createDisplay = (item) => {
  const mesh = item.scene.getObjectByName('active-display');
  const canvas = document.createElement('canvas');
  canvas.width = 357;
  canvas.height = 218;

  const map = new CanvasTexture(canvas);
  mesh.material = new MeshStandardMaterial({
    map,
    emissive: 0x36bdcc,
    emissiveIntensity: 1,
  });

  const dContext = canvas.getContext('2d');
  console.info('[geiger-counter]', 'creating display', canvas, dContext);

  return {
    update: (radioactivity) => {
      dContext.fillStyle = '#36bdcc';
      dContext.fillRect(0, 0, canvas.width, canvas.height);

      dContext.fillStyle = '#000d';
      dContext.font = '80px monospace';

      const text = Math.round(radioactivity * 1000).toString().padStart(5, '0');
      dContext.fillText(text, 60, 140);
      map.needsUpdate = true;
    },
  };
}

const startDisplay = (item) => {
  console.info('[geiger-counter]', 'displaying', item);
  const gauge = item.scene.getObjectByName(GAUGE_NAME);
  console.info('[geiger-counter]', 'getting gauge', gauge);

  const display = createDisplay(item);

  return {
    displayRadioactivity: (radioactivity) => {
      console.info('[geiger-counter]', 'displaying radioactivity', radioactivity);
      gauge.rotation.y = Math.PI * scale(radioactivity, 0, 15, -0.25, 0.2);
      display.update(radioactivity);
      item.render();
    },
  };
};

const radioactivityFromDistance = (p1, p2) => {
  const distance = latLngDist(p1, p2);
  return 1 / (distance / RANGE_M);
};

export const initGeigerCounterDetection = (context, item, targetLatLng) => {
  console.info('[geiger-counter]', 'detecting radioactivity...', item, targetLatLng);

  const { setRadioactivity: soundForRadioactivity } = startSound(context.audioContext);
  const { displayRadioactivity } = startDisplay(item);

  const update = () => {
    const radioactivity = radioactivityFromDistance(targetLatLng, context.map.getPosition());
    soundForRadioactivity(radioactivity);
    displayRadioactivity(radioactivity);
  };

  update();

  google.maps.event.addListener(context.map, "position_changed", update);
};
