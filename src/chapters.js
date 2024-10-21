import { LOCALSTORAGE_CHAPTERS_KEY } from './constants.js';

const ITEM_CLASS = 'chapters__chapter';
const COMPLETED_CLASS = 'chapters__chapter--complete';

const dialog = document.getElementById('chapters-dialog');
const list = document.getElementById('chapters-list');

export const completed = new Set(JSON.parse(localStorage.getItem(LOCALSTORAGE_CHAPTERS_KEY)) || []);

export const chapters = [
  {
    id: 1,
    title: "The Lost Friend",
    position: {
      lat: -20.442087695890653,
      lng: -69.525976864376787,
    },
  },
  {
    id: 2,
    title: "Via Crucis",
    position: {
      lat: -20.34075,
      lng: -69.65655,
    },
  },
  {
    id: 3,
    title: "дары небес",
    position: {
      lat: -20.32047,
      lng: -69.75582,
    },
  },
  {
    id: 4,
    title: "Humberstone",
    position: {
      lat: -20.467491495806950,
      lng: -69.460925633319292,
    },
  },
  {
    id: 5,
    title: "The Wake",
    position: {
      lat: -20.467491495806950,
      lng: -69.460925633319292,
    },
  },
];

export const clear = () => {
  localStorage.removeItem(LOCALSTORAGE_CHAPTERS_KEY);
  Array.from(list.children).forEach((item) => item.classList.remove(COMPLETED_CLASS));
  completed.clear();
};

export const completeChapter = (chapter) => {
  chapter.indicator.classList.add(COMPLETED_CLASS);
  completed.add(chapter.id);
  localStorage.setItem(LOCALSTORAGE_CHAPTERS_KEY, JSON.stringify(Array.from(completed)));
};

export const initChapters = (context) => {
  chapters.forEach((chapter) => {
    const item = document.createElement('li');
    item.dataset.id = chapter.id;
    item.innerText = chapter.title;
    item.classList.add(ITEM_CLASS);

    chapter.indicator = item;
    if (completed.has(chapter.id)) {
      chapter.indicator.classList.add(COMPLETED_CLASS);

      const button = document.createElement('button');
      button.innerText = 'Replay';
      button.addEventListener('click', () => {
        dialog.close();
        context.map.setPosition(chapter.position);
      });
      button.classList.add('hud__button', 'chapters__replay');

      item.appendChild(button);
    }

    list.appendChild(item);
  });
};
