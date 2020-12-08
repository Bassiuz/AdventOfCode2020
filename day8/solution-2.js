const fs = require('fs');
const { parse } = require('path');

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

    while (!exitedCode && bootSequence[j]) {
        acc = 0;
        if (bootSequence[j].type != "acc") {
            console.log("retry command: " + bootSequence[j].commandString);
            exitedCode = executeCommands(commands[0], bootSequence[j]);
            resetExecutions();
        }
        j = j + 1;
    }

    console.log("Acc value: " + acc);
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
        console.log("found retry command");
        if (type == "nop") {
            console.log("set to jmp");
            type = "jmp"
        } else if (type == "jmp") {
            console.log("set to nop");
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
            console.log("next index on top of file: " + nextIndex);
            // exited on top instead of end of file.
            return false;
        }

        console.log("next index on bottom of file: " + nextIndex);
        return true;
    }

    if (nextCommand.executed) {
        console.log("next command already executed: ", nextCommand.commandString);
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