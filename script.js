const passwordButton = document.querySelector("#password-button");
const passwordDisplay = document.querySelector("#password-display");
const lengthSelector = document.querySelector("#length-selector");
const symbolSelector = document.querySelector("#use_symbol");
const numberSelector = document.querySelector("#use_num");

lengthSelector.addEventListener("input", (e) => {
    e.target.value = clampValues(
        e.target.value,
        +lengthSelector.min,
        +lengthSelector.max
    );
});

[numberSelector, symbolSelector, passwordButton].forEach((selector) => {
    selector.addEventListener("click", generatePassword);
});

lengthSelector.addEventListener("change", generatePassword);

function clampValues(val, min, max) {
    if (val < min) {
        val = min;
    }
    if (val > max) {
        val = max;
    }
    return val;
}

function displayPassword(password) {
    passwordDisplay.innerText = password;
}

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const digits = "0123456789";
const symbols = "!@#$%^&";
function generatePassword() {
    const pswdLength = lengthSelector.value;
    let remaining = pswdLength;

    let letterCount = getRandomInRange(
        Math.ceil(remaining / 4),
        Math.ceil(remaining / 3)
    );

    remaining -= letterCount;

    let digitCount = numberSelector.checked
        ? getRandomInRange(Math.round(remaining / 3), remaining - 2)
        : 0;
    remaining -= digitCount;

    let symbolCount = symbolSelector.checked
        ? getRandomInRange(Math.ceil(remaining / 3), Math.ceil(remaining / 2))
        : 0;
    remaining -= symbolCount;

    // console.log("letterCount:", letterCount, "remaining:", remaining);

    let additionalDigits = numberSelector.checked
        ? Math.floor(remaining / 2)
        : 0;

    digitCount += additionalDigits;
    remaining -= additionalDigits;
    letterCount += remaining;
    // console.log("type counts (l,d,s):", letterCount, digitCount, symbolCount);

    let password = "";
    for (let i = 0; i < letterCount; i++) {
        password += letters[Math.floor(Math.random() * letters.length)];
    }
    for (let i = 0; i < symbolCount; i++) {
        password += symbols[Math.floor(Math.random() * symbols.length)];
    }
    for (let i = 0; i < digitCount; i++) {
        password += digits[Math.floor(Math.random() * digits.length)];
    }

    password = password
        .split("")
        .sort((a, b) => 0.5 - Math.random())
        .sort((a, b) => 0.5 - Math.random())
        .join("");

    displayPassword(password);
}

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
