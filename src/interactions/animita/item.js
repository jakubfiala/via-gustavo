import { CanvasTexture, Group, MeshBasicMaterial } from 'three';
import { THREEObjectMaker } from '../../items/3d-objects/index.js';
import descs from '../../items/descs.js';
import { loadGLTF } from '../../items/3d-objects/gltf.js';

const MAX_EV_LINES = 3;
const EV_FONT_SIZE = 80;
const CANVAS_SIZE = 500;

const specialAnswerKeys = ['ex-voto', 'consent'];

const writeExVoto = (item, answers) => {
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;

  const context = canvas.getContext('2d');
  context.font = `${EV_FONT_SIZE}px Fraunces`;
  context.fillStyle = '#000';
  context.textAlign = 'center';
  context.scale(1, 2);

  const text = answers['ex-voto'].toUpperCase();
  const { width } = context.measureText(text);
  console.info('[animita]', 'writing ex-voto', text, width);

  const numLines = Math.min(MAX_EV_LINES, Math.ceil(width / canvas.width));
  const words = text.split(' ');
  const wordsPerLine = Math.ceil(words.length / numLines);
  console.info('[animita]', 'writing', numLines, 'lines with', wordsPerLine, 'words per line');

  for (let line = 0; line < numLines; line++) {
    const lineWords = words.slice(line * wordsPerLine, line * wordsPerLine + wordsPerLine);
    console.info('[animita]', 'line', line, 'words', lineWords);

    context.fillText(
      lineWords.join(' '),
      CANVAS_SIZE / 2,
      EV_FONT_SIZE + line * EV_FONT_SIZE,
      canvas.width,
    );
  }

  const map = new CanvasTexture(canvas);
  const object = item.scene.getObjectByName('ex-voto-message');
  object.material = new MeshBasicMaterial({ map, transparent: true });
};

const createInventoryItems = async (G, answers) => {
  const names = Object.keys(answers)
    .filter((name) => !specialAnswerKeys.includes(name) && answers[name] === 'on');

  console.info('[animita]', 'adding inventory items', names);

  const group = new Group();

  const objects = await Promise.all(names.map(async (n) => {
    const desc = descs.find(({ name }) => name === n);
    if (!desc?.gltf) {
      return null;
    }

    return loadGLTF(desc.gltf);
  }));

  objects
    .filter((o) => !!o)
    .forEach((o) => group.add(o));

  return group;
}

export const makeAnimita = async (G, answers) => {
  console.info('[animita]', 'creating item');

  const make = THREEObjectMaker(G.google.InfoWindow);
  const item = await make('/assets/items/animita/', {
    name: 'Custom Animita',
    cameraPosition: { x: -2.7, y: 0.8, z: 3.5 },
    lightPosition: { x: -5, y: 5, z: 5 },
    onGround: true,
    big: true,
  });
  // ensure the object is loaded before inserting
  await item.loadObject();

  writeExVoto(item, answers);

  item.scene.add(await createInventoryItems(G, answers));
  item.container.classList.add('gustavo-item--noninteractive');

  const position = G.map.getPosition();
  item.insert(G.map, { lat: position.lat() + 0.00006, lng: position.lng() + 0.00005 });
  item.update();
  item.povUpdate();

  G.items.push(item);
};
