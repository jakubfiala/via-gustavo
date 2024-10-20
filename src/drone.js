const drone = document.getElementById('drone');

export const flyBy = (context) => {
  console.info('[drone]', 'flying by');
  drone.style.animationDelay = '6s';
  drone.style.animationPlayState = 'running';
  context.sfx.droneFlyBy();
};
