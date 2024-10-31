import { replayChapter } from '../chapters.js';
import { LOCALSTORAGE_JOURNAL_KEY, DEFAULT_COLLECT_TEXT } from '../constants.js';
import { flashIndicator } from './interactions.js';

const dialog = document.getElementById('journal-dialog');
const list = document.getElementById('journal-entries');
const journalButton = document.getElementById('journal-button');

const itemEntryTemplate = document.getElementById('journal-item-template');
const chapterEntryTemplate = document.getElementById('journal-chapter-template');
const momentEntryTemplate = document.getElementById('journal-moment-template');

export const clear = () => {
  localStorage.removeItem(LOCALSTORAGE_JOURNAL_KEY);
};

const persist = () => {
  console.info('[journal]', 'persisting');
  localStorage.setItem(LOCALSTORAGE_JOURNAL_KEY, list.innerHTML);
};

const setupReplay = (button) => {
  button.addEventListener('click', () => {
    dialog.close();
    replayChapter(parseInt(button.dataset.chapter));
  });
};

export const initJournal = () => {
  console.info('[journal]', 'initialising');
  const persisted = localStorage.getItem(LOCALSTORAGE_JOURNAL_KEY);
  if (persisted) {
    console.info('[journal]', 'loading from localStorage', persisted.length);
    list.innerHTML =  persisted;

    const replayButtons = list.querySelectorAll('.replay-chapter');
    replayButtons.forEach(setupReplay);
  }

  journalButton.addEventListener('click', () => list.scrollIntoView({ block: 'end' }));
};

export const journalItem = (item) => {
  console.info('[journal]', 'item', item);
  const itemEntry = itemEntryTemplate.content.cloneNode(true);

  const img = itemEntry.querySelector('img');
  img.src = item.thumbnailURL;

  const figcaption = itemEntry.querySelector('figcaption');
  figcaption.innerText = `${item.collectText || DEFAULT_COLLECT_TEXT} ${item.displayName ?? item.name}`;

  itemEntry.children[0].dataset.name = item.name;
  list.appendChild(itemEntry);

  flashIndicator('🎒');

  persist();
};

export const journalChapter = (chapter) => {
  console.info('[journal]', 'chapter', chapter);
  const chapterEntry = chapterEntryTemplate.content.cloneNode(true);
  chapterEntry.firstElementChild.dataset.id = chapter.id;

  const idContainer = chapterEntry.querySelector('.journal__chapter-id');
  const titleContainer = chapterEntry.querySelector('.journal__chapter-title');
  const replayButton = chapterEntry.querySelector('.replay-chapter');

  idContainer.innerText = chapter.id;
  titleContainer.innerText = chapter.title;
  replayButton.dataset.chapter = chapter.id;

  setupReplay(replayButton);
  list.appendChild(chapterEntry);

  persist();
};

export const journalMoment = (symbol, text) => {
  console.info('[journal]', 'moment', symbol, text);
  const momentEntry = momentEntryTemplate.content.cloneNode(true);

  const symbolSpan = momentEntry.querySelector('.journal__moment-symbol');
  symbolSpan.innerText = symbol;

  const textSpan = momentEntry.querySelector('.journal__moment-text');
  textSpan.innerText = text;

  list.appendChild(momentEntry);

  flashIndicator(symbol, true);

  persist();
};
