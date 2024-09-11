import { LOCALSTORAGE_CHAPTERS_KEY } from './constants.js';

const COMPLETED_CLASS = 'chapters__chapter--complete';

const list = document.getElementById('chapters-list');

export const completed = new Set(JSON.parse(localStorage.getItem(LOCALSTORAGE_CHAPTERS_KEY)) || []);

export const chapters = [
  {
    id: 1,
    title: "La Huayca",
  },
  {
    id: 2,
    title: "At the rancho",
  },
  {
    id: 3,
    title: "Paint the mountainside",
  },
  {
    id: 4,
    title: "дары небес",
  },
  {
    id: 5,
    title: "The Wake",
  },
];

export const clear = () => {
  localStorage.removeItem(LOCALSTORAGE_CHAPTERS_KEY);
};

export const completeChapter = (chapter) => {
  chapter.indicator.classList.add(COMPLETED_CLASS);
  completed.add(chapter.id);
  localStorage.setItem(LOCALSTORAGE_CHAPTERS_KEY, JSON.stringify(Array.from(completed)));
};

export const initChapters = (map) => {
  chapters.forEach((chapter) => {
    const item = document.createElement('li');
    item.dataset.id = chapter.id;
    item.innerText = chapter.title;

    chapter.indicator = item;
    if (completed.has(chapter.id)) {
      chapter.indicator.classList.add(COMPLETED_CLASS);
    }

    list.appendChild(item);
  });
};
