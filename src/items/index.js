import Inventory from '../inventory/index.js';
import { THREEObjectMaker } from './3d-objects/index.js';
import { embedMaker } from './embeds/index.js';
import itemDescs from './descs.js';

const handheldContainer = document.getElementById('handheld-item');

const setHandheldItem = (item, map, audioContext) => {
  if (item.canvas) {
    handheldContainer.appendChild(item.canvas);
    item.reset();
    item.activate?.(map, audioContext);
    item.isBeingHeld = true;
  }
};

const initItem = (makers) => async (map, desc, audioContext) => {
  const item = await desc.create(makers);
  item.insert(map, desc.position);

  if (desc.onClick) {
    item.info.content.addEventListener('click', () => desc.onClick(map, item));
  }

  if (desc.collectible) {
    item.info.content.addEventListener('click', () => {
      Inventory.addItem(desc);

      if (desc.handheld) {
        setHandheldItem(item, map, audioContext);
      }

      item.info.close();
    });
  }

  return item;
};

export default async (InfoWindow, map, audioContext) => {
  const makers = {
    threeObject: THREEObjectMaker(InfoWindow),
    embed: embedMaker(InfoWindow),
  };

  const items = [];

  for (const desc of itemDescs) {
    if (Inventory.hasItem(desc.name)) {
      if (desc.handheld) {
        const item = await desc.create(makers);
        setHandheldItem(item, map, audioContext);
      }

      continue;
    }

    const init = initItem(makers);
    items.push(await init(map, desc, audioContext));
  }

  return items;
};
