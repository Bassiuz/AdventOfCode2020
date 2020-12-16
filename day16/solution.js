const fs = require("fs");

fs.readFile("day16/input.txt", (err, data) => {
    if (err) throw err;
    var inputs = data.toString().split("\n\n");
    var rulesInput = inputs[0].split("\n");
    var myTicket = inputs[1].replace("your ticket:\n", "");
    var nearbyTickets = inputs[2].replace("nearby tickets:\n", "").split("\n");

    var rules = [];

    rulesInput.forEach(element => {
        element.split(": ");
        var ruleName = element.split(": ")[0];
        var ranges = [];
        rangesInput = element.split(": ")[1].split(" or ");
        rangesInput.forEach(rangeInput => {
            var start = rangeInput.split("-")[0];
            var end = rangeInput.split("-")[1];
            ranges.push({
                start: parseInt(start),
                end: parseInt(end)
            });
        })
        rules.push({
            name: ruleName,
            ranges: ranges
        });
    });

    var total = 0;

    nearbyTickets.forEach(ticket => {
        ticket.split(",").forEach(number => {
            var fitsInRule = false;
            rules.forEach(rule => {
                rule.ranges.forEach(range => {
                    if (range.start <= parseInt(number) && range.end >= parseInt(number)) {
                        fitsInRule = true;
                    }
                })
            })

            if (!fitsInRule) {
                total = total + parseInt(number);
            } else {}
        })

    })


    console.log(total);
});