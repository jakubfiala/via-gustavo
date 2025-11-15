import { goToNextCheckpoint } from "./checkpoints";
import { clamp, deg, rad } from "./utils";
import { throttle } from "lodash";

const MIN_MOVEMENT = 0.2;
const OFFSET_X =  0; // 0.051000000000000004;
const OFFSET_Y =  0; // -0.045;
const ACCEL_VELOCITY = 6e-6;
const FAST_ACCEL_VELOCITY = 1e-5;
const TURN_VELOCITY = 2.0;

const roundFloat = (x, y) => Math.round (x / y) * y;

let gamepadMove = null;
let b0pressed = false;
let b1pressed = false;
let b5pressed = false;
let b8pressed = false;
let b9pressed = false;

const journalDialog = document.getElementById('journal-dialog');
const aboutDialog = document.getElementById('about-dialog');
const ccButton = document.getElementById('cruise-control-button');

export default (G) => {
  window.addEventListener("gamepadconnected", function(e) {
    console.info('[gamepad]', 'connected at index %d: %s. %d buttons, %d axes.',
                navigator.getGamepads()[0].index, navigator.getGamepads()[0].id,
                navigator.getGamepads()[0].buttons.length, navigator.getGamepads()[0].axes.length);

    G.gamepad = navigator.getGamepads()[0];

    if (navigator.getGamepads()[0]?.axes.length < 4) {
      console.warn('[gamepad]', 'not enough joystick axes found');
      return;
    }

    const throttledPositionUpdate = throttle((G, newPosition) => {
      G.map.setPosition(newPosition);
      G.resetIdleTimeout?.();
    }, 500, { leading: true, trailing: true });

    const controlLoop = () => {
      if (!document.hasFocus || document.visibilityState !== "visible") return;

      const gamepad = navigator.getGamepads()[0];
      const [lx, ly, rx, ry] = gamepad.axes;

      const rr = Math.sqrt(rx ** 2 + ry ** 2);

      if (rr > 0.1) {
        const pov = map.pov;
        pov.heading = (pov.heading + rx * TURN_VELOCITY) % 360;
        pov.pitch = clamp(pov.pitch - ry * TURN_VELOCITY, -90, 90);
        G.map.setPov(pov);
        G.resetIdleTimeout?.();
      }

      if (!b5pressed && gamepad.buttons[5]?.value > 0) {
        b5pressed = true;
      }

      if (!b0pressed && gamepad.buttons[0]?.value > 0) {
        b0pressed = true;
      }

      if (b0pressed && gamepad.buttons[0]?.value === 0) {
        b0pressed = false;
        location.reload();
      }

      if (!b1pressed && gamepad.buttons[1]?.value > 0) {
        b1pressed = true;
      }

      if (b1pressed && gamepad.buttons[1]?.value === 0) {
        b1pressed = false;
        goToNextCheckpoint(G);
      }

      // if (b5pressed && gamepad.buttons[5]?.value === 0) {
      //   b5pressed = false;
      //   G.resetIdleTimeout?.();
      //   ccButton.click();
      // }

      if (!b8pressed && gamepad.buttons[8]?.value > 0) {
        b8pressed = true;
      }

      if (b8pressed && gamepad.buttons[8]?.value === 0) {
        b8pressed = false;
        if (aboutDialog.open) {
          aboutDialog.close();
        } else {
          aboutDialog.show();
        }
      }

      if (!b9pressed && gamepad.buttons[9]?.value > 0) {
        b9pressed = true;
      }

      if (b9pressed && gamepad.buttons[9]?.value === 0) {
        b9pressed = false;
        if (journalDialog.open) {
          journalDialog.close();
        } else {
          journalDialog.show();
        }
      }

      if (Math.abs(ly) > 0.1) {
        const heading = G.map.getPov().heading;
        const position = { lat: G.map.getPosition().lat(), lng: G.map.getPosition().lng() };
        const acceleration = gamepad.buttons[7].value > 0 ? FAST_ACCEL_VELOCITY : ACCEL_VELOCITY

        gamepadMove = !gamepadMove ? position : {
          lat: gamepadMove.lat - acceleration * ly * Math.cos(rad(heading)),
          lng: gamepadMove.lng - acceleration * ly * Math.sin(rad(heading)),
        };

        throttledPositionUpdate(G, gamepadMove);
      } else {
        gamepadMove = null;
      }

      window.requestAnimationFrame(controlLoop);
    };

    controlLoop();
  });
};
