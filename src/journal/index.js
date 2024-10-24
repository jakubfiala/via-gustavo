import { LOCALSTORAGE_JOURNAL_KEY, DEFAULT_COLLECT_TEXT } from '../constants.js';

const list = document.getElementById('journal-entries');

const itemEntryTemplate = document.getElementById('journal-item-template');
const chapterEntryTemplate = document.getElementById('journal-chapter-template');
const taskTemplate = document.getElementById('journal-task-template');

export const clear = () => {
  list.innerHTML = '';
  localStorage.removeItem(LOCALSTORAGE_JOURNAL_KEY);
};

const persist = () => {
  localStorage.setItem(LOCALSTORAGE_JOURNAL_KEY, list.innerHTML);
};

export const initJournal = () => {
  list.innerHTML = localStorage.getItem(LOCALSTORAGE_JOURNAL_KEY) ?? '';
};

export const journalItem = (item) => {
  const itemEntry = itemEntryTemplate.content.cloneNode(true);

  const img = itemEntry.querySelector('img');
  img.src = item.thumbnailURL;

  const figcaption = itemEntry.querySelector('figcaption');
  figcaption.innerText = `${item.collectText || DEFAULT_COLLECT_TEXT} ${item.name}`;

  itemEntry.children[0].dataset.name = item.name;
  list.appendChild(itemEntry);

  persist();
};

export const journalChapter = (chapter) => {
  console.info('[journal]', 'chapter', chapter);
  const chapterEntry = chapterEntryTemplate.content.cloneNode(true);
  chapterEntry.firstElementChild.dataset.id = chapter.id;

  const idContainer = chapterEntry.querySelector('.journal__chapter-id');
  const titleContainer = chapterEntry.querySelector('.journal__chapter-title');
  const replayButton = chapterEntry.querySelector('.journal__chapter-replay');

  idContainer.innerText = chapter.id;
  titleContainer.innerText = chapter.title;

  list.appendChild(chapterEntry);

  persist();
};
