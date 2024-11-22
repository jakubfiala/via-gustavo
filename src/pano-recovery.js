import { disableCruiseControl } from './cruise-control.js';
import { getVelocity } from './utils.js';

// Google pano IDs are typically 22 chars, Google Photos are 64
// for a little bit of future-proofing, let's set a threshold somewhere in the middle.
const FOREIGN_PANO_ID_LENGTH_THRESHOLD = 40;

let previousPano = null;

const reduceClosest = (heading) => (current, link) => {
  const linkDistance = Math.abs(getVelocity(link.heading, heading, 360));
  const currentDistance = Math.abs(getVelocity(current.heading, heading, 360));

  if (linkDistance < currentDistance) {
    return link;
  }

  return current;
};

const recoverPano = (G) => {
  G.map.setPano(previousPano);

  const links = G.map.getLinks();
  if (links.length < 2) {
    console.info('[pano-recovery]', 'not enough links in previous pano', previousPano);
    // If there is only 1 link, it probably points back, which we don't want
    // We'd better just rewind and stop CC.
    disableCruiseControl();
    return;
  }

  const { heading } = G.map.getPov();
  console.info('[pano-recovery]', 'looking for link with heading closest to', heading);
  const closestToPOV = links.reduce(reduceClosest(heading), links[0]);

  console.info('[pano-recovery]', 'found', closestToPOV);
  G.map.setPano(closestToPOV.pano);
}

export const initPanoRecovery = (G) => {
  G.map.addListener('pano_changed', () => {
    const pano = G.map.getPano();

    if (pano?.length > FOREIGN_PANO_ID_LENGTH_THRESHOLD) {
      console.info('[pano-recovery]', 'recovering from foreign pano', pano);
      return recoverPano(G);
    }

    previousPano = pano;
  });
};
