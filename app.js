const btnContainer = document.querySelector('.btn-container');
const currentScreenElement = document.querySelector('.current-screen');
const previousScreenElement = document.querySelector('.previous-screen');

btnContainer.addEventListener('click', handleBtnClick);


let arr = ['0', '+', '0'];
let currIdx = 0;
const opIdx = 1;

function handleBtnClick(e){
    let currentTarget = e.target;
    if(!currentTarget.classList.contains('btn')) return;

    if(currentTarget.classList.contains('digit')){
        handleDigitBtn(e.target.textContent);
    }
    else if(currentTarget.classList.contains('binary-operator')){
        handleBinaryOperator(currentTarget.textContent);
    }
    else if(currentTarget.classList.contains('clear')){
        resetArr();
    }
    else if(currentTarget.classList.contains('unary-operator')){
        handleUnaryOperator(currentTarget);
    }
    else if(currentTarget.classList.contains('result')){
        evaluateArr();
    }
    else if(currentTarget.classList.contains('delete')){
        handleDeleteBtn();
    }
    else if(currentTarget.classList.contains('decimal')){
        handleDecimalBtn();
    }

    updateCurrentScreen();
    updatePreviousScreen();
}


function handleDecimalBtn(){
    if(arr[currIdx].includes('.')) return;
    arr[currIdx] += '.';
}


function handleDeleteBtn(){
    let res = String(arr[currIdx]).slice(0,-1) || '0';
    arr[currIdx] = res;
}

function handleUnaryOperator(currentTarget){
    if(currentTarget.classList.contains('sign-change')){
        arr[currIdx] *= -1;
    }
    else if(currentTarget.classList.contains('root')){
        arr[currIdx] = Math.floor(Math.sqrt(arr[currIdx]) * 100) / 100;
    }

    arr[currIdx] = String(arr[currIdx]);
}


function handleBinaryOperator(operator){
    const finalIdx = 2;
    if(currIdx == finalIdx){
        evaluateArr();
        currIdx = finalIdx;
    }else{
        currIdx = finalIdx;
    }
    arr[opIdx] = operator;
}

function evaluateArr(){
    const res = getResult(arr[opIdx]);
    resetArr();
    arr[0] = String(res);   
}

function getResult(operator){
    let a = Number(arr[0]), b = Number(arr[2]);
    if(operator === '+') return a + b;
    if(operator === '-') return a - b;
    if(operator === '*') return a * b;
    return a / b;
}

function updatePreviousScreen(){
    let screenRes = "";
    for(let i=0; i<currIdx; ++i){
        screenRes += arr[i] + " ";
    }
    screenRes.trim();
    previousScreenElement.textContent = screenRes;
}

function updateCurrentScreen(){
    currentScreenElement.textContent = arr[currIdx];
}

function handleDigitBtn(digit){
    let res = arr[currIdx] + digit;
    if(res.length > 10) return;
    arr[currIdx] = String(Number(res)); 
}


function resetArr(){
    currIdx = 0;
    arr = ['0', '+', '0'];
}