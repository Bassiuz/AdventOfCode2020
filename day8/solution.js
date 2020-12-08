const fs = require('fs');
const { parse } = require('path');

const commands = [];
var acc = 0;

fs.readFile('day8/input.txt', (err, data) => {
    if (err) throw err;
    var dataList = data.toString().split('\n')
    for (var i = 0; i < dataList.length; i++) {
        commands.push(parseCommand(dataList[i]));
    }

    executeCommands(commands[0]);
    console.log("Acc value: " + acc);

})

function executeCommands(currentCommand) {
    var jumpValue = 1;

    if (currentCommand.type == "acc") {
        acc = acc + currentCommand.value;
    }
    if (currentCommand.type == "jmp") {
        jumpValue = currentCommand.value;
    }

    var nextCommand = commands[commands.indexOf(currentCommand) + jumpValue];
    if (nextCommand.executed) {

        return;
    } else {
        currentCommand.executed = true;
        executeCommands(nextCommand);
    }
}

function parseCommand(string) {

    const command = {};
    command.type = string.substring(0, 3);
    command.executed = false;
    command.value = parseInt(string.substring(4));
    return command;

}