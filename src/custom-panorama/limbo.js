const FORWARD_HEADING = 80;
const BACKWARD_HEADING = 360 - FORWARD_HEADING;

export const LIMBO_LNG_STEP = 10_000;

export const getLimboPanoPosition = (name) => parseInt(name.replace('limbo', ''), 10);

export const getLimboPanoIndex = (name) => {
  const x = getLimboPanoPosition(name);
  // calculate distance from positive/negative one, get remainder of division by 3, offset by one
  const mod = Math.abs((x - Math.sign(x)) % 3 + Math.sign(x));
  // for positive numbers, rise with rising magnitude
  if (x > 0) {
    return mod;
  }
  // for negative numbers, rise in reverse (i.e with decreasing magnitude)
  return (3 - mod) || 3;
};

const memoizedPanos = new Map();

export const getLimboPano = (create, name) => {
  if (memoizedPanos.has(name)) {
    return memoizedPanos.get(name);
  }

  const pos = getLimboPanoPosition(name);
  const prevPano = `limbo${(pos - 1).toString()}`;
  const nextPano = `limbo${(pos + 1).toString()}`;
  const position = { lat: 0, lng: pos * (1 / LIMBO_LNG_STEP) };

  console.info('[limbo]', 'creating panorama at', pos, 'with links', prevPano, nextPano, 'and position', position);

  const links = [
    { pano: prevPano, heading: BACKWARD_HEADING },
    { pano: nextPano, heading: FORWARD_HEADING },
  ];

  const options = { centerHeading: BACKWARD_HEADING, position };

  const pano = create(name, links, options);
  memoizedPanos.set(name, pano);

  return pano;
}
