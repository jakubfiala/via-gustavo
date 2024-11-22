const map = {
  'Coca-Cola': 0b000000001,
  'NASA baseball cap': 0b000000010,
  'NASA Backpack': 0b000000100,
  'a broken phone': 0b000001000,
  'Broken drone': 0b000010000,
  'Broken Geiger Counter': 0b000100000,
  'Eaten Magic Mushrooms': 0b001000000,
  'Pencils': 0b010000000,
  'Football': 0b100000000,
};

export const getItemNamesForMask = (mask) => Object.entries(map)
  .reduce((names, [name, item]) => mask & item ? names.concat(name) : names, []);

export const getMaskForItemNames = (names) => names.reduce((mask, name) => {
  let itemMask = map[name] ?? 0;
  if (name.startsWith('Coca-Cola')) {
    itemMask = map['Coca-Cola'];
  }

  return mask | itemMask;
}, 0);
