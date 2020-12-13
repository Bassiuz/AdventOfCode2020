const fs = require("fs");

fs.readFile("day13/input.txt", (err, data) => {
    if (err) throw err;
    busData = data.toString().split("\n");

    var timestamp = parseInt(busData[0]);

    var busses = busData[1].split(",");

    var shortestWaitingTime = 100000;
    var shortestBus = undefined;

    busses.forEach(bus => {
        var waitingForThisBus = bus - (timestamp % bus);

        if (waitingForThisBus < shortestWaitingTime) {
            shortestWaitingTime = waitingForThisBus;
            shortestBus = bus;
        }
    });

    console.log("Shortest wait is on bus ", shortestBus, " and you have to wait ", shortestWaitingTime, "minutes. The answer is ", shortestBus * shortestWaitingTime);

});