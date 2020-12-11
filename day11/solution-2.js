const fs = require('fs');

var rows;

fs.readFile('day11/input.txt', (err, data) => {
    if (err) throw err;
    rows = data.toString().split('\n').map(result => result.split(''));

    var lastToggled = 1;
    while (lastToggled > 0) {
        lastToggled = toggleAllSeats();
    }


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

            if ((seatValue == "#" && occupiedSeatCount >= 5) || (seatValue == "L" && occupiedSeatCount == 0)) {
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
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1]
    ];
    return neighbouringSeats.map(seat => {
        var lookSeatsFurther = 1;
        var currentRow = seat[0];
        var currentColumn = seat[1];

        while (isInGrid(row + currentRow, column + currentColumn)) {
            if (isValidChair(row + currentRow, column + currentColumn)) {
                return rows[row + currentRow][column + currentColumn];
            } else {
                lookSeatsFurther++;
                currentRow = seat[0] * lookSeatsFurther;
                currentColumn = seat[1] * lookSeatsFurther;
            }
        }
    })
}

function isValidChair(row, column) {
    return isInGrid(row, column) && rows[row][column] != ".";
}

function isInGrid(row, column) {
    return row >= 0 && row < rows.length && column >= 0 && column < rows[0].length
}