import Inventory from './inventory/index.js';
import { LOCALSTORAGE_POSITION_KEY } from './constants.js';
import * as chapters from './chapters.js';

const resetButton = document.getElementById('reset-button');

export const resetGame = () => {
  Inventory.clear();
  chapters.clear();
  localStorage.removeItem(LOCALSTORAGE_POSITION_KEY);
};

export default () => {
  resetButton.addEventListener('click', () => { resetGame(); location.reload(); });
};
