const fs = require('fs');
const { parse } = require('path');
const timer = require("./../timer/timer.js");

const commands = [];
const bootSequence = [];
var bootSequenceInitiated = false;
var acc = 0;

fs.readFile('day8/input.txt', (err, data) => {
    if (err) throw err;
    var dataList = data.toString().split('\n')
    for (var i = 0; i < dataList.length; i++) {
        commands.push(parseCommand(dataList[i], i));
    }

    var exitedCode = false;
    var retryingCommand = {};
    var j = 0;

    resetExecutions();
    bootSequenceInitiated = true;

    /*while (!exitedCode && bootSequence[j]) {
        acc = 0;
        if (bootSequence[j].type != "acc") {
            exitedCode = executeCommands(commands[0], bootSequence[j]);
            resetExecutions();
        }
        j = j + 1;
    }

    console.log("Acc value: " + acc);*/
    const start = timer.startTimer();

    acc = 0;
    for (var i = 0; i < findNodesThatLeadToEndOfFile().length; i++) {
        endNode = findNodesThatLeadToEndOfFile()[i];
        flagNodesThatLeadToCommand(endNode);
    }

    for (var i = 0; i < bootSequence.length; i++) {
        if (flipFunctionIfAlternateCanReachEnd(bootSequence[i])) {
            break;
        }
    }

    executeCommands(commands[0]);
    console.log("Acc value: " + acc);
    console.log(`Time since start: ${timer.endTimer(start)} ms`);

})

function resetExecutions() {
    for (var i = 0; i < commands.length; i++) {
        commands[i].executed = false;
    }
}

function flipFunctionIfAlternateCanReachEnd(currentCommand) {
    if (currentCommand.type == "nop") {
        if (commands[findIndexOfNextCommand(currentCommand, "jpm")].canReachEnd) {
            currentCommand.type = "jpm";
            return true;
        }
    } else if (currentCommand.type == "jmp") {
        if (commands[findIndexOfNextCommand(currentCommand, "nop")].canReachEnd) {
            currentCommand.type = "nop";
            return true;
        }
    }

    return false;
}

function flagNodesThatLeadToCommand(currentCommand) {
    currentCommand.canReachEnd = true;

    var endNodes = [];

    for (var i = 0; i < commands.length; i++) {
        if (findIndexOfNextCommand(commands[i]) == commands.indexOf(commands[i])) {
            flagNodesThatLeadToCommand(commands[i]);
        }
    }

    return endNodes;

}

function findNodesThatLeadToEndOfFile() {
    var endNodes = [];

    for (var i = 0; i < commands.length; i++) {
        if (findIndexOfNextCommand(commands[i]) > commands.length - 1) {
            endNodes.push(commands[i]);
        }
    }

    return endNodes;
}

function findIndexOfNextCommand(currentCommand, type) {
    var jumpValue = 1;

    if (type == "jmp") {
        jumpValue = currentCommand.value;
    }

    return commands.indexOf(currentCommand) + jumpValue;
}

function executeCommands(currentCommand, retryCommand) {
    if (!bootSequenceInitiated) {
        bootSequence.push(currentCommand);
    }

    var type = currentCommand.type;
    if (retryCommand && currentCommand.line == retryCommand.line) {
        if (type == "nop") {
            type = "jmp"
        } else if (type == "jmp") {
            type = "nop"
        }
    }

    var nextIndex = findIndexOfNextCommand(currentCommand, type);

    if (type == "acc") {
        acc = acc + currentCommand.value;
    }

    var nextCommand = commands[nextIndex];

    if (!nextCommand) {
        // boot sequence reached end of program
        if (nextIndex < 0) {
            console.log("next index on top of file: " + nextIndex);
            // exited on top instead of end of file.
            return false;
        }

        console.log("next index on bottom of file: " + nextIndex);
        return true;
    }

    if (nextCommand.executed) {
        return false;
    } else {
        currentCommand.executed = true;
        return executeCommands(nextCommand, retryCommand);
    }
}

function parseCommand(string, line) {

    const command = {};
    command.line = line + 1;
    command.commandString = string;
    command.type = string.substring(0, 3);
    command.executed = false;
    command.canReachEnd = false;
    command.value = parseInt(string.substring(4));
    return command;

}