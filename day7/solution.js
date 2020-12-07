const fs = require('fs');
const { parse } = require('path');

fs.readFile('day7/input.txt', (err, data) => {
    if (err) throw err;
    var dataList = data.toString().split('\n')
    for (bag = 0; bag < dataList.length; bag++) {
        parseBag(dataList[bag]);
    }
    for (bag = 0; bag < allBags.length; bag++) {
        enrichChildren(allBags[bag]);
    }

    var count = 0;
    for (bag = 0; bag < allBags.length; bag++) {
        if (JSON.stringify(allBags[bag]).includes("shiny gold")) {
            count++;
        }
    }

    console.log("Amount of bags containing a shiny gold bag: ", count - 1);


})

const allBags = [];

function enrichChildren(bag) {
    var newContainingBags = [];
    for (var i = 0; i < bag.containingBags.length; i++) {
        var oldBag = bag.containingBags[i].bag;
        var newBag = searchByName(oldBag.bagName, allBags);
        if (!newBag) {
            console.log("Could not find: ", oldBag.bagName);
        } else {
            enrichChildren(newBag);
            bag.containingBags[i].bag = newBag;
        }
    }
}

function parseBag(bagString) {
    var bagName = bagString.split(" contain ")[0].replace('bags', 'bag');
    var containingBagsString = bagString.split(" contain ")[1].replace('.', '');
    var containingBags = [];

    if (containingBagsString[0] == "n") {
        // contains no other bags
    } else {
        for (i = 0; i < containingBagsString.split(', ').length; i++) {
            var containerBagString = containingBagsString.split(', ')[i];
            var amount = containerBagString.split(' ')[0];
            var containerBagName = containerBagString.replace(amount + ' ', '').replace('bags', 'bag');

            var containerBag = {};
            containerBag.bagName = containerBagName;
            containerBag.containingBags = [];

            var containerBagHolder = {};
            containerBagHolder.bag = containerBag;
            containerBagHolder.amount = amount;
            containingBags.push(containerBagHolder);
        }
    }

    var bag = {};
    bag.bagName = bagName;
    bag.containingBags = containingBags;
    allBags.push(bag);
}

function searchByName(name, myArray) {
    for (var s = 0; s < myArray.length; s++) {
        if (myArray[s].bagName === name) {
            return myArray[s];
        }
    }
}