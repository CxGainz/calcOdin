/* Odin Calculator Project: Based it off an iPhone calculator as I was not fond of the student example given in the module.
 In the student example, say you click the button '4', then click the add button multiple times you will get 4, then 8, then 16 ... and so on.
 I wanted to avoid that in my project.

 Note: Basic calculator, user not able to input negative numbers nor decimals at this point in time. Will refactor after going into Odin node path.
*/


function add(num1,num2){
    return num1+num2;
}

function subtract(num1,num2){
    return num1-num2;
}

function multiply(num1,num2){
    return num1*num2;
}

function divide(num1,num2){
    return num1/num2;
}

// parse user operands into integers so they can be inserted into the correct functions based on the operator
function operate(stringEq){
    let firstOperand = parseInt(firstNum);
    let secondOperand = parseInt(secondNum);
    let result = "";
    
    if (stringEq.includes("+")){
        result = add(firstOperand,secondOperand);
    }

    if (stringEq.includes("-")){
        result = subtract(firstOperand,secondOperand);
    }

    if (stringEq.includes("x")){
        result = multiply(firstOperand,secondOperand);
    }

    if (stringEq.includes("/")){
        result = divide(firstOperand,secondOperand);
    }
    return result;
}

// variables to hold user inserted data
let firstNum = "";
let operator = "";
let secondNum = "";
let equation = "";
let result = " ";

// query selectors
const display = document.querySelector("#display");
const numBtn = document.querySelectorAll(".values");
const opBtn = document.querySelectorAll(".func")
const displayContent = document.createElement("p");
const clear = document.querySelector("#clear");
const equal = document.querySelector("#equal");

// event listener to clear all necesssary contents and variables to start from scratch
clear.addEventListener("click",()=> {
    display.innerHTML="";
     firstNum = "";
     operator = "";
     secondNum = "";
     equation = "";

     // once the clear button has been clicked, revert the selected operator button to default color for user purposes.
     opBtn.forEach(function(item){
        if(item.style.background === "white"){
            item.style.background ="lightblue";
        }
    });
    
    });

// event listener to handle what happens when the user click the equal sign button. The result will become the first number, reset display to correct format
equal.addEventListener("click",()=>{
    if (secondNum !== ""){
        result = operate(equation).toString();
        firstNum = result;
        displayContent.textContent = firstNum;
        display.appendChild(displayContent);
        equation = "";
        secondNum = "";

        // once the equal button has been clicked, revert the selected operator button to default color for user purposes.
        opBtn.forEach(function(item){
            if(item.style.background === "white"){
                item.style.background ="lightblue";
            }
        });
    }

});     


// check if number inputted is first or second number, make sure to accrue the current function into our equation variable
for (let i = 0; i < numBtn.length; i++) {
    numBtn[i].addEventListener("click", ()=>{
        let val = numBtn[i].textContent;
        if (!(equation.includes(" ") || firstNum === result)){
            firstNum += val;
            equation += val;
            displayContent.textContent = firstNum;
            display.appendChild(displayContent);
        }else{
            if(firstNum !== result){
                secondNum += val;
                equation += val;
                displayContent.textContent = secondNum;
                display.appendChild(displayContent);
            }
        }
    });
}

// check to see if a first number has been inputted, then we can input an operator
for (let i = 0; i < opBtn.length; i++) {

    opBtn[i].addEventListener("click", ()=>{
        operator = " " +opBtn[i].textContent+ " ";

        if (firstNum !== ""){
            // here we make sure the user is shown they can switch between operators if they misclick.
            opBtn.forEach(function(item){
                if(item.style.background === "white"){
                    // make sure to delete operator from equation if user misclicked the wrong one
                    if (equation.includes(item)){
                        equation = equation.slice(0,-3);
                    }
                    item.style.background ="lightblue";
                }
            });

            opBtn[i].style.background = 'white';
            equation += operator;
            result = " ";
        };

    });
}



