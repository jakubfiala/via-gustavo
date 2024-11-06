import { HITCHHIKE_PANO } from '../constants.js';
import { travel, car } from '../items/bus.js';
import { disableClickToGoCB, disableZoom, enableZoom, showHelpMessage } from '../script/utils.js';
import { removeTask } from '../task.js';
import { sleep } from '../utils.js';

const thumb = document.getElementById('hitch-thumb');
const truck = document.getElementById('coca-cola-truck');

const destinationLatLng = { lat: -20.40103, lng: -69.71791 };
const destinationPov = { heading: 163.03, pitch: 0 };

const cleanUp = (context) => {
  truck.hidden = true;
  thumb.hidden = true;

  enableZoom(context);
  removeTask();
};

const hitchhike = (context, { helpTimeout }) => async () => {
  clearTimeout(helpTimeout);
  travel(context.map, { latLng: destinationLatLng, pov: destinationPov, audio: car });

  await sleep(3_000);
  cleanUp(context);
};

const cueCar = async (context) => {
  context.map.setPov({ ...context.map.getPov(), zoom: 0.35 });

  truck.hidden = false;
  context.sfx.carApproach();

  disableZoom(context);

  const helpTimeout = setTimeout(
    () => showHelpMessage('Click on the car to enter')(context),
    15_000,
  );

  truck.addEventListener('click', hitchhike(context, { helpTimeout }), { once: true });
};

const moveToSpot = async (context) => {
  context.map.setPano(HITCHHIKE_PANO);
  context.map.setPov({ heading: 43, pitch: -17.27 });

  thumb.hidden = false;
};

export const hitchhikeSequence = async (context) => {
  disableClickToGoCB(context);

  context.soundscape.set(context.soundscape.townBigRoad);
  car.preload = 'auto';

  truck.src = truck.dataset.src;
  thumb.src = thumb.dataset.src;

  await sleep(2_000);
  await moveToSpot(context);
  await sleep(3_000);
  await cueCar(context);
};
