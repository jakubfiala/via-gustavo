const MIN_MOVEMENT = 0.2;
const OFFSET_X =  0; // 0.051000000000000004;
const OFFSET_Y =  0; // -0.045;
const ACCEL_VELOCITY = 0.00001;
const TURN_VELOCITY = 2.0;

const roundFloat = (x, y) => Math.round (x / y) * y;

export default (map) => {
  window.addEventListener("gamepadconnected", function(e) {
    const gamepad = navigator.getGamepads()[e.gamepad.index];
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
                gamepad.index, gamepad.id,
                gamepad.buttons.length, gamepad.axes.length);

    const controlLoop = () => {
      const x = roundFloat(gamepad.axes[0] + OFFSET_X, MIN_MOVEMENT);
      const y = roundFloat(gamepad.axes[1] + OFFSET_Y, MIN_MOVEMENT);

      if (x) {
        const pov= map.pov;
        pov.heading = (pov.heading + x * TURN_VELOCITY) % 360;
        map.setPov(pov);
      }

      if (y) {
        const heading = map.getPov().heading;
        const position = map.getPosition();

        const newPosition = {
          lat: position.lat() - ACCEL_VELOCITY * y * Math.cos(heading/180*Math.PI),
          lng: position.lng() - ACCEL_VELOCITY * y * Math.sin(heading/180*Math.PI),
        };

        map.setPosition(newPosition);
      }

      window.requestAnimationFrame(controlLoop);
    };

    controlLoop();
  });
};
