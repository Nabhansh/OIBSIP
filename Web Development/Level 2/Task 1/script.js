const display = document.getElementById("display");

const buttons = document.querySelectorAll("button");

let currentInput = "";
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;

buttons.forEach(button => {
    button.addEventListener("click", () => {

        const value = button.textContent;

        if (!isNaN(value) || value === ".") {
            handleNumber(value);
        }
        else if (
            value === "+" ||
            value === "−" ||
            value === "×" ||
            value === "÷"
        ) {
            handleOperator(value);
        }
        else if (value === "=") {
            calculate();
        }
        else if (value === "C") {
            clearDisplay();
        }
        else if (value === "⌫") {
            backspace();
        }
    });
});

function handleNumber(value) {

    if (waitingForSecondNumber) {
        currentInput = value;
        waitingForSecondNumber = false;
    }
    else {
        currentInput += value;
    }

    display.value = currentInput;
}

function handleOperator(nextOperator) {

    const inputValue = parseFloat(currentInput);

    if (firstNumber === null) {
        firstNumber = inputValue;
    }
    else if (operator) {

        const result = performCalculation(
            firstNumber,
            inputValue,
            operator
        );

        if (result === "Error") {
            display.value = "Cannot divide by zero";
            resetCalculator();
            return;
        }

        firstNumber = result;
        display.value = result;
    }

    operator = nextOperator;
    waitingForSecondNumber = true;
}

function calculate() {

    if (
        operator === null ||
        waitingForSecondNumber
    ) {
        return;
    }

    const secondNumber = parseFloat(currentInput);

    const result = performCalculation(
        firstNumber,
        secondNumber,
        operator
    );

    if (result === "Error") {
        display.value = "Cannot divide by zero";
        resetCalculator();
        return;
    }

    display.value = result;

    currentInput = result.toString();
    firstNumber = null;
    operator = null;
}

function performCalculation(num1, num2, op) {

    switch(op) {

        case "+":
            return num1 + num2;

        case "−":
            return num1 - num2;

        case "×":
            return num1 * num2;

        case "÷":

            if (num2 === 0) {
                return "Error";
            }

            return num1 / num2;

        default:
            return num2;
    }
}

function clearDisplay() {

    currentInput = "";
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;

    display.value = "";
}

function backspace() {

    currentInput = currentInput.slice(0, -1);

    display.value = currentInput;
}

function resetCalculator() {

    currentInput = "";
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;
}
