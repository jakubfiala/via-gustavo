import { replayLastChapter } from "./chapters";
import { checkpoints } from "./checkpoints";
import { flashStatus } from "./script/utils";

const MIN = 60_000;
const KIOSK_IDLE_DELAY_MIN = 10;
const CAMERA_WIGGLE_DELAY_MIN = 0.25;

let resetTimeout = 0;
let cameraWiggleTimeout = 0;
let cameraWiggleInterval = 0;

export const initKiosk = (G) => {
  const handler = createIdleTimeoutReset(G);

  document.addEventListener('keypress', handler);
  document.addEventListener('pointermove', handler);
  G.map.addListener("position_changed", handler);
};

const createIdleTimeoutReset = (G) => () => {
  console.info('[kiosk]', 'ending idle behaviour');
  clearTimeout(resetTimeout);
  clearInterval(cameraWiggleTimeout);
  clearInterval(cameraWiggleInterval);

  resetTimeout = setTimeout(() => {
    flashStatus('Looks like you\'ve been inactive for a while. Jumping to the last checkpoint.', 10)(G);
    console.info('[kiosk]', 'replaying last chapter and flagging all checkpoints as not passed');
    checkpoints.forEach((checkpoint) => checkpoint.passed = false);
    replayLastChapter();
  }, KIOSK_IDLE_DELAY_MIN * MIN);

  cameraWiggleTimeout = setTimeout(() => {
    console.info('[kiosk]', 'starting camera wiggle');
    cameraWiggleInterval = setInterval(() => {
      const pov = G.map.getPov();
      const pitch = Math.sin(performance.now() / 1_000) * 1.5;
      G.map.setPov({ heading: pov.heading, pitch });
    }, 50);
  }, CAMERA_WIGGLE_DELAY_MIN * MIN);
}
