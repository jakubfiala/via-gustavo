import Inventory from './inventory/index.js';
import { LOCALSTORAGE_POSITION_KEY } from './constants.js';
import * as chapters from './chapters.js';

const resetButton = document.getElementById('reset-button');

const resetGame = () => {
  Inventory.clear();
  chapters.clear();
  localStorage.removeItem(LOCALSTORAGE_POSITION_KEY);
  location.reload();
};

export default () => {
  resetButton.addEventListener('click', resetGame);
};
