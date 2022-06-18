let previousEntry = ["0"];
let currentEntry = ["0"];
let operator = ["add", "subtract", "multiply", "divide"];
let currentOperator = "";
let operatorIsPressed = false;
const button = document.querySelectorAll('button');
const entry = document.querySelector('#entry');

button.forEach((btn) => {
    btn.addEventListener('click', () => {
        const input = btn.getAttribute('value');
        if (input === "clear") {
            clear();
        }
        if (input === ".") {
            addDecimal();
        } 
        if (input === "delete") {
            currentEntry.pop();
        }
        if (/^[0-9/]+$/.test(input)) {
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
            operatorIsPressed  = true;
            updateDisplay();
         }  else if (operator.includes(input) && currentOperator.length) {
            operatorIsPressed = true;
            operate(previousEntry,currentEntry,currentOperator);
            previousEntry = currentEntry;
            updateDisplay();
            currentOperator = input;
         }
         if (input == "equals") {
            if(currentOperator.length) {
            operate(previousEntry,currentEntry, currentOperator);
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
    console.log(b);
    if (b.toString() === "0") return "nope";
    const answer = parseFloat(a.join("").toString()) / parseFloat(b.join("").toString());
    return "" + answer;
}


function operate(a, b, operator) {
    switch (operator) {
        case "add":
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

function updateDisplay() {
    // if (operatorIsPressed) {
    //     currentEntry = [];
    //     operatorIsPressed = false;
    // }
    // if (/^[0-9/]+$/.test(input)) {
    //     currentEntry.push(input);
    // } else if (input === "." && !currentEntry.includes(".")) {
    //     currentEntry.push(input);
    // } else {
    //     operate(previousEntry, currentEntry, operator);
        
    // }
    // operate(previousEntry, currentEntry, operator);
    entry.textContent = currentEntry.join("").toString();
    

}


function clear() {
    previousEntry = ["0"];
    currentEntry = ["0"];
    entry.textContent = "0";
    operatorIsPressed = false;
    currentOperator = "";

}

function getAnswer(answer) {
    currentEntry = [];
    currentEntry.push(answer);

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