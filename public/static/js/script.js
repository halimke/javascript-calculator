// Create calculator class
class Calculator{
    constructor(currentOperandTxt, previousOperandTxt){
        this.currentOperandTxt = currentOperandTxt;
        this.previousOperandTxt = previousOperandTxt;
        this.clear();
    }
    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    delete(){
        this.currentOperand = this.currentOperand.slice(0, -1);
    }
    calculate(){
        let result;
        const currentNum = parseFloat(this.currentOperand);
        const prevNum = parseFloat(this.previousOperand);
        if (isNaN(currentNum) || isNaN(prevNum)) return;

        switch (this.operation){
            case '÷':
                result = prevNum / currentNum;
                break;
            case '*':
                result = prevNum * currentNum;
                break;
            case '+':
                result = prevNum + currentNum;
                break;
            case '-':
                result = prevNum - currentNum;
                break;
            default:
                return;
        }
        this.currentOperand = result.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }
    inputNumber(number){
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    inputOperation(operation){
        if ((this.currentOperand === '') && (this.previousOperand === '')) return;
        if ((this.currentOperand === '') && (this.previousOperand !== '')){
            this.operation = operation;
            return;
        }
        if (this.previousOperand !== ''){
            this.calculate();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    convertDisplay(operand){
        const operandString = operand.toString();
        let operandInt = parseFloat(operandString.split('.')[0]);
        let operandDeci = operandString.split('.')[1];
        let operandDisplay;

        if (isNaN(operandInt)){
            operandDisplay = '';
        }else{
            operandDisplay = operandInt.toLocaleString('en', {maximumFractionDigits: 0})
        }
        
        return operandDeci != null ? `${operandDisplay}.${operandDeci}` : operandDisplay;
    }
    updateDisplay(){
        this.currentOperandTxt.innerHTML = this.convertDisplay(this.currentOperand);
        if (this.operation != null){
            this.previousOperandTxt.innerHTML = `${this.convertDisplay(this.previousOperand)} ${this.operation}`;
        }else{
            this.previousOperandTxt.innerHTML = '';
        }
    }
}

// Select all Calculator elements used
const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const allClearBtn = document.querySelector('[data-all-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const equalsBtn = document.querySelector('[data-equals]');
const currentOperandTxt = document.querySelector('[data-current-operand]');
const previousOperandTxt = document.querySelector('[data-previous-operand]');

// Instantiate the Calculator
const calculator = new Calculator(currentOperandTxt, previousOperandTxt);

// input numbers and update display
numberBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.inputNumber(btn.innerHTML);
        calculator.updateDisplay();
    })
});

// clear the display
allClearBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

// operations
operationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.inputOperation(btn.innerHTML);
        calculator.updateDisplay();
    })
});

// equals
equalsBtn.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay();
});

// delete

deleteBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});