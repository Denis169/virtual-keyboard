import VirtualKeyboard from './scripts/VirtualKeyboard';

import './style/style.scss';

const keyboard = new VirtualKeyboard(document);

keyboard.addKeyboard();

const keys = document.getElementById('keys');
const texArea = document.getElementById('text-area');

function lightKey(event) {
  document.getElementById(`${event.code}`).parentElement.style.backgroundColor = 'red';
}

function notLightKey(event) {
  document.getElementById(`${event.code}`).parentElement.style.backgroundColor = '';
}

texArea.focus();
// texArea.addEventListener('keydown', () => console.log(texArea.value));
texArea.addEventListener('keydown', (event) => lightKey(event));
texArea.addEventListener('keyup', (event) => notLightKey(event));

keys.addEventListener('click', (event) => keyboard.addTextInTextArea(event));
