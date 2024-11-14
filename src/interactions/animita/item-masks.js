const map = {
  'Coca-Cola 1': 0b00000001,
  'NASA baseball cap': 0b00000010,
  'NASA Backpack': 0b00000100,
  'a broken phone': 0b00001000,
  'Broken drone': 0b00010000,
  geiger: 0b00100000,
  shrooms: 0b01000000,
};

export const getItemNamesForMask = (mask) => Object.entries(map)
  .reduce((names, [name, item]) => mask & item ? names.concat(name) : names, []);

export const getMaskForItemNames = (names) => names.reduce((mask, name) => mask | (map[name] ?? 0), 0);
