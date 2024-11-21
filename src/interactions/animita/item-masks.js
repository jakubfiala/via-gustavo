const map = {
  'Coca-Cola 1': 0b00000001,
  'NASA baseball cap': 0b00000010,
  'NASA Backpack': 0b00000100,
  'a broken phone': 0b00001000,
  'Broken drone': 0b00010000,
  'Broken Geiger Counter': 0b00100000,
  'Eaten Magic Mushrooms': 0b01000000,
  'Pencils': 0b10000000,
};

export const getItemNamesForMask = (mask) => Object.entries(map)
  .reduce((names, [name, item]) => mask & item ? names.concat(name) : names, []);

export const getMaskForItemNames = (names) => names.reduce((mask, name) => {
  let itemMask = map[name] ?? 0;
  if (name.startsWith('Coca-Cola')) {
    itemMask = 0b00000001;
  }

  return mask | itemMask;
}, 0);
