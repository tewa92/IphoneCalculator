document.addEventListener("DOMContentLoaded", () => {
    const valueDisplay = document.querySelector(".value");
    let firstOperand = "";
    let secondOperand = "";
    let operator = "";
    let resetDisplay = false;

    const updateDisplay = (value) => {
        valueDisplay.textContent = value;
    };

    const handleNumber = (num) => {
        if (resetDisplay) {
            secondOperand = num;
            resetDisplay = false;
        } else {
            secondOperand = secondOperand === "0" ? num : secondOperand + num;
        }
        updateDisplay(secondOperand);
    };

    const handleOperator = (op) => {
        if (firstOperand && operator && secondOperand) {
            firstOperand = calculate();
            updateDisplay(firstOperand);
        } else {
            firstOperand = secondOperand;
        }
        operator = op;
        resetDisplay = true;
    };

    const calculate = () => {
        const num1 = parseFloat(firstOperand);
        const num2 = parseFloat(secondOperand);
        switch (operator) {
            case "+":
                return (num1 + num2).toString();
            case "−":
                return (num1 - num2).toString();
            case "×":
                return (num1 * num2).toString();
            case "÷":
                return num2 === 0 ? "Error" : (num1 / num2).toString();
            default:
                return secondOperand;
        }
    };

    const clearAll = () => {
        firstOperand = "";
        secondOperand = "0";
        operator = "";
        updateDisplay("0");
    };

    const handlePercent = () => {
        if (secondOperand) {
            secondOperand = (parseFloat(secondOperand) / 100).toString();
            updateDisplay(secondOperand);
        }
    };

    const handlePlusMinus = () => {
        if (secondOperand) {
            secondOperand = (parseFloat(secondOperand) * -1).toString();
            updateDisplay(secondOperand);
        }
    };

    document.querySelector(".buttons-container").addEventListener("click", (e) => {
        if (!e.target.classList.contains("button")) return;

        const { classList, textContent } = e.target;

        if (classList.contains("number")) {
            handleNumber(textContent);
        } else if (classList.contains("operator")) {
            if (classList.contains("equal")) {
                secondOperand = calculate();
                updateDisplay(secondOperand);
                firstOperand = "";
                operator = "";
            } else {
                handleOperator(textContent);
            }
        } else if (classList.contains("function")) {
            if (classList.contains("ac")) clearAll();
            else if (classList.contains("percent")) handlePercent();
            else if (classList.contains("pm")) handlePlusMinus();
        } else if (classList.contains("decimal")) {
            if (!secondOperand.includes(".")) {
                secondOperand += ".";
                updateDisplay(secondOperand);
            }
        }
    });

    clearAll();
});
