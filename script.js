const textEl = document.getElementById(`text`);
const speedEl = document.getElementById(`speed`);
const userText = document.querySelector(`.user-text`);
const reset = document.querySelector(`.reset`);
const textInput = document.getElementById(`text-input`);
const filterBtns = document.querySelectorAll(`.filter`);
const funky = document.getElementById(`funky`);
const spongebob = document.getElementById(`spongebob`);
const umm = document.getElementById(`umm`);
let idx = 1;
let speed = 300 / speedEl.value;
let text = `Type your own text and hit enter.`;
const funkyLetters = {
    '-': '₋', '!': 'ᵎ', '?': 'ˀ', '(': '⁽', ')': '₎', '+': '⁺', '=': '₌', '0': '⁰', '1': '₁', '2': '²', '4': '₄', '5': '₅', '6': '₆', '7': '⁷', '8': '⁸', '9': '⁹', a: 'ᵃ', A: 'ᴬ', B: 'ᴮ', b: 'ᵦ', C: '𝒸', d: 'ᵈ', D: 'ᴰ', e: 'ₑ', E: 'ᴱ', f: '𝒻', F: 'ᶠ', g: 'ᵍ', G: 'ᴳ', h: 'ʰ', H: 'ₕ', I: 'ᵢ', i: 'ᵢ', j: 'ʲ', J: 'ᴶ', K: 'ₖ', k: 'ₖ', l: 'ˡ', L: 'ᴸ', m: 'ᵐ', M: 'ₘ', n: 'ₙ', N: 'ᴺ', o: 'ᵒ', O: 'ᴼ', p: 'ᵖ', P: 'ᴾ', Q: 'ᵠ', q: 'ᑫ', r: 'ʳ', R: 'ᵣ', S: 'ˢ', s: 'ˢ', t: 'ᵗ', T: 'ₜ', u: 'ᵘ', U: 'ᵤ', v: 'ᵛ', V: 'ᵥ', w: '𝓌', W: 'ʷ', x: 'ˣ', X: 'ˣ', y: 'y', Y: 'Y', z: '𝓏', Z: 'ᶻ'
  };

writeText();

function funkyText(letter) {
    let funkyLetter = funkyLetters[letter];
    if(funkyLetter) {
        return funkyLetter;
    }
    funkyLetter = funkyLetters[letter.toLowerCase()];
    if(funkyLetter) {
        return funkyLetter
    }
    return letter;
}

function ummText(letter) {
    const random = Math.floor(Math.random() * 3);
    if(letter === ` ` && random === 2) {
        return ` ... like `;
    }
    return letter;
}
    
function spongebobText(letter, index) {
    if(index % 2) {
        return letter.toUpperCase();
    }
        return letter.toLowerCase();
}


function transformText(text) {
    if(!spongebob.checked && !funky.checked && !umm.checked) {
        return text;
    } else if(spongebob.checked) {
        console.log(`spongebob is checked`)
        const textArr = Array.from(text).map(spongebobText);
        text = textArr.join(``);
    } else if(funky.checked) {
        const textArr = Array.from(text).map(funkyText);
        text = textArr.join(``);
    } else if(umm.checked) {
        const textArr = Array.from(text).map(ummText);
        text = textArr.join(``);
    }
    return text;
}

userText.addEventListener(`keydown`, (e) => {
    if(e.key === `Enter`) {
        text = transformText(e.target.value);
        textInput.value = ``;
    };
});
    
reset.addEventListener(`click`, () => {
    text = `Type your own text and hit enter.`;
    textInput.value = ``;
    clearFilters();
});

function onlyOneSelected(checkbox) {
    filterBtns.forEach(filterBtn => {
        if(filterBtn !== checkbox) filterBtn.checked = false;
    });
}

function clearFilters() {
    filterBtns.forEach(filterBtn => filterBtn.checked = false);
}

filterBtns.forEach(filterBtn => {
    filterBtn.addEventListener(`change`, transformText());
    // console.log(`change`);
});

function writeText() {
    // console.log(text);
    textEl.innerText = text.slice(0, idx);

    idx++;

    if(idx > text.length) {
        idx = 1;
    }

    setTimeout(writeText, speed);
}

speedEl.addEventListener(`input`, (e) => {
    speed = 300 / e.target.value;
});