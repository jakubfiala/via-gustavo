import { sleep } from '../../utils.js';
import { flashStatus } from '../../script/utils.js';
import { ask } from './lib.js';

const dialog = document.getElementById('iching-dialog');
const form = document.getElementById('iching-form');

const onSubmit = (context) => async (event) => {
  event.preventDefault();
  dialog.close();

  await sleep(1_000);

  const question = form.elements.question.value;
  const { hexagram } = ask(question);

  flashStatus(`${hexagram.number} - ${hexagram.character} - ${hexagram.names.join(', ')}`, 5)(context);
};

export const readIChing = (context) => {
  dialog.showModal();
  form.addEventListener('submit', onSubmit(context), { once: true });
};
