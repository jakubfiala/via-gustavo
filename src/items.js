import createTeapotMesh from '/assets/items/teapot/mesh.js';
import { THREEObjectMaker } from './3d-objects/index.js';
import { embedMaker } from './embeds/index.js';
import Inventory from './inventory/index.js';
import { loadGLTF } from './3d-objects/gltf.js';
import { START_POSITION } from './constants.js';
import { createBusStopItem } from './bus.js';

const itemDescs = [
  {
    name: 'Teapot',
    collectible: true,
    thumbnailURL: '/assets/items/teapot/thumb.webp',
    position: START_POSITION,
    create(makers) {
      return makers.threeObject(createTeapotMesh());
    },
  },
  {
    name: 'Mars96',
    collectible: false,
    position: { lat: -20.506417885036914, lng: -69.37627137940446 },
    create(makers) {
      return makers.embed('https://en.wikipedia.org/wiki/Mars_96');
    },
  },
  {
    name: 'Coke',
    thumbnailURL: '/assets/items/coke/thumb.webp',
    collectible: true,
    position: { lat: -20.506808759909188, lng: -69.37564029846219 },
    async create(makers) {
      return makers.threeObject(await loadGLTF('/assets/items/coke/'));
    },
  },
  createBusStopItem({
    position: { lat: -20.506711923930550, lng: -69.37579679565727 },
    destination: {
      locationName: 'Geoglifos de Pintados',
      latLng: { lat: -20.6214391, lng: -69.662639 },
      pov: { heading: 23.53, pitch: 3 },
    },
  }),
];

const initItem = (makers) => async (map, desc) => {
  const item = await desc.create(makers);
  item.insert(map, desc.position);

  if (desc.onClick) {
    item.info.content.addEventListener('click', () => desc.onClick(map, item));
  }

  if (desc.collectible) {
    const { name, thumbnailURL } = desc;
    item.info.content.addEventListener('click', () => {
      Inventory.addItem({ name, thumbnailURL });
      item.info.close();
    });
  }

  return item;
};

export default async (StreetViewLibrary, map) => {
  const makers = {
    threeObject: THREEObjectMaker(StreetViewLibrary),
    embed: embedMaker(StreetViewLibrary),
  };

  const items = [];

  for (const desc of itemDescs) {
    if (Inventory.hasItem(desc.name)) {
      continue;
    }

    const init = initItem(makers);
    items.push(await init(map, desc));
  }

  return items;
};
