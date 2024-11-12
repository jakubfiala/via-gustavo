import { CanvasTexture, Group, MeshBasicMaterial } from 'three';
import { THREEObjectMaker } from '../../items/3d-objects';

const writeExVoto = (item, answers) => {
  const canvas = document.createElement('canvas');
  canvas.width = 500;
  canvas.height = 250;

  const context = canvas.getContext('2d');
  context.font = '80px Fraunces';
  context.fillStyle = '#000';
  context.fillText(answers['ex-voto'].toUpperCase(), 10, canvas.height / 2);

  const map = new CanvasTexture(canvas);

  console.log(item);
  const object = item.scene.getObjectByName('ex-voto-message');
  object.material = new MeshBasicMaterial({ map, transparent: true });
};

const addItems = (answers) => {
  const group = new Group();
  const exVoto = createExVoto(answers['ex-voto']);
  group.add(exVoto);

  return group;
}

export const makeAnimita = async (G, answers) => {
  console.info('[animita]', 'creating item');

  const make = THREEObjectMaker(G.google.InfoWindow);
  const item = await make('/assets/items/animita/', {
    name: 'Custom Animita',
    cameraPosition: { x: -2.7, y: 0.8, z: 2.7 },
    onGround: true,
    big: true,
  });
  // ensure the object is loaded before inserting
  await item.loadObject();

  writeExVoto(item, answers);

  item.container.classList.add('gustavo-item--noninteractive');

  const position = G.map.getPosition();
  item.insert(G.map, { lat: position.lat() + 0.00003, lng: position.lng() + 0.00005 });
  item.update();
  item.povUpdate();

  G.items.push(item);
};
