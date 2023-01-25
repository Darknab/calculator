function add(num1,num2) {
    return num1 + num2;
}

function substract(num1,num2) {
    return num1 - num2;
}

function multiply(num1,num2) {
    return num1 * num2;
}

function divide(num1,num2) {
    return num1 / num2;
}

function inverse(num1) {
    return 1/num1;
}

function squared(num1) {
    return num1*num1;
}

function root(num1) {
    return Math.sqrt(num1); 
}

function operate(num1,opr,num2) {
    switch (opr) {
        case "+":
            return add(num1,num2);
        case "-":
            return substract(num1,num2);
        case "*":
            return multiply(num1,num2);
        case "/":
            return divide(num1,num2);
        case "root":
            return root(num1);
        case "squared":
            return squared(num1);
        case "inverse":
            return inverse(num1);
    }
}

function displayResult(result) {
    let toString = result.toString();
    const splitted = toString.split(".");
    if (splitted[1] === undefined) return result;
    else if (splitted[1].length > 4) return parseFloat(result.toFixed(4));
        else return parseFloat(result);
}

let display = 0, current = 0 , num1 = null, num2 = null, operand = ""; 
let entry = {type : 0, value: 0}; result = 0


const btn = document.querySelectorAll("button");
const mainScreen = document.querySelector(".main");
const upScreen = document.querySelector(".upper");
mainScreen.textContent = "0";
upScreen.textContent = "0";
btn.forEach((button) => {
    button.addEventListener("click", (e) => {
        entry.type = button.className;
        entry.value = button.textContent;
        if (entry.type === "numeric") {
            current += entry.value;
            mainScreen.textContent = parseFloat(current);
        } else if (entry.type === "operand") {
            switch (e.target.id) {
                
                case "inverse":
                    num1 = parseFloat(current);
                    operand = "inverse"
                    result = operate(num1,operand);
                    upScreen.textContent = "1/" + num1 + " = ";
                    mainScreen.textContent = displayResult(result);
                    break;
                case "root":
                    num1 = parseFloat(current);
                    operand = "root";
                    result = operate(num1,operand);
                    upScreen.textContent = "√" + num1 + " = ";
                    mainScreen.textContent = displayResult(result);
                    break;
                case "squared":
                    num1 = parseFloat(current);
                    operand = "squared";
                    result = operate(num1,operand);
                    upScreen.textContent = num1 + "²" + " = ";
                    mainScreen.textContent = displayResult(result);
                    break;
                case "percent":
                    if (operand === null || current === 0) {
                        result = 0;
                        upScreen.textContent = "0";
                        mainScreen.textContent = "0";
                        current = 0;
                    } else {
                        if (operand === '*' || operand === "/") {
                        current = parseFloat(current) / 100;
                        console.log(operand);
                    }  else {
                        if (operand === "+" || operand === "-") {
                            current = (num1 * parseFloat(current))/100;
                        }
                    }
                }
                        upScreen.textContent = num1 + " " + operand + " " + current;
                    
                    break;
                default:
                if (num1 === null) {
                    num1 = parseFloat(current);
                    operand = entry.value;
                    current = 0;
                    upScreen.textContent = num1 + " " + entry.value;
                } else {
                    num2 = parseFloat(current);
                    result = operate(num1,operand,num2);
                    mainScreen.textContent = displayResult(result);
                    current = 0;
                    upScreen.textContent = result + " " + entry.value;
                    num1 = result;
                    operand = entry.value;
                }
        }
        } else if (entry.type === "control") {
            switch (e.target.id) {
                case "negative":
                    const testNegative = current.substr(0,1);
                    console.log(testNegative)
                    if (testNegative === "-") {
                        current = current.substr(1);
                    } else {current = "-" + current};
                    mainScreen.textContent = parseFloat(current);
                break;
                case "clear":
                    num1 = null;
                    num2 = null;
                    result = 0;
                    current = 0;
                    mainScreen.textContent = "0";
                    upScreen.textContent = "0";
                    break;
                case "CE":
                    current = 0;
                    break;
                case "del":
                    current = current.slice(0,current.length - 1);
                    mainScreen.textContent = parseFloat(current);
                    break;
                case "equals":
                    if (num2 === null && current === 0) {
                        result = operate(num1,operand,num1);
                        mainScreen.textContent = displayResult(result);
                        upScreen.textContent = `${num1} ${operand} ${num1} =`;
                        current = 0; num1 = null; num2= null; operand = null;
                    } else {
                        num2 = parseFloat(current);
                        result = operate(num1,operand,num2);
                        mainScreen.textContent = displayResult(result);
                        upScreen.textContent = `${num1} ${operand} ${num2} =`;
                        current = 0; num1 = null; num2= null; operand = null;
                    }
                    break;
            }
        }
    })
})


