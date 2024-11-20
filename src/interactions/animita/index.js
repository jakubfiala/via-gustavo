import inventory from '../../inventory.js';
import { makeAnimita } from './item.js';
import { LIMBO_LNG_STEP } from '../../custom-panorama/limbo.js';
import { loadAnimitas, loadedAnimitas, saveAnimita } from './api.js';
import { approachPov, headingFromPoints } from '../../utils.js';

const editor = document.getElementById('animita-editor');
const dialog = document.getElementById('animita-dialog');
const itemsContainer = document.getElementById('animita-dialog-items');
const editButton = document.getElementById('edit-button');
const finishButton = document.getElementById('finish-button');
const form = document.getElementById('animita-dialog-form');
const itemTemplate = document.getElementById('animita-item-template');

const specialAnswerKeys = ['ex-voto', 'consent'];

const openEditor = (G) => {
  console.info('[animita]', 'opening editor');
  dialog.showModal();
};

const renderItems = (G) => {
  const fragment = new DocumentFragment();
  inventory.items.forEach(({ name, collectible, thumbnailURL }) => {
    if (!collectible) {
      return;
    }

    const item = itemTemplate.content.cloneNode(true);
    const container = item.firstElementChild;

    container.querySelector('input').name = name;
    container.querySelector('img').src = thumbnailURL;
    container.querySelector('span').innerText = name;

    fragment.appendChild(item);
  });

  return fragment;
};

export const initAnimitaEditor = (G, handlers) => {
  const {
    onFinish = () => {},
    onOccupied = () => {},
    onError = () => {},
  } = handlers;

  editor.hidden = false;

  itemsContainer.appendChild(renderItems(G));

  editButton.addEventListener('click', () => {
    const position = G.map.getPosition().lng() * LIMBO_LNG_STEP;
    if (loadedAnimitas.has(position)) {
      onOccupied(G);
      return;
    }

    openEditor(G);
  });

  finishButton.addEventListener('click', () => {
    finishButton.hidden = true;
    G.map.setPano('exitLimbo4');
  });

  dialog.addEventListener('close', () => onFinish(G), { once: true });

  form.addEventListener('submit', async () => {
    const answers = Object.fromEntries(new FormData(form));
    const exVoto = answers['ex-voto'];
    // get checked checkbox names from FormData
    const items = Object.keys(answers)
      .filter((name) => !specialAnswerKeys.includes(name) && answers[name] === 'on');

    try {
      const animita = { exVoto, items, position: G.map.getPosition() };
      const actualPosition = await makeAnimita(G, animita);

      await saveAnimita(animita);

      approachPov(G,
        { heading: headingFromPoints(G.map.getPosition(), new G.google.LatLng(actualPosition)), pitch: -15, zoom: 3 },
        3000,
        180,
      );
    } catch (error) {
      console.warn('[animitas]', 'error saving animita', error);
      onError(G);
    }

    editButton.hidden = true;
    finishButton.hidden = false;
  });
}

export const initAnimitas = async (G) => {
  loadAnimitas(G, true);

  const listener = G.google.event.addListener(G.map, 'pano_changed', () => loadAnimitas(G));

  return {
    cleanUp: () => listener.remove(),
  };
};
