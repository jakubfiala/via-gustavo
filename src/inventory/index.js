import { LOCALSTORAGE_INVENTORY_KEY } from '../constants.js';
import { toast } from '../script/utils.js';

const inventory = document.getElementById('inventory');
const cellTemplate = document.getElementById('inventory-cell-template');

const addToUI = (item) => {
  const cell = cellTemplate.content.cloneNode(true);

  const img = cell.querySelector('img');
  img.src = item.thumbnailURL;

  const figcaption = cell.querySelector('figcaption');
  figcaption.innerText = item.name;

  cell.children[0].dataset.name = item.name;
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

    toast(`«${item.name}» added to Inventory.`)

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
    inventory.innerHTML = '';
    this.items = [];
    localStorage.removeItem(LOCALSTORAGE_INVENTORY_KEY);
  },
  removeItem(name) {
    const toRemove = this.items.findIndex((item) => item.name === name);
    console.info('[inventory]', 'removing item', name, toRemove);
    if (toRemove !== -1) {
      this.items.splice(toRemove, 1);
      console.info('[inventory]', 'items after splicing', this.items);
      this.persist();

      const element = inventory.querySelector(`[data-name="${name}"]`);
      console.log('[inventory]', 'removing item', name, toRemove);
      inventory.removeChild(element);
    }
  },
}
