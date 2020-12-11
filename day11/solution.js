const fs = require('fs');

var rows;

fs.readFile('day11/input.txt', (err, data) => {
    if (err) throw err;
    rows = data.toString().split('\n').map(result => result.split(''));
    oldRows = rows;

    var lastToggled = 1;

    while (lastToggled > 0) {
        lastToggled = toggleAllSeats();
    }


    console.log(rows);
    console.log(countAllSeatsWithValue('#'));


})

function countAllSeatsWithValue(value) {
    var seatsWithValue = 0;
    rows.forEach(row => {
        seatsWithValue = seatsWithValue + row.filter(x => x == value).length;
    })
    return seatsWithValue;
}

function toggleAllSeats() {
    const seatsToToggle = [];

    for (var row = 0; row < rows.length; row++) {
        for (var column = 0; column < rows[row].length; column++) {
            const seatValue = rows[row][column];
            const seatsOccupied = getNeighboursForChair(row, column);

            occupiedSeatCount = seatsOccupied.filter(x => x == "#").length;

            if ((seatValue == "#" && occupiedSeatCount >= 4) || (seatValue == "L" && occupiedSeatCount == 0)) {
                seatsToToggle.push([row, column]);
            }
        }
    }

    seatsToToggle.forEach(seat => toggleSeat(seat[0], seat[1]));
    return seatsToToggle.length;
}

function toggleSeat(row, column) {
    var current = rows[row][column];

    rows[row][column] = current == "#" ? "L" : "#";
}

function getNeighboursForChair(row, column) {
    var neighbouringSeats = [
        [row - 1, column - 1],
        [row - 1, column],
        [row - 1, column + 1],
        [row, column - 1],
        [row, column + 1],
        [row + 1, column - 1],
        [row + 1, column],
        [row + 1, column + 1]
    ];
    return neighbouringSeats.map(seat => {
        if (isValidChair(seat[0], seat[1])) {
            return rows[seat[0]][seat[1]];
        }
    })
}

function isValidChair(row, column) {
    return isInGrid(row, column) && rows[row][column] != ".";
}

function isInGrid(row, column) {
    return row >= 0 && row < rows.length && column >= 0 && column < rows[0].length
}