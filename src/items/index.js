import Inventory from '../inventory/index.js';
import { THREEObjectMaker } from './3d-objects/index.js';
import { embedMaker } from './embeds/index.js';
import { tarotCardMaker } from './tarot/index.js';
import itemDescs from './descs.js';

const DEFAULT_PICK_UP_SFX = 'backpack';

const handheldContainer = document.getElementById('handheld-item');

const setHandheldItem = (item) => {
  if (item.canvas) {
    handheldContainer.appendChild(item.canvas);
    item.reset();
    item.isBeingHeld = true;
  }
};

const initItem = (makers) => async (desc, context) => {
  const item = await desc.create(makers);
  item.insert(context.map, desc.position);

  if (desc.onClick) {
    item.info.content.addEventListener('click', () => desc.onClick(context.map, item));
  }

  if (desc.collectible) {
    item.info.content.addEventListener('click', () => {
      item.taken = true;

      Inventory.addItem(desc);

      const pickUpSound = context.sfx[desc.pickUpSFX || DEFAULT_PICK_UP_SFX];
      pickUpSound();

      if (desc.handheld) {
        setHandheldItem(item);
      }

      if (desc.canBeActivated) {
        item.activate?.(context);
      }

      item.info.close();
    });
  }

  return item;
};

export default async (InfoWindow, context) => {
  const makers = {
    threeObject: THREEObjectMaker(InfoWindow),
    embed: embedMaker(InfoWindow),
    tarotCard: tarotCardMaker(InfoWindow),
  };

  const items = [];

  for (const desc of itemDescs) {
    if (Inventory.hasItem(desc.name)) {
      if (desc.handheld || desc.canBeActivated) {
        const item = await desc.create(makers);
        item.taken = true;

        if (desc.handheld) {
          setHandheldItem(item);
        }

        if (desc.canBeActivated) {
          item.activate?.(context);
        }
      }

      continue;
    }

    const init = initItem(makers);
    items.push(await init(desc, context));
  }

  return items;
};
