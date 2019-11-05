var language = "english";
var shift_pressed = "false";

const english = [["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
                ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "Delete"],
                ["CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "&#92;", "Enter"],
                ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "&#11165;", "Shift"],
                ["Ctrl", "Win", "Alt", "Space", "Alt", `&#11164;`, `&#11167;`, `&#11166;`, "Ctrl"]
];
const russian = [["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
                ["Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "Delete"],
                ["CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "&#92;", "Enter"],
                ["Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "&#129137;", "Shift"],
                ["Ctrl", "Win", "Alt", "Space", "Alt", "&#11164;", "&#11167;", "&#11166;", "Ctrl"]
];

var input = document.createElement("input");
input.type = "text";
input.id = "input";
document.body.appendChild(input);

class Key {
    constructor(keyEngTitle, keyRusTitle) {
        this.eng = keyEngTitle;
        this.rus = keyRusTitle;
    }
    get eng_title() {
        return this.eng;
    }
    get rus_title() {
        return this.rus;
    }
    element() {
        let key = document.createElement("button");
        key.className = "key";
        if (language == "english") key.innerHTML = this.eng;
        else key.innerHTML = this.rus;
        if (this.eng == "Space") { 
            key.classList.add("space");
            key.innerHTML = "";
    }
        if (this.eng == "Tab") {
            key.classList.add("tab");
            return key;
    }
        if (this.eng == "CapsLock") {
            key.classList.add("capsLock");
            return key;
        }
        if (this.eng == "Shift") {
            key.classList.add("shift");
            return key;
        }
        if (this.eng == "Ctrl") {
            key.classList.add("ctrl");
            return key;
        }
        if (this.eng == "Win") {
            key.classList.add("win");
            return key;
        }
        if (this.eng == "Alt") {
            key.classList.add("alt");
            return key;
        }
        if (this.eng == "Backspace") {
            key.classList.add("backspace");
            return key;
        }
        if (this.eng == "Enter") {
            key.classList.add("enter");
            return key;
        }
        if (this.eng == "Delete") {
            key.classList.add("delete");
            return key;
        }
        key.classList.add("usual_key");
        return key;
    }
}

function createRow(buttons) {
    let row = document.createElement("div");
    row.className = "row";
    buttons.forEach((key) => {
        row.appendChild(key);
        key.addEventListener("mouseup", func_mouseup);
    });
    document.getElementById("keyboard").appendChild(row);
}

function createKeyboard(eng, rus) {
    var keyboard = document.createElement("div");
    keyboard.id = "keyboard";
    document.body.appendChild(keyboard);
    let keys = [];
    let key;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < eng[i].length; j++) {
            key = new Key(eng[i][j], rus[i][j]);
            keys.push(key.element());
        }
        console.log(keys);
        createRow(keys);
        keys = [];
    }
}

function func_mouseup(event) {
    if (language == english) document.getElementById("input").value += event.path[0].textContent;
    else document.getElementById("input").value += event.path[0].textContent;
}

createKeyboard(english, russian);