let previousEntry = [];
let currentEntry = [];
let operator = "";
const button = document.querySelectorAll('button');
const entry = document.querySelector('#entry');

button.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (btn.getAttribute('value') === "clear") {
            clear();
        } else {
            updateDisplay(btn.getAttribute('value'));
        }
    })
})

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) return "nope";
    return a / b;
}

function operate(a, b, operator) {
    switch (operator) {
        case "add":
            return add(a, b);
            break;
        case "subtract":
            return subtract(a, b);
            break;
        case "multiply":
            return multiply(a, b);
            break;
        case "divide":
            return divide(a, b);
            break;
    }
}

function updateDisplay(input) {
    if (input === "." && currentEntry[0] == null) {
        currentEntry.push("0");
        currentEntry.push(input);
    } else if (input === "." && !currentEntry.includes(".")) {
        currentEntry.push(input);
    } else if (/^[0-9/]+$/.test(input)) {
        currentEntry.push(input);
    } else {
        operator = input;
        previousEntry = currentEntry;
    }
    entry.textContent = currentEntry.join("").toString();
}


function clear() {
    previousEntry = [];
    currentEntry = [];
    entry.textContent = "0";
    operator = "";
    
}