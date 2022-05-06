import keysLayoutEn from '../DataEn';
import keysLayoutRu from '../DataRu';

class Keys {
  constructor() {
    this.keysLayoutEn = '';
  }

  addKeys(enRu) {
    if (enRu === 'en') {
      this.keysLayoutEn = keysLayoutEn;
    } else {
      this.keysLayoutEn = keysLayoutRu;
    }
    this.keys = document.createElement('div');
    this.keys.setAttribute('class', 'keys');
    this.keys.setAttribute('id', 'keys');
    this.firstLine = document.createElement('div');
    this.firstLine.classList.add('keys__line');
    this.secondLine = document.createElement('div');
    this.secondLine.classList.add('keys__line');
    this.thirdLine = document.createElement('div');
    this.thirdLine.classList.add('keys__line');
    this.fourthLine = document.createElement('div');
    this.fourthLine.classList.add('keys__line');
    this.fiveLine = document.createElement('div');
    this.fiveLine.classList.add('keys__line');

    this.keysLayoutEn.forEach((item, index) => {
      item.forEach((elem) => {
        const key = document.createElement('div');
        key.classList.add('keys__key');

        if (Array.isArray(elem)) {
          key.innerHTML = `
            <div class="upDown">
              <div class="up">
                <div id="${elem[0].code}">${elem[0].key1}</div>
              </div>
              <div class="down">
                <div id="${elem[1].code}">${elem[1].key1}</div>
              </div>
            </div>
          `;
        } else if (Object.keys(elem).length === 3) {
          key.innerHTML = `
            <div class="double-key" id="${elem.code}">
              <div class="first-key">${elem.key1}</div>
              <div class="second-key">${elem.key2}</div>
            </div>
          `;
        } else {
          key.innerHTML = `
            <div id="${elem.code}">
              <div class="first-key">${elem.key1}</div>
            </div>
          `;
        }

        switch (elem.key1) {
          case 'Backspace':
            key.classList.add('backspace');
            break;
          case 'Tab':
            key.classList.add('tab');
            break;
          case 'Enter':
            key.classList.add('enter');
            break;
          case 'Caps Lock':
            key.classList.add('caps-Lock');
            break;
          case 'Shift':
            key.classList.add('shift');
            break;
          case 'Control':
            key.classList.add('control');
            break;
          case 'Option':
            key.classList.add('option');
            break;
          case 'Command':
            key.classList.add('command');
            break;
          case 'Space':
            key.classList.add('space');
            break;
          case 'left':
            key.classList.add('left');
            break;
          case 'upDawn':
            key.classList.add('upDawn');
            break;
          case 'right':
            key.classList.add('right');
            break;
          default:
            break;
        }

        switch (index) {
          case 0:
            this.firstLine.append(key);
            break;
          case 1:
            this.secondLine.append(key);
            break;
          case 2:
            this.thirdLine.append(key);
            break;
          case 3:
            this.fourthLine.append(key);
            break;
          case 4:
            this.fiveLine.append(key);
            break;
          default:
            break;
        }
      });
    });

    this.keys.append(
      this.firstLine,
      this.secondLine,
      this.thirdLine,
      this.fourthLine,
      this.fiveLine,
    );

    return this.keys;
  }
}

export default Keys;
