const container = document.getElementById('jaywalk');
const button = document.getElementById('jaywalk-button');

export const enableJaywalk = (context, destination) => {
  container.hidden = false;

  const onClick = () => {
    container.hidden = true;
    context.map.setPosition(destination);
  };

  button.addEventListener('click', onClick, { once: true });
};
