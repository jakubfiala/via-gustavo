import { LOCALSTORAGE_INVENTORY_KEY } from './constants.js';
import { journalItem } from './journal/index.js';
import { toast } from './script/utils.js';
import { DEFAULT_COLLECT_TEXT } from './constants.js';

const initialItems = JSON.parse(localStorage.getItem(LOCALSTORAGE_INVENTORY_KEY)) ?? [];

export default {
  items: initialItems,
  addItem(item) {
    if (this.items.includes(item)) {
      return;
    }

    console.log('[inventory]', 'item collecting', item);

    toast(`${item.collectText || DEFAULT_COLLECT_TEXT} ${item.displayName ?? item.name}.`)

    this.items.push(item);
    journalItem(item);

    this.persist();
  },
  hasItem(name) {
    return Boolean(this.items.find((item) => item.name === name));
  },
  persist() {
    localStorage.setItem(LOCALSTORAGE_INVENTORY_KEY, JSON.stringify(this.items));
  },
  clear() {
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
    }
  },
}
