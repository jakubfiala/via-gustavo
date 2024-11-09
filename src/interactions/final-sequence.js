import { hideHud } from '../hud/index.js';
import { resetGame } from '../reset.js';
import { START_POSITION } from '../constants.js';
import { approachLatLng, approachPov, sleep } from "../utils.js";

const iframe = document.getElementById('credits');
const creditsMapContainer = document.getElementById('credits-map');

const gustavo = { lat: -20.4388, lng: -69.70093 };

export const finalSequence = async (G, checkpoints) => {
  hideHud();

  approachPov(G, { heading: 260, pitch: 0, zoom: 3 }, 4_000, 100);

  G.container.animate([
    { opacity: 1 },
    { opacity: 0 },
  ], { duration: 3_000, fill: 'both' });

  G.score.lithiumAtmo.pause();
  G.scoreGain.gain.cancelScheduledValues(G.audioContext.currentTime);
  G.scoreGain.gain.linearRampToValueAtTime(1, G.audioContext.currentTime + 0.5);

  await G.score.lithiumES.play();
  await sleep(5_500);

  iframe.hidden = false;

  window.addEventListener('message', async (event) => {
    if (event.data === 'done') {
      console.info('[credits]', 'done', event);
      iframe.animate([
        { opacity: 1 },
        { opacity: 0 },
      ], { duration: 3_000, fill: 'forwards' });

      const options = {
        disableDefaultUI: true,
        center: START_POSITION,
        zoom: 20,
        mapTypeId: G.google.MapTypeId.SATELLITE,
      };

      const map = new G.google.Map(creditsMapContainer, options);
      G.container.style.display = 'none';
      creditsMapContainer.hidden = false;
      await sleep(1_000);

      creditsMapContainer.animate([
        { opacity: 0 },
        { opacity: 1 },
      ], { duration: 3_000, fill: 'both' });

      for (const checkpoint of checkpoints) {
        if (checkpoint.lat === 0 || checkpoint.lat === 1) {
          continue;
        }

        await approachLatLng(map, checkpoint, 3_000, 40);
      };

      map.panTo(gustavo);
      map.setZoom(20);
      creditsMapContainer.animate([
        { opacity: 1 },
        { opacity: 0 },
      ], { duration: 3_000, fill: 'both' });
    }
  });

  G.score.lithiumES.addEventListener('ended', async () => {
    resetGame();
    await sleep(2_000);
    location.reload();
  });
}
