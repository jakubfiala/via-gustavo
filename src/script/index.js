import { documentVisible, scale, sleep } from '../utils.js';
import { playSpeech } from './speech.js';

const MIN_WORDS = 1;
const MAX_WORDS = 10;
const MIN_DURATION = 1.5;
const MAX_DURATION = 7;
const DEFAULT_DURATION = 4;

window.currentScript = null;

const getDurationFromText = text => {
  if (text) {
    const words = text.split(' ');
    const duration = scale(words.length, MIN_WORDS, MAX_WORDS, MIN_DURATION, MAX_DURATION);
    return Math.min(MAX_DURATION, Math.max(MIN_DURATION, duration));
  }

  return DEFAULT_DURATION;
};

export const scheduleScript = async (script, context) => {
  const { textDisplay } = context;

  let interrupted = false;
  currentScript?.interrupt();
  currentScript = { interrupt: () => interrupted = true };

  for (let line of script) {
    if (interrupted) {
      return;
    }

    const duration = line.duration ?? getDurationFromText(line.text);
    const time = line.time ?? duration;

    await documentVisible();

    line.callback?.(context);

    if (line.text) {
      textDisplay.addLine(line.text, duration * 1000);
      await playSpeech(context, line.text, duration * 1000);
    } else {
      await sleep(time * 1000);
    }
  }
  // we played the whole script without interruption
  currentScript = null;
};
