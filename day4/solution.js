const fs = require('fs')

fs.readFile('day4/input.txt', (err, data) => {
    if (err) throw err;
    const dataList = data.toString().split('\n\n')

    console.log("Amount of valid passports: ", dataList.map(isPassportValid).filter(function(passportValidity) { return passportValidity; }).length);
})

const validationFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]

function isPassportValid(passportString) {
    var valid = true;
    for (var i = 0; i < validationFields.length; i++) {
        valid = passportString.includes(validationFields[i]) && valid;
    }
    return valid;
}