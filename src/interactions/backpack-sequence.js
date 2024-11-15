import inventory from '../inventory/index.js';
import { hover } from '../drone.js';
import { journalMoment } from '../journal/index.js';
import { sleep } from '../utils.js';

export const brokenGeigerCounter = {
  name: 'Broken Geiger Counter',
  thumbnailURL: '/assets/items/geiger-counter/thumb.webp',
  collectible: true,
  position: { lat: 2, lng: 2 }, // fake
  pickUpSFX: 'none',
  gltf: '/assets/items/geiger-counter/',
  async create(makers) {
    const item = await makers.threeObject(this.gltf, { name: this.name });
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
  inventory.addItem(brokenGeigerCounter);
};
