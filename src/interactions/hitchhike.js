import { HITCHHIKE_PANO } from '../constants.js';
import { travel } from '../items/bus.js';
import { disableClickToGoCB, disableZoom, enableClickToGoCB, enableZoom, showHelpMessage } from '../script/utils.js';
import { removeTask } from '../task.js';

const thumb = document.getElementById('hitch-thumb');
const truck = document.getElementById('coca-cola-truck');

const cleanUp = (context) => () => {
  truck.hidden = true;
  thumb.hidden = true;
  enableClickToGoCB(context);
  enableZoom(context);
  removeTask();
};

const cueCar = (context) => () => {
  context.map.setPov({ ...context.map.getPov(), zoom: 0.35 });
  disableZoom(context);
  truck.hidden = false;

  const helpTimeout = setTimeout(() => showHelpMessage('Click on the car to enter')(context), 15_000);
  const hitchhike = () => {
    clearTimeout(helpTimeout);

    travel(context.map, {
      latLng: { lat: -20.4278004, lng: -69.7058853 },
      pov: { heading: 163.03, pitch: 0 }
    });

    setTimeout(cleanUp(context), 3_000);
  };

  truck.addEventListener('click', hitchhike, { once: true });
};

const moveToSpot = (context) => () => {
  context.map.setPano(HITCHHIKE_PANO);
  thumb.hidden = false;
  context.map.setPov({ heading: 43, pitch: -17.27 });

  setTimeout(cueCar(context), 3_000);
};

export const hitchhikeSequence = (context) => {
  disableClickToGoCB(context);
  truck.src = truck.dataset.src;
  thumb.src = thumb.dataset.src;

  setTimeout(moveToSpot(context), 2_000);
}
