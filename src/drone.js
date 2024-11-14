const VISIBLE_CLASS = 'drone-hovering--visible';
const MOVEMENT_DELAY_S = 3;

const drone = document.getElementById('drone');

export const flyBy = (context) => {
  console.info('[drone]', 'flying by');
  drone.hidden = false;
  drone.style.animationDelay = '6s';
  drone.style.animationPlayState = 'running';
  context.sfx.droneFlyBy();
};

export const hover = async (context, position) => {
  console.info('[drone]', 'hovering');

  const sound = context.localisedSounds.getSoundByName('drone-hovering');
  await sound.load();

  sound.position = new google.maps.LatLng(position);
  sound.panner.positionX.linearRampToValueAtTime(position.lat, context.audioContext.currentTime + MOVEMENT_DELAY_S);
  sound.panner.positionY.linearRampToValueAtTime(position.lng, context.audioContext.currentTime + MOVEMENT_DELAY_S);
  sound.updateMix(1);

  document.getElementById('drone-hovering').classList.add(VISIBLE_CLASS);
};

export const hoverBehind = async (context) => {
  const item = context.items.find((item) => item.name === 'Hovering drone');
  const sound = context.localisedSounds.getSoundByName('drone-hovering');
  await sound.load();

  let dronePosition = context.map.getPosition();
  console.info('[drone]', 'hovering behind', item, sound, dronePosition);

  const listener = context.google.event.addListener(map, 'position_changed', () => {
    console.info('[drone]', 'hovering behind (moved)', dronePosition);
    item.info.setPosition(dronePosition);
    item.update();

    hover(context, { lat: dronePosition.lat(), lng: dronePosition.lng() });
    // for the next time
    dronePosition = map.getPosition();
  });

  return {
    stopHovering: (context) => {
      console.info('[drone]', 'hovering behind (stopped hovering)');
      sound.gain.gain.cancelScheduledValues(context.audioContext.currentTime);
      sound.gain.gain.linearRampToValueAtTime(0, context.audioContext.currentTime + MOVEMENT_DELAY_S);
      listener.remove();
      document.getElementById('drone-hovering').classList.remove(VISIBLE_CLASS);
    },
  };
};

export const itemDesc = {
  name: 'Hovering drone',
  collectible: false,
  position: { lat: -20.29203, lng: -69.78111 },
  create(makers) {
    return makers.simpleImage({ name: this.name, src: '/assets/img/drone.webp', id: 'drone-hovering', correctZ: false });
  },
};
