import Inventory from './inventory/index.js';
import { LOCALSTORAGE_POSITION_KEY } from './constants.js';
import * as chapters from './chapters.js';
import { clearTask } from './task.js';
import { clear as clearSoundscape } from './audio/soundscapes.js';
import { clear as clearJournal } from './journal/index.js';

const resetButton = document.getElementById('reset-button');

export const resetGame = () => {
  Inventory.clear();
  chapters.clear();
  clearSoundscape();
  clearTask();
  clearJournal();
  localStorage.removeItem(LOCALSTORAGE_POSITION_KEY);
};

export default () => {
  resetButton.addEventListener('click', () => { resetGame(); location.reload(); });
};
