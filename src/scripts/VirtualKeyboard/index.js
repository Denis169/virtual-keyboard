import keysLayoutEn from '../DataEn';
import keysLayoutRu from '../DataRu';

import TextArea from '../TextArea';
import Keys from '../Keys';

class VirtualKeyboard {
  constructor(document) {
    this.keyboard = document.querySelector('#virtual-keyboard');
    this.caps = false;
    this.shift = false;
    this.control = false;
    this.option = false;
    this.command = false;
    this.keysKeyboard = new Keys();
  }

  addKeyboard() {
    const textArea = new TextArea();
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', 'en');
    }
    this.keyboard.setAttribute('class', 'keyboard');
    this.keyboard.innerHTML = `
      <p>Клавиатура создана в операционной системе MacOs</p>
      <p>Change of language - key 'fn'(mouse), or click on 'Control + Space'(keyboard and mouse)</p>
    `;
    this.keyboard.append(textArea.addTextArea(), this.keysKeyboard.addKeys());
  }

  clickKeyboard(event) {
    this.texArea = document.getElementById('text-area');
    this.capsLock = document.querySelector('.caps-Lock');
    this.shiftKey = document.querySelectorAll('.shift');
    this.controlKey = document.querySelector('.control');
    this.optionKey = document.querySelectorAll('.option');
    this.commandKey = document.querySelectorAll('.command');
    this.space = document.querySelector('.space');
    this.dataForSearchSimbol = localStorage.getItem('language') === 'en' ? keysLayoutEn : keysLayoutRu;
    this.simbol = this.dataForSearchSimbol.reduce((acc, item) => {
      if (item.find((elem) => elem.code === event.code)) {
        const letter = item.find((elem) => elem.code === event.code);
        if (this.caps || this.shift) {
          acc = letter.key2 ? letter.key2 : letter.key1;
          return acc;
        }
        acc = letter.key1.toLowerCase();
        return acc;
      }
      return acc || null;
    }, '');

    if (this.simbol === 'backspace') {
      this.texArea.value = this.texArea.value.slice(0, -1);
    } else if (this.simbol === 'tab') {
      this.texArea.value += '\t';
    } else if (this.simbol === 'enter') {
      this.texArea.value += '\n';
    } else if (event.code === 'CapsLock') {
      this.caps = !this.caps;
      this.capsLock.style.backgroundColor = 'red';
    } else if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      this.shift = true;
      this.shiftKey.forEach((item) => item.style.backgroundColor = 'red');
    } else if (event.code === 'ControlLeft') {
      this.control = true;
      this.controlKey.style.backgroundColor = 'red';
    } else if (event.code === 'AltLeft' || event.code === 'AltRight') {
      this.option = true;
      this.optionKey.forEach((item) => item.style.backgroundColor = 'red');
    } else if (event.code === 'MetaLeft' || event.code === 'MetaRight') {
      this.command = true;
      this.commandKey.forEach((item) => item.style.backgroundColor = 'red');
    } else if (event.code === 'Space') {
      this.space.classList.add('animation');
      setTimeout(() => this.space.classList.remove('animation'), 100);
      if (this.control) {
        localStorage.setItem('language', `${localStorage.getItem('language') === 'en' ? 'ru' : 'en'}`);
        this.keysKeyboard.addKeysInKeyboard();
      } else {
        this.texArea.value += ' ';
      }
    } else if (event.code === 'ArrowLeft') {
      this.texArea.value += '<';
    } else if (event.code === 'ArrowUp') {
      this.texArea.value += '∧';
    } else if (event.code === 'ArrowDown') {
      this.texArea.value += '∨';
    } else if (event.code === 'ArrowRight') {
      this.texArea.value += '>';
    } else if (this.simbol !== null) {
      this.texArea.value += this.simbol;
    }
    if (this.simbol !== null) document.getElementById(`${event.code}`).style.backgroundColor = 'red';
    if (this.simbol !== null) document.getElementById(`${event.code}`).classList.add('animation');

    event.preventDefault();
  }

  unClickKeyboard(event) {
    this.dataForSearchSimbol = localStorage.getItem('language') === 'en' ? keysLayoutEn : keysLayoutRu;
    this.simbol = this.dataForSearchSimbol.reduce((acc, item) => {
      if (item.find((elem) => elem.code === event.code)) {
        const letter = item.find((elem) => elem.code === event.code);
        if (this.caps || this.shift) {
          acc = letter.key2 ? letter.key2 : letter.key1;
          return acc;
        }
        acc = letter.key1.toLowerCase();
        return acc;
      }
      return acc || null;
    }, '');
    this.event = event;
    if (event.code === 'CapsLock') {
      this.caps = !this.caps;
      this.event.target.parentElement.parentElement.classList.remove('animation');
      this.capsLock.style.backgroundColor = '';
    } if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      this.shift = false;
      this.event.target.parentElement.parentElement.classList.remove('animation');
      this.shiftKey.forEach((item) => item.style.backgroundColor = '');
    } if (event.code === 'ControlLeft') {
      this.control = false;
      this.controlKey.classList.remove('animation');
      this.controlKey.style.backgroundColor = '';
    } if (event.code === 'AltLeft' || event.code === 'AltRight') {
      this.option = false;
      this.optionKey.forEach((item) => item.classList.remove('animation'));
      this.optionKey.forEach((item) => item.style.backgroundColor = '');
    } if (event.code === 'MetaLeft' || event.code === 'MetaRight') {
      this.command = false;
      this.commandKey.forEach((item) => item.classList.remove('animation'));
      this.commandKey.forEach((item) => item.style.backgroundColor = '');
    }
    if (this.simbol !== null) document.getElementById(`${this.event.code}`).style.backgroundColor = '';
  }

  addStyleRed(key, htmlKey) {
    this[`${key}`] = !this[`${key}`];
    if (this[`${key}`]) {
      this[`${htmlKey}`].forEach((item) => item.style.backgroundColor = 'red');
    } else {
      this[`${htmlKey}`].forEach((item) => item.classList.remove('animation'));
      this[`${htmlKey}`].forEach((item) => item.style.backgroundColor = '');
    }
  }

  addTextInTextArea(event) {
    this.e = event;
    this.texArea = document.getElementById('text-area');
    this.capsLock = document.querySelector('.caps-Lock');
    this.shiftKey = document.querySelectorAll('.shift');
    this.controlKey = document.querySelector('.control');
    this.optionKey = document.querySelectorAll('.option');
    this.commandKey = document.querySelectorAll('.command');

    if (!this.e.target.classList.contains('keys') && !this.e.target.classList.contains('keys__line')) {
      this.e.target.parentElement.parentElement.classList.add('animation');
      setTimeout(() => this.e.target.parentElement.parentElement.classList.remove('animation'), 100);
    }

    if (event.target.parentElement.classList.contains('double-key')) {
      if (this.caps || this.shift) {
        this.texArea.value += event.target.parentElement.querySelector('.second-key').innerText;
      } else {
        this.texArea.value += event.target.parentElement.querySelector('.first-key').innerText;
      }
    } else if (event.target.innerText === 'Backspace') {
      this.texArea.value = this.texArea.value.slice(0, -1);
    } else if (event.target.innerText === 'Tab') {
      this.texArea.value += '\t';
    } else if (event.target.innerText === 'Enter') {
      this.texArea.value += '\n';
    } else if (event.target.innerText === 'Caps Lock') {
      this.caps = !this.caps;
      if (this.caps) {
        this.capsLock.style.backgroundColor = 'red';
      } else {
        this.e.target.parentElement.parentElement.classList.remove('animation');
        this.capsLock.style.backgroundColor = '';
      }
    } else if (event.target.innerText === 'Shift') {
      this.addStyleRed('shift', 'shiftKey');
    } else if (event.target.innerText === 'Control') {
      this.control = !this.control;
      if (this.control) {
        this.controlKey.style.backgroundColor = 'red';
      } else {
        this.controlKey.classList.remove('animation');
        this.controlKey.style.backgroundColor = '';
      }
    } else if (event.target.innerText === 'Option') {
      this.addStyleRed('option', 'optionKey');
    } else if (event.target.innerText === 'Command') {
      this.addStyleRed('command', 'commandKey');
    } else if (event.target.innerText === 'Space') {
      if (this.control) {
        localStorage.setItem('language', `${localStorage.getItem('language') === 'en' ? 'ru' : 'en'}`);
        this.keysKeyboard.addKeysInKeyboard();
      } else {
        this.texArea.value += ' ';
      }
    } else if (event.target.innerText === 'fn') {
      localStorage.setItem('language', `${localStorage.getItem('language') === 'en' ? 'ru' : 'en'}`);
      this.keysKeyboard.addKeysInKeyboard();
    } else if ((this.shift || this.caps) && !this.e.target.classList.contains('keys') && !this.e.target.classList.contains('keys__line')) {
      this.texArea.value += event.target.innerText;
    } else if (!this.e.target.classList.contains('keys') && !this.e.target.classList.contains('keys__line')) {
      this.texArea.value += event.target.innerText.toLowerCase();
    }

    this.texArea.focus();
  }
}

export default VirtualKeyboard;
