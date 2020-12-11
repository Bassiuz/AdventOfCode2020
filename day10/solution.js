const fs = require('fs');


fs.readFile('day10/input.txt', (err, data) => {
    if (err) throw err;
    var dataList = data.toString().split('\n').map(result => parseInt(result));
    dataList.sort((a, b) => a - b);
    var joltage = 0;
    var oneDiff = 0;
    var threeDiff = 1;
    dataList.forEach(entry => {
        if (entry - joltage == 3) {
            console.log("three");
            threeDiff++;
        } else if (entry - joltage == 1) {
            console.log("one");
            oneDiff++;
        } else if (entry - joltage > 3) {
            console.log("error, not compatable");
        }
        joltage = entry;
    })
    console.log(oneDiff);
    console.log(threeDiff);

    console.log(oneDiff * threeDiff);

})