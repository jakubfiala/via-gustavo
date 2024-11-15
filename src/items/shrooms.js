import inventory from '../inventory';

const TRIP_DURATION = 5 * 60 * 1000;
const DELAY_FEEDBACK = 0.4;

export const eatenShrooms = {
  name: 'Eaten Magic Mushrooms',
  thumbnailURL: '/assets/items/magic-mushrooms/thumb.webp',
  collectible: true,
  canBeActivated: true,
  position: { lat: 2, lng: 2 }, // fake
  collectText: 'Was left with some',
  pickUpSFX: 'none',
  displayName: 'half-eaten magic mushrooms',
  gltf: '/assets/items/magic-mushrooms/',
  async create(makers) {
    const item = await makers.threeObject('/assets/items/magic-mushrooms/', {
      name: this.name,
      displayName: this.displayName,
    });
    return item;
  },
};

export const createShrooms = (label, position) => ({
  name: `Magic Mushrooms ${label}`,
  thumbnailURL: '/assets/items/magic-mushrooms/thumb.webp',
  collectible: true,
  canBeActivated: true,
  position,
  collectText: 'Ate some',
  pickUpSFX: 'chewing',
  displayName: 'magic mushrooms',
  gltf: '/assets/items/magic-mushrooms/',
  async create(makers) {
    const item = await makers.threeObject('/assets/items/magic-mushrooms/', {
      name: this.name,
      displayName: this.displayName,
      onGround: true,
      cameraPosition: { x: 0, y: 0.5, z: 2 },
    });
    item.activate = (context) => {
      console.info('[shrooms]', 'getting high');
      document.body.classList.add('dreamz');
      context.delay.gain.linearRampToValueAtTime(DELAY_FEEDBACK, context.audioContext.currentTime + 5);

      setTimeout(() => {
        console.info('[shrooms]', 'sobering up');
        document.body.classList.remove('dreamz');
        inventory.removeItem(this.name);
        context.delay.gain.linearRampToValueAtTime(0, context.audioContext.currentTime + 5);
        inventory.addItem(eatenShrooms);
      }, TRIP_DURATION);
    };
    return item;
  },
});

export const createDelayEffect = (context) => {
  const delay = new DelayNode(context.audioContext, { delayTime: 0.5 });
  const feedbackGain = new GainNode(context.audioContext, { gain: 0 });

  feedbackGain.connect(delay).connect(feedbackGain);

  return feedbackGain;
};

export const shrooms = [
  createShrooms('1', {
    lat: -20.4355,
    lng: -69.54638,
  }),
  createShrooms('2', {
    lat: -20.43516,
    lng: -69.54644,
  }),
];
