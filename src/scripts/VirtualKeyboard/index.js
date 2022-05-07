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
    if (localStorage.getItem('language')) {
      localStorage.setItem('language', 'en');
    }
    this.keyboard.setAttribute('class', 'keyboard');
    this.keyboard.innerHTML = `
      <p>Change of language - key 'fn'</p>
    `;
    this.keyboard.append(textArea.addTextArea(), this.keysKeyboard.addKeys());
  }

  clickKeyboard(event) {
    if (this.caps || this.shift || this.control || this.option || this.command) {
      this.caps = false;
      this.e.target.parentElement.parentElement.classList.remove('animation');
      this.capsLock.style.backgroundColor = '';
      this.shift = true;
      this.control = false;
      this.controlKey.classList.remove('animation');
      this.controlKey.style.backgroundColor = '';
      this.option = true;
      this.command = true;
      this.addStyleRed('shift', 'shiftKey');
      this.addStyleRed('option', 'optionKey');
      this.addStyleRed('command', 'commandKey');
    }
    document.getElementById(`${event.code}`).parentElement.style.backgroundColor = 'red';
  }

  unClickKeyboard(event) {
    this.event = event;
    document.getElementById(`${this.event.code}`).parentElement.style.backgroundColor = '';
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
      this.texArea.value += ' ';
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
