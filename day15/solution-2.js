const fs = require("fs");
const timer = require("./../timer/timer.js");
const start = timer.startTimer();

var dataString = "0,1,4,13,15,12,16";
var numbers = dataString.split(",");

var numbersObject = {};
var lastNumber;
///////////////////30000000
for (var i = 0; i < 30000000; i++) {
    var number;
    if (i < numbers.length) {
        number = parseInt(numbers[i]);
    } else {
        if (numbersObject[lastNumber].length <= 1) {
            number = 0;
        } else {
            var array = numbersObject[lastNumber];
            var lastTime = array[array.length - 1]
            var timeBefore = array[array.length - 2]
            number = lastTime - timeBefore;
        }
    }

    if (!numbersObject[number]) {
        numbersObject[number] = [i];
    } else {
        numbersObject[number].push(i);
    }

    lastNumber = number;
}

console.log(`Time since start: ${timer.endTimer(start)} ms`);

console.log(lastNumber);