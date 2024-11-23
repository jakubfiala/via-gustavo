import { latLngDist } from '../../../../src/utils.js';
import { startDisplay } from './display.js';

const FREQ_DEFAULT = 300;
const FREQ_MIN = 30;
const FREQ_MAX = 5000;
const RANGE_M = 300;

const startSound = (audioContext) => {
  const osc = new OscillatorNode(audioContext, { type: 'square', frequency: 2000 });
  const env = new GainNode(audioContext, { gain: 0 });

  let frequency = FREQ_DEFAULT;
  let timeout = null;
  let beepDuration = 0.01;

  const playClick = () => {
    timeout = setTimeout(playClick, Math.random() * frequency + 50);

    if (frequency >= FREQ_MAX) {
      return;
    }

    env.gain.setValueAtTime(Math.random() * 0.2 + 0.3, audioContext.currentTime);
    env.gain.linearRampToValueAtTime(0, audioContext.currentTime + Math.random() * beepDuration);
  };

  timeout = setTimeout(playClick, 10);

  osc.connect(env);
  env.connect(audioContext.destination);
  osc.start(0);

  return {
    soundForRadioactivity: (radioactivity) => {
      console.log('[geiger-counter]', 'setting radioactivity to', radioactivity);
      frequency = FREQ_MIN + (1 / radioactivity) * FREQ_MAX;
    },
    overheatSound: () => {
      beepDuration = 0.5;
    },
    endSound() {
      clearTimeout(timeout);
      osc.stop();
    },
  }
};

const radioactivityFromDistance = (p1, p2) => {
  const distance = latLngDist(p1, p2);
  const fromDistance = 1 / (distance / RANGE_M);

  if (fromDistance < 0.7) {
    return Math.random() * 0.7;
  }

  return fromDistance;
};

export const initGeigerCounterDetection = (context, item, targetLatLng) => {
  console.info('[geiger-counter]', 'detecting radioactivity...', item, targetLatLng);

  const { soundForRadioactivity, overheatSound, endSound } = startSound(context.audioContext);
  const { displayRadioactivity, overheatDisplay } = startDisplay(item);

  const update = () => {
    const radioactivity = radioactivityFromDistance(targetLatLng, context.map.getPosition());
    soundForRadioactivity(radioactivity);
    displayRadioactivity(radioactivity);
  };

  update();

  const listener = google.maps.event.addListener(context.map, "position_changed", update);

  return {
    overheat: () => {
      console.info('[geiger-counter]', 'overheating!!!');
      overheatSound();
      overheatDisplay();
    },
    end: () => {
      console.info('[geiger-counter]', 'ending');
      endSound();
      listener.remove();
    }
  }
};
