const fs = require('fs')

fs.readFile('day3/input.txt', (err, data) => {
    if (err) throw err;
    const dataList = data.toString().split('\n')

    const route1 = findAmountOfTreesForPath(dataList, 1, 1);
    const route2 = findAmountOfTreesForPath(dataList, 3, 1);
    const route3 = findAmountOfTreesForPath(dataList, 5, 1)
    const route4 = findAmountOfTreesForPath(dataList, 7, 1);
    const route5 = findAmountOfTreesForPath(dataList, 1, 2);

    console.log("Amount of trees on all routes: ", route1 * route2 * route3 * route4 * route5);

})

function findAmountOfTreesForPath(dataList, right, down) {
    var count = 0;
    for (i = 0;
        (i * down) < dataList.length; i++) {
        if (checkForTreeOnLoopingPositionOfLine(dataList[i * down], i * right)) {
            count++;
        }
    }
    console.log("Amount of trees en route: ", count);
    return count;
}

function checkForTreeOnLoopingPositionOfLine(string, position) {
    return getCharacterOnLoopingPositionOfString(string, position) === "#";
}

function getCharacterOnLoopingPositionOfString(string, position) {
    return string.charAt(position % string.length);
}