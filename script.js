var language = "english";
var shift_pressed = "false";
var row_id = 0;

const english = [["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
                ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "Delete"],
                ["CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\\", "Enter"],
                ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "&#11165;", "Shift"],
                ["Ctrl", "Win", "Alt", "Space", "Alt", `&#11164;`, `&#11167;`, `&#11166;`, "Ctrl"]
];
const russian = [["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
                ["Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "Delete"],
                ["CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "\\", "Enter"],
                ["Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "&#11165;", "Shift"],
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
        let shift_count = 0;
        let alt_count = 0;
        let ctrl_count = 0;
        let key = document.createElement("button");
        key.className = "key";
        key.classList.add(this.eng);
        key.classList.add(this.rus);
        if (language == "english") { 
            key.innerHTML = this.eng;
        }
        else {
            key.innerHTML = this.rus;
        }
        if (this.eng == "Space") { 
            key.classList.add("space");
            key.innerHTML = "";
            key.id = "32";
            return key;
    }
        if (this.eng == "Tab") {
            key.classList.add("tab");
            key.id = "9";
            return key;
    }
        if (this.eng == "CapsLock") {
            key.classList.add("capsLock");
            key.id = "20";
            return key;
        }
        if (this.eng == "Shift") {
            key.classList.add("shift");
            if (shift_count == 0) {
                key.id = "ShiftLeft";
                shift_count++;
            } else {
                key.id = "ShiftRight"
            }
            return key;
        }
        if (this.eng == "Ctrl") {
            key.classList.add("ctrl");
            if (ctrl_count == 0) {
                key.id = "ControlLeft";
                ctrl_count++;
            } else {
                key.id = "ControlRight"
            }
            return key;
        }
        if (this.eng == "Win") {
            key.classList.add("win");
            key.id = "91";
            return key;
        }
        if (this.eng == "Alt") {
            key.classList.add("alt");
            if (alt_count == 0) {
                key.id = "AltLeft";
                alt_count++;
            } else {
                key.id = "AltRight"
            }
            return key;
        }
        if (this.eng == "Backspace") {
            key.classList.add("backspace");
            key.id = "8";
            return key;
        }
        if (this.eng == "Enter") {
            key.classList.add("enter");
            key.id = "13";
            return key;
        }
        if (this.eng == "Delete") {
            key.classList.add("delete");
            key.id = "46";
            return key;
        }
        if (this.eng.startsWith("&")) {
            if (this.eng=="&#11165;") {
              //  key.id = "ArrowUp";
                key.id = "38";
            }
            if (this.eng=="&#11164;") {
             //   key.id = "ArrowLeft";
                key.id = "37";
            }
            if (this.eng=="&#11167;") {
              //  key.id = "ArrowDown";
                key.id = "40";
            }
            if (this.eng=="&#11166;") {
             //   key.id = "ArrowRight";
                key.id = "39";
            }
            return key;
        }
        key.classList.add("usual_key");
        console.log(this.eng.charCodeAt());
        key.id = this.eng.charCodeAt();
        return key;
    }
}

function createRow(buttons) {
    let row = document.createElement("div");
    row.className = "row";
    row.id = "row_"+row_id;
    row_id++;
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
        createRow(keys);
        keys = [];
    }
}

function func_mouseup(event) {
    if (language == english) document.getElementById("input").value += event.path[0].textContent;
    else document.getElementById("input").value += event.path[0].textContent;
}

createKeyboard(english, russian);

/* document.addEventListener("keydown", (event) => {
    console.log(document.getElementById("46"))
    document.getElementById("46").click();
}); */