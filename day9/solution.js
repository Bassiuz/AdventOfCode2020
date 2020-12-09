const fs = require('fs');
const { parse } = require('path');
const { listenerCount } = require('process');
const timer = require("../timer/timer.js");


fs.readFile('day9/input.txt', (err, data) => {
    if (err) throw err;
    var dataList = data.toString().split('\n')

    console.log("wrong number: ", findWrongNumberInList(25, dataList));
})

function findWrongNumberInList(preambleCount, list) {
    var wrongNumber = 0;
    for (var i = preambleCount; i < list.length; i++) {
        if (!findSumOfTwoInList(list.slice(i - preambleCount, i), list[i])) {


            wrongNumber = list[i];
            break;
        }
    }
    return wrongNumber;
}

function findSumOfTwoInList(list, sum) {
    for (var i = 0; i < list.length; i++) {
        var wantedValue = sum - list[i];
        var wantedAmount = 1;
        if (wantedValue == list[i]) {
            wantedAmount = 2;
        }

        if (list.filter(item => item == wantedValue).length == wantedAmount) {
            return [list[i], wantedAmount]
        }
    }
}

function countInArray(array, what) {
    return array.filter(item => item == what).length;
}