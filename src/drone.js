const drone = document.getElementById('drone');

export const flyBy = (context) => {
  console.info('[drone]', 'flying by');
  drone.style.animationDelay = '6s';
  drone.style.animationPlayState = 'running';
  context.sfx.droneFlyBy();
};

export const hover = async (context, position) => {
  console.info('[drone]', 'hovering');

  const sound = context.localisedSounds.getSoundByName('drone-hovering');
  await sound.load();
  console.log(sound);
  sound.position = new google.maps.LatLng(position);
  sound.panner.positionX.setValueAtTime(position.lat, context.audioContext.currentTime);
  sound.panner.positionY.setValueAtTime(position.lng, context.audioContext.currentTime);
  sound.updateMix(1);

  document.getElementById('drone-hovering').classList.add('drone-hovering--visible');
};
