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

export const gustavoSequence = async (G) => {
  disableClickToGoCB(G);
  G.score.lobotomy.play();
  removeTask();
  hideHud();
  G.map.setOptions({ linksControl: false });
  G.soundscape.set(G.soundscape.base);

  for (const [index, position] of enumerate(jumps)) {
    G.map.setPosition(position);

    if (index < jumps.length - 1) {
      await sleep(JUMP_MS);
    } else {
      approachPov(G, gustavoPov, PAN_MS, 200);
    }
  }

  await sleep(PAN_MS + 3_000);
  await scheduleScript(poem, G);

  await sleep(2_000);

  G.sfx.carCrash();
  G.soundscapeGain.gain.linearRampToValueAtTime(0, G.audioContext.currentTime + 6);
  await sleep(5_550);

  approachPov(G, crashPov, 300, 50);

  G.scoreGain.gain.setValueAtTime(0, G.audioContext.currentTime);
  G.container.animate([
    { filter: 'brightness(3)' },
    { filter: 'brightness(1.1)' },
  ], { duration: 15_000, fill: 'forwards' });

  G.map.setPano('gustavoDissolve1');
  G.map.setOptions({ linksControl: true });
  G.skyImages?.hide();

  G.score.lithiumAtmo.preload = 'auto';

  let helpListener;

  const helpTimeout = setTimeout(
    () => {
      showHelpMessage('Click on the white arrow to move', [], 7)(G);
      helpListener?.remove();
    },
    20_000,
  );

  helpListener = G.google.event.addListener(G.map, 'pano_changed', () => {
    clearTimeout(helpTimeout);
    helpListener?.remove();
  });

  showHud();
};
