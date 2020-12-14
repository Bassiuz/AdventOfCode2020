const fs = require("fs");
const { stringify } = require("querystring");

fs.readFile("day14/input.txt", (err, data) => {
    if (err) throw err;
    commands = data.toString().split("\n");

    var memory = {};
    var total = 0;
    var currentBitmask;

    commands.forEach((command) => {
        if (command.substring(0, 2) == "ma") {
            // this is a mask
            currentBitmask = command.split(" = ")[1];
        } else {
            // this is a memory allocation
            number = command.split(" = ")[1];
            memoryAddress = command.split(" = ")[0].split("[")[1].replace("]", "");

            var binaryStringOfMemoryAddress = toBinaryString(memoryAddress);
            var allAddresses = generateAllNumbersWithBitmask(applyBitmaskToBinaryStringForMemoryAddress(
                binaryStringOfMemoryAddress,
                currentBitmask
            ));

            allAddresses.forEach(address => {
                if (memory[toNumber(address)]) {
                    total = total - parseInt(memory[toNumber(address)]);

                }
                memory[toNumber(address)] = number;
                total = total + parseInt(number);
            })

        }
    });



    console.log(total);

    function generateAllNumbersWithBitmask(currentNumberWithBitmaskApplied) {
        if (!currentNumberWithBitmaskApplied[0].includes("X")) {
            return currentNumberWithBitmaskApplied;
        }

        var result = [];
        currentNumberWithBitmaskApplied.forEach(number => {
            var numberWithZero = number;
            var numberWithOne = number;
            numberWithZero = numberWithZero.replace("X", "0");
            numberWithOne = numberWithOne.replace("X", "1");
            result.push(numberWithOne);
            result.push(numberWithZero);
        })

        return generateAllNumbersWithBitmask(result);
    }

    function applyBitmaskToBinaryStringForMemoryAddress(binaryStringOfNumber, currentBitmask) {
        var result = "";
        for (var i = 0; i < binaryStringOfNumber.length; i++) {
            var currentChar = currentBitmask[i];
            if (currentChar == "0") {
                currentChar = binaryStringOfNumber[i];
            }
            result = result + currentChar;
        }

        return [result];
    }

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