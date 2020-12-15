const fs = require("fs");


var dataString = "0,1,4,13,15,12,16";
var numbers = dataString.split(",");

var numbersObject = {};
var lastNumber;
for (var i = 0; i < 2020; i++) {
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

console.log(lastNumber);