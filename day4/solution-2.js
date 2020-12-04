const fs = require('fs');
const { format } = require('path');

fs.readFile('day4/input.txt', (err, data) => {
    if (err) throw err;
    const dataList = data.toString().split('\n\n')
    console.log("Amount of valid passports: ", dataList.map(isPassportValid).filter(function(passportValidity) { return passportValidity; }).length);
})

const validationFields = [
    ["byr", /^[1][9][2-9]\d$|^[2][0][0][0-2]$/],
    ["iyr", /^[2][0][1]\d$|^[2][0][2][0]$/],
    ["eyr", /^[2][0][2]\d$|^[2][0][3][0]$/],
    ["hgt", /^59in$|^7[0-6]in$|^6\din$|^1[5-8]\dcm$|19[0-3]cm$/],
    ["hcl", /^[#][0-9a-fA-F]{6}$/],
    ["ecl", /\b(?:amb|blu|brn|gry|grn|hzl|oth)\b/],
    ["pid", /^[0-9]{9}$/]
];


function isPassportValid(passportString) {
    var valid = true;
    passportString = passportString.split('\n').join(' ');
    for (var i = 0; i < validationFields.length; i++) {
        const included = passportString.includes(validationFields[i][0]);
        var formatCorrect = false;
        if (included) {
            formatCorrect = findValueForKey(passportString, validationFields[i][0]).match(validationFields[i][1]) != null;
            validations.push(validationFields[i][0] + findValueForKey(passportString, validationFields[i][0]) + formatCorrect);
        }
        valid = valid && included && formatCorrect;
    }


    return valid;
}

function findValueForKey(passportString, key) {
    return passportString.substring(passportString.indexOf(key + ":") + 4).split(' ')[0]
}