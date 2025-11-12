import { replayLastChapter } from "./chapters";
import { checkpoints } from "./checkpoints";
import { flashStatus } from "./script/utils";

const MIN = 60_000;
const KIOSK_IDLE_DELAY_MIN = 0.5;

let timeout = 0;

export const initKiosk = (G) => {
  const handler = createIdleTimeoutReset(G);

  document.addEventListener('keypress', handler);
  document.addEventListener('pointermove', handler);
  G.map.addListener("pov_changed", handler);
};

const createIdleTimeoutReset = (G) => () => {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    flashStatus('Looks like you\'ve been inactive for a while. Jumping to the last checkpoint.', 10)(G);
    console.info('[kiosk]', 'replaying last chapter and flagging all checkpoints as not passed');
    checkpoints.forEach((checkpoint) => checkpoint.passed = false);
    replayLastChapter();
  }, KIOSK_IDLE_DELAY_MIN * MIN);
}
