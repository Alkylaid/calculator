let previousEntry = ["0"];
let currentEntry = ["0"];
let operator = ["+", "-", "*", "/"];
let currentOperator = "";
let operatorIsPressed = false;
const button = document.querySelectorAll('button');
const entry = document.querySelector('#entry');


window.onkeypress = (event) => {
    const name = event.key;
    if (currentEntry.includes("C")) {
        previousEntry = ["0"];
        currentEntry = ["0"];
    }
    if (name === "Enter") {
        event.preventDefault();
        document.querySelector(`[value="="]`).click();

    } else if (name == "Backspace") {
        document.querySelector(`[value="delete"]`).click();
    } else if (document.querySelector(`[value="${name}"]`)) {
        document.querySelector(`[value="${name}"]`).click();

    }

};

window.onkeydown = (event) => {
    const name = event.key;
    if (name === "Enter") {
        document.querySelector(`[value="="]`).setAttribute('style', 'transform: scale(0.95)');
    } else if (name === "Backspace") {
        document.querySelector(`[value="delete"]`).setAttribute('style', 'transform: scale(0.95)');
    } else if (document.querySelector(`[value="${name}"]`)) {
        document.querySelector(`[value="${name}"]`).setAttribute('style', 'transform: scale(0.95)');
    }
}
window.onkeyup = (event) => {
    const name = event.key;
    if (name === "Enter") {
        document.querySelector(`[value="="]`).removeAttribute('style');
    } else if (name === "Backspace") {
        document.querySelector(`[value="delete"]`).removeAttribute('style');
    } else if (document.querySelector(`[value="${name}"]`)) {
        document.querySelector(`[value="${name}"]`).removeAttribute('style');
    } 
}

button.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        const input = btn.getAttribute('value');
        if (currentEntry.includes("C")) {
            previousEntry = ["0"];
            currentEntry = ["0"];
        }
        if (input === "clear") {
            clear();
        }
        if (input === "sign") {
            changeSign();
            updateDisplay();
        }
        if (input === ".") {
            addDecimal();
        }
        if (input === "delete") {
            currentEntry.pop();
        }
        if (/^[0-9]+$/.test(input)) {
            if (operatorIsPressed) {
                currentEntry = ["0"];
                operatorIsPressed = false;
            }
            if (currentEntry[0] === "0" && currentEntry.length <= 1) {
                currentEntry.pop();

            }
            currentEntry.push(input);
        }
        if (operator.includes(input) && !currentOperator.length) {
            previousEntry = currentEntry;
            currentOperator = input;
            operatorIsPressed = true;
            updateDisplay();
        } else if (operator.includes(input) && currentOperator.length) {
            if (currentEntry.length && previousEntry.length) {
            operatorIsPressed = true;
            operate(previousEntry, currentEntry, currentOperator);
            previousEntry = currentEntry;
            updateDisplay();
            currentOperator = input;
            }
        }
        if (input === "=") {
            if (currentOperator.length && currentEntry.length && previousEntry.length) {
                operate(previousEntry, currentEntry, currentOperator);
                operatorIsPressed = false;
                updateDisplay();
                previousEntry = currentEntry;
                currentOperator = "";
            }

        }
        else {

            updateDisplay();

        }

    })
});

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
    if (b.toString() === "0") return "Can't Divide By Zero!";
    const answer = parseFloat(a.join("").toString()) / parseFloat(b.join("").toString());
    return "" + answer;
}


function operate(a, b, operator) {
    switch (operator) {
        case "+":
            getAnswer(add(a, b));
            break;
        case "-":
            getAnswer(subtract(a, b));
            break;
        case "*":
            getAnswer(multiply(a, b));
            break;
        case "/":
            getAnswer(divide(a, b));
            break;
    }
}

function updateDisplay() {
    entry.textContent = currentEntry.join("").toString();
}


function clear() {
    previousEntry = ["0"];
    currentEntry = ["0"];
    entry.textContent = currentEntry;
    operatorIsPressed = false;
    currentOperator = "";


}

function getAnswer(answer) {
    currentEntry = [];
    currentEntry = answer.toString().split("");

}

function addDecimal() {
    if (operatorIsPressed) {
        currentEntry = ["0"];
    }
    if (!currentEntry.includes(".")) {
        currentEntry.push(".");
        operatorIsPressed = false;
    }
}

function changeSign() {
    const number = -1 * parseFloat(currentEntry.join("").toString());
    currentEntry = [];
    currentEntry = number.toString().split("");
}

