import { LOCALSTORAGE_INVENTORY_KEY } from '../constants.js';

const inventory = document.getElementById('inventory');
const cellTemplate = document.getElementById('inventory-cell-template');

const addToUI = (item) => {
  const cell = cellTemplate.content.cloneNode(true);

  const img = cell.querySelector('img');
  img.src = item.thumbnailURL;

  const figcaption = cell.querySelector('figcaption');
  figcaption.innerText = item.name;

  inventory.appendChild(cell);
};

const initialItems = JSON.parse(localStorage.getItem(LOCALSTORAGE_INVENTORY_KEY)) ?? [];

initialItems.forEach(addToUI);

export default {
  items: initialItems,
  addItem(item) {
    if (this.items.includes(item)) {
      return;
    }

    this.items.push(item);
    addToUI(item);

    this.persist();
  },
  hasItem(name) {
    return Boolean(this.items.find((item) => item.name === name));
  },
  persist() {
    localStorage.setItem(LOCALSTORAGE_INVENTORY_KEY, JSON.stringify(this.items));
  },
  clear() {
    localStorage.removeItem(LOCALSTORAGE_INVENTORY_KEY);
  },
}
