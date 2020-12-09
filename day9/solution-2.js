const fs = require('fs');
const { parse } = require('path');
const { listenerCount } = require('process');
const timer = require("../timer/timer.js");


fs.readFile('day9/input.txt', (err, data) => {
    if (err) throw err;
    var dataList = data.toString().split('\n')
    dataList = dataList.map(item => parseInt(item));
    console.log("test weakness: ", addFirstAndLast(findWeakness(test, findWrongNumberInList(5, test))));
    console.log("weakness: ", addFirstAndLast(findWeakness(dataList, findWrongNumberInList(25, dataList))));
})

function addFirstAndLast(list) {
    return list.sort((a, b) => a - b)[0] + list.sort((a, b) => a - b)[list.length - 1];
}

function findWeakness(list, wrongNumber) {
    for (var i = 0; i < list.length; i++) {
        var result = findSumOfRange(list.slice(i), wrongNumber);
        if (result) {
            return result;
        }
    }
}

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

function findSumOfRange(list, sum) {
    var currentSum = 0;
    var i = 0;
    var results = []
    while (currentSum < sum) {
        currentSum = currentSum + list[i];
        results.push(list[i]);
        if (currentSum == sum) {
            return results;
        } else if (currentSum > sum) {
            return;
        } else {
            i++;
        }
    }

}

var test = [35,
    20,
    15,
    25,
    47,
    40,
    62,
    55,
    65,
    95,
    102,
    117,
    150,
    182,
    127,
    219,
    299,
    277,
    309,
    576
]