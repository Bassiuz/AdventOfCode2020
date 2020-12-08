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

    executeCommands(commands[0]);
    resetExecutions();
    bootSequenceInitiated = true;

    const start = timer.startTimer();

    while (!exitedCode && bootSequence[j]) {
        acc = 0;
        if (bootSequence[j].type != "acc") {
            exitedCode = executeCommands(commands[0], bootSequence[j]);
            resetExecutions();
        }
        j = j + 1;
    }

    console.log("Acc value: " + acc);

    console.log(`Time since start: ${timer.endTimer(start)} ms`);
})

function resetExecutions() {
    for (var i = 0; i < commands.length; i++) {
        commands[i].executed = false;
    }
}

function executeCommands(currentCommand, retryCommand) {
    if (!bootSequenceInitiated) {
        bootSequence.push(currentCommand);
    }

    var jumpValue = 1;
    var type = currentCommand.type;

    if (retryCommand && currentCommand.line == retryCommand.line) {
        if (type == "nop") {
            type = "jmp"
        } else if (type == "jmp") {
            type = "nop"
        }
    }

    if (type == "acc") {
        acc = acc + currentCommand.value;
    }
    if (type == "jmp") {
        jumpValue = currentCommand.value;
    }


    var nextIndex = commands.indexOf(currentCommand) + jumpValue;
    var nextCommand = commands[nextIndex];

    if (!nextCommand) {
        // boot sequence reached end of program
        if (nextIndex < 0) {
            // exited on top instead of end of file.
            return false;
        }

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
    command.value = parseInt(string.substring(4));
    return command;

}