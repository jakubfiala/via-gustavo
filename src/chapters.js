import { LOCALSTORAGE_CHAPTERS_KEY } from './constants.js';

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
  completed.clear();
};

export const completeChapter = (chapter) => {
  completed.add(chapter.id);
  localStorage.setItem(LOCALSTORAGE_CHAPTERS_KEY, JSON.stringify(Array.from(completed)));
};

export const replayChapter = (id) => {
  const { position } = chapters.find((chapter) => chapter.id === id);
  map.setPosition(position);
};
