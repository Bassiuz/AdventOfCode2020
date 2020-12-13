const fs = require("fs");

fs.readFile("day12/input.txt", (err, data) => {
    if (err) throw err;
    instructions = data.toString().split("\n");

    var waypointX = 10;
    var waypointY = 1;

    var currentX = 0;
    var currentY = 0;

    instructions.forEach((instruction) => {
        var instructionType = instruction[0];
        var instructionAmount = parseInt(instruction.substring(1));

        switch (instructionType) {
            case "N":
            case "E":
            case "S":
            case "W":
                move(instructionType, instructionAmount);
                break;
            case "L":
            case "R":
                turn(instructionType, instructionAmount);
                break;
            case "F":
                moveForward(instructionAmount);
                break;
            default:
                break;
        }
    });

    console.log("Manhatten Location", getCurrentManhattenLocation());

    function getCurrentManhattenLocation() {
        var X = currentX;
        var Y = currentY
        if (X < 0) {
            X = X * -1;
        }
        if (Y < 0) {
            Y = Y * -1;
        }

        return X + Y;
    }

    function moveForward(amount) {
        var oldManhatten = getCurrentManhattenLocation();
        currentX = currentX + (waypointX * amount);
        currentY = currentY + (waypointY * amount);

        console.log("Moving to waypoint ", amount, " times. moving from ", oldManhatten, " to ", getCurrentManhattenLocation());
    }

    /*
Right turn means
3,1 -> 1,-3
1,-3 -> -3,-1
-3, -1 -> -1, 3
X = Y, Y = X*-1

Left turn means
1,-3 -> 3,1
Y = X, X = Y*-1

0 0 W 0 0 0 0
0 0 0 0 0 0 0
0 0 0 0 0 0 W
0 0 0 X 0 0 0
W 0 0 0 0 0 0
0 0 0 0 0 0 0
0 0 0 0 W 0 0
    */
    function turn(direction, amount) {
        var amountOfTurns = amount / 90;
        for (var i = 1; i < amountOfTurns + 1; i++) {
            switch (direction) {
                case "R":
                    oldX = waypointX;
                    waypointX = waypointY;
                    waypointY = oldX * -1;
                    break;
                case "L":
                    oldX = waypointX;
                    waypointX = waypointY * -1;
                    waypointY = oldX;
                    break;
                default:
                    break;
            }
        }

        console.log("Turned waypoint by ", direction, " to ", waypointX, ",", waypointY);
    }

    function move(direction, amount) {
        switch (direction) {
            case "E":
                var newValue = waypointX + amount;
                console.log(
                    "Moving East with amount: " +
                    amount +
                    " from " +
                    waypointX +
                    "to" +
                    newValue
                );
                waypointX = newValue;
                break;
            case "W":
                var newValue = waypointX - amount;
                console.log(
                    "Moving West with amount: " +
                    amount +
                    " from " +
                    waypointX +
                    "to" +
                    newValue
                );
                waypointX = newValue;
                break;
            case "N":
                var newValue = waypointY + amount;
                console.log(
                    "Moving North with amount: " +
                    amount +
                    " from " +
                    waypointY +
                    "to" +
                    newValue
                );
                waypointY = newValue;
                break;
            case "S":
                var newValue = waypointY - amount;
                console.log(
                    "Moving South with amount: " +
                    amount +
                    " from " +
                    waypointY +
                    "to" +
                    newValue
                );
                waypointY = newValue;
                break;
            default:
                break;
        }
    }
});