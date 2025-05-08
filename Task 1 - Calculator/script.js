// Theme switcher
const themeCheckbox = document.querySelector("#input");
let isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

document.documentElement.setAttribute(
  "data-theme",
  isDarkMode ? "dark" : "light"
);
themeCheckbox.checked = isDarkMode;

themeCheckbox.addEventListener("change", () => {
  isDarkMode = themeCheckbox.checked;
  document.documentElement.setAttribute(
    "data-theme",
    isDarkMode ? "dark" : "light"
  );
});

// Calculator operations
class Calculator {
  constructor() {
    this.previousOperand = "";
    this.currentOperand = "0";
    this.operation = undefined;
  }

  clear() {
    this.previousOperand = "";
    this.currentOperand = "0";
    this.operation = undefined;
  }

  delete() {
    if (this.currentOperand === "0") return;
    if (this.currentOperand.length === 1) {
      this.currentOperand = "0";
    } else {
      this.currentOperand = this.currentOperand.slice(0, -1);
    }
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    if (this.currentOperand === "0" && number !== ".") {
      this.currentOperand = number;
    } else {
      this.currentOperand += number;
    }
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "×":
        computation = prev * current;
        break;
      case "÷":
        if (current === 0) {
          alert("Cannot divide by zero");
          return;
        }
        computation = prev / current;
        break;
      case "%":
        computation = (prev * current) / 100;
        break;
      default:
        return;
    }

    this.currentOperand = computation.toString();
    this.operation = undefined;
    this.previousOperand = "";
  }

  updateDisplay() {
    document.querySelector(".current-operand").textContent =
      this.currentOperand;
    if (this.operation != null) {
      document.querySelector(
        ".previous-operand"
      ).textContent = `${this.previousOperand} ${this.operation}`;
    } else {
      document.querySelector(".previous-operand").textContent = "";
    }
  }
}

const calculator = new Calculator();

// Calculator functionality
document.querySelectorAll(".number").forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.textContent);
    calculator.updateDisplay();
  });
});

document.querySelectorAll(".operator").forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.textContent);
    calculator.updateDisplay();
  });
});

document.querySelector(".equals").addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

document.querySelector(".clear").addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

document.querySelector(".delete").addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

// Keyboard support
document.addEventListener("keydown", (event) => {
  if ((event.key >= "0" && event.key <= "9") || event.key === ".") {
    calculator.appendNumber(event.key);
  } else if (
    event.key === "+" ||
    event.key === "-" ||
    event.key === "*" ||
    event.key === "/" ||
    event.key === "%"
  ) {
    const operatorMap = {
      "*": "×",
      "/": "÷",
    };
    calculator.chooseOperation(operatorMap[event.key] || event.key);
  } else if (event.key === "Enter" || event.key === "=") {
    calculator.compute();
  } else if (event.key === "Backspace") {
    calculator.delete();
  } else if (event.key === "Escape") {
    calculator.clear();
  }
  calculator.updateDisplay();
});
