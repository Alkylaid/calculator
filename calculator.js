let currentEntry = [];
const button = document.querySelectorAll('button');

button.forEach((btn) => {
    btn.addEventListener('click', () => {
        updateDisplay(btn.getAttribute('value'));
       
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

    const entry = document.querySelector('#entry');
    if (/^[0-9/]+$/.test(input)) {
            currentEntry.push(input);
         }
    if(input === "." && currentEntry[0] == null) {
        currentEntry.push("0");
        currentEntry.push(input);
     } else if (input === "." && !currentEntry.includes(".")) {
        currentEntry.push(input);
    }
    entry.textContent = currentEntry.join("").toString();
}
