const fs = require("fs");

fs.readFile("day12/input.txt", (err, data) => {
    if (err) throw err;
    instructions = data.toString().split("\n");

    var currentDegrees = 90;

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

    if (currentX < 0) {
        currentX = currentX * -1;
    }
    if (currentY < 0) {
        currentY = currentY * -1;
    }
    console.log(currentX);
    console.log(currentY);

    console.log("Manhatten Location", currentX + currentY);

    function moveForward(amount) {
        switch (currentDegrees) {
            case 0:
                move("N", amount);
                break;
            case 90:
                move("E", amount);
                break;
            case 180:
                move("S", amount);
                break;
            case 270:
                move("W", amount);
                break;
            default:
                break;
        }
    }

    function turn(direction, amount) {
        switch (direction) {
            case "R":
                var newValue = currentDegrees + amount;
                console.log("Turning left with amount: " + amount + " from " + currentDegrees + "to" + newValue);
                currentDegrees = newValue;
                break;
            case "L":
                var newValue = currentDegrees - amount;
                console.log("Turning left with amount: " + amount + " from " + currentDegrees + "to" + newValue);
                currentDegrees = newValue;
                break;
            default:
                break;
        }
        if (currentDegrees >= 360) {
            currentDegrees = currentDegrees - 360;
        }

        if (currentDegrees < 0) {
            currentDegrees = currentDegrees + 360;
        }
    }

    function move(direction, amount) {

        switch (direction) {
            case "E":
                var newValue = currentX + amount;
                console.log("Moving East with amount: " + amount + " from " + currentX + "to" + newValue)
                currentX = newValue;
                break;
            case "W":
                var newValue = currentX - amount;
                console.log("Moving West with amount: " + amount + " from " + currentX + "to" + newValue)
                currentX = newValue;
                break;
            case "N":
                var newValue = currentY + amount;
                console.log("Moving North with amount: " + amount + " from " + currentY + "to" + newValue)
                currentY = newValue;
                break;
            case "S":
                var newValue = currentY - amount;
                console.log("Moving South with amount: " + amount + " from " + currentY + "to" + newValue)
                currentY = newValue;
                break;
            default:
                break;
        }
    }
});