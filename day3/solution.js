const fs = require('fs')

fs.readFile('day3/input.txt', (err, data) => {
    if (err) throw err;
    const dataList = data.toString().split('\n')
    var count = 0;
    for (i = 0; i < dataList.length; i++) {
        if (checkForTreeOnLoopingPositionOfLine(dataList[i], i * 3)) {
            count++;
        }
    }
    console.log("Amount of trees en route: ", count);
})

function checkForTreeOnLoopingPositionOfLine(string, position) {
    return getCharacterOnLoopingPositionOfString(string, position) === "#";
}

function getCharacterOnLoopingPositionOfString(string, position) {
    return string.charAt(position % string.length);
}