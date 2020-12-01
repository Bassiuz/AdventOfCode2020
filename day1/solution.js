const fs = require('fs')

fs.readFile('day1/input.txt', (err, data) => {
    if (err) throw err;
    const dataList = data.toString().split('\n')


    for (i = 0; i < dataList.length; i++) {
        otherValue = 2020 - dataList[i];
        if (dataList.includes(otherValue.toString())) {
            console.log("Found them! " + (dataList[i] * (2020 - dataList[i])).toString());
            break;
        }
    }
})