import Inventory from './inventory.js';
import { LOCALSTORAGE_POSITION_KEY } from './constants.js';
import * as chapters from './chapters.js';
import { clearTask } from './task.js';
import { clear as clearSoundscape } from './audio/soundscapes.js';
import { clear as clearJournal } from './journal/index.js';
import { clear as clearSFX } from './audio/sfx.js';

export const resetGame = () => {
  Inventory.clear();
  chapters.clear();
  clearSoundscape();
  clearTask();
  clearJournal();
  clearSFX();
  localStorage.removeItem(LOCALSTORAGE_POSITION_KEY);
};

export default () => {};
