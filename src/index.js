import VirtualKeyboard from './scripts/VirtualKeyboard';

import './style/style.scss';

const keyboard = new VirtualKeyboard(document);
keyboard.addKeyboard();

const keys = document.getElementById('keys');
const texArea = document.getElementById('text-area');

texArea.focus();
texArea.addEventListener('keydown', (event) => keyboard.clickKeyboard(event));
texArea.addEventListener('keyup', (event) => keyboard.unClickKeyboard(event));

keys.addEventListener('click', (event) => keyboard.addTextInTextArea(event));
