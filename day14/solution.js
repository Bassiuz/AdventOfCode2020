const fs = require("fs");

fs.readFile("day14/input.txt", (err, data) => {
    if (err) throw err;
    commands = data.toString().split("\n");

    var memory = [];
    var currentBitmask;

    commands.forEach(command => {
        if (command.substring(0, 2) == "ma") {
            // this is a mask
            currentBitmask = command.split(" = ")[1];
        } else {
            // this is a memory allocation
            number = command.split(" = ")[1];
            memoryAddress = command.split(" = ")[0].split("[")[1].replace("]", "");

            var binaryStringOfNumber = toBinaryString(number);
            var result = applyBitmaskToBinaryString(binaryStringOfNumber, currentBitmask);
            memory[memoryAddress] = result;
        }
    });

    var total = 0;
    memory.forEach(memoryItem => {
        var value = toNumber(memoryItem);
        if (value) {
            total = total + value;
        }
    });
    console.log(total);

    function applyBitmaskToBinaryString(binaryStringOfNumber, currentBitmask) {
        var result = "";
        for (var i = 0; i < binaryStringOfNumber.length; i++) {
            var currentChar = currentBitmask[i];
            if (currentChar == "X") {
                currentChar = binaryStringOfNumber[i];
            }
            result = result + currentChar;
        }

        return result;
    }


    function toBinaryString(number) {
        var binaryString = parseInt(number).toString(2);
        while (binaryString.length < 36) {
            binaryString = "0" + binaryString;
        }
        return binaryString;
    }

    function toNumber(binaryString) {
        return parseInt(binaryString, 2);
    }
});