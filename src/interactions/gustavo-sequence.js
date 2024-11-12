import { hideHud, showHud } from '../hud/index.js';
import { poem } from '../script/chapter6.js';
import { scheduleScript } from '../script/index.js';
import { disableClickToGoCB, showHelpMessage } from '../script/utils.js';
import { removeTask } from '../task.js';
import { sleep, enumerate, approachPov } from '../utils.js';

const JUMP_MS = 4_300;
const PAN_MS = 5_000;
const gustavoPov = { pitch: -10, heading: 65, zoom: 4 };
const crashPov = { pitch: -15, heading: 180, zoom: 5 };

const jumps = [
  { lat: -20.43765, lng: -69.70143 },
  { lat: -20.43817, lng: -69.70122 },
  { lat: -20.43852, lng: -69.70106 },
  { lat: -20.4388734, lng: -69.7009038 },
];

export const gustavoSequence = async (context) => {
  disableClickToGoCB(context);
  context.score.lobotomy.play();
  removeTask();
  hideHud();
  context.map.setOptions({ linksControl: false });
  context.soundscape.set(context.soundscape.base);

  for (const [index, position] of enumerate(jumps)) {
    context.map.setPosition(position);

    if (index < jumps.length - 1) {
      await sleep(JUMP_MS);
    } else {
      approachPov(context, gustavoPov, PAN_MS, 200);
    }
  }

  await sleep(PAN_MS + 3_000);
  await scheduleScript(poem, context);

  await sleep(2_000);

  context.sfx.carCrash();
  context.soundscapeGain.gain.linearRampToValueAtTime(0, context.audioContext.currentTime + 6);
  await sleep(5_550);

  approachPov(context, crashPov, 300, 50);

  context.scoreGain.gain.setValueAtTime(0, context.audioContext.currentTime);
  context.container.animate([
    { filter: 'brightness(3)' },
    { filter: 'brightness(1.1)' },
  ], { duration: 15_000, fill: 'forwards' });

  context.map.setPano('gustavoDissolve1');
  context.map.setOptions({ linksControl: true });
  context.skyImages.hide();

  context.score.lithiumAtmo.preload = 'auto';

  const helpTimeout = setTimeout(
    () => showHelpMessage('Click on the white arrow to move')(context),
    20_000,
  );

  context.container.addEventListener('click', () => clearTimeout(helpTimeout), { once: true });

  showHud();
};
