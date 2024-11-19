import inventory from '../inventory/index.js';
import { hover } from '../interactions/drone.js';
import { journalMoment } from '../journal/index.js';
import { sleep } from '../utils.js';

export const brokenGeigerCounter = {
  name: 'Broken Geiger Counter',
  thumbnailURL: '/assets/items/geiger-counter/thumb.webp',
  collectible: true,
  position: { lat: 2, lng: 2 }, // fake
  gltf: '/assets/items/geiger-counter/',
  async create(makers) {
    const item = await makers.threeObject(
      this.gltf,
      {
        name: this.name,
        cameraPosition: { x: 6, y: 2.5, z: -3 },
        rotation: { x: 0.6, y: -0.95, z: -1.25 },
        lightPosition: { z: -0.7 },
        scale: 0.9,
        onGround: true,
      },
    );
    return item;
  },
};

export const backpackSequence = async (G) => {
  console.info('[backpack]', 'activated');
  if (!inventory.hasItem('Geiger Counter')) {
    return;
  }

  G.handheldItem?.item.detection?.overheat();

  await sleep(2000);
  document.getElementById('handheld-explosion').hidden = false;
  G.sfx.explosion();

  await sleep(800);
  await G.handheldItem?.drop(G);
  document.getElementById('handheld-explosion').hidden = true;
  journalMoment('💥', 'The Geiger counter exploded');

  await sleep(2000);
  hover(G, { lat: -20.29203, lng: -69.78111 });

  await sleep(2000);

  const item = G.items.find((item) => item.name === brokenGeigerCounter.name);

  if (item) {
    item.info.setPosition({ lat: -20.29216, lng: -69.7813 });
    await item.update();
  }
};
