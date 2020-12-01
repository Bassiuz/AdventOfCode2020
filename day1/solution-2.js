const fs = require('fs')

fs.readFile('day1/input.txt', (err, data) => {
    if (err) throw err;
    const dataList = data.toString().split('\n')

    console.log("2 numbers that sum to 2020 multiplied:" + findMultiplicationOfSumNumbers(dataList, 2, 2020));
    console.log("3 numbers that sum to 2020 multiplied:" + findMultiplicationOfSumNumbers(dataList, 3, 2020));


})

function findMultiplicationOfSumNumbers(dataList, amountOfNumbers, sum) {

    if (amountOfNumbers == 1) {
        // finding the number directly in list
        var value = findNumberInDataList(dataList, sum)
        if (value) {
            return value;
        }
    } else {
        for (var i = 0; i < dataList.length; i++) {
            const foundNumber = findMultiplicationOfSumNumbers(dataList, amountOfNumbers - 1, sum - dataList[i]);
            if (foundNumber !== undefined) {
                return foundNumber * dataList[i];
            }
        }
    }

}

function findNumberInDataList(dataList, number) {
    if (dataList.includes(number.toString())) {
        return number;
    } else {
        return null;
    }
}