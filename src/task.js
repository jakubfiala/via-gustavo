import { LOCALSTORAGE_TASK_KEY } from './constants.js';

const container = document.getElementById('task');

export const setTask = (text) => {
  container.hidden = false;
  container.innerText = text;
  localStorage.setItem(LOCALSTORAGE_TASK_KEY, text);
};

export const removeTask = () => {
  container.hidden = true;
  container.innerText = '';
  localStorage.removeItem(LOCALSTORAGE_TASK_KEY);
};

export const initTask = () => {
  const stored = localStorage.getItem(LOCALSTORAGE_TASK_KEY);
  if (stored) {
    setTask(stored);
  }
};

export const clearTask = () => {
  localStorage.removeItem(LOCALSTORAGE_TASK_KEY);
};
