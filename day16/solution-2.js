const fs = require("fs");
const { parse } = require("path");

fs.readFile("day16/input.txt", (err, data) => {
    if (err) throw err;
    var inputs = data.toString().split("\n\n");
    var rulesInput = inputs[0].split("\n");
    var myTicket = inputs[1].replace("your ticket:\n", "").split(",");
    var nearbyTickets = inputs[2].replace("nearby tickets:\n", "").split("\n");
    var validTickets = [];

    var rules = [];

    parseRules();
    determineValidTickets();

    for (var i = 0; i < myTicket.length; i++) {
        console.log("index", i);


        validTickets.forEach((ticket) => {
            var ticketNumbers = ticket.split(",");

            var number = parseInt(ticketNumbers[i]);
            rules.forEach((rule) => {
                if (rule.validIndexes.includes(i)) {
                    if (!checkNumberForRule(rule, number)) {
                        console.log(rule, number);
                        rule.validIndexes = rule.validIndexes.filter(index => index != i);
                    }
                }
            });

        });
    }

    var test = {
        0: "bla",
        1: "bla",
        4: "bla"
    }

    console.log("keys", Object.keys(test).length);
    //console.log(myTicket);
    console.log(validTickets)
    console.log(rules)


    var rulesForNumber = {};

    while (Object.keys(rulesForNumber).length < myTicket.length) {
        for (var i = 0; i < myTicket.length; i++) {
            console.log("index", i);
            if (!rulesForNumber[i]) {
                var testRules = rules.filter(rule => !Object.values(rulesForNumber).includes(rule)).filter(rule => rule.validIndexes.includes(i));
                console.log(testRules.length);
                if (testRules.length == 1) {
                    rulesForNumber[i] = testRules[0];

                }
            }

        }
    }

    console.log(rulesForNumber);

    var myTicketDetail = {};

    Object.keys(rulesForNumber).forEach(key => {
        myTicketDetail[rulesForNumber[key].name] = myTicket[key];
    })

    console.log(myTicketDetail);

    var total = 0;
    Object.keys(myTicketDetail).filter(key => key.includes("departure")).forEach(key => {
        if (total == 0) {
            total = parseInt(myTicketDetail[key]);

        } else {
            total = total * parseInt(myTicketDetail[key]);

        }
    });

    console.log(total);


    function parseRules() {
        rulesInput.forEach((element) => {
            element.split(": ");
            var ruleName = element.split(": ")[0];
            var ranges = [];
            rangesInput = element.split(": ")[1].split(" or ");
            rangesInput.forEach((rangeInput) => {
                var start = rangeInput.split("-")[0];
                var end = rangeInput.split("-")[1];
                ranges.push({
                    start: parseInt(start),
                    end: parseInt(end),
                });
            });
            rules.push({
                name: ruleName,
                ranges: ranges,
                validIndexes: range(0, myTicket.length - 1)
            });
        });
    }



    function determineValidTickets() {
        nearbyTickets.forEach((ticket) => {
            var fitsAllRules = true;
            ticket.split(",").forEach((number) => {
                var fitsInRule = false;
                rules.forEach((rule) => {
                    if (checkNumberForRule(rule, number)) {
                        fitsInRule = true;
                    }

                });

                if (!fitsInRule) {
                    fitsAllRules = false;
                }


            });

            if (fitsAllRules) {
                validTickets.push(ticket);
            }
        });
    }

    function checkNumberForRule(rule, number) {

        var result = false;
        rule.ranges.forEach((range) => {
            if (checkNumberForRange(range, number)) {
                result = true;
            }
        });
        return result;
    }

    function checkNumberForRange(range, number) {

        if (
            range.start <= parseInt(number) &&
            range.end >= parseInt(number)
        ) {
            return true;
        } else {
            return false;
        }
    }

    function range(start, end) {
        var foo = [];
        for (var i = start; i <= end; i++) {
            foo.push(i);
        }
        return foo;
    }

});