import Inventory from '../inventory/index.js';
import { THREEObjectMaker } from './3d-objects/index.js';
import { embedMaker } from './embeds/index.js';
import { cardMaker } from './card.js';
import { simpleImageMaker } from './simple-image.js';
import itemDescs from './descs.js';

const DEFAULT_PICK_UP_SFX = 'backpack';

const handheldContainer = document.getElementById('handheld-item');

const setHandheldItem = (item) => {
  if (item.canvas) {
    handheldContainer.appendChild(item.canvas);
    item.reset();
    item.isBeingHeld = true;
  }

  return {
    item,
    drop: async (context) => {
      console.info('[items]', 'dropping', item);
      await item.deactivate?.(context);
      item.isBeingHeld = false;
      handheldContainer.removeChild(item.canvas);
      Inventory.removeItem(item.name);
    },
  }
};

const initItem = (makers) => async (desc, context) => {
  const item = await desc.create(makers);
  item.insert(context.map, desc.position);

  if (desc.onClick) {
    if (item.addClickHandler) {
      item.addClickHandler(() => desc.onClick(context.map, item));
    } else {
      item.info.content.addEventListener('click', () => desc.onClick(context.map, item));
    }
  }

  if (desc.collectible || desc.canBeActivated) {
    const handler = () => {
      if (desc.collectible) {
        item.taken = true;

        Inventory.addItem(desc);
        const pickUpSound = context.sfx[desc.pickUpSFX || DEFAULT_PICK_UP_SFX];
        pickUpSound();

        if (desc.handheld) {
          context.handheldItem = setHandheldItem(item);
        }

        item.info.close();
      }

      if (desc.canBeActivated) {
        item.activate?.(context, { firstTime: true });
      }
    };

    if (item.addClickHandler) {
      item.addClickHandler(handler);
    } else {
      item.info.content.addEventListener('click', handler);
    }
  }

  if (!desc.collectible && !desc.canBeActivated && !desc.onClick && item.container) {
    item.container.classList.add('gustavo-item--noninteractive');
  }

  return item;
};

export default async (InfoWindow, context) => {
  const makers = {
    threeObject: THREEObjectMaker(InfoWindow),
    embed: embedMaker(InfoWindow),
    card: cardMaker(InfoWindow),
    simpleImage: simpleImageMaker(InfoWindow),
  };

  const items = [];

  for (const desc of itemDescs) {
    if (Inventory.hasItem(desc.name)) {
      if (desc.handheld || desc.canBeActivated) {
        const item = await desc.create(makers);
        item.taken = true;

        if (desc.handheld) {
          context.handheldItem = setHandheldItem(item);
        }

        if (desc.canBeActivated) {
          item.activate?.(context, { firstTime: false });
        }
      }

      continue;
    }

    const init = initItem(makers);
    items.push(await init(desc, context));
  }

  return items;
};
