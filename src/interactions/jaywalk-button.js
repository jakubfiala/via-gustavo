import { disableClickToGoCB, enableClickToGoCB } from '../script/utils';

const container = document.getElementById('jaywalk');
const button = document.getElementById('jaywalk-button');

export const enableJaywalk = (context, destination) => {
  container.hidden = false;
  disableClickToGoCB(context);

  const onClick = () => {
    container.hidden = true;
    context.map.setPosition(destination);
    enableClickToGoCB(context);
  };

  button.addEventListener('click', onClick, { once: true });
};
