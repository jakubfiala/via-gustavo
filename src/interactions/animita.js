import inventory from '../inventory';

const editor = document.getElementById('animita-editor');
const dialog = document.getElementById('animita-dialog');
const itemsContainer = document.getElementById('animita-dialog-items');
const editButton = document.getElementById('edit-button');
const itemTemplate = document.getElementById('animita-item-template');

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

    console.log('thumb', thumbnailURL);

    const item = itemTemplate.content.cloneNode(true);
    const container = item.firstElementChild;

    container.querySelector('input').name = name;
    container.querySelector('img').src = thumbnailURL;
    container.querySelector('span').innerText = name;

    fragment.appendChild(item);
  });

  return fragment;
};

export const initAnimitaEditor = (G, { onFinish = () => {} }) => {
  editor.hidden = false;

  itemsContainer.appendChild(renderItems(G));

  editButton.addEventListener('click', () => {
    openEditor(G);
  });

  dialog.addEventListener('close', () => onFinish(G), { once: true });
}
