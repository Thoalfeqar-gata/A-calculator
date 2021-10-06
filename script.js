let firstOperand = undefined;
let operator = undefined;
let secondOperand = undefined;
let screen = document.querySelector("#screen").firstElementChild;
let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let dot = document.querySelector("#dot");
let minus = document.querySelector("#negative-positive");
let equalSign = document.querySelector("#equal");
let backSpace = document.querySelector("#delete");
let clear = document.querySelector("#clear");
let percent = document.querySelector("#percent");


document.addEventListener("keydown", (event) =>
{
    let key = event.key;
    for(let number of numbers)
    {
        if(number.textContent == key)
            number.click();
    }

    for(let op of operators)
    {
        if(op.textContent == key)
            op.click();
    }

    if(key == "Backspace")
    {
        backSpace.click();
    }
    if(key == "Enter")
    {
        equalSign.click();
    }
    if(key == ".")
    {
        dot.click();
    }
});


percent.addEventListener("click", (event) =>{
    let pattern = /[^0-9|.-]/;
    if(!pattern.test(screen.textContent))
    {
        screen.textContent = (parseFloat(screen.textContent) / 100);
    }
});
clear.addEventListener("click", (event) =>
{
    screen.textContent = " ";
    firstOperand = undefined;
    secondOperand = undefined;
});


backSpace.addEventListener("click", (event) =>
{
    let pattern = /[^0-9|.-]/;
    if(!pattern.test(screen.textContent))
    {
        screen.textContent = screen.textContent.slice(0, screen.textContent.length - 1);
    }
});


equalSign.addEventListener("click", (event) =>
{
    let pattern = /[^0-9|.-]/;
    if(!pattern.test(screen.textContent))
    {
        if(firstOperand != undefined)
        {
            secondOperand = parseFloat(screen.textContent);
            
            if(operator == '-')
            {
                screen.textContent = operate(firstOperand, "+", secondOperand);
            }
            else
            {
                screen.textContent = operate(firstOperand, operator, secondOperand);
            }
            firstOperand = undefined;
            secondOperand = undefined;
        }
    }
});

minus.addEventListener("click", (event) =>
{
    let pattern = /[^0-9|.]/;
    if(!pattern.test(screen.textContent))
    {
        screen.textContent = '-' + screen.textContent;
    }
});

dot.addEventListener("click", (event) =>
{
    let pattern = /[^0-9|-]/;
    if(!pattern.test(screen.textContent))
    {
        screen.textContent += '.';
    }
});


for(let op of operators)
{
    if(op.textContent != "%")
    {
        op.addEventListener("click", (event) =>
        {
            let pattern = /[^0-9|.-]/;
            if(!pattern.test(screen.textContent))
            {
                if(firstOperand == undefined)
                {
                    operator = event.target.textContent;
                    firstOperand = parseFloat(screen.textContent);
                    screen.textContent = event.target.textContent;
                }
                else if(firstOperand != undefined)
                {
                    secondOperand = parseFloat(screen.textContent);
                    if(operator == '-')
                    {
                        screen.textContent = operate(firstOperand, "+", secondOperand);
                    }
                    else
                    {
                        screen.textContent = operate(firstOperand, operator, secondOperand);
                    }
                    firstOperand = undefined;
                    secondOperand = undefined;
                }
            }
        });
    }
}


for(let number of numbers)
{
    number.addEventListener("click", (event) => 
    {
        let pattern = /[^0-9|.-]/;
        if(pattern.test(screen.textContent))
        {
            screen.textContent = event.target.textContent;
        }
        else
        {
            screen.textContent += event.target.textContent;
            if(screen.textContent.length > 28)
            {
                screen.textContent = "too many characters!";
            }
        }
    });
}

function add(a, b)
{
    return a + b;
}

function sub(a, b)
{
    return a - b;
}

function divide(a, b)
{
    if(b == 0)
    {
        return "Dividing by zero!";
    }
    return Math.round((a / b) * 100) / 100;
}

function multiply(a, b)
{
    return a * b;
}

function operate(first, operand, second)
{
    switch(operand)
    {
        case '+':
            return add(first, second);

        case '-':

            return sub(first, second);
        case '*':

            return multiply(first, second);
        case '/':   
        return divide(first, second);
    }
}