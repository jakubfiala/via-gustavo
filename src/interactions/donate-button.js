import { disableClickToGoCB, enableClickToGoCB } from '../script/utils';

const container = document.getElementById('donate');
const button = document.getElementById('donate-button');

export const enableDonate = (context) => {
  container.hidden = false;
  disableClickToGoCB(context);

  const onClick = () => {
    enableClickToGoCB(context);
    container.hidden = true;
  };

  button.addEventListener('click', onClick, { once: true });
};
