import { CanvasTexture, MeshStandardMaterial } from 'three';
import { scale } from '../../../src/utils.js';

const GAUGE_NAME = 'moveable-gauge';

const createDisplay = (item) => {
  const mesh = item.scene.getObjectByName('active-display');
  const canvas = document.createElement('canvas');
  canvas.width = 357;
  canvas.height = 218;

  const map = new CanvasTexture(canvas);
  mesh.material = new MeshStandardMaterial({
    map,
    emissive: 0x36bdcc,
    emissiveIntensity: 1,
  });

  const dContext = canvas.getContext('2d');
  console.info('[geiger-counter]', 'creating display', canvas, dContext);

  return {
    update: (radioactivity) => {
      dContext.fillStyle = '#36bdcc';
      dContext.fillRect(0, 0, canvas.width, canvas.height);

      dContext.fillStyle = '#000d';
      dContext.font = '80px monospace';

      const text = Math.round(radioactivity * 1000).toString().padStart(5, '0');
      dContext.fillText(text, 60, 140);
      map.needsUpdate = true;
    },
  };
};

export const startDisplay = (item) => {
  console.info('[geiger-counter]', 'displaying', item);
  const gauge = item.scene.getObjectByName(GAUGE_NAME);
  console.info('[geiger-counter]', 'getting gauge', gauge);

  const display = createDisplay(item);

  return {
    displayRadioactivity: (radioactivity) => {
      console.info('[geiger-counter]', 'displaying radioactivity', radioactivity);
      gauge.rotation.y = Math.PI * scale(radioactivity, 0, 15, -0.25, 0.2);
      display.update(radioactivity);
      item.render();
    },
  };
};
