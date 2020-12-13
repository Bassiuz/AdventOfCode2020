const fs = require("fs");
const timer = require("./../timer/timer.js");

fs.readFile("day13/input.txt", (err, data) => {
    if (err) throw err;
    busData = data.toString().split("\n");
    var busses = busData[1].split(",");

    var bussesWithOffset = [];

    for (var i = 0; i < busses.length; i++) {
        if (busses[i] != "x") {
            var bus = {};
            bus.id = parseInt(busses[i]);
            bus.offset = i;
            bussesWithOffset.push(bus);
        }
    }

    console.log(bussesWithOffset);
    console.log(
        findOffsetBetweenBusses(bussesWithOffset[0], bussesWithOffset[1])
    );
    console.log(
        findTimestampsBetweenBusses(bussesWithOffset[0], bussesWithOffset[1])
    );

    while (bussesWithOffset.length > 2) {
        var newFirstBuss = {};
        newFirstBuss.offset = findTimestampsBetweenBusses(
            bussesWithOffset[0],
            bussesWithOffset[1]
        );
        newFirstBuss.id = findOffsetBetweenBusses(
            bussesWithOffset[0],
            bussesWithOffset[1]
        );
        bussesWithOffset[0] = newFirstBuss;
        bussesWithOffset.splice(1, 1);
        console.log(bussesWithOffset);
    }
    console.log(
        findTimestampsBetweenBusses(bussesWithOffset[0], bussesWithOffset[1])
    );

    function getXthOccuranceForBus(bus, x) {
        return bus.id * x + bus.offset;
    }

    //13(1) + 2 = 7x +1  => (x=2, y=1, T=15)
    function findTimestampsBetweenBusses(firstBus, secondBus) {
        var previousValue = 0;
        for (var x = 0; x < 100000000000000; x++) {
            var tryTimestamp = getXthOccuranceForBus(firstBus, x);
            if ((tryTimestamp + secondBus.offset) % secondBus.id == 0) {
                return tryTimestamp;
            }
        }
    }


    function findOffsetBetweenBusses(firstBus, secondBus) {
        var previousValue = 0;
        for (var x = 0; x < 100000000000000; x++) {
            var tryTimestamp = getXthOccuranceForBus(firstBus, x);
            if ((tryTimestamp + secondBus.offset) % secondBus.id == 0) {
                if (previousValue > 0) {
                    return tryTimestamp - previousValue;
                }
                var previousValue = tryTimestamp;
            }
        }
    }
});