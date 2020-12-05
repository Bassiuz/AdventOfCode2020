const fs = require('fs')

fs.readFile('day5/input.txt', (err, data) => {
    if (err) throw err;
    const dataList = data.toString().split('\n')
    var highestSeat = [0, 0, 0];
    for (i = 0; i < dataList.length; i++) {
        seat = findSeatInformationForBinaryPosition(dataList[i]);
        if (seat[2] > highestSeat[2]) {
            highestSeat = seat;
        }
    }
    console.log(highestSeat);
})

const rowLength = 128;
const columnLength = 8;

function findSeatInformationForBinaryPosition(positionString) {
    const rowPositionString = positionString.substring(0, 7)
    const columnPositionString = positionString.substring(7)
    const row = findPositionForString(rowPositionString, 0, rowLength - 1, 'F', 'B')
    const seat = findPositionForString(columnPositionString, 0, columnLength - 1, 'L', 'R')
    const seatId = row * 8 + seat;

    return [row, seat, seatId];

}

function findPositionForString(positionString, minimum, maximum, frontCharacter, backCharacter) {
    const amountOfSpace = maximum - minimum + 1;
    if (positionString[0] == frontCharacter) {
        maximum = maximum - amountOfSpace / 2
    } else if (positionString[0] == backCharacter) {
        minimum = minimum + amountOfSpace / 2
    } else {
        console.log("input error")
    }

    if (positionString.length > 1) {
        return findPositionForString(positionString.substring(1), minimum, maximum, frontCharacter, backCharacter);
    } else if (minimum == maximum) {
        return minimum;
    } else {
        console.log("Calculation error");
    }
}