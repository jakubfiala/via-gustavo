import { documentVisible, sleep } from '../utils.js';

const DEFAULT_DURATION = 4;

const createPlayState = () => ({
  playing: true,
  queue: [],
  set(state) {
    this.playing = state;
    if (playing) {
      this.queue.forEach((resolve) => resolve());
    }
  },
  isPlaying() {
    return new Promise((resolve) => {
      if (this.playing) {
        resolve();
      } else {
        this.queue.push(resolve);
      }
    });
  },
});

export const scheduleScript = async (script, context) => {
  const { textDisplay } = context;
  const playState = createPlayState();

  for (let line of script) {
    await playState.isPlaying();
    const duration = line.duration ?? DEFAULT_DURATION;
    const time = line.time ?? duration;

    await documentVisible();

    if (line.text) {
      textDisplay.addLine(line.text, duration * 1000);
    }

    line.callback?.(context);

    await sleep(time * 1000);
  }
};
