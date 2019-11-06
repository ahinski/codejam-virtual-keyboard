let language = 'english';
let shiftPressed = false;
let capslockPressed = false;
let rowId = 0;
let shiftCount = 0;
let altCount = 0;
let ctrlCount = 0;

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
  'v', 'w', 'x', 'y', 'z', 'j', 'i'];

const english = [['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'Delete'],
  ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", '\\', 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '&#11165;', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', '&#11164;', '&#11167;', '&#11166;', 'Ctrl'],
];
const russian = [['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'Delete'],
  ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', '\\', 'Enter'],
  ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '&#11165;', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', '&#11164;', '&#11167;', '&#11166;', 'Ctrl'],
];

const input = document.createElement('input');
input.type = 'text';
input.id = 'input';
document.body.appendChild(input);

class Key {
  constructor(keyEngTitle, keyRusTitle) {
    this.eng = keyEngTitle;
    this.rus = keyRusTitle;
  }

  get engTitleVar() {
    return this.eng;
  }

  get rusTitleVar() {
    return this.rus;
  }

  element() {
    const key = document.createElement('button');
    key.className = 'key';
    key.classList.add(this.eng);
    key.classList.add(this.rus);
    if (language === 'english') {
      key.innerHTML = this.eng;
    } else {
      key.innerHTML = this.rus;
    }
    if (this.eng === 'Space') {
      key.classList.add('space');
      key.innerHTML = '';
      key.id = 'Space';
      return key;
    }
    if (this.eng === 'Tab') {
      key.classList.add('tab');
      key.id = 'Tab';
      return key;
    }
    if (this.eng === 'CapsLock') {
      key.classList.add('capsLock');
      key.id = 'CapsLock';
      return key;
    }
    if (this.eng === 'Shift') {
      key.classList.add('shift');
      if (shiftCount === 0) {
        key.id = 'ShiftLeft';
        shiftCount += 1;
      } else {
        key.id = 'ShiftRight';
      }
      return key;
    }
    if (this.eng === 'Ctrl') {
      key.classList.add('ctrl');
      if (ctrlCount === 0) {
        key.id = 'ControlLeft';
        ctrlCount += 1;
      } else {
        key.id = 'ControlRight';
      }
      return key;
    }
    if (this.eng === 'Win') {
      key.classList.add('win');
      key.id = 'MetaLeft';
      return key;
    }
    if (this.eng === 'Alt') {
      key.classList.add('alt');
      if (altCount === 0) {
        key.id = 'AltLeft';
        altCount += 1;
      } else {
        key.id = 'AltRight';
      }
      return key;
    }
    if (this.eng === 'Backspace') {
      key.classList.add('backspace');
      key.id = 'Backspace';
      return key;
    }
    if (this.eng === 'Enter') {
      key.classList.add('enter');
      key.id = 'Enter';
      return key;
    }
    if (this.eng === 'Delete') {
      key.classList.add('delete');
      key.id = 'Delete';
      return key;
    }
    if (this.eng.startsWith('&')) {
      if (this.eng === '&#11165;') {
        key.id = 'ArrowUp';
      }
      if (this.eng === '&#11164;') {
        key.id = 'ArrowLeft';
      }
      if (this.eng === '&#11167;') {
        key.id = 'ArrowDown';
      }
      if (this.eng === '&#11166;') {
        key.id = 'ArrowRight';
      }
      return key;
    }
    if (alphabet.indexOf(this.eng) !== -1) {
      key.classList.add('usual_key');
      key.id = `Key${this.eng.toUpperCase()}`;
      return key;
    }
    key.id = this.eng.charCodeAt();
    return key;
  }
}

function funcMousedown(event) {
  if (event.path[0].innerHTML === 'CapsLock') {
    let list;
    if (capslockPressed) {
      capslockPressed = false;
      list = document.getElementsByClassName('usual_key');
      for (let i = 0; i < list.length; i += 1) {
        list[i].innerHTML = list[i].innerHTML.toLowerCase();
      }
    } else {
      capslockPressed = true;
      list = document.getElementsByClassName('usual_key');
      for (let i = 0; i < list.length; i += 1) {
        list[i].innerHTML = list[i].innerHTML.toUpperCase();
      }
    }
  }
  if (event.path[0].innerHTML === 'Shift') {
    let list;
    if (shiftPressed === false) {
      shiftPressed = true;
      list = document.getElementsByClassName('usual_key');
      for (let i = 0; i < list.length; i += 1) {
        if (capslockPressed) {
          list[i].innerHTML = list[i].innerHTML.toLowerCase();
        } else {
          list[i].innerHTML = list[i].innerHTML.toUpperCase();
        }
      }
    }
  }
}

function funcMouseup(event) {
  if (event.path[0].innerHTML === 'Shift') {
    shiftPressed = false;
    if (capslockPressed) {
      const list = document.getElementsByClassName('usual_key');
      for (let i = 0; i < list.length; i += 1) {
        list[i].innerHTML = list[i].innerHTML.toUpperCase();
      }
    } else {
      const list = document.getElementsByClassName('usual_key');
      for (let i = 0; i < list.length; i += 1) {
        list[i].innerHTML = list[i].innerHTML.toLowerCase();
      }
    }
  }
}

function funcClick(event) {
  if (event.path[0].innerHTML === 'CapsLock') {
    return;
  }
  if (event.path[0].innerHTML === 'Shift') {
    return;
  }
  if (event.path[0].innerHTML === 'Alt') {
    return;
  }
  if (event.path[0].innerHTML === 'Delete') {
    return;
  }
  if (event.path[0].innerHTML === 'Backspace') {
    return;
  }
  if (language === english) document.getElementById('input').value += event.path[0].innerHTML;
  else document.getElementById('input').value += event.path[0].innerHTML;
}


function createRow(buttons) {
  const row = document.createElement('div');
  row.className = 'row';
  row.id = `row_${rowId}`;
  rowId += 1;
  buttons.forEach((key) => {
    row.appendChild(key);
    key.addEventListener('mousedown', funcMousedown);
    key.addEventListener('mouseup', funcMouseup);
    key.addEventListener('click', funcClick);
  });
  document.getElementById('keyboard').appendChild(row);
}

function createKeyboard(eng, rus) {
  const keyboard = document.createElement('div');
  keyboard.id = 'keyboard';
  document.body.appendChild(keyboard);
  let keys = [];
  let key;
  for (let i = 0; i < 5; i += 1) {
    for (let j = 0; j < eng[i].length; j += 1) {
      key = new Key(eng[i][j], rus[i][j]);
      keys.push(key.element());
    }
    createRow(keys);
    keys = [];
  }
}

createKeyboard(english, russian);

document.addEventListener('keydown', (event) => {
  if (document.getElementById(event.code) != null) {
    if (event.location !== 0) {
      document.getElementById(event.code).classList.add('pressed');
      document.getElementById(event.code).click();
      if ((event.code === 'AltRight' || event.code === 'AltLeft') && shiftPressed) {
        if (language === 'english') language = 'russian';
        else language = 'english';
        const list = document.getElementsByClassName('usual_key');
        for (let i = 0; i < list.length; i += 1) {
          // eslint-disable-next-line prefer-destructuring
          if (language === 'russian') list[i].innerHTML = list[i].classList[2];
          // eslint-disable-next-line prefer-destructuring
          else list[i].innerHTML = list[i].classList[1];
        }
      }
      if (event.code === 'ShiftRight' || event.code === 'ShiftLeft') {
        let list;
        if (shiftPressed === false) {
          shiftPressed = true;
          list = document.getElementsByClassName('usual_key');
          for (let i = 0; i < list.length; i += 1) {
            if (capslockPressed) {
              list[i].innerHTML = list[i].innerHTML.toLowerCase();
            } else {
              list[i].innerHTML = list[i].innerHTML.toUpperCase();
            }
          }
        }
      }
      return;
    }
    try {
      document.getElementById(event.code).classList.add('pressed');
      document.getElementById(event.code).click();
      if (event.code === 'CapsLock') {
        let list;
        if (capslockPressed) {
          capslockPressed = false;
          list = document.getElementsByClassName('usual_key');
          for (let i = 0; i < list.length; i += 1) {
            list[i].innerHTML = list[i].innerHTML.toLowerCase();
          }
        } else {
          capslockPressed = true;
          list = document.getElementsByClassName('usual_key');
          for (let i = 0; i < list.length; i += 1) {
            list[i].innerHTML = list[i].innerHTML.toUpperCase();
          }
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('next');
    }
  }
});

document.addEventListener('keypress', (event) => {
  if (event.code) {
    try {
      document.getElementById(event.charCode).classList.add('pressed');
      document.getElementById(event.charCode).click();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('next');
    }
  }
});

document.addEventListener('keyup', (event) => {
  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
    shiftPressed = false;
    const list = document.getElementsByClassName('usual_key');
    for (let i = 0; i < list.length; i += 1) {
      if (capslockPressed) {
        list[i].innerHTML = list[i].innerHTML.toUpperCase();
      } else {
        list[i].innerHTML = list[i].innerHTML.toLowerCase();
      }
    }
  }
  const { length } = document.getElementsByClassName('pressed');
  for (let i = 0; i < length; i += 1) {
    document.getElementsByClassName('pressed')[0].classList.remove('pressed');
  }
});
