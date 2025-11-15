import { replayLastChapter } from "./chapters";
import { checkpoints } from "./checkpoints";
import { flashStatus } from "./script/utils";

const MIN = 60_000;
const KIOSK_IDLE_DELAY_MIN = 5;
const CAMERA_WIGGLE_DELAY_MIN = 0.1;
const NEXT_CHECKPOINT_DELAY_MS = 5_000;

let resetTimeout = 0;
let cameraWiggleTimeout = 0;
let cameraWiggleInterval = 0;
let nextCheckpointButtonTimeout = 0;

const nextCheckpointButton = document.getElementById('next-checkpoint-button');

export const initKiosk = (G) => {
  const handler = createIdleTimeoutReset(G);
  const nonMovingHandler = createNonMovingTimeoutReset(G);
  G.resetIdleTimeout = handler;
  G.resetNonMovingTimeout = handler;

  document.addEventListener('keypress', handler);
  document.addEventListener('pointermove', handler);

  G.map.addListener('position_changed', nonMovingHandler);
};

export const goToNextCheckpoint = (G) => {
  const nextUnpassed = checkpoints.find((c) => !c.passed);
  if (!nextUnpassed) return;

  G.map.setPosition({ lat: nextUnpassed.lat, lng: nextUnpassed.lng });
}

export const createNonMovingTimeoutReset = (G) => () => {
  clearInterval(nextCheckpointButtonTimeout);
  nextCheckpointButton.hidden = true;

  nextCheckpointButtonTimeout = setTimeout(() => {
    nextCheckpointButton.hidden = false;
  }, NEXT_CHECKPOINT_DELAY_MS);
};

const createIdleTimeoutReset = (G) => () => {
  // clearTimeout(resetTimeout);
  clearInterval(cameraWiggleTimeout);
  clearInterval(cameraWiggleInterval);

  // resetTimeout = setTimeout(() => {
  //   flashStatus('Looks like you\'ve been inactive for a while. Jumping to the last checkpoint.', 10)(G);
  //   console.info('[kiosk]', 'replaying last chapter and flagging all checkpoints as not passed');
  //   checkpoints.forEach((checkpoint) => checkpoint.passed = false);
  //   replayLastChapter();
  // }, KIOSK_IDLE_DELAY_MIN * MIN);

  cameraWiggleTimeout = setTimeout(() => {
    console.info('[kiosk]', 'starting camera wiggle');
    cameraWiggleInterval = setInterval(() => {
      const pov = G.map.getPov();
      const pitch = Math.sin(performance.now() / 1_000) * 1.5;
      G.map.setPov({ heading: pov.heading, pitch });
    }, 50);
  }, CAMERA_WIGGLE_DELAY_MIN * MIN);
}
