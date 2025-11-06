import { clamp, deg, rad } from "./utils";
import { throttle } from "lodash";

const MIN_MOVEMENT = 0.2;
const OFFSET_X =  0; // 0.051000000000000004;
const OFFSET_Y =  0; // -0.045;
const ACCEL_VELOCITY = 5e-6;
const TURN_VELOCITY = 2.0;

const roundFloat = (x, y) => Math.round (x / y) * y;

let gamepadMove = null;

export default (scriptContext) => {
  window.addEventListener("gamepadconnected", function(e) {
    console.info('[gamepad]', 'connected at index %d: %s. %d buttons, %d axes.',
                navigator.getGamepads()[0].index, navigator.getGamepads()[0].id,
                navigator.getGamepads()[0].buttons.length, navigator.getGamepads()[0].axes.length);

    if (navigator.getGamepads()[0]?.axes.length < 4) {
      console.warn('[gamepad]', 'not enough joystick axes found');
      return;
    }

    const throttledPositionUpdate = throttle((map, newPosition) => {
      map.setPosition(newPosition);
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
        scriptContext.map.setPov(pov);
      }

      if (Math.abs(ly) > 0.1) {
        const heading = scriptContext.map.getPov().heading;
        const position = { lat: scriptContext.map.getPosition().lat(), lng: scriptContext.map.getPosition().lng() };

        gamepadMove = !gamepadMove ? position : {
          lat: gamepadMove.lat - ACCEL_VELOCITY * ly * Math.cos(rad(heading)),
          lng: gamepadMove.lng - ACCEL_VELOCITY * ly * Math.sin(rad(heading)),
        };

        throttledPositionUpdate(scriptContext.map, gamepadMove);
      } else {
        gamepadMove = null;
      }

      window.requestAnimationFrame(controlLoop);
    };

    controlLoop();
  });
};
