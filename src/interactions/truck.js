import { sleep } from '../utils.js';
import inventory from '../inventory.js';

const pencils = {
  name: 'Pencils',
  thumbnailURL: '/assets/items/pencils/thumb.webp',
  collectible: true,
  position: { lat: 2, lng: 2 }, // fake
  collectText: 'Found',
  displayName: 'two pencils',
  gltf: '/assets/items/pencils/',
  async create(makers) {
    const item = await makers.threeObject('/assets/items/pencils/', {
      name: this.name,
      displayName: this.displayName,
    });
    return item;
  },
};

export const inspectTruck = async (G) => {
  console.info('[truck]', 'inspecting');
  await sleep(1_000);
  inventory.addItem(pencils);
  G.sfx.backpack();
};
