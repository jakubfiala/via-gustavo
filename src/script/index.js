import { documentVisible, sleep } from '../utils.js';

const DEFAULT_DURATION = 4;

window.currentScript = null;

export const scheduleScript = async (script, context) => {
  const { textDisplay } = context;

  let interrupted = false;
  currentScript?.interrupt();
  currentScript = { interrupt: () => interrupted = true };

  for (let line of script) {
    if (interrupted) {
      return;
    }

    const duration = line.duration ?? DEFAULT_DURATION;
    const time = line.time ?? duration;

    await documentVisible();

    if (line.text) {
      textDisplay.addLine(line.text, duration * 1000);
      // const utterance = new SpeechSynthesisUtterance(line.text);
      // speechSynthesis.speak(utterance);
    }

    line.callback?.(context);

    await sleep(time * 1000);
  }
  // we played the whole script without interruption
  currentScript = null;
};
