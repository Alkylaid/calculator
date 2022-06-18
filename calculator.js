let previousEntry = [];
let currentEntry = [];
let operator = "";
let operatorIsPressed = false;
const button = document.querySelectorAll('button');
const entry = document.querySelector('#entry');

button.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (btn.getAttribute('value') === "clear") {
            clear();
        }
        if (btn.getAttribute('value') === "equals") {
            operate(previousEntry, currentEntry, operator);
        } else {
            updateDisplay(btn.getAttribute('value'));
        }
    })
})

function add(a, b) {
    const answer = parseFloat(a.join("").toString()) + parseFloat(b.join("").toString());
    return "" + answer;
}

function subtract(a, b) {
    const answer = parseFloat(a.join("").toString()) - parseFloat(b.join("").toString());
    return "" + answer;
}

function multiply(a, b) {
    const answer = parseFloat(a.join("").toString()) * parseFloat(b.join("").toString());
    return "" + answer;
}

function divide(a, b) {
    console.log(b);
    if (b.toString() === "0") return "nope";
    const answer = parseFloat(a.join("").toString()) / parseFloat(b.join("").toString());
    return "" + answer;
}


function operate(a, b, operator) {
    switch (operator) {
        case "add":
            console.log(b);
            getAnswer(add(a, b));
            break;
        case "subtract":
            getAnswer(subtract(a, b));
            break;
        case "multiply":
            getAnswer(multiply(a, b));
            break;
        case "divide":
            getAnswer(divide(a, b));
            break;
    }
}

function updateDisplay(input) {
    if (operatorIsPressed) {
        currentEntry = [];
        operatorIsPressed = false;
    }
    if (input === "delete") {
        currentEntry.pop();
        if (!currentEntry.length) {
            currentEntry.push("0");
        }
    } else if (input === "." && currentEntry[0] == null) {
        currentEntry.push("0");
        currentEntry.push(input);
    } else if (input === "." && !currentEntry.includes(".")) {
        currentEntry.push(input);
    } else if (/^[0-9/]+$/.test(input)) {
        currentEntry.push(input);
    } else {
        operator = input;
        operatorIsPressed = true;
        previousEntry = currentEntry;
    }
    entry.textContent = currentEntry.join("").toString();

}


function clear() {
    previousEntry = [];
    currentEntry = [];
    operator = "";
    entry.textContent = "0";

}

function getAnswer(answer) {
    currentEntry = [];
    currentEntry.push(answer);
    operator = "";
    entry.textContent = answer;

}