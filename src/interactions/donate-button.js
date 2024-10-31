import { disableClickToGoCB, enableClickToGoCB } from '../script/utils';

const container = document.getElementById('donate');
const button = document.getElementById('donate-button');

export const askForDonation = (context) => new Promise((resolve) => {
  container.hidden = false;
  disableClickToGoCB(context);

  const onClick = () => {
    context.sfx.donatingWater();

    enableClickToGoCB(context);
    container.hidden = true;

    const item = context.items.find((item) => item.name === 'Bottles');
    if (item) {
      const coke = item.scene.getObjectByName('coke');
      coke.position.y = 0;
      item.update();
    }
    resolve();
  };

  button.addEventListener('click', onClick, { once: true });
});
