const fs = require('fs');


fs.readFile('day10/input.txt', (err, data) => {
    if (err) throw err;
    var dataList = data.toString().split('\n').map(result => parseInt(result));
    dataList.sort((a, b) => b - a);
    dataList.unshift(dataList[0] + 3);
    dataList.push(0);

    var joltage = 0;
    var oneDiff = 0;
    var threeDiff = 0;

    var mapOfEntries = {};

    dataList.forEach(entry => {
        var amountOfEndingsForThisEntry = 0;
        dataList.forEach(secondEntry => {
            if (secondEntry - entry <= 3 && secondEntry - entry > 0) {
                amountOfEndingsForThisEntry = amountOfEndingsForThisEntry + mapOfEntries[secondEntry]
            }
        });
        mapOfEntries[entry] = Math.max(1, amountOfEndingsForThisEntry);
    })
    console.log(mapOfEntries[dataList[dataList.length - 1]]);

})