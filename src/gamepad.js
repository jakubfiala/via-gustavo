import { deg } from "./utils";

const MIN_MOVEMENT = 0.2;
const OFFSET_X =  0; // 0.051000000000000004;
const OFFSET_Y =  0; // -0.045;
const ACCEL_VELOCITY = 0.00001;
const TURN_VELOCITY = 2.0;

const roundFloat = (x, y) => Math.round (x / y) * y;

export default (scriptContext) => {
  window.addEventListener("gamepadconnected", function(e) {
    console.info('[gamepad]', 'connected at index %d: %s. %d buttons, %d axes.',
                navigator.getGamepads()[0].index, navigator.getGamepads()[0].id,
                navigator.getGamepads()[0].buttons.length, navigator.getGamepads()[0].axes.length);

    const controlLoop = () => {
      const gamepad = navigator.getGamepads()[0];
      if (gamepad?.axes.length < 4) {
        console.warn('[gamepad]', 'not enough joystick axes found');
        return;
      }

      const [lx, ly, rx, ry] = gamepad.axes;
      const lr = Math.sqrt(lx ** 2 + ly ** 2);

      console.log(lx, ly, rx, ry, lr);

      if (lr > 0.1) {
        const pov= map.pov;
        pov.heading = deg(Math.atan2(ly, lx));
        scriptContext.map.setPov(pov);
      }

      // if (y) {
      //   const heading = scriptContext.map.getPov().heading;
      //   const position = scriptContext.map.getPosition();

      //   const newPosition = {
      //     lat: position.lat() - ACCEL_VELOCITY * y * Math.cos(heading/180*Math.PI),
      //     lng: position.lng() - ACCEL_VELOCITY * y * Math.sin(heading/180*Math.PI),
      //   };

      //   scriptContext.map.setPosition(newPosition);
      // }

      window.requestAnimationFrame(controlLoop);
    };

    controlLoop();
  });
};
