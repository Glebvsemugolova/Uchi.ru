'use strict';

var LENGTH_OF_RULER = {
	cm: 20,
	px: 780
};

var firstNumber = getRandomFromRange(6, 9);
var sumNumbers = getRandomFromRange(11, 14);
var secondNumber = sumNumbers - firstNumber;


function getRandomFromRange(min, max) { // Получить случайной число из диапазона;
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Выражение

var expression = document.querySelector('.expression');
var expressionFirstNumber = expression.querySelector('.first-number');
var expressionSecondNumber = expression.querySelector('.second-number');
var amount = expression.querySelector('.amount');

//Canvas

var canvasCont = document.querySelector('.canvas-container');
var canvas = document.querySelector('.canvas');
var ctx = canvas.getContext('2d');

var ruler = document.querySelector('.ruler');
var unitRuler = LENGTH_OF_RULER.px / LENGTH_OF_RULER.cm;

var centerFirstArc = (unitRuler * firstNumber) / 2;
var CURVE_FIRST_ARC = -80;
var endFirstArc = unitRuler * firstNumber;

var centerSecondArc = ((unitRuler * firstNumber) + ((unitRuler * firstNumber) + (unitRuler * secondNumber))) / 2;
var curveSecondArc = CURVE_FIRST_ARC / 2;
var endSecondArc = (unitRuler * firstNumber) + (unitRuler * secondNumber);

ctx.lineWidth = 3;
ctx.strokeStyle = '#e75480';

// Функция рисует дугу со стрелкой
function createFirstArc() {
	// Строим изображение дуги
	ctx.beginPath();
	ctx.moveTo(0, 85);
	ctx.quadraticCurveTo(centerFirstArc, CURVE_FIRST_ARC, endFirstArc, 85);
	ctx.stroke();

    // Рисуем стрелку дуге
	ctx.beginPath();
	ctx.moveTo(endFirstArc, 85);
	ctx.lineTo(endFirstArc - 15, 78);
	ctx.moveTo(endFirstArc, 85);
	ctx.lineTo(endFirstArc - 5, 70);
	ctx.stroke();
}

function createSecondArc() {
	ctx.beginPath();
	ctx.moveTo(endFirstArc, 85);
	ctx.quadraticCurveTo(centerSecondArc, curveSecondArc, endSecondArc, 85);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(endSecondArc, 85);
	ctx.lineTo(endSecondArc - 15, 78);
	ctx.moveTo(endSecondArc, 85);
	ctx.lineTo(endSecondArc - 5, 70);
	ctx.stroke();
}

//Inputs

var firstNumberInput = document.createElement('input');
var secondNumberInput = document.createElement('input');
var finalInput = document.createElement('input');

function createFirstNumberInput() {
    firstNumberInput.setAttribute("type", "text");
    firstNumberInput.setAttribute("maxlength", "1");
    firstNumberInput.classList.add('number-input');
    canvasCont.append(firstNumberInput);
    firstNumberInput.style.left = ((centerFirstArc + firstNumberInput.clientWidth / 2) + 'px');
    firstNumberInput.style.top = (CURVE_FIRST_ARC + firstNumberInput.clientHeight / 2 + 'px');
}

function createSecondNumberInput() {
    if (firstNumberInput.disabled) {
        createSecondArc();
        secondNumberInput.setAttribute("type", "text");
        secondNumberInput.setAttribute("maxlength", "1");
        secondNumberInput.classList.add('number-input');
        canvasCont.append(secondNumberInput);
        secondNumberInput.style.left = ((centerSecondArc + secondNumberInput.clientWidth/2) + 'px');
        secondNumberInput.style.top = (curveSecondArc + 'px');
    }
}

function createFinalInput() {
    amount.after(finalInput);
    amount.remove();
    finalInput.setAttribute("type", "text");
    finalInput.setAttribute("maxlength", "2");
    finalInput.classList.add('finalInput');
}

// Проверка значения input
function checkInputValue(input, number, span) {
	if (input.value != number) {
		input.classList.add('input--error');
		span.classList.add('span---error');
		setTimeout(function () {
			input.value = '';
        },1500);
	} else {
		input.disabled = true;
		input.classList.remove('input--error');
		span.classList.remove('span---error');
	}

	if (firstNumberInput.disabled === true && secondNumberInput.disabled === true) {
		createFinalInput();
	}
}

// Проверка input с суммой значений
function checkFinalInput() {
	if (finalInput.value === String(sumNumbers)) {
		finalInput.disabled = true;
		finalInput.classList.remove('input--error');
	} else {
		finalInput.classList.add('input--error');
		if (finalInput.value.length === 2) {
			if (finalInput.classList.contains('input--error')) {
                setTimeout(function () {
                    finalInput.value = '';
                },1500);
			}
		}
	}
}

expressionFirstNumber.innerHTML = firstNumber;
expressionSecondNumber.innerHTML = secondNumber;
createFirstArc();
createFirstNumberInput();
firstNumberInput.focus();

firstNumberInput.oninput = function () {
    checkInputValue(firstNumberInput, firstNumber, expressionFirstNumber);
    createSecondNumberInput();
    secondNumberInput.focus();
};
secondNumberInput.oninput = function () {
    checkInputValue(secondNumberInput, secondNumber, expressionSecondNumber);
    finalInput.focus();
};

finalInput.oninput = checkFinalInput;
